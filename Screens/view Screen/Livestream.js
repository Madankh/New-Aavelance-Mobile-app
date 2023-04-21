import { View, Text } from 'react-native'
import React from 'react'
import liveimage from "../assets/live.png"
import { Image } from 'react-native'
import Topheader from "../../HomeComponent/Topheader"
import ButtomTabs from '../../HomeComponent/ButtomTabs'

export default function Livestream() {
  return (
    <>
    <View>
      <Topheader/>
      <View style={{flexDirection:'column' , marginTop:200 }}>
        <Image source={liveimage} style={{width:80 , height:80,marginLeft:163 , marginTop:50}} />
        <Text style={{color:"black" , marginTop:10,fontSize:17 , marginLeft:46}}>Live streaming feature is coming soon</Text>
      </View>
    </View>
    </>
  )
}