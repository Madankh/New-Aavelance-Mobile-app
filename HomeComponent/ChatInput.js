import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function ChatInput() {
  return (
    <View style={{backgroundColor:"white"}}>
      <TextInput multiline placeholder='Write a message'/>
    </View>
  )
}