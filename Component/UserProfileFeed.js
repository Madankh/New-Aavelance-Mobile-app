import { View, Text , StyleSheet  , ScrollView , Image} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ContentPost from '../HomeComponent/ContentPost';
import Post from '../HomeComponent/Post';
import { useEffect } from 'react';
import Topheader from '../HomeComponent/Topheader';
import { TouchableOpacity } from 'react-native';
import ProfilePost from '../HomeComponent/ProfilePost';
import navigationStrings from '../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import FastImage from 'react-native-fast-image'

export default function UserProfileFeed(item) {
  let userdetails = item?.route?.params?.item ;
  console.log(item , "ai")
  let userDetails = useSelector(state => state.user)
  let id = userDetails?.currentUser?.others?._id;
  const navigation = useNavigation();
  const useridfromfollow = userdetails?.userdetails?._id;
  const useridfrompost = userdetails?._id;
  const idforfetchpost = useridfromfollow !== undefined ? useridfromfollow : useridfrompost !== undefined ? useridfrompost : id ;
 const [post , setPost] = useState([]);

          // const [users, setUsers] = useState([]);
          // useEffect(() => {
          //           const getuser = async () => {
          //                     try {
          //                               const res = await axios.get(`http://139.162.11.30:80/api/user/all/user/${id}`)
          //                               setUsers(res.data);
          //                               // console.log(res.data , "dsfsfs")
          //                     }
          //                     catch (error) {
          //                               console.log("Some error occured")
          //                     }
          //           }
          //           getuser();
          // }, [])


          useEffect(() => {
            const getPost = async()=>{
              try {
                const res = await axios.get(`http://139.162.11.30:80/api/post/get/post/${idforfetchpost}`)
                setPost(res.data);
                console.log(res,"dk")
              } catch (error) {
                console.log("error occured")
              }
            }
            getPost();
          }, [idforfetchpost])

          const [user, setuser] = useState([]);
          useEffect(() => {
            const getuser = async () => {
              try {
                const res = await axios.get(`http://139.162.11.30:80/api/user/post/user/details/${idforfetchpost}`)
                setuser(res.data);
              } catch (error) {
                console.log("Some error occured")
              }
            }
            getuser();
          }, [])
          console.log(user , 'id')



  return (
    <View style={{ backgroundColor: "gray" , height:"100%" }}>
      <Topheader />
      <ScrollView>

        <View style={styles.suggestedforyou}>
          <Text style={{ textAlign: 'left', marginLeft: "36%" , marginTop:-6 , color:"black" }}>Your Profile</Text>
          <FastImage source={{ uri: `https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8&w=1000&q=80` }} style={{ width: "100%", height: 90, resizeMode: 'cover', borderRadius: 6, marginTop: 0 }} />
          <View style={{flexDirection:"row" , alignItems:"center"}}>

          {user?.profile == '' || null ? <FastImage source={{ uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpKsAVpi8qafcPIKvov9nJe8qH_NGaUrtroFxbLWTImgXRZpGq3yDBNGolJGDkXPvPvcA&usqp=CAU` }} style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 6, marginTop: -20 }} /> : <FastImage source={{ uri: `${user?.profile}` }} style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 6, marginTop: -20 }} /> }  
            {/* <FastImage source={{ uri: `${user?.profile}` }} style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 6, marginTop: -20 }} /> */}
            <Text style={{marginTop:-4 , color:"black" , marginLeft:6}}>{user?.username}</Text>
          </View>
          <View>

          </View>
          <View style={styles.YouprofileDetails}>
            <Text style={styles.text}>Following</Text>
          </View>

          <View style={styles.YouprofileDetails}>
            <Text style={styles.text}>Followers</Text>
          </View>
        {id !== idforfetchpost ? 
        <TouchableOpacity style={styles.YouprofileSettingBtn} onPress={() => navigation.navigate(navigationStrings.Profile)}>
            <Text style={{color:"white" , fontWeight:"600" , marginLeft:"40%"}}>Follow</Text>
        </TouchableOpacity>:
        <View>
          <TouchableOpacity style={styles.YouprofileDetails} onPress={() => navigation.navigate(navigationStrings.UserIncome)}>
            <Text style={styles.text}>Check Your Earning</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.YouprofileDetails} onPress={() => navigation.navigate(navigationStrings.UserTransaction)} >
            <Text style={styles.text}>Transaction</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.YouprofileDetails} onPress={() => navigation.navigate(navigationStrings.Profile)} >
            <Text style={styles.text}>Bank Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.YouprofileSettingBtn} onPress={() => navigation.navigate(navigationStrings.Profile)}>
            <Text style={{color:"white" , fontWeight:"600" , marginLeft:"40%"}}>Settings</Text>
          </TouchableOpacity>

          </View>
          }

        </View>

        <View style={styles.ContentPost}>
          <ContentPost />
        </View>
        <View>
          {post.map((item)=>(
            <ProfilePost post={item}/>
          ))}
         
        </View>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  followuserContainer: {
    flexDirection: 'row',
    marginTop: -34
  },
  suggestedforyou: {
    marginTop: 10,
    backgroundColor: "white",
    width: "96%",
    marginLeft: 6,
    padding: 10,
    borderRadius: 10
  },
  YouprofileDetails:{
    marginLeft:13,
    // paddingTop:3
  },
  YouprofileSettingBtn:{
    backgroundColor:"black",
    paddingTop:5,
    paddingBottom:7,
    borderTopLeftRadius:10,
    borderBottomRightRadius:10
  },
  text:{
    color:"black",
    paddingBottom:5
  }


})