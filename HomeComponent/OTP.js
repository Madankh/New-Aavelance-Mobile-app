import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Topheader from "../HomeComponent/Topheader"
import { TextInput } from 'react-native'
import { useRef } from 'react'
import navigationStrings from '../constants/navigationStrings'
import { useNavigation } from '@react-navigation/native';
import { VerifyUser } from '../redux/apiCalls'
import { useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native'

export default function OTP(userdetail) {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  
  const [pin1 , setpin1] = useState(null);
  const [pin2 , setpin2] = useState(null);
  const [pin3 , setpin3] = useState(null);
  const [pin4 , setpin4] = useState(null);

  // console.log(pin1 , pin2 , pin3 , pin4);
  const val = [pin1 , pin2 , pin3 , pin4];
  console.log(OTP);
  // {if(isObjValid(OTP)){
    let OTP = '';
    Object.values(val).forEach(v=>{
      OTP += v
    })
  // }};

  console.log(OTP)
  const user = userdetail?.route?.params?.currentUser?.user;
  const handleClick = ()=>{
    VerifyUser(dispatch , {user:user , OTP:OTP});
    
  }
  return (
    <View style={{backgroundColor:'black' , height:"100%"}}>
      <Topheader/>
      <View style={{alignItems:"center" , marginTop:190}}>
        <Text style={{fontSize:22 , color:'#FFFFF0'}}>Verify Your Email</Text>
        <Text style={{fontSize:12 , color:'white'}}>Please enter 4-digit code sent to your email</Text>
        <View style={{flexDirection:'row' , marginTop:15 , marginLeft:20 }}>
          <TextInput maxLength={1} keyboardType="number-pad" ref={pin1Ref} onChangeText={(pin1)=>{
            setpin1(pin1)
            if(pin1Ref !== null){
              pin2Ref.current.focus()
            }
          }}
           style={{backgroundColor:"white" ,color:"black" , marginRight:20 , width:46 , borderRadius:7 , fontSize:20 , textAlign:"center"  }}/>
          <TextInput ref={pin2Ref} maxLength={1} keyboardType="number-pad" onChangeText={(pin2)=>{ 
            setpin2(pin2)
            console.log(pin2)
            if(pin2 !==null){
              pin3Ref.current.focus()
            }
          }} style={{backgroundColor:"white" , marginRight:20 , width:46 , borderRadius:7 , fontSize:20 , textAlign:"center" }}/>
          <TextInput ref={pin3Ref} maxLength={1} keyboardType="number-pad" onChangeText={(pin3)=>{
            setpin3(pin3)
            if(pin3Ref !== null){
              pin4Ref.current.focus()
            }
            }} style={{backgroundColor:"white" , marginRight:20 , width:46 , borderRadius:7, fontSize:20 , textAlign:"center" }}/>
          <TextInput ref={pin4Ref} maxLength={1} keyboardType="number-pad" onChangeText={(pin4)=>{setpin4(pin4)}} style={{backgroundColor:"white" , marginRight:20 , width:46 , borderRadius:7, fontSize:20 , textAlign:"center" }}/>
        </View>
        <View>
          <TouchableOpacity style={{backgroundColor:"#00e600" , margin:20 , padding:10 , width:110 , marginLeft:47 , borderRadius:10}} onPress={handleClick}>
            <Text style={{marginLeft:23 , color:'white'}} >Verify</Text>
          </TouchableOpacity>
          <Text style={{color:'#FFFFF0' , marginTop:-12}}>Didn't receive the email? Resend</Text>
        </View>
      </View>
    </View>
  )
}