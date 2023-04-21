import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal ,Pressable } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {ModalPicker} from './ModalPicker'
export default function ShippingInfo() {
    const cart = useSelector(state=> state.cart);
    const products = cart.products.map((item)=>{
      console.log(item.product);
    });
    const user = useSelector((state)=> state.user);
    let accessToken = user.currentUser.accessToken;
    console.log(accessToken)
    const [chooseData , setchooseData] = useState('Select payment methods')
    const [address, setAddress] = useState('');
    const [address_2, setAddress_2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [PaymentMethods, setPaymentMethods] = useState('');
    const [return_order_reason , setreturn_order_reason] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [msg , setmsg]=useState('');

    const [isModalVisible, setisModalVisible] = useState(false);
    const changeModalVisibility = (bool)=>{
        setisModalVisible(bool)
    }

    const setData = (option)=>{
      setchooseData(option);
    }

console.log(PaymentMethods)

    const handleCreate = async()=>{
      console.log(cart.products[0])
      {for (let i = 0; i < cart.products.length; i++) {
          try {
             await fetch('http://192.168.18.4:5000/api/order', {method: 'POST',
              headers: { 'Content-Type': 'application/json' , token : accessToken },
              body: JSON.stringify({
                shippingInfo:{
                  address:`${address}`,
                  address_2:`${address_2}`,
                  city:`${city}`,
                  state:`${state}`,
                  pinCode:`${pinCode}`,
                  phone_Number:phoneNo,
                  country:"Nepal",
                }, 
                orderItems:cart.products[i],
                Total_amount:`${cart.total + 60}`,
                PaymentMethods:`${chooseData}`,
                return_order_reason:`${return_order_reason}`,
                shipping_price:50,
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
          
      }}

      }

  return (
      <ScrollView>
    <View style={{backgroundColor:"black" , marginTop:-100 , paddingBottom:20}}>
      <Text>Shipping Details</Text>
     <View style={styles.BottomView}>
       <Text style={styles.heading}>Shipping Details</Text>
       <View style={styles.formView}>
         <TextInput style={styles.textInput} placeholder={"Address"} placeholderTextColor={'white'}  onChangeText={(value)=> setAddress(value)}  />
         <TextInput style={styles.textInput} placeholder={"Address_2"} placeholderTextColor={'white'} onChangeText={(value)=> setAddress_2(value)} />
         <TextInput style={styles.textInput} placeholder={"City"} placeholderTextColor={'white'}  onChangeText={(value)=> setCity(value)} />
         <TextInput style={styles.textInput} placeholder={"Pin Code"} placeholderTextColor={'white'} onChangeText={(value)=> setPinCode(value)} />
         <TextInput style={styles.textInput} placeholder={"Phone Number"} placeholderTextColor={'white'} onChangeText={(value)=> setPhoneNo(value)} />
         <TextInput style={styles.textInput} placeholder={"State"} placeholderTextColor={'white'} onChangeText={(value)=> setState(value)}  />
         <Text>Payment methods</Text>
         <TouchableOpacity style={{backgroundColor:"white"  , width:'90%' , paddingTop:10, paddingBottom:10 , paddingLeft:10 , paddingRight:10 , borderRadius:10}}
         onPress={()=> changeModalVisibility(true)}>
             <Text style={{color:"black"}}>{chooseData}</Text>
         </TouchableOpacity>

         <Modal transparent={true} animationType='fade'
           visible={isModalVisible} nRequestClose={()=>changeModalVisibility(false)}>
           <ModalPicker changeModalVisibility={changeModalVisibility}
           setData={setData}/>
         </Modal>


         <TouchableOpacity style={styles.buttonlog} onPress={handleCreate}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>Order Complete</Text>
         </TouchableOpacity>
       </View>
     </View>
   {/* </View> */}
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

const styles = StyleSheet.create({
    TopView: {
      width: '100%',
      height: 150,
      backgroundColor:'black'
  
    },
    BottomView: {
    //   width: '100%',
    //   height: 700,
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
      width:600,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 112,
      marginTop:20,
      marginRight:10,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#fff',
      
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
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