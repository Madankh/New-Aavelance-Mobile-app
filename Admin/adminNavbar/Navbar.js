import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import { Badge } from 'react-native-elements';
import Logo from '../Images/logo.png'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { sellerLogout } from '../../redux/sellerSlice';
import navigationStrings from '../../constants/navigationStrings';

export default function Navbar() {
    const navigation = useNavigation();
    const admin = useSelector((state) => state.seller);
    let seller = admin?.currentSeller != null;
    console.log(seller)
    // console.log(id)
    const quantity = useSelector(state => state.cart.quantity);
    // console.log(quantity) 
    const dispatch = useDispatch();

    const handleclick = () => {
        dispatch(sellerLogout());
    }

    const [Products, setProducts] = useState([]);
    let accessToken = admin?.currentSeller?.accessToken;

    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get("http://192.168.18.4:5000/api/order/get/proccessing/userOrders", {
            headers: {
              token: accessToken
            }
          });
          setProducts(res.data)
        } catch (error) {
  
        }
      }
      getProducts();
    }, [0])
  
   console.log(Products.length)
    return (
        <SafeAreaView style={{ backgroundColor: 'black' }}>
            <View style={styles.main}>
                <View>
                    <Text style={{ color: "white", fontWeight: '900' }}>Aavelance</Text>
                    {/* <Image source={require('../Images/logo.png')} style={{width:55 , height:17, marginTop:10}}/> */}
                </View>
                <View style={{ flexDirection: 'row', paddingRight: 10, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        
                        <Icon1 onPress={() => navigation.navigate(navigationStrings.Pendingorderlist)}
                            style={{ paddingRight: 20 }}
                            name="bell"
                            color="white"
                            size={20}
                        />
                        <Badge value={Products.length} status="error" containerStyle={{ position: 'absolute', top: -6, left: 7, zIndex: 222222 }} />

                        {seller ? 
                        <View style={{ flexDirection: 'row' }}>

                        <Icon1 onPress={() => navigation.navigate(navigationStrings.ProductPage)}
                            name="user-circle"
                            color="white"
                            size={20}
                            /> 
                          <Text style={{ color: 'white', fontWeight: "600", marginLeft: 15, marginRight: -14 }} onPress={handleclick}>Logout</Text>
                        </View>
                        : <Text onPress={() => navigation.navigate(navigationStrings.SellerSignin)} style={{ color: "white", fontWeight: '900' }}>Login</Text>
                        }
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "90%",
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10
    }
})