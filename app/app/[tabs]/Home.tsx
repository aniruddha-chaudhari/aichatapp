import { Text, View, FlatList, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import getproducts from '@/services/productservice'
import { Product } from '@/services/productservice'
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import SearchArea from '@/components/SearchArea'
import Banner from '@/components/Banner'


export interface ProductCategory {
  id: string;
  selected: boolean;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [catgories, setCategories] = useState<ProductCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (catgories.length > 0) {
      const uniqueCategories = catgories.map((category) => ({
        id: category.id,
        selected: selectedCategory === category.id,
      }));
      setCategories(uniqueCategories);
    }
  }, [selectedCategory, catgories]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getproducts()
        const categories = products.map((product) => product.category)
        categories.unshift('All')

        const uniqueCategories = Array.from(new Set(categories)).map((category) => ({
          id: category,
          selected: category === selectedCategory,
        }))

        setProducts(products);
        setCategories(uniqueCategories);
      } catch (e) {
        console.log(e);
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
          data={products}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View className="px-4 pt-8 pb-4">
              <Text className="text-2xl font-[sora-semi] text-[#2F2D2C] mb-4">
                Home
              </Text>
              <SearchArea />
              <Banner />
            </View>
          )}
          renderItem={({ item }) => (
            <View
              className='w-[48%] mt-2 bg-white rounded-2xl p-2 flex justify-between'>

              <TouchableOpacity>
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