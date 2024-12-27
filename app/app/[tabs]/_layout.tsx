import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo } from '@expo/vector-icons'

const TabLayout = () => {
    return (
        <>
            <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#C67C4E',
              }}
            >
                <Tabs.Screen
                    name='Home'
                    options={{
                        headerShown: false,
                        title: 'Home',
                        tabBarIcon: ({ color }) => (
                            <Entypo name="home" size={24} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name='Order'
                    options={{
                        headerShown: true,
                        tabBarStyle: { display: 'none' },
                        title: 'Cart',
                        tabBarIcon: ({ color }) => (
                            <Entypo name="shopping-cart" size={24} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name='ChatRoom'
                    options={{
                        headerShown: true,
                        tabBarStyle: { display: 'none' },
                        title: 'Chat Bot',
                        tabBarIcon: ({ color }) => (
                            <Entypo name="message" size={24} color={color} />
                        )
                    }}
                />


            </Tabs>
        </>
    )
}

export default TabLayout

const styles = StyleSheet.create({})