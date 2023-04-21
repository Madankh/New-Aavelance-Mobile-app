import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native';
import like from "../Admin/Images/like.png";
import anotherlikeicon from "../Admin/Images/setLike.png"
import Comment from "../Admin/Images/speech-bubble.png"
import loading from "../Admin/Images/giphy.gif"
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import navigationStrings from '../constants/navigationStrings';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { publicRequest } from '../redux/requestMethod';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';

export default function FeedPost({ post }) {
  const navigation = useNavigation();
  console.log(post , "Inside")
  const User = useSelector((state) => state.user);
  
  const [isFullScreen, setIsFullScreen] = useState(false);
  let accessToken = User?.currentUser?.accessToken;

  const id = post?.user
  const [isCommentVisiable, setisCommentVisiable] = useState(false);
  const [Like, setLike] = useState([post?.like?.includes(id) ? anotherlikeicon : like]);
  const [count, setCount] = useState(post?.like?.length);
  const [Comments, setComments] = useState(post?.comments);
  const [commentwriting, setcommentwriting] = useState('');


  const handleCommentShop = () => {
    if (isCommentVisiable == false) {
      setisCommentVisiable(true)
    } else {
      setisCommentVisiable(false)
    }
  }

  const [user, setuser] = useState([]);
  console.log(user)
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`http://192.168.18.4:5000/api/user/post/user/details/${id}`)
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured")
      }
    }
    getuser();
  }, [])
  const item = user;
  console.log(item , "sumaniditem")


  const addComment = async () => {
    const comment = {
      "postid": `${post?._id}`,
      "username": `${User?.currentUser?.others?.username}`,
      "comment": `${commentwriting}`,
      "profile": `${User?.currentUser?.others?.profile}`
    }
    await fetch(`http://192.168.18.4:5000/api/post/comment/post`, { method: "PUT", headers: { 'Content-Type': "application/Json", token: accessToken }, body: JSON.stringify(comment) })
    setComments(Comments.concat(comment));
  }

  const handleComment = () => {
    addComment();
  }

  const productLink = post?.ProductLinks[0]?.slice(35, 90);
  console.log(productLink)
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
  }, []);
  console.log(product)

  let items = product;

  const handleLike = async () => {
    if (Like == like) {
      await fetch(`http://192.168.18.4:5000/api/post/${post._id}/like`, { method: "PUT", headers: { 'Content-Type': "application/Json", token: accessToken } })
      setLike(anotherlikeicon);
      setCount(count + 1);
    } else {
      await fetch(`http://192.168.18.4:5000/api/post/${post._id}/like`, { method: "PUT", headers: { 'Content-Type': "application/Json", token: accessToken } })
      setLike(like)
      setCount(count - 1);
    }
  }
  
  const onBuffer = (event) => {
    // Handle buffer events here
    console.log('onBuffer', event);
  };
  
  const onError = (event) => {
    // Handle error events here
    console.log('onError', event);
  };
  


  return (
    <View style={styles.PostContainer}>
      <TouchableOpacity style={styles.MainProfileContainerinfeed} onPress={() => navigation.navigate(navigationStrings.UserProfileFeed , {item})}>
        <FastImage source={{ uri: `${user?.profile}` }} style={{ width: 40, height: 40, borderRadius: 500 }} />
        <View>
          <Text style={styles.inputpostTitle}>{user?.username}</Text>
          <Text style={styles.inputpostTitle1}>User Post</Text>
        </View>
        
      </TouchableOpacity>

      <View style={styles.postImageContainer}>
        <Text style={styles.inputpostTitle}>{post?.title.slice(0,40)}
        </Text>
        {post?.image !== '' ?
        <FastImage source={{ uri: `${post?.image}` }} style={{ width: 278 , height:255,  borderRadius: 2, margin: 4 }}  resizeMode={FastImage.resizeMode.contain}/>:
      //   <Video
      //   source={{ uri: `${post?.video}` }}
      //   style={{ width: 278, height: 250, borderRadius: 2, margin: 4 }}
      //   controls={true}
      //   paused={true}
      //   resizeMode={isFullScreen ? 'cover' : 'contain'}
      //   onBuffer={onBuffer}
      //   onError={onError}
      // />
      
   ""
        
        }
      </View>
     {product !== '' && product !== null && product !== undefined ? 
      <View style={styles.ProductContainer}>
        <View style={styles.SubProductContainer}>
          {product?.img?.slice(0, 1).map((item) => (
            <FastImage source={{ uri: `${product?.img[0]}` }} style={{ width: "24%", height: 54, borderRadius: 6, marginTop: 0 }} resizeMode={FastImage.resizeMode.contain}/>
            ))}
          <View style={{ marginTop: 6 }}>
            <Text style={{ width: "67%", color: "white", marginLeft: 10, fontSize: 10 }}>{product?.title?.slice(0, 35)}</Text>
            <Text style={{ width: "67%", color: "white", marginLeft: 10, fontSize: 9 }}>{product?.desc?.slice(0, 80)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.producttobuyBtn} onPress={() => navigation.navigate(navigationStrings.DetailsScreen , {items,productLink} )}>
          <Text style={{ color: "black", marginLeft: "50%", fontWeight: "600", fontSize: 16 }}>Buy</Text>
        </TouchableOpacity>
      </View>
:""}


    </View>
  )
}

const styles = StyleSheet.create({
  MainProfileContainerinfeed: {
    flexDirection: 'row',
  },
  text: {
    color: "black"
  },
  inputpostTitle: {
    marginTop: 8,
    marginLeft: 6,
    color:"black"
  },
  inputpostTitle1:{
    color:"gray",
    fontSize:10,
    fontWeight:"900",
    marginLeft:6
  },
  postImageContainer: {
    
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
    backgroundColor: "#ffd814",
    width:"100%",
    // paddingLeft:67,
    // paddingRight:67,
    // marginLeft:20,
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
  commentInput: {
    width: "70%",
  },
  PostContainer: {
    marginTop: 10,
    backgroundColor: "white",
    width: 300,
    marginLeft: 6,
    padding: 10,
    borderRadius: 10,
  }
})