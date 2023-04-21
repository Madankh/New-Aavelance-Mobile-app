import { View, Text, StyleSheet, FlatList , NativeModules} from 'react-native'
import React, { useEffect, useState } from 'react'
import Topheader from '../HomeComponent/Topheader'
import { useSelector } from 'react-redux';
import axios from 'axios';
import DiscoverPost from '../HomeComponent/DiscoverPost';
import ButtomTabs from '../HomeComponent/ButtomTabs';
import Follow from '../HomeComponent/Follow';
export default function Fashion() {
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
          const res = await axios.get(`http://192.168.18.4:5000/api/user/all/user`)
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
          const res = await axios.get(`http://192.168.18.4:5000/api/post/getallpost?category=Women's Fashion`, {
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
        <Topheader/>
        <View style={{flex: 1}} stickyHeaderIndices={[1]}>
          <FlatList
            style={{backgroundColor:"gray"}}
            data={post.filter(item => !item.video)}
            keyExtractor={(item) => item?._id}
            renderItem={({ item }) => <DiscoverPost post={item} />}
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
              </>
            }
          />
          <ButtomTabs/>
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