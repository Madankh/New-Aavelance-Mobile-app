import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react';
import Topheader from '../../HomeComponent/Topheader';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';

const Cart = () => {
  const navigation = useNavigation();
  const cart = useSelector(state=> state.cart);
  const products = cart?.products?.map((item)=>{
    console.log(item.products);
    console.log(cart)

  });
  const user = useSelector((state)=> state.user);
  // console.log(user.currentUser.accessToken);
  
  return (
    <>
   <ScrollView>
     <Topheader/>
      <View style={{ backgroundColor: 'black' }}>
        <View>
          <Text style={{ fontSize: 24, color: 'white', alignSelf: 'center', fontWeight: '700' }}>Your Bag</Text>
        </View>
        <View style={styles.subpart}>
         
          {/* {user.currentUser !== '' ? 
          <TouchableOpacity style={{ width: 134, backgroundColor: 'white', paddingTop: 4, marginLeft: 125, borderRadius: 10, paddingLeft: 5, paddingRight: 5, marginBottom:2 }} onPress={() => navigation.navigate(navigationStrings.ShippingInfo)}>
            <Text style={styles.text}>Continue Shopping</Text>
          </TouchableOpacity>:<Text></Text>
          } */}
        </View>
      </View>

      {cart?.products?.map((product)=>(
        <View  style={{ flexDirection: 'row' }}>
          <View>
            {product?.img?.slice(0,1).map((img)=>(
              <Image style={{ width: 150, height: 146, resizeMode: 'contain' }} source={{ uri: `${img}`}} />

            ))}
          </View>
          <View>
            <View >
              <Text style={{ color: "black", marginTop: 25, paddingLeft: 5,paddingRight:160 ,  fontWeight: '600' }}>{product?.title}</Text>
            </View>
            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              <Text style={styles.textdescription}>ID: </Text>
              <Text style={styles.textsubdescription}>{product?._id} </Text>
            </View>

            <View style={{ marginTop: 2, flexDirection: 'row' }}>
              <Text style={styles.textdescription} >Size </Text>
              {/* {product?.size?.map((item)=>( */}
                <Text style={styles.textsubdescription} >{product.size}</Text>
              {/* ))} */}
            </View>

            <View style={{ marginTop: 2, flexDirection: 'row' }}>
              <Text style={styles.textdescription} >Colors </Text>
              {/* {product?.color?.map((item)=>( */}
                <Text style={styles.textsubdescription} >{product.color} </Text>
              {/* ))} */}
            </View>
            <Text style={styles.textsubdescriptionQuantity} >Quantity : {product?.quantity} </Text>
            <View style={{ marginTop: 2, flexDirection: 'row' }}>
              <Text style={styles.textdescription} >Total Price </Text>
              <Text style={styles.textsubdescription} >NPR {product?.price * product?.quantity} </Text>
            </View>

          </View>
        </View>))}
    
    
      <View style={{ backgroundColor: "black" }}>
        <View>
          <Text style={{color: "white", fontSize: 26, alignSelf: 'center', fontWeight: '900'}}>Order Summary</Text>
          <View style={styles.ordersumflex}>
            <Text style={{ color: 'white', marginRight: 6 }}>Total price : </Text>
            <Text style={{ color: 'white' }}> NPR {cart.total}</Text>
          </View>
          <View style={styles.ordersumflex}>
            <Text style={{ color: 'white', marginRight: 6 }}>Shipping Cost : </Text>
            <Text style={{ color: 'white' }}>NPR 50</Text>
          </View>

          <View style={styles.ordersumflex}>
            <Text style={{ color: 'white', marginRight: 6, fontSize: 24, fontWeight: '900' }}>Total : </Text>
            <Text style={{ color: 'white', marginRight: 6, fontSize: 24, fontWeight: '900' }}>{cart.total + 50}</Text>
          </View>
        </View>
        {console.log(user.currentUser)}
          {user.currentUser !== null ?  
          <TouchableOpacity style={{ alignSelf: "center", backgroundColor: "white", width: 150, height:30,borderRadius: 14 , marginBottom:16 , marginTop:10 }} onPress={() => navigation.navigate(navigationStrings.ShippingInfo)} >
            <Text style={styles.text2}>Continue Shopping</Text>
          </TouchableOpacity> :<TouchableOpacity style={{ alignSelf: "center", backgroundColor: "white", width: 150, height:30,borderRadius: 14 , marginBottom:16 , marginTop:10 }} onPress={() => navigation.navigate(navigationStrings.Signin)} >
            <Text style={styles.text2}>Login</Text>
          </TouchableOpacity>
          }
        </View>

      {/* </View> */}
</ScrollView>
    </>

  )
}

export default Cart

const styles = StyleSheet.create({
  subpart: {
    flexDirection: 'row',
    paddingTop: 6
  },
  text: {
    color: 'black',
    fontWeight: '500'
  },
  ordersumflex: {
    flexDirection: 'row',
    marginTop: 4
  },
  textdescription: {
    color: 'black', fontSize: 14, fontWeight: '900', paddingLeft: 10
  },
  textsubdescription: {
    color: 'black', fontSize: 14, fontWeight: '900', paddingLeft: 4
  },
  textsubdescriptionQuantity:{
    color: 'black', fontSize: 14, fontWeight: '900', paddingLeft: 12
  },
  text1: {
    color: 'white',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5

  },
  text2: {
    color: 'black',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: "center",
    fontWeight:'600',
    marginTop:4
  }


})