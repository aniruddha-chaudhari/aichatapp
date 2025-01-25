import { Image, Text, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { Gesture, GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import PageHeader from '@/components/PageHeader';
import DetailsHeader from '@/components/DetailsHeader';
import DescriptionSection from '@/components/Description';
import SizesSection from '@/components/SizeSection';
import { useCart } from '@/components/CartContext';
import Toast from 'react-native-root-toast';

const DetailsPage = () => {
  const { addToCart } = useCart();
  const { name, image_url, type, description, price, rating } = useLocalSearchParams() as { name: string, image_url: string, type: string, description: string, price: string, rating: string };
  const buyNow = () => {
    const buyNow = () => {
      addToCart(name, 1);
      Toast.show(`${name} added to cart`, {
        duration: Toast.durations.SHORT,
      });
      router.back();
    };
    buyNow();
  }
  return (
    <GestureHandlerRootView className='bg-[#F9F9F9] w-full h-full'>
      <PageHeader title={name} showHeaderRight={true} bgColor='#F9F9F9' />

      <View className='h-full flex-col justify-between'>
        <ScrollView>
          <View className='mx-5 items-center'>
            <DetailsHeader image_url={image_url} name={name} type={type} rating={Number(rating)} />
            <DescriptionSection description={description} />
            <SizesSection />
          </View>
        </ScrollView>

        <View className='bg-white rounded-tr-3xl px-6 pt-3 pb-6 flex-row justify-between'>
          <View>
            <Text className="text-[#A2A2A2] text-base font-[sora-regular] pb-3">
              Price
            </Text>
            <Text className="text-[#C67C4E] text-2xl font-[sora-semi]">
              $ {price}
            </Text>
          </View>

          <TouchableOpacity
            className="bg-[#C67C4E] w-[70%] rounded-3xl items-center justify-center"
          onPress={buyNow}
          >
            <Text className="text-xl text-white font-[sora-regular]">Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

export default DetailsPage

