import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import Icon1 from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Address from 'react-native-vector-icons/Entypo'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Topheader from '../HomeComponent/Topheader';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';

const UpdateProfile = (current) => {
  const navigation = useNavigation();
  let detail = current?.route?.params?.current
  let id = detail?._id;
  const User = useSelector((state) => state.user);
  let accessToken = User?.currentUser?.accessToken;
  const name = User?.currentUser?.others?.username
  

  const [username , setusername] = useState(detail?.username);
  const [email , setemail] = useState(detail?.email);
  const [phoneNumber , setphoneNumber] = useState(detail?.phoneNumber);
  const [address , setaddress] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [msg , setmsg]=useState('');

  const handleUpdate = async()=>{
    await fetch(
      `http://192.168.18.4:5000/api/user/${id}`, {method: 'PUT',
      headers: { 'Content-Type': 'application/json' , token : accessToken },
      body: JSON.stringify({
        username: `${username}`, email: `${email}`, phoneNumber:`${phoneNumber}`,
        address: `${address}`
      })})
      .then(response => {
        response.json()
        .then(data => {
          setmsg(data);
          console.log(data)
          setModalVisible(true)
          });
      })
    console.log("da")
    }
  
    

  return (
    <View >
      <Topheader/>
      <View style={{ marginTop: 20, alignSelf: 'center' }}>
        <Image source={require("../Screens/assets/photo-1612817288484-6f916006741a.jpg")} style={{ width: 500, height: 60, alignSelf: 'center', borderRadius: 10 }} />
        <Text style={{ color: "black", paddingLeft: 12, marginTop: 5, fontSize: 20, fontWeight: '900' , marginLeft:"50%" }} >{name}</Text>
      </View>
     
      
      <View style={{ marginTop: -10, padding: 19 }}>
        <View >
        <View style={{flexDirection:'row'}}>
            <Icon2 style={{ paddingLeft: -1, marginRight: 5 }}
              name="user"
              color="black"
              size={20}
            />
            <Text style={styles.text}>Username</Text>
          </View>
          <TextInput style={styles.text} placeholder={"Username"} onChangeText={(value)=> setusername(value)}/>
        </View>
        <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
            <Icons style={{ paddingLeft: -1, marginRight: 5 }}
              name="email-edit-outline"
              color="black"
              size={20}
            />
            <Text style={styles.text}>Email</Text>
          </View>
          <TextInput style={styles.text} placeholder={"email"} onChangeText={(value)=>setemail(value)}/>
        </View>
        <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
            <Icons style={{ paddingLeft: -1, marginRight: 5 }}
              name="phone"
              color="black"
              size={20}
            />
            <Text style={styles.text}>Phone Number</Text>
          </View>
          <TextInput style={styles.text} placeholder={"phone number"} onChangeText={(value)=>setphoneNumber(value)}/>
        </View>
        <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
            <Address style={{ paddingLeft: -1, marginRight: 5 }}
              name="address"
              color="black"
              size={20}
            />
            <Text style={styles.text}>Address</Text>
          </View>
          <TextInput style={styles.text} placeholder={"address"} onChangeText={(value)=> setaddress(value)}/>
        </View>
        
      <TouchableOpacity onPress={handleUpdate} style={{backgroundColor:"black" , paddingTop:2, paddingBottom:5 , borderRadius:3 , marginLeft:-20, marginRight:-20 }}>
        <Text style={{ color: 'white',alignSelf:'center', fontSize: 20 }}>Update</Text>
      </TouchableOpacity>
      </View>

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

export default UpdateProfile

const styles = StyleSheet.create({
  touchbutton: {
    backgroundColor: 'white',
    paddingLeft: 7,
    paddingRight: 6,
    marginBottom: 15,
    borderRadius: 12,
    flexDirection:'row',
    alignItems:'center',

  },
  text: {
    color: 'black'
  },
  text1: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600'
  },
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
})