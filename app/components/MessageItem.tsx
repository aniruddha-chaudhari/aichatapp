import { Text, View } from 'react-native'
import React from 'react'
import { MessageInterface } from '@/app/[tabs]/ChatRoom'
import { heightPercentageToDP } from 'react-native-responsive-screen'

interface Message {
    message: MessageInterface
}

const MessageItem = ({ message }: Message) => {

    if (message.role === 'user') {
        return (
            <View className='flex-row justify-end mb-3 mr-3'>
                <View className='w-[80%]'>
                    <View
                        className='self-end bg-white p-3 border border-neutral-200 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl'
                    >
                        <Text
                            style={{ fontSize: heightPercentageToDP(1.9) }}>
                            {message.content}
                        </Text>
                    </View>

                </View>

            </View>
        )
    }
    else {
        return (
            <View
                className='w-[80%] mb-3 ml-3'
            >
                <View className='flex self-start p-3 rounded-2xl bg-indigo-100 border border-indigo-200 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-none'>
                    <Text style={{ fontSize: heightPercentageToDP(1.9) }}>
                        {message?.content}
                    </Text>

                </View>
            </View>
        )
    }

}

export default MessageItem

