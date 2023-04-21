import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import navigationStrings from '../constants/navigationStrings';
import FashionIcon from "../Images/search.png";
import BeautyIcon from "../Images/cosmetics.png"
import HomeIcon from "../Images/icons8-home-24.png"
import DiscoverIcon from "../Images/icons8-compass-24.png"
import PostIcon from "../Images/icons8-add-50.png"
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
export default function ButtomTabs() {
  const navigation = useNavigation();
  const users = useSelector(state => state.user);
  let user = users.currentUser != null;
  let currentuserProps = user.currentUser;

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginHorizontal: 0,
          paddingTop: 10,
          backgroundColor: 'black',
          width: '100%',
        }}>
         <TouchableOpacity
          onPress={() => navigation.navigate(navigationStrings.Home)}>
          <View>
           <Image source={HomeIcon} style={{ width: 20, height: 20, paddingLeft: 14 }} />
            <Text style={Style.text}>Home</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigationStrings.Makeup)
          }>
          <View>
            <Image source={BeautyIcon} style={{ width: 20, height: 20, paddingLeft: 14 }} />
            <Text style={Style.text}>Makeup</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigationStrings.UserFeed)
          }>
          <View>
            <Image source={PostIcon} style={{ width: 20, height: 20, paddingLeft: 14 }} />
            <Text style={Style.text}>YourFeed</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigationStrings.Discover)
          }>
          <View>
            <Image source={DiscoverIcon} style={{ width: 20, height: 20, paddingLeft: 14 }} />
            <Text style={Style.text}>Discover</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigationStrings.Fashion)
          }>
          <View>
            <Image source={FashionIcon} style={{ width: 20, height: 20, paddingLeft: 14 }} />
            <Text style={Style.text}>Fashion</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.Livestream)}>
          <View>
            <Icon1
              style={{paddingLeft: 16}}
              name="video"
              color="white"
              size={20}
            />
            <Text style={Style.text}>Livestream</Text>
          </View>
        </TouchableOpacity> */}

        {/* <TouchableOpacity  onPress={() => {user ? navigation.navigate(navigationStrings.UserOrder , {currentuserProps}) : navigation.navigate(navigationStrings.Signin )}} > 
          <View>
            <Icon2
              style={{paddingLeft: 10}}
              name="reorder"
              color="white"
              size={20}
            />
            <Text style={Style.text}>Orders</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </>
  );
}

const Style = StyleSheet.create({
  text: {
    color: 'white',
    marginLeft:-4
  },
});
