import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React , {useState , useEffect} from 'react'
import { useSelector } from 'react-redux';
import Topheader from '../HomeComponent/Topheader';
import { publicRequest } from '../redux/requestMethod';
import axios from 'axios';

export default function UserIncome() {
  const user = useSelector((state) => state.user);
  let accessToken = user?.currentUser?.accessToken;
  let current = user?.currentUser?.others;
  const [revanue , setrevanue] = useState('');

  useEffect(() => {
    const income = async () => {
      try {
        const res = await axios.get('http://139.162.11.30:80/api/order/get/affid/userOrder', {
          headers: {
            token: accessToken
          }
        })
        await setrevanue(res.data);
      } catch (error) {
      }
    }
    income();
  }, [0])
  
  
  return (
    <ScrollView>
      <SafeAreaView>
        <Topheader />
        <View style={{}}>
          <Text style={{textAlign:"center" , fontSize:17 , color:"black" , fontWeight:"700"}}>Your Income</Text>
          <View style={{ backgroundColor: 'white' }}>
            <View style={styles.revanueContainer}>
              <Text style={{ fontWeight: "600", fontSize: 14, color: 'black', marginLeft:0 }}>Net Revenue</Text>
              <Text style={{color:"green"  , fontSize:19 , fontWeight:"800"}}>NPR {revanue?.Income}</Text>
              <Text style={{ color: 'black' , fontSize: 13 }}>28 days Net revanue</Text>
            </View>

            <View style={styles.revanueContainer}>
              <Text style={{ fontWeight: "600", fontSize: 14, color: 'black' }}>Sales</Text>
              <Text style={{color:"green"  , fontSize:19 , fontWeight:"800"}}>NPR {revanue?.Sales}</Text>
              <Text style={{ color: 'black' , fontSize: 13 }}>28 days sales</Text>
            </View>

        

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
    width: 340,
    margin: 5,
    backgroundColor: '#E5E5E5',
    paddingLeft: 7,
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    height: 90,
    marginTop:10
    // alignItems: 'center'
  },
  textForMenu: {
    marginLeft: 6,
  }
})