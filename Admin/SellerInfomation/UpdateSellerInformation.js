import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable } from 'react-native'
import React, { useState } from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../adminNavbar/Navbar';
// import { useSelector } from 'react-redux';

const UpdateSellerInformation = (current) => {
  const [msg , setmsg] = useState('');
  const navigation = useNavigation();
  let detail = current.route.params.current
  console.log(detail);

  const [username , setUsername] = useState(`${detail.username}`);
  const [email , setemail] = useState(`${detail.email}`);
  const [phoneNumber , setphoneNumber] = useState(`${detail.phoneNumber}`)
  const [shopAddress , setshopAddress] = useState(`${detail.shopAddress}`);
  const [Post_Number , setPost_Number] = useState(`${detail.Post_Number}`);
  const [Pan_Number , setPan_Number] = useState(`${detail.Pan_Number}`)
  const [Shopname , setShopname] = useState(`${detail.shopname}`);
  const [National_id , setNational_id] = useState(`${detail.National_id}`);
  console.log({username,email,phoneNumber,shopAddress,Pan_Number,Post_Number});
  const accessToken = detail.accessToken;
  const [modalVisible, setModalVisible] = useState(false);
//   console.log(accessToken)


const handleUpdate=async()=>{
      try {
            await fetch(`http://139.162.11.30:80/api/seller/${detail._id}`, {method: 'PUT',
              headers: { 'Content-Type': 'application/json' , token : accessToken },
              body: JSON.stringify({
                  username: `${username}`, email: `${email}`, phoneNumber:`${phoneNumber}`,
                  shopAddress: `${shopAddress}`, Post_Number: `${Post_Number}`,
                  Pan_Number: `${Pan_Number}`, shopname: `${Shopname}`, National_id: `${National_id}`
              })}).then(response => {
                response.json()
                  .then(data => {
                    setmsg(data);
                    console.log(data)
                    setModalVisible(true)
                  });
              })
          }catch (error) {
            console.error(error);
          }
}

  return (
    <ScrollView >
      <Navbar/>
      <View style={{ marginTop: 20, alignSelf: 'center' }}>
        {/* <Image source={require("../Screens/assets/3f0e3480ada2c82190a17824325ecad4.jpg")} style={{ width: 80, height: 80, alignSelf: 'center', borderRadius: 500 }} /> */}
        <Text style={{ color: "black", paddingLeft: 12, marginTop: 5, fontSize: 20, fontWeight: '900'  }} >{username}</Text>
      </View>
     
      <TouchableOpacity>
        <Text style={{ color: 'black', alignSelf: "flex-end", fontSize: 20, fontWeight: '900' }} onPress={handleUpdate}>Update</Text>
      </TouchableOpacity>
      <View style={{ marginTop: -10, padding: 19 }}>
        <View >
        <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="bank"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>Username</Text>
          </View>
          <TextInput style={styles.text} onChangeText={(value)=> setUsername(value)}>{username}</TextInput>
        </View>
        <View style={{ marginTop: 10 }}>
        <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="email"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>Email</Text>
          </View>
          <TextInput style={styles.text} onChangeText={(value)=> setemail(value)}>{email}</TextInput>
        </View>
        <View style={{ marginTop: 10 }}>
        <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="numeric"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>Phone Number</Text>
          </View>
          <TextInput style={styles.text} onChangeText={(value)=> setphoneNumber(value)}>{phoneNumber}</TextInput>
        </View>
        <View style={{ marginTop: 10 }}>
        <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="google-street-view"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>Shop Address</Text>
          </View>
          <TextInput style={styles.text} onChangeText={(value)=> setshopAddress(value)}>{shopAddress}</TextInput>
        </View>
        <View >
        <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="cards-variant"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>Post Number</Text>
          </View>
          <TextInput style={styles.text} onChangeText={(value)=> setPost_Number(value)}>{Post_Number}</TextInput>
        </View>
        <View style={{ marginTop: 10 }}>
        <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="card-bulleted"
                 color="black"
                 size={20}
                />
             <Text style={styles.text}>Pan_Number</Text>
          </View>
          <TextInput style={styles.text} onChangeText={(value)=> setPan_Number(value)}>{Pan_Number}</TextInput>
        </View>
        <View style={{ marginTop: 10 }}>
        <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="shopping"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>Shopname</Text>
          </View>
          <TextInput style={styles.text} onChangeText={(value)=> setShopname(value)}>{Shopname}</TextInput>
        </View>
        <View style={{ marginTop: 10 }}>
        <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="card-account-details-outline"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>National_Id</Text>
          </View>
          <TextInput style={styles.text} onChangeText={(value)=> setNational_id(value)}>{National_id}</TextInput>
        </View>
        
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

    </ScrollView>
  )
}

export default UpdateSellerInformation;

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
    color: 'black',
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


