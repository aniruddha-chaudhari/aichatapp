import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import OrdersHeader from './OrderHeader';
import OrdersFooter from './OrderFooter';
interface ProductListProps {
    products: Product[];
    quantities: { [key: string]: number };
    setQuantities: (itemKey: string, delta: number) => void;
    totalPrice: number;
  }

  interface Product {
    id: string;
    category: string;
    description: string;
    image_url: string;
    name: string;
    price: number;
    rating: number;
  }
  
const ProductList: React.FC<ProductListProps> = ({ products, quantities, setQuantities,totalPrice }) => {

    const filteredProducts = products.filter((product) => (quantities[product.name] || 0) > 0);

    const renderItem = ({ item }: { item: Product }) => (
      <View className="flex-row items-center justify-between mx-7 pb-3">
        <Image
          source={{ uri: item.image_url }}
          className="w-16 h-16 rounded-lg"
        />
        <View className="flex-1 ml-4">
          <Text className="text-lg font-[sora-semi] text-[#242424] ">{item.name}</Text>
          <Text className="font-[sora-regular] text-xs text-gray-500">{item.category}</Text>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => setQuantities(item.name, -1)}>
            <Text className="text-xl">−</Text>
          </TouchableOpacity>
          <Text className="mx-2">{quantities[item.name] || 0}</Text>
          <TouchableOpacity onPress={() => setQuantities(item.name, 1)}>
            <Text className="text-xl">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  
    return (
        <View>
            {filteredProducts.length > 0 ? (
                <FlatList
                    ListHeaderComponent={<OrdersHeader />}
                    ListFooterComponent={<OrdersFooter totalPrice={totalPrice} />}
                    data={filteredProducts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                />
            ) : (
                
                <View className='mx-7 items-center'>
                    <Text className="text-2xl font-[sora-semi] text-gray-500 mb-4 text-center">No items in your cart yet</Text>
                    <Text className="text-xl font-[sora-semi] text-gray-500 text-center">Let's Go Get some Delicious Goodies</Text>
                </View>
            )}
        </View>
    );
  };
  
export default ProductList;