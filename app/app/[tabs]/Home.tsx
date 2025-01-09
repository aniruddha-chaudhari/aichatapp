import { Text, View, FlatList, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import getproducts from '@/services/productservice'
import { Product } from '@/services/productservice'
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import SearchArea from '@/components/SearchArea'
import Banner from '@/components/Banner'
import { router } from 'expo-router'
import { useCart } from '@/components/CartContext'


export interface ProductCategory {
  id: string;
  selected: boolean;
}

const Home = () => {
  const {addToCart,cartItems} = useCart();
  const [products, setProducts] = useState<Product[]>([])
  const [shownProducts, setShownProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true)

  // Update category selection and filter products
  useEffect(() => {
    console.log('Category Selection Changed:', selectedCategory);
    console.log('Current Categories:', categories);

    if (categories.length > 0) {
      // Update category selection state
      const uniqueCategories = categories.map((category) => ({
        id: category.id,
        selected: selectedCategory === category.id,
      }));
      console.log('Updated Categories:', uniqueCategories);
      setCategories([...uniqueCategories]);

      // Filter products based on selected category
      if (selectedCategory === 'All') {
        console.log('Showing all products:', products.length);
        setShownProducts(products);
      } else {
        const filtered = products.filter(product => product.category === selectedCategory);
        console.log('Filtered products:', filtered.length, 'for category:', selectedCategory);
        setShownProducts(filtered);
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getproducts()
        console.log('Fetched products:', products.length);

        const categories = products.map((product) => product.category)
        categories.unshift('All')
        console.log('Initial categories:', categories);

        const uniqueCategories = Array.from(new Set(categories)).map((category) => ({
          id: category,
          selected: category === selectedCategory,
        }))
        console.log('Initial unique categories:', uniqueCategories);

        setProducts(products);
        setShownProducts(products); // Initialize shown products
        setCategories(uniqueCategories);
      } catch (e) {
        console.error('Error fetching products:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  const addButton = (name:string) => {
    addToCart(name, 1);
    console.log(cartItems);
  };


  return (
    <GestureHandlerRootView>
      <SafeAreaView
        className='w-full h-full'
      >
        <FlatList
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 10 }}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
          keyExtractor={(item, index) => index.toString()}
          data={shownProducts} // Use filtered products
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>

              <SearchArea />
              <Banner />
              <FlatList
                className='mt-6 w-[90%] mb-2'
                data={categories}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {
                    console.log('Category pressed:', item.id);
                    setSelectedCategory(item.id);
                  }}>
                    <Text
                      className={`text-sm mr-4 font-[Sora-Regular] p-3 rounded-lg 
                        ${item.selected ? 'text-white' : 'text-[#313131]'}
                        ${item.selected ? 'bg-[#C67C4E] ' : 'bg-[#EDEDED] '}
                        `}
                    >{item.id}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          renderItem={({ item }) => (
            <View
              className='w-[48%] mt-2 bg-white rounded-2xl p-2 flex justify-between'>
              <TouchableOpacity

                onPress={() => {

                  router.push({
                    pathname: '/details', params: {
                      name: item.name,
                      image_url: item.image_url,
                      type: item.category,
                      price: item.price,
                      rating: item.rating,
                      description: item.description,
                    }
                  })
                }
                }
              >
                <Image
                  className='w-full h-32 rounded-xl'
                  source={{ uri: item.image_url }}
                />
                <Text
                  className="text-[#242424] text-lg font-[sora-semi] ml-1 mt-2"
                >{item.name}
                </Text>
                <Text
                  className="text-[#A2A2A2] text-sm font-[sora-regular] ml-1 mt-1"
                >{item.category}
                </Text>
              </TouchableOpacity>
              <View
                className='flex-row justify-between ml-1 mt-5 mb-2'
              >
                <Text
                  className="text-[#050505] text-xl font-[sora-semi] "
                >
                  ${item.price}
                </Text>
                <TouchableOpacity
                  onPress = {() => addButton(item.name)}
                  
                >
                  <View className='bg-[#C67C4E] h-8 w-8 rounded-xl items-center justify-center'>
                    <AntDesign name="plus" size={20} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Home


