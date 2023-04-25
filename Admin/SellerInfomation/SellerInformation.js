import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
// import Icons from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import navigationStrings from '../../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../adminNavbar/Navbar';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';


const SellerInformation = () => {
  const navigation = useNavigation();
  const seller = useSelector((state) => state.seller);
  let current = seller?.currentSeller;
  let accessToken = current.accessToken;
  let name = current.username;

  let following = current.followers.length;

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };


  const [account, setaccount] = useState([]);
  useEffect(() => {
    const getaccount = async () => {
      try {
        const res = await axios.get(`http://139.162.11.30:80/api/bankaccout/accountdetail`, {
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
  console.log(account)


  return (
    <ScrollView>
      <Navbar />
      <View style={{ marginTop: 20, alignSelf: 'center' }}>
        {/* <Image source={require("../Screens/assets/img.jpg")} style={{ width: 80, height: 80, alignSelf: 'center', borderRadius: 500 }} /> */}
        <Text style={{ color: "black", paddingLeft: 12, marginTop: 5, fontSize: 20, fontWeight: '900' }} >{name}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, backgroundColor: 'white', paddingTop: 10 }}>
        <TouchableOpacity style={styles.touchbutton}>
          <Text style={{ color: 'black', fontWeight: '600', fontSize: 20, marginRight: 5 }}>{following}</Text>
          <Text style={{ color: 'black', fontWeight: '600', fontSize: 20, marginRight: 5 }} onPress={() => navigation.navigate(navigationStrings.Followingstore)}>Followers</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{backgroundColor:"black" , marginLeft:'80%' , paddingTop:5 , paddingBottom:5}} onPress={() => navigation.navigate(navigationStrings.UpdateSellerInformation, { current })}>
        <Text style={{ color: 'white', alignSelf: "flex-end",marginRight:20 }}>Edit</Text>
      </TouchableOpacity>
      <View style={{ marginTop: -10, padding: 19 }}>
        <View>
          <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="bank"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>Username</Text>
          </View>
          <Text style={styles.text} >{name}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="email"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>Email</Text>
          </View>
          <Text style={styles.text}>{current.email}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="numeric"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>Phone Number</Text>
          </View>
          <Text style={styles.text}>{current.phoneNumber}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="google-street-view"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>Address</Text>
          </View>
          <Text style={styles.text}>{current.shopAddress}</Text>
        </View>

        <View style={{marginTop:10}}>
          <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="card-account-details-outline"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>National_Id</Text>
          </View>
          <Text style={styles.text}>{current.National_id}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="card-bulleted"
                 color="black"
                 size={20}
                />
             <Text style={styles.text}>Pan_Number</Text>
          </View>
          <Text style={styles.text}>{current.Pan_Number}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="cards-variant"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>Post Number</Text>
          </View>
          <Text style={styles.text}>{current.Post_Number}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Icons style={{ paddingLeft: 0, marginRight: 5 }}
                 name="shopping"
                 color="black"
                 size={20}
                />
            <Text style={styles.text}>Shopname</Text>
          </View>
          <Text style={styles.text}>{current.shopname}</Text>
        </View>
      </View>
      <View style={{backgroundColor: "black", padding: 12}}>
      <View style={{ flexDirection: 'row', backgroundColor: "black", padding: 12 }}>
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
      </View>
        <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.SellerUpdatePassword)} style={{ marginLeft: 40, backgroundColor: "white", width: 50, height: 22, paddingLeft: 13, paddingRight: 10, borderRadius: 4 }} >
          <Text style={{ color: "black" }}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View>
          {account != '' ?
          <View>
              {account?.map((item)=>(
            <View>
              <TouchableOpacity style={{marginLeft:'80%',paddingLeft:4, paddingTop:5 , paddingBottom:5 , marginTop:10 , backgroundColor:"black"}} 
              onPress={() => navigation.navigate(navigationStrings.UpdateSellerBankAccount)} ><Text style={{color:"white" , marginLeft:30}}>Edit</Text></TouchableOpacity>
              <Text>Bank Account Details</Text>
              <View style={{ flexDirection: "row" , marginTop:10 }}>
                <View style={{flexDirection:'row' , alignItems:'center'}}>
                <Icons style={{ paddingLeft: 10, marginRight: 5 }}
                 name="bank"
                 color="black"
                 size={20}
                />
                <Text  style={{ marginLeft: 0 , color:"black" }}>Bank Name :</Text>
                </View>
                <Text style={{ marginLeft: 10 , color:"black" }}>{item?.BankName}</Text>
              </View>

              <View style={{ flexDirection: "row" ,  marginTop:10  }}>
                <View style={{flexDirection:'row' , alignItems:'center'}}>
                <Icons style={{ paddingLeft: 10, marginRight: 5 }}
                 name="numeric"
                 color="black"
                 size={20}
                />
                  <Text style={{ marginLeft: 0 , color:"black" }}>Bank Account num :</Text>
                </View>
                <Text style={{ marginLeft: 10 , color:"black" }}>{item?.accountNumber}</Text>
              </View>

              <View style={{ flexDirection: "row" ,  marginTop:10  }}>
                <View style={{flexDirection:'row' , alignItems:'center'}}>
                <Icon1 style={{ paddingLeft: 10, marginRight: 5 }}
                 name="address"
                 color="black"
                 size={20}
                />
                  <Text style={{ marginLeft: 0 , color:"black" }}>Bank address :</Text>
                </View>
                <Text style={{ marginLeft: 10 , color:"black" }}>{item?.BankAddress}</Text>
              </View>

              <View style={{ flexDirection: "row" ,  marginTop:10  }}>
                <View style={{flexDirection:'row' , alignItems:'center'}}>
                <Icons style={{ paddingLeft: 10, marginRight: 5 }}
                 name="rename-box"
                 color="black"
                 size={20}
                />
                  <Text style={{ marginLeft: 0 , color:"black" }}>Bank Account Name :</Text>
                </View>
                <Text style={{ marginLeft: 10 , color:"black" }}>{item?.accountName}</Text>
              </View>
            </View>
            ))}</View> :
            <View>
              <Text style={{marginLeft:10 , color:'green'}}>You don't add your Bank details</Text>
              <Text style={{marginLeft:10 , fontSize:15 , fontWeight:'800'}}>Add your bank details</Text>
              <TouchableOpacity style={{marginLeft:0  , backgroundColor:"black"}} onPress={() => navigation.navigate(navigationStrings.SellerBankAccount)}><Text style={{color:"white" , marginLeft:150 , paddingTop:5 , paddingBottom:5}}>Add Bank details</Text></TouchableOpacity>
            </View>
          }
      </View>
      <TouchableOpacity style={styles.logoutstyle} >
        <Text style={styles.logoutText} onPress={handleLogout}>Logout </Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

export default SellerInformation

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