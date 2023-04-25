import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icons from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import navigationStrings from '../../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Productlist() {
  const [Products, setProducts] = useState([]);

  const seller = useSelector((state) => state.seller);
  let accessToken = seller.currentSeller.accessToken;

  const handleDelete = (_id) => {
    setProducts(Products.filter((item) => item._id !== _id))
    axios.delete(`http://139.162.11.30:80/api/products/${_id}`, {
      headers: {
        token: accessToken
      }
    });
  };
  const navigation = useNavigation();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://139.162.11.30:80/api/products/allpro", {
          headers: {
            token: accessToken
          }
        });
        setProducts(res.data)
      } catch (error) {

      }
    }
    getProducts();
  }, [0])

  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: 'black' }}>
          <Text style={{ alignSelf: 'center', fontSize: 24, fontWeight: '900' , color:"white" }}>Your Products</Text>
          {Products.map((item) => (
            <TouchableOpacity key={item._id}>
              <View style={{ flexDirection: 'row', padding: 10, marginTop: 10 , backgroundColor:"black" }}>
                {item?.img?.slice(0,1).map((img)=>(
                  <Image source={{ uri: `${img}` }} style={{ height: 100 , width: 80 , objectFit: 'contain'}}/>
                ))}
                <View style={{ marginLeft: 10, width: 280 }}>
                  <Text style={{marginBottom:3 , color:'white' , fontSize:17 , fontWeight:"700"}}>{item.title.slice(0, 60)} </Text>
                  <Text style={{marginBottom:3 , color:'white'}}>{item?.desc?.slice(0 , 100)}</Text>
                  <Text style={{marginBottom:3 , color:'white'}}>Stock : {item.Stock}</Text>
                  <Text style={{marginBottom:3 , color:'white'}}>Price : {item.price}</Text>

                  <View style={{  flexDirection: 'row', marginTop: 0, marginLeft: -4 }}>
                        {
                            maxRating.map((itemss, key) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.7} key={itemss}>
                                        <Image style={{ width: 25, height: 18, resizeMode: 'contain', marginBottom: 10 }} source={itemss <= item.ratings ? { uri: starImgFilled } : { uri: starImgCorner }} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 170,
                      justifyContent: 'space-evenly',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(navigationStrings.ProductUpdate , {item})}
                      style={{
                        backgroundColor: 'royalblue',
                        paddingLeft: 26,
                        paddingRight: 26,
                        paddingTop:6,
                        paddingBottom:6,
                        marginRight:18,
                        borderRadius: 10
                      }}>
                      <Text style={{ color: 'white', fontWeight: '500' }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item._id)}  >
                      <Image source={require("../../Images/delete.png")} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>


            </TouchableOpacity>


          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
