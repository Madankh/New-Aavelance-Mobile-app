import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable , Modal } from 'react-native'
import React from 'react'
import navigationStrings from '../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function SellerForgotpassword() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [msg , setmsg]=useState('');
  const [email , setEmail] = useState('');

  const handleSend = async()=>{
    await fetch(`http://139.162.11.30:80/api/seller/forgetpassword` , {method:"POST", headers:{ 'Content-Type': 'application/json'},
    body: JSON.stringify({email:email})}).then(response => {
      response.json()
      .then(data => {
        console.log(data)
        setmsg(data);
        setModalVisible(true)
        });
    })
   
  }
  return (
    <View>
      <Text style={{fontSize:22 , alignSelf:'center'  , marginTop:10 , marginBottom:10 , fontWeight:'800'}}>Enter seller email address</Text>
      <TextInput placeholder='Enter your email' onChangeText={(value)=> setEmail(value)} placeholderTextColor={"white"} style={{backgroundColor:'black' , color:'white' , marginRight:10 , marginLeft:10 , borderRadius:10}}></TextInput>
      <TouchableOpacity onPress={handleSend} style={{alignSelf:'flex-end' , width:100 , backgroundColor:'black' , marginTop:10 , padding:6, marginRight:10 , borderRadius:10}}>
          <Text style={{color:'white' , alignSelf:'center' }}>Send</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{`${msg}`}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Oky</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    paddingLeft:50,
    paddingRight:50,
    marginTop:20,
    
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign:"left"
  }
});