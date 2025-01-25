import { Text, View } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'
import { ScrollView } from 'react-native-gesture-handler'
import { MessageInterface } from '@/app/[tabs]/ChatRoom'
import TypingIndicator from './TypingIndicator'

interface Message {
    messages: MessageInterface[];
    istyping: boolean;
}

const MessageList = ({ messages, istyping = false }: Message) => {
    return (
        <ScrollView>
            {
                messages.map((message, index) => (
                    <MessageItem key={index} message={message} />
                ))
            }
            {istyping && (
                <View className="w-[80%] ml-3 mb-3">
                    <View className="flex self-start p-3 px-4 rounded-2xl bg-indigo-100 border border-indigo-200">
                        <TypingIndicator />
                    </View>
                </View>
            )}
        </ScrollView>
    )
}

export default MessageList