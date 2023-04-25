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
        const res = await axios.get("http://139.162.11.30:80/api/order/get/proccessing/userOrders", {
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
    <SafeAreaView style={{ flex: 1 }}>
    <Navbar />
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={{ backgroundColor: 'black' }}>
        <Text style={{ alignSelf: 'center', fontSize: 24, fontWeight: '900', color: 'white', marginTop: 20 }}>
          Pending orders
        </Text>
        {Products.length !== 0 ?
          Products.map((items) => (
            <TouchableOpacity key={items._id} activeOpacity={0.7} onPress={() => navigation.navigate(navigationStrings.ChangeorderStatus, { items })}>
              <View style={{ backgroundColor: 'white', marginTop: 10, borderRadius: 10, padding: 10 }}>
                {items.orderItems.map((item) => (
                  <View key={item._id} style={{ flexDirection: 'row', padding: 10 }}>
                    <FastImage source={{ uri: item.imgKey[0] }} style={{ height: 100, width: 80, marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ marginBottom: 3, color: 'black', fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
                      {item.color.length !== 0 &&
                        <Text style={{ marginBottom: 3, color: 'gray' }}>Color: {item.color}</Text>
                      }
                      {item.size.length !== 0 &&
                        <Text style={{ marginBottom: 3, color: 'gray' }}>Size: {item.size}</Text>
                      }
                      <Text style={{ marginBottom: 3, color: 'gray' }}>Quantity: {item.quantity}</Text>
                      <Text style={{ marginBottom: 3, color: 'gray' }}>Price: {item.price}</Text>
                      <Text style={{ marginBottom: 3, color: 'gray' }}>Order Status: {items.orderStatus}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          )) :
          <Text style={{ color: 'black', marginTop: 20, alignSelf: 'center' }}>Sorry, you don't have any Pending Orders</Text>
        }
      </View>
    </ScrollView>
  </SafeAreaView>
  
  );
}
