import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet, Image } from 'react-native'

import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { publicRequest } from '../redux/requestMethod';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings';
import FastImage from 'react-native-fast-image'
export default function ProfilePost(item) {
  const navigation = useNavigation();
  const [isCommentVisiable , setisCommentVisiable] = useState(false);
  let userDetails = useSelector(state => state.user)
  let id = userDetails?.currentUser?.others?._id;
  const userid = item?.post?.user;
console.log(userid , "post")
  const handleCommentShop = ()=>{
    if(isCommentVisiable == false){
      setisCommentVisiable(true)
    }else{
      setisCommentVisiable(false)
    }
  }

  const [user, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`http://139.162.11.30:80/api/user/post/user/details/${userid}`)
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured")
      }
    }
    getuser();
  }, [])
  console.log(user , 'id')

  const productLink = item?.post?.ProductLinks[0]?.slice(35, 90);
  // console.log(item?.post,"post")
  // console.log(productLink , "link")
  // console.log(post?.ProductLinks[0])
  const [product, setproduct] = useState('');

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/` + productLink);
        setproduct(res.data);
      } catch (error) {

      }
    };
    getProduct()
  }, [productLink]);
  console.log(product , "Product")


  return (
    <View style={styles.PostContainer} key={item?._id}>

      <View style={styles.MainProfileContainerinfeed}>
        <FastImage source={{ uri: `${user?.profile}` }} style={{ width: 40, height: 40, borderRadius: 500 }}  />
        <Text style={styles.inputpostTitle}>{user?.username}</Text>
      </View>

      <View style={styles.postImageContainer}>
        <Text>{item?.post?.title}
        </Text>
        <FastImage source={{ uri: `${item?.post?.image}` }} style={{ width: "100%", height: 290, resizeMode: 'contain', borderRadius: 10, marginTop: 10 }}  resizeMode={FastImage.resizeMode.contain} />
      </View>

      <View style={styles.ProductContainer}>
        <View style={styles.SubProductContainer}>
          <FastImage source={{ uri: `${product?.img}` }} style={{ width: "20%", height: 60, borderRadius: 6, marginTop: 10 }} />
          <View style={{ marginTop: 6 }}>
            <Text style={{ width: "50%", color: "white", marginLeft: 10, fontSize: 12 }}>{product?.title?.slice(0, 40)}</Text>
            <Text style={{ width: "55%", color: "white", marginLeft: 10, fontSize: 11 }}>{product?.desc?.slice(0, 86)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.producttobuyBtn} onPress={() => navigation.navigate(navigationStrings.DetailsScreen , {item ,productLink })}>
          <Text style={{ color: "white", marginLeft: "50%", fontWeight: "600", fontSize: 16 }}>Buy</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.reactionContainer}>
        <TouchableOpacity style={styles.subreaction} onPress={handleCommentShop}>
        </TouchableOpacity>
      </View>


      


    </View>
  )
}

const styles = StyleSheet.create({
  MainProfileContainerinfeed: {
    flexDirection: 'row',
  },
  text: {
    color: "white"
  },
  inputpostTitle: {
    marginTop: 8,
    marginLeft: 6,
    color:"black"
  },
  postImageContainer: {
    marginTop: 10,
  },
  reactionContainer: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  sublikereaction: {
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: "flex-end",
    marginRight: 10
  },
  subreaction: {
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: "flex-end",
    marginRight: 10

  },
  ProductContainer: {
    alignItems: "center",
    width: "100%",
  },
  SubProductContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: "black",
    width: "100%",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  producttobuyBtn: {
    backgroundColor: "darkgray",
    width: "100%",
    padding: 5,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
    // borderRadius:6
  },
  commentContainer: {
    flexDirection: 'row',
    marginTop: -30,
    paddingBottom: 50,
    backgroundColor: "white",
    alignItems: "center",
    padding: 3

  },
  commentuserProfile: {
    flexDirection: 'row',
    marginTop: -40,
    paddingBottom: 30,
    alignItems: "center",
    marginLeft: 4
  },
  commentInput:{
    width:"70%",
  },
  PostContainer: {
    marginTop: 10,
    backgroundColor: "white",
    width: "96%",
    marginLeft: 6,
    padding: 10,
    borderRadius: 10,
}
})