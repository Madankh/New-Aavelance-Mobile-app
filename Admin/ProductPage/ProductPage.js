import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';
import { useSelector } from 'react-redux';
import axios from 'axios';

const items = [
  {
    id: 1,
    image: 'https://m.media-amazon.com/images/I/71waplSVO7L._AC_SL1500_.jpg',
    text: 'Razer Kraken X Ultralight Gaming Headset: 7.1 Surround Sound - Lightweight Aluminum Frame',
  },
  {
    id: 2,
    image: 'https://m.media-amazon.com/images/I/81Kh1wq4YOL._AC_SL1500_.jpg',
    text: 'Razer Kraken X Ultralight Gaming Headset: 7.1 Surround Sound - Lightweight Aluminum Frame',
  },
  {
    id: 3,
    image: 'https://m.media-amazon.com/images/I/71Nnf33+tyL._AC_SL1500_.jpg',
    text: 'LG Gram 14Z90P Laptop 14 Ultra-Lightweight, IPS WUXGA (1920 x 1200), Intel Evo 11th gen CORE i7 , 16GB RAM,',
  },
  {
    id: 4,
    image: 'https://m.media-amazon.com/images/I/712iry8nIYL._AC_SX569_.jpg',
    text: 'Razer Kraken X Ultralight Gaming Headset: 7.1 Surround Sound - Lightweight Aluminum Frame',
  },
];

export default function ProductPage(product) {
  const navigation = useNavigation();
  
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

  const user = useSelector((state)=> state.user);
  const admin = useSelector((state)=> state.seller);
  let Userid = user?.currentUser?.others?._id;
  console.log( user?.currentUser?.others)
  const accessToken = user?.currentUser?.accessToken;
  let seller = admin?.currentSeller;
  console.log(seller)

  const [userDetails , setuserDetails] = useState('')
  let id = seller ? seller._id : product?.route?.params?.seller;
  if(id == undefined){
    id=product?.route?.params?._id;
  }
 
  const follow = userDetails?.following?.includes(id) ? "Unfollow shop" : "Follow shop";
  const index = 1;
  

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`http://192.168.18.4:5000/api/user/own/${Userid}`, {
          headers: {
            token: accessToken
          }
        })
        setuserDetails(res.data);
      } catch (error) {

      }
    }
    getuser();
  }, [])

console.log(userDetails)


  const changefollow = async() =>{
    if(follow == 'Follow shop'){
      await axios.put(`http://192.168.18.4:5000/api/seller/${id}/follow` , {
                user: `${Userid}`
            })
            navigation.navigate(navigationStrings.Home)

    }else if( follow == 'Unfollow shop'){
      await axios.put(`http://192.168.18.4:5000/api/seller/${id}/unfollow` , {
                user: `${Userid}`
            })
            navigation.navigate(navigationStrings.Home)
    }
  }

  const [Products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async ()=>{
            try {
                const res = await axios.get(`http://192.168.18.4:5000/api/products/allproduct/${id}` )
                setProducts(res.data);
              } catch (error) {
                console.log(error)
              }
          }
          getProducts();
        }, [])

      const [shopname , setShopname] = useState({});  
      useEffect(() => {
        const getshopname = async ()=>{
            try {
                const res = await axios.get(`http://192.168.18.4:5000/api/seller/seller/${id}` )
                setShopname(res.data);
              } catch (error) {
                console.log(error)
              }
          }
          getshopname();
        }, [])
        
        console.log(shopname)

  return (
    <>
      <SafeAreaView>
        {/* <Navbar/> */}
        <ScrollView>
        <View>
          <Image
            source={{
              uri: 'https://cdn.britannica.com/35/222035-131-9FC95B31/makeup-cosmetics.jpg'}}
            style={{height: 150, resizeMode: 'cover'}}
            />

          <View style={{flexDirection: 'row', justifyContent: 'space-between' , marginLeft:9}}>
            <View style={{flexDirection: 'row',}}>
              <Image source={{
                  uri: 'https://thumbs.dreamstime.com/b/makeup-cosmetics-tools-background-beauty-products-facial-package-lipstick-eyeshadow-white-bac-top-view-copy-space-132830726.jpg'}} style={{ height: 50, width: 50, borderRadius: 500, alignSelf: 'center' , marginTop:4}}/>
              <Text style={{ color: 'black', alignSelf: 'center', fontSize: 18, fontWeight: '800' , marginLeft:10}}>{shopname.shopname}</Text>
            </View>

            <View style={{marginTop: 13}}>
              <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 4}}>
                <TouchableOpacity
                  style={{ backgroundColor: 'royalblue', marginRight: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 2, paddingBottom: 2, borderRadius: 15}}>
                  {seller ? <Text style={{color: 'white', fontWeight: '800'}} onPress={() => navigation.navigate(navigationStrings.SellerInformation)}>Manage Shop</Text> : <Text style={{color: 'white', fontWeight: '800'}} onPress={changefollow} >{follow}</Text> }
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{width:'100%' , justifyContent:'center' , flexDirection:'row' , backgroundColor:'black' , marginTop:6 , padding:15}}>
            {/* <TouchableOpacity style={{backgroundColor:'black'}}>
              <Text style={{marginLeft:10 , color:'white'}}>Product</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={{backgroundColor:'black'}}>
              <Text style={{marginLeft:16  , color:'white'}}>Streaming Videos</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={{backgroundColor: 'white', marginTop: 20}}>
          <Text style={styles.text}>All Products</Text>

          <ScrollView horizontal>
            <View style={styles.submain}>
              {Products.map((items) => (
                <TouchableOpacity
                key={items.id}
                onPress={() => navigation.navigate(navigationStrings.DetailsScreen , {items})}>
                  <View style={styles.subchild}>
                    {items?.img?.slice(0,1).map((item)=>(
                      <Image style={styles.img} source={{uri: item}} />
                    ))}
                    <Text style={styles.text1}>{items?.title?.slice(0,60)}</Text>

                    {/* <View>
                 <Stars 
                 />
                </View> */}

                    <View style={{flexDirection: 'row'}}>
                    <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: 0 , marginLeft:5 }}>
                                    {
                                        maxRating.map((itemss, key) => {
                                            return (
                                                <TouchableOpacity activeOpacity={0.7} key={itemss}>
                                                    <Image style={{ width: 20, height: 14, resizeMode: 'contain', marginBottom: 10 }} source={itemss <= items.ratings ? { uri: starImgFilled } : { uri: starImgCorner }} />
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                    </View>
                    <Text style={styles.text2}>NPR {items?.price}</Text>
                  </View>
                </TouchableOpacity>
))}
            </View>
          </ScrollView>
        </View>

        <View style={{backgroundColor: 'white', marginTop: 20}}>
          {/* <Text style={styles.text}>Top Rated Products</Text> */}

          {/* <ScrollView horizontal style={{marginBottom:40}}>
            <View style={styles.submain}>
              {items.map(item => (
                <TouchableOpacity
                key={item.id}
                onPress={() =>
                    navigation.navigate(navigationStrings.DetailsScreen)
                  }>
                  <View style={styles.subchild}>
                    <Image style={styles.img} source={{uri: item.image}} />
                    <Text style={styles.text1}>{item.text}</Text>

                    <View style={{flexDirection: 'row'}}>
                      <Icon2
                        style={{paddingLeft: 10}}
                        name="star"
                        color="#FDCC0D"
                        size={20}
                        />
                      <Icon2
                        style={{paddingLeft: 10}}
                        name="star"
                        color="#FDCC0D"
                        size={20}
                        />
                      <Icon2
                        style={{paddingLeft: 10}}
                        name="star"
                        color="#FDCC0D"
                        size={20}
                      />
                      <Icon2
                        style={{paddingLeft: 10}}
                        name="star"
                        color="#FDCC0D"
                        size={20}
                        />
                      <Icon2
                        style={{paddingLeft: 10}}
                        name="star-half-full"
                        color="#FDCC0D"
                        size={20}
                      />
                    </View>
                    <Text style={styles.text2}>NPR 1500</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView> */}
        </View>
    </ScrollView>
      </SafeAreaView>
    </>
  );
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
    marginLeft: 6,
  },
  text2: {
    color: 'black',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  img: {
    width: '100%',
    height: 180,
    borderRadius: 0,
    resizeMode: 'contain',
  },
  text1: {
    color: 'black',
    width: 180,
    marginLeft: 10,
  },
  submain: {
    flexDirection: 'row',
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
});
