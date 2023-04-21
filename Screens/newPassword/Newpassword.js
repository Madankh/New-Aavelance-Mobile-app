import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, {useState } from 'react';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import navigationStrings from '../../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Topheader from '../../HomeComponent/Topheader';

export default function Newpassword() {
  const user = useSelector((state)=> state.user);
  const [oldpassword , setoldpassword] = useState();
  const [newPassword , setnewPassword] = useState();
  const [comfirmPassword , setcomfirmPassword] = useState();
  return (
    <View>
      <Topheader/>
      <View style={{ marginTop: -10, padding: 19 }}>
    
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row' }}>
          <Icons style={{ paddingLeft: -1, marginRight: 5 }}
              name="security"
              color="black"
              size={20}
            />
            <Text style={styles.text}>New Password</Text>
          </View>
          <TextInput style={styles.text} placeholder={"New Password"} onChangeText={(value)=> setnewPassword(value)}/>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row' }}>
          <Icons style={{ paddingLeft: -1, marginRight: 5 }}
              name="security"
              color="black"
              size={20}
            />
            <Text style={styles.text}>Comform Password</Text>
          </View>
          <TextInput style={styles.text} placeholder={"Comform Password"} onChangeText={(value)=> setcomfirmPassword(value)}/>
        </View>
 
      </View>
      <TouchableOpacity style={styles.logoutstyle}>
        <Text style={styles.logoutText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touchbutton: {
    backgroundColor: 'white',
    paddingLeft: 7,
    paddingRight: 6,
    marginBottom: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',

  },
  text: {
    color: 'black'
  },
  text1: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600'
  },
  logoutstyle: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius:50
  },
  logoutText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 17
  }
})
