import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React , {useState , useEffect} from 'react'
// import { Dimensions } from "react-native";
// import {LineChart} from "react-native-chart-kit";
import Sidemenu from '../Sidemenu'
import { useSelector } from 'react-redux';
import Navbar from '../adminNavbar/Navbar';
import { publicRequest } from '../../redux/requestMethod';

export default function Income() {
  const admin = useSelector((state) => state.seller);
  let seller = admin.currentSeller;
  let accessToken = admin.currentSeller.accessToken;
  console.log(seller)

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
  
  console.log(sellerorders)

  return (
    <ScrollView>
      <SafeAreaView>
        <Navbar />
        <View style={{ flexDirection: "row" }}>
          <Sidemenu />
          <View style={{ flex: 3, backgroundColor: 'white' }}>
            <View style={styles.revanueContainer}>
              <Text style={{ fontWeight: "600", fontSize: 14, color: 'black' }}>Net revenue</Text>
              <Text>{sellerorders.amount}</Text>
              <Text style={{ color: 'black' , fontSize: 13 }}>This week Net revanue</Text>
            </View>

            <View style={styles.revanueContainer}>
              <Text style={{ fontWeight: "600", fontSize: 14, color: 'black' }}>Sales</Text>
              <Text>{sellerorders.Sales}</Text>
              <Text style={{ color: 'black' , fontSize: 13 }}>This week sales</Text>
            </View>

            <View style={styles.revanueContainer}>
              <Text style={{ fontWeight: "600", fontSize: 14, color: 'black' }}>Marketplace cost</Text>
              <Text>{sellerorders.marketplace}</Text>
              <Text style={{ color: 'black' , fontSize: 13 }}>This week Marketplace cost</Text>
            </View>

            <View style={styles.revanueContainer}>
              <Text style={{ fontWeight: "600", fontSize: 14, color: 'black' }}>Previous Weeks revenue</Text>
              <Text>$2,415</Text>
              <Text style={{ color: 'black' , fontSize: 13 }}>Previous Weeks Revanue</Text>
            </View>

            <View style={styles.revanueContainer}>
              <Text style={{ fontWeight: "600", fontSize: 14, color: 'black' }}>2 weeks revenue</Text>
              <Text>$2,415</Text>
              <Text style={{ color: 'black' , fontSize: 13 }}>2 weeks Sales</Text>
            </View>

            {/* <View style={styles.revanueContainer}>
              <Text style={{ fontWeight: "600", fontSize: 14, color: 'black' }}>3 months ago net revenue</Text>
              <Text>$2,415</Text>
            </View> */}

            {/* <View style={styles.revanueContainer}>
              <Text style={{ fontWeight: "600", fontSize: 18, color: 'black' }}>3 months ago Sales</Text>
              <Text>$2,415</Text>
              <Text style={{ color: 'black' }}>3 months ago Revanue</Text>
            </View>

            <View style={styles.revanueContainer}>
              <Text style={{ fontWeight: "600", fontSize: 18, color: 'black' }}>1 year revanue</Text>
              <Text>$2,415</Text>
              <Text style={{ color: 'black' }}>1 year Revanue</Text>
            </View> */}

            {/* <View style={styles.revanueContainer}>
              <Text style={{ fontWeight: "600", fontSize: 18, color: 'black' }}> 1 year sales</Text>
              <Text>$2,415</Text>
              <Text style={{ color: 'black' }}>1 year Sales</Text>
            </View> */}

            <View>

            </View>
          </View>
        </View>
        <View>

        </View>
      </SafeAreaView>
    </ScrollView>
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
    alignItems: 'center'
  },
  textForMenu: {
    marginLeft: 6,
  }
})