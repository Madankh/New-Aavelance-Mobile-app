import { View, Text } from 'react-native'
import React from 'react'
import Chatheader from './Chatheader'
import MessageList from './MessageList'

export default function Message(CurrentChat) {
  console.log(CurrentChat , "Message page currentChat Check")
  return (
    <View style={{flex:1}}>
      <Chatheader CurrentChat={CurrentChat?.CurrentChat}/>
      <MessageList CurrentChat={CurrentChat?.CurrentChat}/>
    </View>
  )
}