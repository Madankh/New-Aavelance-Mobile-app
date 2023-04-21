import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import navigationStrings from '../constants/navigationStrings';
import { publicRequest } from '../redux/requestMethod';
import FeedPost from './FeedPost';
import FastImage from 'react-native-fast-image';
import ProductContainerForHome from './ProductContainerForHome';

const Shoes = [
  {
    id:1,
    image: "https://m.media-amazon.com/images/I/61FbqzPD8TL._AC_UX395_.jpg",
    text: "Razer Kraken X Ultralight Gaming Headset: 7.1 Surround Sound - Lightweight Aluminum Frame"
  },
  {
    id:2,
    image: "https://m.media-amazon.com/images/I/71TVdvh2uNL._AC_UX395_.jpg",
    text: "Razer Kraken X Ultralight Gaming Headset: 7.1 Surround Sound - Lightweight Aluminum Frame"
  },
  {
    id:3,
    image: "https://m.media-amazon.com/images/I/81njBAbrSPL._AC_UX395_.jpg",
    text: "LG Gram 14Z90P Laptop 14 Ultra-Lightweight, IPS WUXGA (1920 x 1200), Intel Evo 11th gen CORE i7 , 16GB RAM,"
  },
  {
    id:4,
    image: "https://m.media-amazon.com/images/I/81L8xflDwOL._AC_UX395_.jpg",
    text: "Razer Kraken X Ultralight Gaming Headset: 7.1 Surround Sound - Lightweight Aluminum Frame"
  },
]

export default function Subcategories3() {
  const user = useSelector((state)=> state.user);
  const navigation = useNavigation();
  const [products , setProduct]= useState([]);

  const [maxRating , setmaxRating] = useState([1 , 2 , 3 , 4 , 5]);

  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

  useEffect(() => {
    const getProducts = async ()=>{
      try {
        const res = await publicRequest.get("/products/getallProduct?category=Women's Fashion")
        setProduct(res.data)
      } catch (error) {
        
      }
    }
    getProducts();
  }, [0])

  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`http://192.168.18.4:5000/api/post/getallpost?category=Women's Fashion`)
        setPosts(res.data);
      } catch (error) {

      }
    }
    getPosts();
  }, [])


  return (
    <View style={{ backgroundColor: 'gray', marginTop: 10, marginLeft:2 , marginRight:2 , borderRadius:10 }}>

      <Text style={styles.text}>Women's Fashion</Text>

      <ScrollView style={{marginLeft:3 , marginTop:-10}}>
        <View style={styles.submain} flexWrap='wrap'>
          {products.slice(0,10).map((items) => (
            <ProductContainerForHome item={items}/>

          ))}
        </View>
        </ScrollView>

        {Posts.length !== 0 ?
        <View> 
          <ScrollView horizontal >
            <View style={styles.submainpost}>
            {Posts.map((item) => (
            (!item?.video ?
            <FeedPost post={item}/>:"")
          ))}
            </View>
    
          </ScrollView>
          </View>
       :""}

    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    width: '97%',
    color: 'white',
    fontSize: 22,
    marginTop: 16,
    padding: 3,
    marginBottom: 14,
    backgroundColor: 'black',
    fontWeight: '900',
    marginLeft: 6,
    borderRadius:3
  },
  text2: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    marginTop: -4,
    marginBottom: 4
  },
  img: {
    width: '90%', height: 139,marginLeft:10, borderRadius: 1, marginTop:10,  resizeMode: 'contain'
  },
  text1: {
    color: 'black',
    width: 166,
    marginLeft: 10,
    fontSize:13
  },
  submain: {
    flexDirection:"row",

  },
  submainpost:{
    flexDirection:"row",
    backgroundColor:"black",
    margin:4,
    borderRadius:5
  },
  subchild: {
    marginRight: -0
  }
})