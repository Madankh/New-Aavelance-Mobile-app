import { View, Text , Image } from 'react-native'
import React from 'react'

export default function Chatheader(CurrentChat) {
  console.log(CurrentChat.CurrentChat.Chatname , "Chatheader")
  return (
    <View style={{backgroundColor:"white" , marginTop:10 , width:"95%" , marginLeft:10 , borderRadius:10 , padding:3  }}>
      <View style={{flexDirection:"row" , alignItems:"center" , marginLeft:20 }}>
        <Image source={require("../Admin/Images/networking.png")} style={{height:40, width:40 , borderRadius:30}}/>
        <Text style={{color:'black' , marginLeft:10}}>{CurrentChat.CurrentChat.Chatname}</Text>
      </View>
    </View>
  )
}