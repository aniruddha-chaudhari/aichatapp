import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface PageHeaderProps {
    title: string;
    showHeaderRight: boolean;
    bgColor: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, showHeaderRight, bgColor }) => {
    return (
        <Stack.Screen
        options={{
            headerShadowVisible: false,
            headerStyle: {
                backgroundColor: bgColor,
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
                <Text className='text-xl text-[#242424] font-[sora-semi]'>
                    {title}
                </Text>
            ),
            headerRight: showHeaderRight
                ? () => (
                        <FontAwesome5
                            style={{ marginRight: 10 }}
                            name="heart"
                            size={24}
                            color="black"
                        />
                    )
                : undefined,
            headerBackVisible: false,
            headerLeft: () => (
                <GestureHandlerRootView className='flex-row items-center gap-4'>
                    <TouchableOpacity className='pl-2' onPress={() => router.back()}>
                        <Feather name="arrow-left" size={24} color="black" />
                    </TouchableOpacity>
                </GestureHandlerRootView>
            ),
        }}
    />
    )
}

export default PageHeader

const styles = StyleSheet.create({})