import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings';
import { sellerlogin } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';



export default function SellerSignin() {
  const seller = useSelector((state)=> state.seller);
  const {isFetching , error} = useSelector((state) => state.seller);
  const [email , setEmail] = useState('');
  const [password , setpassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log(seller);

useEffect(() => {
  if(seller.currentSeller !==null){
    navigation.navigate(navigationStrings.Home , seller ) 
  }else{
    console.log("Error")
  }
  
}, [seller])

  const handleClick = ()=>{
    sellerlogin(dispatch , {email , password});
  }

 

  return (
    <ScrollView>
    <View style={styles.mainView}>
     
      <View style={styles.BottomView}>
        <Text style={styles.heading}>Seller Login</Text>
        <View style={styles.formView}>
          <TextInput style={styles.textInput} placeholder={"Email address"} placeholderTextColor={'white'}  onChangeText={(value)=> setEmail(value)} />
          <TextInput style={styles.textInput} secureTextEntry={true} placeholder={"**********"} placeholderTextColor={'white'} onChangeText={(value)=> setpassword(value)} />
          <TouchableOpacity style={styles.buttonlog} 
          onPress={handleClick}
          >
              <Text style={styles.text}  >Login</Text>
          </TouchableOpacity>
          {error?.errors ? '':
          <Text style={{color:'red' , marginTop:10}}>{seller?.error}</Text>         
          }
          {error?.errors?.length <= 2 ? 
           error?.errors?.map((item)=>(
            <Text style={{color:'red' , marginTop:10 , textAlign:"left"}} key={item.param}>{item.msg}</Text> 
            ))
          :''}
         
          

          <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.SellerForgotpassword)}>
            <Text style={{ color: '#fff', marginTop: 19, fontSize: 17, fontWeight: '400' }}>Forgot password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonlog} onPress={() => navigation.navigate(navigationStrings.SellerSignup)}>
           <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>Create seller account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  TopView: {
    width: '100%',
    height: 150,
    backgroundColor:'black'

  },
  BottomView: {
    width: '100%',
    height: 700,
    backgroundColor: "#000",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
  },
  heading: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 140,
    marginLeft: 80
  },
  formView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40
  },
  textInput: {
    width: '90%',
    borderWidth: 1,
    borderColor: "#fff",
    height: 53,
    borderRadius: 10,
    color: "white",
    paddingLeft: 10,
    marginTop: 25
  },
  buttonlog: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 112,
    marginTop:20,
    marginRight:10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    width:400
    
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
})