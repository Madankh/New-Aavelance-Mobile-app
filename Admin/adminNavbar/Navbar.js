import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Badge } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { sellerLogout } from '../../redux/sellerSlice';
import navigationStrings from '../../constants/navigationStrings';
import axios from 'axios';
export default function Navbar() {
    const navigation = useNavigation();
    const admin = useSelector((state) => state.seller);
    let seller = admin?.currentSeller != null;

    const quantity = useSelector(state => state.cart.quantity);
    const dispatch = useDispatch();

    const handleclick = () => {
        dispatch(sellerLogout());
    }

    const [Products, setProducts] = useState([]);
    let accessToken = admin?.currentSeller?.accessToken;

    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get("http://139.162.11.30:80/api/order/get/proccessing/userOrders", {
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
  
    return (
        <SafeAreaView style={{ backgroundColor: 'black' }}>
            <View style={styles.main}>
                <View>
                    <Text style={{ color: "white", fontWeight: '900' }}>Aavelance</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingRight: 10, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{marginRight:13}} onPress={() => navigation.navigate(navigationStrings.Pendingorderlist)}>
                            <Image source={require("../../Images/icons8-order-64.png")} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                        <Badge value={Products.length} status="error" containerStyle={{ position: 'absolute', top: -6, left: 7, zIndex: 222222 }} />
                        {seller ? 
                        <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.ProductPage)}>
                          <Image source={require("../../Images/usericoon.png")} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity> 
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