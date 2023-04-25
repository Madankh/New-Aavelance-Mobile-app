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


export default function Subcategories4() {
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
        const res = await axios.get(`http://139.162.11.30:80/api/post/getallpost?category=Men's Fashion`)
        setPosts(res.data);
      } catch (error) {

      }
    }
    getPosts();
  }, [])

console.log(products)
  return (
    <View style={{ backgroundColor: 'white', marginTop: 20 }}>

      <Text style={styles.text}>Kids Product</Text>

      <ScrollView >
        <View style={styles.submain} flexWrap='wrap'> 
          {products?.slice(0,20).map((items) => (
            <ProductContainerForHome item={items}/>

          ))}
        </View>
        </ScrollView>

        {Posts.length !== 0 ?
        <View>
          <Text style={styles.text}>User Post</Text>
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
    width: '100%',
    color: 'black',
    fontSize: 22,
    marginTop: 16,
    padding: 3,
    marginBottom: 14,
    backgroundColor: 'white',
    fontWeight: '900',
    marginLeft: 6
  },
  text2: {
    color: 'black',
    fontSize: 17,
    fontWeight: '900',
    marginLeft: 8,
    marginTop: 4,
    marginBottom: 4
  },
  img: {
    width: '90%', height: 139,marginLeft:10, borderRadius: 1, marginTop:10,  resizeMode: 'contain'
  },
  text1: {
    color: 'black',
    width: 166,
    marginLeft: 10,
    fontSize:12
  },
  submain: {
    flexDirection: 'row'
  },
  submainpost:{
    flexDirection:"row",
    backgroundColor:"black"
  },
  subchild: {
    marginRight: -0
  }
})