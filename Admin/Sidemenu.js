import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons2 from 'react-native-vector-icons/MaterialIcons';
export default function Sidemenu() {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flex: 1.56, backgroundColor: 'white' }}>
        <View >
          <Text style={styles.textForDashbord}>Dashboard</Text>
          <View style={{flexDirection:'row' , alignItems:"center", marginTop:4}}>
           <Icons style={{ paddingLeft: 10, marginRight: 5 }}
              name="bank"
              color="black"
              size={20}
              />
            <Text style={styles.textForMenu} onPress={() => navigation.navigate(navigationStrings.AmHome)}>Home</Text>
          </View>
          <View style={{flexDirection:'row' , alignItems:"center" , marginTop:4}}>
          <Icons style={{ paddingLeft: 10, marginRight: 5 }}
              name="sale"
              color="black"
              size={20}/>
            <Text style={styles.textForMenu} onPress={() => navigation.navigate(navigationStrings.Sales)}>Sales</Text>
          </View>
          <View style={{flexDirection:'row' , alignItems:"center" , marginTop:4}}>
            <Icons style={{ paddingLeft: 10, marginRight: 5 }}
              name="shopping"
              color="black"
              size={20}
              />
            <Text style={styles.textForMenu} onPress={() => navigation.navigate(navigationStrings.ProductPage)}>Shop Page</Text>
          </View>
          <View style={{flexDirection:'row' , alignItems:"center" , marginTop:4}}>
          <Icons style={{ paddingLeft: 10, marginRight: 5 }}
              name="cloud-upload-outline"
              color="black"
              size={20}
              />
            <Text style={styles.textForMenu} onPress={() => navigation.navigate(navigationStrings.CreateProduct)}>Upload Product</Text>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' , marginTop:4 }}>
          <Text style={styles.textForDashbord}>Menu</Text>
          <View style={{flexDirection:'row' , alignItems:"center" , marginTop:3}}>
          <Icons style={{ paddingLeft: 10, marginRight: 5 }}
              name="format-list-bulleted"
              color="black"
              size={20}
              />
            <Text style={styles.textForMenu} onPress={() => navigation.navigate(navigationStrings.ProductList)}>ProductList</Text>
          </View>
          <View style={{flexDirection:'row' , alignItems:"center" , marginTop:3}}>
          <Icons style={{ paddingLeft: 10, marginRight: 5 }}
              name="bank-transfer-out"
              color="black"
              size={20}
              />
            <Text style={styles.textForMenu} onPress={() => navigation.navigate(navigationStrings.SellerTransaction)}>Transaction</Text>
          </View>
          <View style={{flexDirection:'row' , alignItems:"center" ,marginTop:3 }}>
          <Icons2 style={{ paddingLeft: 10, marginRight: 5 }}
              name="pending-actions"
              color="black"
              size={20}
              />
            <Text style={styles.textForMenu} onPress={() => navigation.navigate(navigationStrings.Pendingorderlist)}>Pending Orders</Text>
          </View>

          <View style={{flexDirection:'row' , alignItems:"center" ,marginTop:3 }}>
          <Icons2 style={{ paddingLeft: 10, marginRight: 5 }}
              name="pending-actions"
              color="black"
              size={20}
              />
            <Text style={styles.textForMenu} onPress={() => navigation.navigate(navigationStrings.Returnorder)}>Return Orders</Text>
          </View>

          <View style={{flexDirection:'row' , alignItems:"center" , marginTop:3}}>
          <Icons2 style={{ paddingLeft: 10, marginRight: 5 }}
              name="live-tv"
              color="black"
              size={20}
              />
            <Text style={styles.textForMenu} onPress={() => navigation.navigate(navigationStrings.GoLive)}>Go live</Text>
          </View>
        </View>
      </View>
      
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
    borderRadius: 10
  },
  textForMenu: {
    marginLeft: 0,
    width: 300,
    fontWeight: '800'

  }
})