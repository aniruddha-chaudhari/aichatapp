
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import PageHeader from '@/components/PageHeader'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import MessageList from '@/components/MessageList';
import { getChatBotResponse } from '@/services/ChatBot';

export interface MessageInterface {
  role: string;
  content: string;
  memory?: any;
}


const ChatRoom = () => {
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const textref = useRef('');
  const inputref = useRef<TextInput>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSendMessage = async () => {
    console.log('Using API URL:', process.env.REACT_APP_API_URL || 'http://192.168.1.100:8000');
    let message = textref.current.trim();
    if (message.length === 0) {
      return;
    }
    try {
      let inputmessage = [...messages, { content: message, role: 'user' }];
      setMessages(inputmessage);
      textref.current = '';
      if (inputref.current) {
        inputref.current.clear();
        setIsTyping(true);
        let responsemessage = await getChatBotResponse(inputmessage);
        setMessages([...inputmessage, responsemessage]);
        setIsTyping(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GestureHandlerRootView>
      <PageHeader title="Chat Room" showHeaderRight={false} bgColor="#F9F9F9" />
      <View
        className='flex-1 justify-between bg-neutral-100 overflow-visible'
      >
        <View className='flex-1'>
          <MessageList messages={messages} istyping={isTyping}/>
        </View>
        <View className='flex-row justify-between mx-3 p-2 bg-white border-neutral-300 rounded-full pl-5'>
          <TextInput
            ref={inputref}
            onChangeText={value => textref.current = value}
            placeholder='Type a message'
            style={{ fontSize: 16, flex: 1 }}
            className='mr-2 mb-2'
          />
          <TouchableOpacity
            className='bg-neutral-200 p-2 rounded-full pt-3 pr-3 mx-[0.5px]'
            onPress={handleSendMessage}
          >
            <Feather name='send' size={30} color='#737373'
            />
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

export default ChatRoom

const styles = StyleSheet.create({})