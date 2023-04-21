import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import Icon1 from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Navbar from '../../adminNavbar/Navbar';
import axios from 'axios';


const UpdateSellerBankAccount = () => {
  const seller = useSelector((state) => state.seller);
  let current = seller?.currentSeller;
  let accessToken = current?.accessToken;
  const [account, setaccount] = useState([]);
  useEffect(() => {
        const getaccount = async () => {
              try {
                    const res = await axios.get(`http://192.168.18.4:5000/api/bankaccout/accountdetail`, {
          headers: {
            token: accessToken
          }
        })
        setaccount(res.data);
      } catch (error) {

      }
    }
    getaccount();
  }, [])
  let objectBank;
  let retrive = account.map((item)=>{
        objectBank = item;
    })
  const [BankName , setBankName] = useState('');
  const [accountNumber , setbank_account_number] = useState();
  const [BankAddress , setbank_address] = useState('');
  const [accountName , setbank_accountName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [msg , setmsg]=useState('');

//   console.log(objectBank?.BankAddress)

  const handleCreate = async()=>{
    try {
      await fetch(
        `http://192.168.18.4:5000/api/bankaccout/${current._id}`, {method: 'PUT',
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
              setmsg(data);
              setModalVisible(true)
            });
        })
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView>
      <Navbar/>
      <View>
        <View>
          {seller.currentSeller !== null ?
            <View>
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
      </View>
      <TouchableOpacity style={styles.logoutstyle} onPress={handleCreate}>
        <Text style={styles.logoutText}>Update</Text>
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

    </ScrollView>
  )
}

export default UpdateSellerBankAccount

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