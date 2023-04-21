import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import navigationStrings from '../../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from '../adminNavbar/Navbar';
import FastImage from 'react-native-fast-image';

export default function Productlist() {
  const seller = useSelector((state) => state.seller);
  let accessToken = seller.currentSeller.accessToken;
  const navigation = useNavigation();
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://192.168.18.4:5000/api/order/get/proccessing/userOrders", {
          headers: {
            token: accessToken
          }
        });
        setProducts(res.data)
      } catch (error) {

      }
    }
    getProducts();
  }, [Products?.length])

 console.log(Products)

  return (
    <SafeAreaView>
      <Navbar/>
      <ScrollView>
        <View style={{ backgroundColor: 'black' }}>
          <Text style={{ alignSelf: 'center', fontSize: 24, fontWeight: '900' , color:"white" }}>
            Pending orders
          </Text>
          {Products.length !== 0 ?
          Products?.map((items) => (
            <TouchableOpacity key={items._id}>
              <View>
                {items?.orderItems?.map((item)=>(
                  
                  <View style={{ flexDirection: 'row', padding: 10, marginTop: 10 }}>
                    {item.imgKey.slice(0,1).map((img)=>(
                      <FastImage source={{ uri: `${img}` }} style={{ height: 100 , width: 80}}/>

                    ))}

                <View style={{ marginLeft: 4, width: 280 }}>
                  <Text style={{marginBottom:3 , color:'white'}}>{item.title}</Text>
                  {item?.color.length !== 0  ?
                  <Text style={{marginBottom:3 , color:'white'}}>Color : {item.color} </Text>:""
                   }
                   {item.size.length !== 0 ? 
                  <Text style={{marginBottom:3 , color:'white'}}>Size : {item.size} </Text> : ""
                   }
                  <Text style={{marginBottom:3 , color:'white'}}>Quantity : {item?.quantity}</Text>
                  <Text style={{marginBottom:3 , color:'white'}}>Price : {item?.price}</Text>
                  <Text style={{marginBottom:3 , color:'white'}}>orderStatus : {items.orderStatus}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 0,
                      justifyContent: 'space-evenly',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(navigationStrings.ChangeorderStatus , {items})}
                      style={{
                        backgroundColor: 'royalblue',
                        paddingLeft: 27,
                        paddingRight: 27,
                        marginLeft:-200,
                        paddingTop:5,
                        paddingBottom:5,
                        borderRadius: 10,

                      }}>
                      <Text style={{ color: 'white', fontWeight: '500' }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                </View>
                ))}
              </View>
            </TouchableOpacity>
          )):
          <Text style={{color:"black"}}>Sorry you don't have any Pending Orders</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
