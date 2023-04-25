import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'
import { TextInput } from 'react-native'
import like from "../Admin/Images/like.png";
import anotherlikeicon from "../Admin/Images/setLike.png"
import Comment from "../Admin/Images/speech-bubble.png"
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import navigationStrings from '../constants/navigationStrings';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { publicRequest } from '../redux/requestMethod';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import Video from 'react-native-video';

export default function Post({ post }) {
  const navigation = useNavigation();
  // const item = post;
  const User = useSelector((state) => state.user);
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
        const res = await axios.get(`http://139.162.11.30:80/api/user/post/user/details/${id}`)
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
    await fetch(`http://139.162.11.30:80/api/post/comment/post`, { method: "PUT", headers: { 'Content-Type': "application/Json", token: accessToken }, body: JSON.stringify(comment) })
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
      await fetch(`http://139.162.11.30:80/api/post/${post._id}/like`, { method: "PUT", headers: { 'Content-Type': "application/Json", token: accessToken } })
      setLike(anotherlikeicon);
      setCount(count + 1);
    } else {
      await fetch(`http://139.162.11.30:80/api/post/${post._id}/like`, { method: "PUT", headers: { 'Content-Type': "application/Json", token: accessToken } })
      setLike(like)
      setCount(count - 1);
    }
  }



  return (
    <View style={styles.PostContainer} key={item?._id}>
      <TouchableOpacity style={styles.MainProfileContainerinfeed} onPress={() => navigation.navigate(navigationStrings.UserProfileFeed , {item})}>
        <FastImage source={{ uri: `${user?.profile}` }} style={{ width: 40, height: 40, borderRadius: 500 }} /> 
        <Text style={styles.inputpostTitle}>{user?.username}</Text>
      </TouchableOpacity>

      <View style={styles.postImageContainer}>
        <Text>{post?.title}
        </Text>
        {post?.image !== '' ?
        <FastImage source={{ uri: `${post?.image}` }} style={{ width: "100%", height: 290, borderRadius: 10, marginTop: 10 }} resizeMode={FastImage.resizeMode.contain} />: post.video !== '' ? <Video source={{uri: `${post?.video}`}} style={{ width: "100%", height: 290, borderRadius: 10, marginTop: 10 , resizeMode: 'contain', }}  paused={true} controls={true}/>:''}
      </View>
     {product !== '' && product !== null && product !== undefined ? 
      <View style={styles.ProductContainer}>
        <View style={styles.SubProductContainer}>
          {product?.img?.slice(0, 1).map((item) => (
            <FastImage source={{ uri: `${product?.img[0]}` }} style={{ width: "20%", height: 60, resizeMode: 'contain', borderRadius: 6, marginTop: 10 }} />
            ))}
          <View style={{ marginTop: 6 }}>
            <Text style={{ width: "67%", color: "white", marginLeft: 10, fontSize: 13 }}>{product?.title?.slice(0, 34)}</Text>
            <Text style={{ width: "67%", color: "white", marginLeft: 10, fontSize: 11 }}>{product?.desc?.slice(0, 70)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.producttobuyBtn} onPress={() => navigation.navigate(navigationStrings.DetailsScreen , {items,productLink} )}>
          <Text style={{ color: "white", marginLeft: "50%", fontWeight: "600", fontSize: 16 }}>Buy</Text>
        </TouchableOpacity>
      </View>
:""}

      <View style={styles.reactionContainer}>
        <TouchableOpacity onPress={handleLike}>
          <View style={styles.sublikereaction}>
            <FastImage source={`${Like}`} style={{ width: 20, height: 20, marginTop: 10, marginRight: 4 }} />
            <Text>{count} Likes</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.subreaction} onPress={handleCommentShop}>
          <FastImage source={`${Comment}`} style={{ width: 20, height: 20, marginTop: 10, marginRight: 4 }} />
          <Text>{post?.comments?.length} Comments</Text>
        </TouchableOpacity>
      </View>


      {isCommentVisiable !== true ? '' :
        <View>
          <View style={styles.commentContainer}>
            <FastImage source={{ uri: `${User?.currentUser?.others?.profile}` }} style={{ width: 35, height: 35, borderRadius: 500 }} />
            <TextInput placeholder='Write a you thought' multiline={true} style={styles.commentInput} onChangeText={(value) => setcommentwriting(value)}
            // onChangeText={(value)=> settitle(value)}
            ></TextInput>
            <TouchableOpacity style={{ marginLeft: 0, backgroundColor: "black", paddingLeft: 20, paddingRight: 20, paddingTop: 6, paddingBottom: 6, borderRadius: 10 }} onPress={handleComment}>
              <Text style={{ color: "white" }}>Post</Text>
            </TouchableOpacity>
          </View>

          {Comments?.map((item) => (
            <View>
              <View>
                <View style={styles.commentuserProfile}>
                  <FastImage source={{ uri: `${item?.profile}` }} style={{ width: 35, height: 35, borderRadius: 500 }} />
                  <Text style={{ color: "black", marginLeft: 5 }}>{item?.username}</Text>
                </View>
                <Text style={{ color: "black", marginTop: -35, paddingBottom: 38, marginLeft: 45 }}>{item?.comment} </Text>
              </View>
            </View>
          ))}
        </View>

      }


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
    marginLeft: 6
  },
  postImageContainer: {
    marginTop: 10,
  },
  reactionContainer: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  sublikereaction: {
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: "flex-end",
    marginRight: 10
  },
  subreaction: {
    paddingBottom: 0,
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
  commentInput: {
    width: "70%",
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