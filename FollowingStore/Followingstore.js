import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings';
import { useSelector } from 'react-redux';
import Topheader from '../HomeComponent/Topheader';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Followingstore(following) {
  const navigation = useNavigation();
  const user = useSelector((state)=> state.user);

  const [users , setusers] = useState([]);

      let userid = user?.currentUser?.others?._id;
      useEffect(() => {
            const getusers = async () => {
              try {
                const res = await axios.get(`http://139.162.11.30:80/api/user/following/${userid}`)
                setusers(res.data);
              } catch (error) {
        
              }
            };
            getusers()
          }, []);

  return (
    <>
      <SafeAreaView>
        <Topheader/>
        <Text style={{marginLeft:140 , marginTop:10 , fontSize:17, color:"black" , fontWeight:"600"}}>Your Followings</Text>
        {users?.map((item)=>(
        <View>
            <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Image
                source={require('../Screens/assets/3f0e3480ada2c82190a17824325ecad4.jpg')}
                style={{width: 40, height: 40, borderRadius: 500}}
                />
              <Text style={{marginLeft: 10, fontSize: 17, fontWeight: '600'}}>
                {`${item.shopname}`}
              </Text>
              <TouchableOpacity style={{marginLeft:110 , backgroundColor:"black" , paddingLeft:10 , paddingRight:14 , paddingTop:5, paddingBottom:5 , borderRadius:10}}><Text style={{color:"white"}}
              onPress={() => navigation.navigate(navigationStrings.ProductPage , item)}>Go in seller page</Text></TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
       ))}
      </SafeAreaView>
    </>
  );
}
