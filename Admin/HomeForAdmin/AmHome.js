import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Sidemenu from '../Sidemenu';
import { useSelector } from 'react-redux';
import Navbar from '../adminNavbar/Navbar';
import { publicRequest } from '../../redux/requestMethod';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import navigationStrings from '../../constants/navigationStrings';


export default function AmHome() {
  const navigation = useNavigation();
  const admin = useSelector((state) => state.seller);
  let accessToken = admin.currentSeller.accessToken;

  const [status , setStatus] = useState('Pending')
  const [transaction , setTransaction] = useState([]);
  const [sellerorders, setSellerOrders] = useState([]);

  useEffect(() => {
    const sellerorder = async () => {
      try {
        const res = await publicRequest.get('/order/get/userOrder', {
          headers: {
            token: accessToken
          }
        });
        setSellerOrders(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    sellerorder();
  }, [0])

  const amount = sellerorders?.amount;

    useEffect(() => {
      const PostRevenue = async()=>{
        try {
          {amount === undefined ? console.log("wait for a secound") :
          fetch(
           'http://192.168.18.4:5000/api/transfer/money', {method: 'POST',
            headers: { 'Content-Type': 'application/json' , token : accessToken },
            body: JSON.stringify({
              amount : sellerorders.amount,
              status : status,
           })})
           .then(response => {
             response.json()
               .then(data => {
                 if(data.success == true){
                   console.log("suman")
                 }else{
                  console.log("Time doesn't match")
                 }
               });
           })}
       }
       catch (error) {
         console.error(error);
       }
      }
      PostRevenue();
    }, [0])

   

  return (
    
    <>
      <SafeAreaView>
        <Navbar />
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <Sidemenu />
            <View style={{ flex: 3, backgroundColor: 'white' }}>

              <View style={styles.revanueContainer}>
                <Text style={{ fontWeight: "600", fontSize: 18, color: 'black' }}>Net revenue</Text>
                <Text style={{ fontWeight: "600", fontSize: 20 , color:"green" }}>NPR {sellerorders?.amount}</Text>
                <Text style={{ color: 'black' }}>7 days Net revenue</Text>
              </View>

              <View style={styles.revanueContainer}>
                <Text style={{ fontWeight: "600", fontSize: 18, color: 'black' }}>Sales</Text>
                <Text style={{ fontWeight: "600", fontSize: 20 , color:"green"}}>NPR {sellerorders?.Sales}</Text>
                <Text style={{ color: 'black' }}>7 days Sales</Text>
              </View>

              <View style={styles.revanueContainer}>
                <Text style={{ fontWeight: "600", fontSize: 18, color: 'black' }}>Marketplace Cost</Text>
                <Text style={{ fontWeight: "600", fontSize: 20 , color:"green" }}>NPR {sellerorders?.marketplace}</Text>
                <Text style={{ color: 'black' }}>7 days Marketplace cost</Text>
              </View>

            </View>
          </View>

        </ScrollView>

        <View style={styles.pendingOrder} >
          <View>
            <View style={styles.orderText}>
              <Icon onPress={() => navigation.navigate(navigationStrings.Search)} style={{ paddingRight: 20 }}
                name="reorder" color="white" size={20} />
              <Text style={{ color: "white", marginTop: 0, fontSize: 20 }}>Pending orders</Text>
            </View>
            {/* <Text style={{ color: "white", marginLeft: 36 }}>12</Text> */}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.Pendingorderlist)}>
            <Text style={styles.showtext}>Show more</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pendingOrder}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon1 onPress={() => navigation.navigate(navigationStrings.Search)} style={{ paddingRight: 20 }} name="credit" color="white" size={20} />
              <Text style={{ color: "white", marginTop: 0, fontSize: 20 }}>Sales summary</Text>
            </View>
            {/* <Text style={{ color: "white", marginLeft: 36 }}>12</Text> */}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.Sales)}>
            <Text style={{ color: "white", marginLeft: 20, marginBottom: 50, fontSize: 14, fontWeight: '600' }}>Show more</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  textForDashbord: {
    margin: 4,
    fontSize: 18,
    color: 'black',
    fontWeight: '600'
  },
  revanueContainer: {
    width: 300,
    margin: 5,
    backgroundColor: '#E5E5E5',
    paddingLeft: 7,
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    height: 100,
  },
  textForMenu: {
    marginLeft: 4,
    width: 300,

  },
  pendingOrder: {
    backgroundColor: 'black',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10
  },
  orderText: {
    flexDirection: 'row', alignItems: 'center'
  },
  showtext: {
    color: "white",
    marginLeft: 20,
    marginBottom: 50,
    fontSize: 14,
    fontWeight: '600'
  }
})