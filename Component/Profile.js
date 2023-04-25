import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import Icon1 from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Address from 'react-native-vector-icons/Entypo'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Topheader from '../HomeComponent/Topheader';
import navigationStrings from '../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import axios from 'axios';
import { ScrollView } from 'react-native';

const Profile = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  let accessToken = user?.currentUser?.accessToken;
  let current = user?.currentUser?.others;
  let name = current?.username;
  let following = current?.following?.length;
  console.log(accessToken)
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const [order, setOrder] = useState([]);
  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(`http://139.162.11.30:80/api/order/myOrder`, {
          headers: {
            token: accessToken
          }
        })
        setOrder(res.data);
      } catch (error) {

      }
    }
    getOrder();
  }, [])

  const [userDetails, setuserDetails] = useState('');
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`http://139.162.11.30:80/api/user/own/${current._id}`, {
          headers: {
            token: accessToken
          }
        })
        console.log(res.data)
        setuserDetails(res.data);
      } catch (error) {

      }
    }
    getuser();
  }, [])

  const [account, setaccount] = useState([]);
  useEffect(() => {
    const getaccount = async () => {
      try {
        const res = await axios.get(`http://139.162.11.30:80/api/influencer/bank/user/account`, {
          headers: {
            token: accessToken
          }
        })
        setaccount(res.data);
      } catch (error) {

      }
    }
    getaccount();
  }, [current._id])


  return (
    <ScrollView>
      <Topheader />
      <ScrollView>
        <View style={{ marginTop: 20, alignSelf: 'center' }}>
          <Image source={require("../Screens/assets/photo-1612817288484-6f916006741a.jpg")} style={{ width: 500, height: 60, alignSelf: 'center', borderRadius: 10 }} />
          <Text style={{ color: "black", paddingLeft: 12, marginTop: 5, fontSize: 20, fontWeight: '900', textAlign: "center" }} >{name}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, backgroundColor: 'white', paddingTop: 10 }}>
          <TouchableOpacity style={styles.touchbutton} onPress={() => navigation.navigate(navigationStrings.UserOrder)}>
            <Text style={{ color: 'black', fontWeight: '600', fontSize: 20, marginRight: 5 }}>{order?.orders?.length}</Text>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '600', marginRight: 5 }}>My orders</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchbutton}>
            <Text style={{ color: 'black', fontWeight: '600', fontSize: 20, marginRight: 5 }}>{userDetails?.following?.length}</Text>
            <Text style={{ color: 'black', fontWeight: '600', fontSize: 20, marginRight: 5 }} onPress={() => navigation.navigate(navigationStrings.Followingstore, current)}>Following Stores</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ marginRight: 42, }} onPress={() => navigation.navigate(navigationStrings.UpdateProfile, { current })}>
          <Text style={{ color: 'black', alignSelf: "flex-end", fontSize: 20, fontWeight: '900' }}>Edit</Text>
        </TouchableOpacity>
        <View style={{ marginTop: -10, padding: 19 }}>
          <View >
            <View style={{ flexDirection: 'row' }}>
              <Icon2 style={{ paddingLeft: -1, marginRight: 5 }}
                name="user"
                color="black"
                size={20}
              />
              <Text style={styles.text}>Username</Text>
            </View>
            <Text style={styles.text}>{userDetails?.username}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icons style={{ paddingLeft: -1, marginRight: 5 }}
                name="email-edit-outline"
                color="black"
                size={20}
              />
              <Text style={styles.text}>Email</Text>
            </View>
            <Text style={styles.text}>{userDetails?.email}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icons style={{ paddingLeft: -1, marginRight: 5 }}
                name="phone"
                color="black"
                size={20}
              />
              <Text style={styles.text}>Phone Number</Text>
            </View>
            <Text style={styles.text}>{userDetails?.phoneNumber}</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Address style={{ paddingLeft: -1, marginRight: 5 }}
                name="address"
                color="black"
                size={20}
              />
              <Text style={styles.text}>Address</Text>
            </View>
            <Text style={styles.text}>{userDetails?.address}</Text>
          </View>
        </View>
        <View style={{backgroundColor: "black", padding: 12 }}>
          <View style={{ marginLeft: 18 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icons style={{ paddingLeft: -10, marginRight: 5 }}
                name="onepassword"
                color="white"
                size={20}
              />
              <Text style={{ color: 'white', fontSize: 14 }}>Change your password</Text>
            </View>
            <Text style={{ color: 'white', fontSize: 14, marginLeft: 10 }}>It's a good idea to use a strong password</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.PasswordUpdate)} style={{ marginLeft: 30, backgroundColor: "white", width: 80, height: 25, paddingLeft: 23, paddingRight: 20, borderRadius: 4 , marginTop:10 }} >
            <Text style={{ color: "black" }}>Edit</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {account != '' ?
            <View>
              {account?.map((item) => (
                <View>

                  <Text>Bank Account Details</Text>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icons style={{ paddingLeft: 10, marginRight: 5 }}
                        name="bank"
                        color="black"
                        size={20}
                      />
                      <Text style={{ marginLeft: 0, color: "black" }}>Bank Name :</Text>
                    </View>
                    <Text style={{ marginLeft: 10, color: "black" }}>{item?.BankName}</Text>
                  </View>

                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icons style={{ paddingLeft: 10, marginRight: 5 }}
                        name="numeric"
                        color="black"
                        size={20}
                      />
                      <Text style={{ marginLeft: 0, color: "black" }}>Bank Account num :</Text>
                    </View>
                    <Text style={{ marginLeft: 10, color: "black" }}>{item?.accountNumber}</Text>
                  </View>

                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon1 style={{ paddingLeft: 10, marginRight: 5 }}
                        name="address"
                        color="black"
                        size={20}
                      />
                      <Text style={{ marginLeft: 0, color: "black" }}>Bank address :</Text>
                    </View>
                    <Text style={{ marginLeft: 10, color: "black" }}>{item?.BankAddress}</Text>
                  </View>

                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icons style={{ paddingLeft: 10, marginRight: 5 }}
                        name="rename-box"
                        color="black"
                        size={20}
                      />
                      <Text style={{ marginLeft: 0, color: "black" }}>Bank Account Name :</Text>
                    </View>
                    <Text style={{ marginLeft: 10, color: "black" }}>{item?.accountName}</Text>
                  </View>
                  <TouchableOpacity style={{ paddingLeft: 4, paddingTop: 5, paddingBottom: 5, marginTop: 10, backgroundColor: "black" }}
                    onPress={() => navigation.navigate(navigationStrings.UpdateUserBankAccount)} ><Text style={{ color: "white", marginLeft: 150, justifyContent: 'center' }}>Edit</Text></TouchableOpacity>
                </View>
              ))}</View> :
            <View>
              <Text style={{ marginLeft: 10, color: 'green' }}>You don't add your Bank details</Text>
              <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: '800' }}>Add your bank details</Text>
              <TouchableOpacity style={{ marginLeft: 0, backgroundColor: "black" }} onPress={() => navigation.navigate(navigationStrings.UserBankAccount)}><Text style={{ color: "white", marginLeft: 150, paddingTop: 5, paddingBottom: 5 }}>Add Bank details</Text></TouchableOpacity>
            </View>
          }
        </ScrollView>

        <TouchableOpacity style={styles.logoutstyle}>
          <Text style={styles.logoutText} onPress={handleLogout}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  )
}

export default Profile

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
    padding: 10
  },
  logoutText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 17
  }
})