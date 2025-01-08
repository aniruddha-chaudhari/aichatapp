import { Image, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const DetailsPage = () => {

    const { name, image_url, type, description, price, rating } = useLocalSearchParams() as { name: string, image_url: string, type: string, description: string, price: string, rating: string };

  return (
    <View>
      <Text>{name}
        <Image src={image_url} alt={name} />
      </Text>
    </View>
  )
}

export default DetailsPage

