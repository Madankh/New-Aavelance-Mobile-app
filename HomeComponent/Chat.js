import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Topheader from './Topheader'
import Contact from './Contact'
import Chattopheader from './Chattopheader'

export default function Chat() {
  return (
    <View style={{flex:1}}>
        <Topheader/>
          <View style={styles.ChatContainer}>
              <Chattopheader/>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ChatContainer:{
    flex: 1,
  },
  content: {
    flex: 1,
    height:400,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  
})
