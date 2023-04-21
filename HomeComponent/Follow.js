import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import FollowImg from "../Admin/Images/Followimage.png";
import alreadyFollow from "../Admin/Images/alreadyFollow.png"
import { useSelector } from 'react-redux';
import navigationStrings from '../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'


export default function Follow(item) {
  const navigation = useNavigation();
  let userDetails = useSelector(state => state.user)
  let accessToken = userDetails?.currentUser?.accessToken;
  const id = userDetails?.currentUser?.others?._id
  console.log(id)
  const [Follow, setFollow] = useState(`${FollowImg}`);
  const handleFollow = async (e) => {
    await fetch(`http://192.168.18.4:5000/api/user/feed/following/${item?.userdetails?._id}`, { method: 'PUT', headers: { 'Content-Type': "application/JSON", token: accessToken }, body: JSON.stringify({ user:`${id}`}) })
    setFollow(alreadyFollow);
  }
  return (
    <View >
      {id !== item?.userdetails?._id ? 
    <TouchableOpacity style={styles.followUserContainer} onPress={() => navigation.navigate(navigationStrings.UserProfileFeed , {item})}>

    {item.userdetails?.profile == '' || null ? <FastImage source={{ uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpKsAVpi8qafcPIKvov9nJe8qH_NGaUrtroFxbLWTImgXRZpGq3yDBNGolJGDkXPvPvcA&usqp=CAU` }} style={{ height: 50, width: 50, margin: 10, marginTop: 10, borderRadius: 500 }} /> : <FastImage source={{ uri: `${item?.userdetails?.profile}` }} style={{ height: 50, width: 50, margin: 10, marginTop: 10, borderRadius: 500 }} /> }  
      <View style={styles.itemContainer}>
        <Text style={styles.userProfilename}>{item?.userdetails?.username}</Text>
        <Text style={{ color: "black", marginTop: 0, fontSize: 10 }}>Follow User</Text>
       
      </View>
      {id !== null || id !== '' ?
      <TouchableOpacity onPress={handleFollow}>
        <FastImage source={(`${Follow}`)} style={{ height: 30, width: 30, margin: 10, marginTop: 20, borderRadius: 500, backgroundColor: "azure", padding: 0 }} />
      </TouchableOpacity>
    :
    <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.Signin)}>
      <FastImage source={(`${Follow}`)} style={{ height: 30, width: 30, margin: 10, marginTop: 20, borderRadius: 500, backgroundColor: "azure", padding: 0 }} />
   </TouchableOpacity>}
    </TouchableOpacity>
    :""}
    </View>
  )
}

const styles = StyleSheet.create({
  followUserContainer: {
    flexDirection: "row",
    marginTop: 0
  },
  itemContainer: {
    marginLeft: 0
  },
  userProfilename: {
    color: "black",
    marginTop: 18
  },
})