import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const Banner = () => {
  return (
    <View className="rounded-lg  items-center">
    <View
    className='absolute w-full h-[90px] -top-1 items-center bg-[#222222] pb-10'
    />
        <Image   
        source={require('../assets/images/banner.png')}
        className="w-[90%] h-36 rounded-3xl"
        />
</View>
  )
}

export default Banner
