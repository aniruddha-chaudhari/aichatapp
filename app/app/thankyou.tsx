import { Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity,GestureHandlerRootView } from 'react-native-gesture-handler'
import {router} from "expo-router";

const ThankyouPage = () => {
  return (
    <GestureHandlerRootView>
        <View className='w-full h-full items-center justify-center '>
        <Text className='text-3xl font-[sora-semi] text-center mx-10'>Thank you For Your Order</Text>

        <TouchableOpacity 
                className='bg-app_orange_color 2-full rounded-2xl items-center justify-center mt-6 py-3 px-4 font-[Sora-SemiBold]'
                onPress={() => router.push("/[tabs]/Home")}
              >
                <Text className="text-xl color-white font-[sora-regular]">Return to Home Page</Text> 
          </TouchableOpacity> 
        </View>
    </GestureHandlerRootView>
  )
}

export default ThankyouPage