import { View, Text, FlatList , TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Follow from "../HomeComponent/Follow"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios, { Axios } from 'axios';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import Topheader from '../HomeComponent/Topheader';
import ContentPost from '../HomeComponent/ContentPost';
import Post from "../HomeComponent/Post"
import ButtomTabs from '../HomeComponent/ButtomTabs';

export default function UserFeed() {
  let userDetails = useSelector(state => state.user)
  let id = userDetails?.currentUser?.others?._id;
  console.log(id, "userid")
  let accessToken = userDetails?.currentUser?.accessToken;
  console.log(accessToken)
  const [post, setPost] = useState([]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`http://139.162.11.30:80/api/user/all/user/${id}`)
        setUsers(res.data);
      }
      catch (error) {
        console.log("Some error occured")
      }
    }
    getuser();
  }, [])


  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://139.162.11.30:80/api/user/flw/${id}`, {
          headers: {
            token: accessToken
          }
        })
        setPost(res.data);
      } catch (error) {

      }
    }
    getPost();
  }, [id])
  console.log(post)
  return (
    <>
      <Topheader />
      <FlatList style={{backgroundColor:"gray"}}
        data={post.filter(item => !item.video)}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => <Post post={item} />}
        nestedScrollEnabled={true}
        ListHeaderComponent={
          <>
            <View style={styles.suggestedforyou}>
              <Text style={{ textAlign: 'left', marginLeft: 10 }}>Suggested for you</Text>
              <FlatList
                horizontal
                data={users}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => <Follow userdetails={item} />}
              />
            </View>
            <View style={styles.ContentPost}>
              {/* <TouchableOpacity style={{padding:10 , backgroundColor:"white" , width:"93%" , marginLeft:10 , marginTop:7 , borderRadius:5}}>
                <Text style={{alignItems:"center" , marginLeft:150 , color:"black"}}>Post</Text>
              </TouchableOpacity> */}
              <ContentPost />

            </View>
          </>
        }
      />
      <View >
        <ButtomTabs />
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  followuserContainer: {
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



})