import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Topheader from "./Topheader"
import { TextInput } from 'react-native'
import { useRef } from 'react'
import navigationStrings from '../constants/navigationStrings'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'

export default function ForgotPasswordOTP() {
  const navigation = useNavigation();
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  
  const [pin1 , setpin1] = useState(null);
  const [pin2 , setpin2] = useState(null);
  const [pin3 , setpin3] = useState(null);
  const [pin4 , setpin4] = useState(null);

  return (
    <View style={{backgroundColor:'black' , height:"100%"}}>
      <Topheader/>
      <View style={{alignItems:"center" , marginTop:190}}>
        <Text style={{fontSize:22 , color:'#FFFFF0'}}>Account Verification</Text>
        <Text style={{fontSize:12 , color:'white'}}>Please enter 4-digit code sent to your email</Text>
        <View style={{flexDirection:'row' , marginTop:15 , marginLeft:20 }}>
          <TextInput maxLength={1} keyboardType="number-pad" ref={pin1Ref} onChange={(pin1)=>{
            setpin1(pin1)
            if(pin1Ref !== null){
              pin2Ref.current.focus()
            }
          }}
           style={{backgroundColor:"white" , marginRight:20 , width:46 , borderRadius:7 , fontSize:20 , textAlign:"center"  }}/>
          <TextInput ref={pin2Ref} maxLength={1} keyboardType="number-pad" onChange={(pin2)=>{ 
            setpin2(pin2)
            if(pin2 !==null){
              pin3Ref.current.focus()
            }
          }} style={{backgroundColor:"white" , marginRight:20 , width:46 , borderRadius:7 , fontSize:20 , textAlign:"center" }}/>
          <TextInput ref={pin3Ref} maxLength={1} keyboardType="number-pad" onChange={(pin3)=>{
            setpin3(pin3)
            if(pin3Ref !== null){
              pin4Ref.current.focus()
            }
            }} style={{backgroundColor:"white" , marginRight:20 , width:46 , borderRadius:7, fontSize:20 , textAlign:"center" }}/>
          <TextInput ref={pin4Ref} maxLength={1} keyboardType="number-pad" onChange={(pin4)=>{setpin4(pin4)}} style={{backgroundColor:"white" , marginRight:20 , width:46 , borderRadius:7, fontSize:20 , textAlign:"center" }}/>
        </View>
        <View>
          <View style={{backgroundColor:"#00e600" , margin:20 , padding:10 , width:110 , marginLeft:47 , borderRadius:10}}>
            <Text style={{marginLeft:23 , color:'white'}} onPress={() => navigation.navigate(navigationStrings.Newpassword)}>Verify</Text>
          </View>
          <Text style={{color:'#FFFFF0' , marginTop:-12}}>Didn't receive the email? <TouchableOpacity><Text style={{color:"white"}}>Resend </Text></TouchableOpacity></Text>
          
        </View>
      </View>
    </View>
  )
}