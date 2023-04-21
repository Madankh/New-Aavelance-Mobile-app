import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react';
import Icon1 from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Topheader from '../../../HomeComponent/Topheader';



const UserBankAccount = () => {
  const navigation = useNavigation();

  let userDetails = useSelector(state => state.user)
  let accessToken = userDetails?.currentUser?.accessToken;
  const id = userDetails?.currentUser?.others?._id
  console.log(accessToken , "accessToken")
  // const seller = useSelector((state) => state.seller);
  let current = userDetails?.currentUser;

  const [BankName , setBankName] = useState('');
  const [accountNumber , setbank_account_number] = useState('');
  const [BankAddress , setbank_address] = useState('');
  const [accountName , setbank_accountName] = useState('');


  const handleCreate = async()=>{
    try {
      await fetch(
        'http://192.168.18.4:5000/api/influencer/bank/create/bank/account', {method: 'POST',
        headers: { 'Content-Type': 'application/json' , token : accessToken },
        body: JSON.stringify({
         
          BankName:`${BankName}`,
          accountNumber:accountNumber,
          BankAddress:`${BankAddress}`,
          accountName:`${accountName}`,
        })})
        .then(response => {
          response.json()
            .then(data => {
              if(data.success !== true){
                console.log(data)
              }else{
                console.log("sUCCESS")

              }
            });
        })
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <Topheader/>
      <ScrollView>
        <View>
          {userDetails?.currentUser !== null ?
            <View>
              <TouchableOpacity style={{marginLeft:'80%',paddingLeft:4, paddingTop:5 , paddingBottom:5 , marginTop:10 , backgroundColor:"black"}}><Text style={{color:"white" , marginLeft:30}}>Done</Text></TouchableOpacity>
              <Text>Bank Account Details</Text>
              <View style={{  marginTop:10 }}>
                <View style={{flexDirection:'row' , alignItems:'center'}}>
                <Icons style={{ paddingLeft: 10, marginRight: 5 }}
                 name="bank"
                 color="black"
                 size={20}
                />
                <Text  style={{ marginLeft: 0 , color:"black" }}>Bank Name :</Text>
                </View>
                <TextInput style={styles.text} onChangeText={(value)=> setBankName(value)} ></TextInput>
              </View>

              <View style={{  marginTop:10  }}>
                <View style={{flexDirection:'row' , alignItems:'center'}}>
                <Icons style={{ paddingLeft: 10, marginRight: 5 }}
                 name="numeric"
                 color="black"
                 size={20}
                />
                  <Text style={{ marginLeft: 0 , color:"black" }}>Bank Account num :</Text>
                </View>
                <TextInput style={styles.text} onChangeText={(value)=> setbank_account_number(value)}></TextInput>
              </View>

              <View style={{  marginTop:10  }}>
                <View style={{flexDirection:'row' , alignItems:'center'}}>
                <Icon1 style={{ paddingLeft: 10, marginRight: 5 }}
                 name="address"
                 color="black"
                 size={20}
                />
                  <Text style={{ marginLeft: 0 , color:"black" }}>Bank address :</Text>
                </View>
                <TextInput style={styles.text} onChangeText={(value)=> setbank_address(value)}></TextInput>
              </View>

              <View style={{   marginTop:10  }}>
                <View style={{flexDirection:'row' , alignItems:'center'}}>
                <Icons style={{ paddingLeft: 10, marginRight: 5 }}
                 name="rename-box"
                 color="black"
                 size={20}
                />
                  <Text style={{ marginLeft: 0 , color:"black" }}>Bank Account Name :</Text>
                </View>
                <TextInput style={styles.text} onChangeText={(value)=> setbank_accountName(value)}></TextInput>
              </View>
            </View>
            : <View>
              <Text>Add bank details</Text>
            </View>
          }
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.logoutstyle} onPress={handleCreate}>
        <Text style={styles.logoutText}>Add Bank Details</Text>
      </TouchableOpacity>

    </View>
  )
}

export default UserBankAccount

const styles = StyleSheet.create({
  touchbutton: {
    backgroundColor: 'white',
    paddingLeft: 7,
    paddingRight: 6,
    marginBottom: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',

  },
  text: {
    color: 'black'
  },
  text1: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600'
  },
  logoutstyle: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10
  },
  logoutText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 17
  }
})