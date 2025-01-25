import { Text, View } from 'react-native'
import DeliveryToggle from './DileveryToggle'
import React from 'react'

const OrdersHeader = () => {
  return (
    <View>
        <DeliveryToggle />

        <Text
        className=" mx-7 mt-7 text-[#242424] text-lg font-[sora-semi]"
        >
        Delivery Address
        </Text>
        <Text
        className=" mx-7 mt-3 text-[#242424] text-base font-[sora-semi] mb-2"
        >
        Jl. Kpg Sutoyo
        </Text>
        <Text
        className=" mx-7 text-[#A2A2A2] text-xs font-[sora-semi] mb-3"
        >
        Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.
        </Text>

        <View className="mx-12 border-b border-gray-400 my-4 " />
    </View>
  )
}

export default OrdersHeader