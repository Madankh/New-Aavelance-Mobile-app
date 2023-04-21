import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import Icon2 from 'react-native-vector-icons/FontAwesome';
import navigationStrings from '../constants/navigationStrings';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { publicRequest } from '../redux/requestMethod';
// import Stars from 'react-native-stars';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

export default function Subcategories() {
  const navigation = useNavigation();
  const [product , setProduct] = useState([]);
  const user = useSelector((state)=> state.user);

  const [maxRating , setmaxRating] = useState([1 , 2 , 3 , 4 , 5]);

  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

  useEffect(() => {
    const getProducts = async ()=>{
      try {
        const res = await publicRequest.get("/products/getallProduct?category=Women's Fashion")
        setProduct(res.data)
        console.log(res.data)
      } catch (error) {
        
      }
    }
    getProducts();
  }, [0])


  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`http://192.168.18.4:5000/api/post/getallpost?category=Men's Fashion`)
        setPosts(res.data);
      } catch (error) {

      }
    }
    getPosts();
  }, [])

  
  return (
    <View style={{ backgroundColor: 'white', marginTop: 20 }}>

      <Text style={styles.text}>Kids Product</Text>

      <ScrollView horizontal>

        <View style={styles.submain}>
          {product.slice(0,20).map((items) => (
            <TouchableOpacity key={items._id} onPress={() => navigation.navigate(navigationStrings.DetailsScreen , {items})} >
              <View  style={styles.subchild} key={items.id} >
                {items.img?.slice(0,1).map((img)=>(
                  <FastImage style={styles.img} source={{ uri: img}} resizeMode={FastImage.resizeMode.contain} />
                ))}
                <Text style={styles.text1}>{items.title.slice(0 , 60)}.....</Text>

                <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: 4 }}>
                    {
                      maxRating.map((itemss, key) => {
                        return (
                          <TouchableOpacity activeOpacity={0.7} key={itemss}>
                            <FastImage style={{ width: 20, height: 16,  marginBottom: 10 , marginLeft:5 }} resizeMode={FastImage.resizeMode.contain} source={itemss <= items.ratings ? { uri: starImgFilled } : { uri: starImgCorner }} />
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                </View>
                <Text style={styles.text2}>NPR {items.price}</Text>
              </View>
            </TouchableOpacity>

          ))}
        </View>

      </ScrollView>
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
    fontWeight: '900',
    marginLeft: 6
  },
  text2: {
    color: 'black',
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 8,
    marginTop: 4,
    marginBottom: 4
  },
  img: {
    width: 139, height: 139,marginLeft:10, borderRadius: 1, marginTop:10,  resizeMode: FastImage.resizeMode.contain
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
    marginRight: -0,
  },
  // myStarStyle:{
  //   color: 'yellow',
  //   backgroundColor: 'transparent',
  //   textShadowColor: 'black',
  //   textShadowOffset: {width: 1, height: 1},
  //   textShadowRadius: 2,
    
  // },
  // myEmptyStarStyle:{
  //   color:'white'
  // }
})