import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Pressable, Modal } from 'react-native'
import React, {  useState } from 'react';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Navbar from '../../adminNavbar/Navbar';

const SellerUpdatePassword = () => {
  const navigation = useNavigation();
  const seller = useSelector((state) => state.seller);
  const [msg , setmsg]=useState('');
  const [oldpassword , setoldpassword] = useState();
  const [newPassword , setnewPassword] = useState();
  const [comfirmPassword , setcomfirmPassword] = useState();
  let accessToken = seller?.currentSeller?.accessToken;

  let current = seller.currentSeller;
  const [modalVisible, setModalVisible] = useState(false);

const updatepass = async()=>{
    await fetch(`http://192.168.18.4:5000/api/seller/update/password/${current._id}`, {method: 'PUT',
      headers: { 'Content-Type': 'application/json' , token : accessToken },
      body: JSON.stringify({
        oldpassword: `${oldpassword}`, newPassword: `${newPassword}`, comfirmPassword:`${comfirmPassword}`
      })}).then(response => {
        response.json()
          .then(data => {
            setModalVisible(true);
            setmsg(data)
          });
      })
}


  return (
    <View>
      <Navbar/>
      <View style={{ marginTop: -10, padding: 19 }}>
        <View >
          <View style={{flexDirection:'row'}}>
            <Icon2 style={{ paddingLeft: -1, marginRight: 5 }}
              name="user"
              color="black"
              size={20}
            />
            <Text style={styles.text}>Current Password</Text>
          </View>
          <TextInput style={styles.text} placeholder={"Current Password"} onChangeText={(value)=> setoldpassword(value)}/>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row' }}>
          <Icons style={{ paddingLeft: -1, marginRight: 5 }}
              name="security"
              color="black"
              size={20}
            />
            <Text style={styles.text}>New Password</Text>
          </View>
          <TextInput style={styles.text} placeholder={"New Password"} onChangeText={(value)=> setnewPassword(value)}/>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row' }}>
          <Icons style={{ paddingLeft: -1, marginRight: 5 }}
              name="security"
              color="black"
              size={20}
            />
            <Text style={styles.text}>Comform Password</Text>
          </View>
          <TextInput style={styles.text} placeholder={"Comform Password"} onChangeText={(value)=> setcomfirmPassword(value)}/>
        </View>
 
      </View>
      <TouchableOpacity style={styles.logoutstyle}>
        <Text style={styles.logoutText} onPress={updatepass}>Update Password</Text>
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

export default SellerUpdatePassword

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

