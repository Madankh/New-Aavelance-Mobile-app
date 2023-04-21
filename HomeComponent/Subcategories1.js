import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import navigationStrings from '../constants/navigationStrings';
import { publicRequest } from '../redux/requestMethod';
import FastImage  from 'react-native-fast-image';
import ProductContainerForHome from './ProductContainerForHome';
import FeedPost from './FeedPost';

const Beauty = [
  {
    id: 1,
    image: "https://m.media-amazon.com/images/I/51DV4vg1TEL._SL1500_.jpg",
    text: "Meaningful Beauty 5-Piece Starter Kit, Gift Set, various color"
  },
  {
    id: 2,
    image: "https://m.media-amazon.com/images/I/41UpNnuT6-L._SL1400_.jpg",
    text: "Finishing Touch Flawless Women's Painless Hair Remover , White/Rose Gold"
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/61nD93IEBKL._SL1500_.jpg",
    text: "TruSkin Vitamin C Serum for Face, Anti Aging Serum with Hyaluronic Acid, Vitamin E, Organic Aloe Vera"
  },
  {
    id: 4,
    image: "https://m.media-amazon.com/images/I/71fpBFzVBSL._AC_SL1399_.jpg",
    text: "iSmile Teeth Whitening Kit - LED Light, 35% Carbamide Peroxide, (3) 3ml Gel Syringes, (1) Remineralization"
  },
]

export default function Subcategories1() {
  const user = useSelector((state)=> state.user);
  const navigation = useNavigation();
  const [products , setProduct]= useState([])

  const [maxRating , setmaxRating] = useState([1 , 2 , 3 , 4 , 5]);

  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

  useEffect(() => {
    const getProducts = async ()=>{
      try {
        const res = await publicRequest.get("/products/getallProduct?category=Beauty and Personal Care")
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
        const res = await axios.get(`http://192.168.18.4:5000/api/post/getallpost?category=Beauty and Personal Care`)
        setPosts(res.data);
      } catch (error) {

      }
    }
    getPosts();
  }, [])
  
  return (
    <View style={{ backgroundColor: 'white', marginTop: 20 , borderRadius:10  }}>
      <Text style={styles.text}>Beauty Products</Text>
      <ImageBackground style={{ width: "110%", marginLeft:-60, height: 180, borderRadius: 50}} source={require("../Images/beautyproduct.png")}>
         <Text style={{ fontSize: 22, fontWeight:'500' , color: 'white', marginTop: 50, marginLeft: 70 }}>Personal Care</Text>
         <Text style={{ fontSize: 14, marginLeft: 70 , width:'40%' , color:'white'}}>Buy Best Personal Care Products From Aavelance</Text>
      </ImageBackground>
      <ScrollView style={{ marginTop:-10}}>
        <View style={styles.submain} flexWrap='wrap'>
          {products.slice(0,10).map((items) => (
            <ProductContainerForHome item={items}/>
          ))}
        </View>

      </ScrollView>

      {Posts.length !== 0 ?
    <View style={{marginTop:-10}}>
      <Text style={styles.usertext}>User Post</Text>
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
    color: 'white',
    backgroundColor:"black",
    fontSize: 22,
    marginTop: 16,
    padding: 3,
    marginBottom: 14,
    fontWeight: '900',
    marginLeft: 6
  },
  usertext:{
    width: '100%',
    color: 'black',
    backgroundColor:"white",
    fontSize: 20,
    marginTop: 16,
    padding: 3,
    fontWeight: '900',
    marginLeft: 6
  },
  img: {
    width: '90%', 
    height: 139,
    marginLeft:10, 
    borderRadius: 1, 
    marginTop:10,  
    resizeMode: 'contain'
  },
  text2: {
    color: 'black',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
    marginTop: -4,
    marginBottom: 4
  },
  text1: {
    color: 'black',
    width: 166,
    marginLeft: 10,
    fontSize:12
  },
  oneproductContainer:{
    width:177,
    backgroundColor:"white",
    marginLeft:10 ,
    marginTop:10,
    borderTopRightRadius:10,
    borderBottomLeftRadius:10
  },
  submainpost:{
    flexDirection:"row",
    backgroundColor:"black"
  },
  submain: {
   flexDirection:"row",
   flexWrap:'wrap',
   margin:2,
   backgroundColor:"gray",
   marginTop:12
  //  justifyContent:'center'
   
  },
  subchild: {
    marginRight: -0
  }
})