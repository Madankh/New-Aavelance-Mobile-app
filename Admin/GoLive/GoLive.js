import { View, Text } from 'react-native'
import React from 'react'
import Topheader from '../../HomeComponent/Topheader'

export default function GoLive() {
  return (
      <>
    <View>
      <Topheader/>
      <Text style={{fontSize:18 , marginTop:340 , marginLeft:29 , color:"black"}}>Now Live streaming is on development Process</Text>
      <View style={{paddingLeft:150 , backgroundColor:"black" , paddingTop:10 , paddingBottom:10 , borderRadius:10 , marginTop:10 }}>
        <Text style={{color:"white"}}>Go back</Text>
      </View>
    </View>
      </>
  )
}