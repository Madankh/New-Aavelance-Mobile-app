import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity , Image } from 'react-native'
import React from 'react'
import { Badge } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings';
import SearchIcon from "../Images/icons8-search-32.png"
import cart from "../Images/icons8-fast-cart-30.png"
import profileicon from "../Images/usericoon.png"
import charIcon from "../Images/icons8-chat-32.png"
import { useSelector } from 'react-redux'
export default function Topheader(id) {
    const navigation = useNavigation();
    const users = useSelector((state)=> state.user);
    let user = users.currentUser != null;
    console.log(user)
    const quantity = useSelector(state=> state.cart.quantity);

    
 return (
        <SafeAreaView style={{backgroundColor:'black'}}>
            <View style={styles.main}>
                <TouchableOpacity onPress={() =>  navigation.navigate(navigationStrings.Home)}>
                    <Text style={{ color: "white", fontWeight: '900'  }}>Aavelance</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', paddingRight: 10, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                       <TouchableOpacity onPress={() =>  navigation.navigate(navigationStrings.Search)}>
                            <Image source={SearchIcon} style={{ width: 23, height: 23, marginLeft:0 ,paddingLeft: 14 }} />
                       </TouchableOpacity>


                        <TouchableOpacity onPress={() =>  navigation.navigate(navigationStrings.Cart)}>
                            <Image source={cart} style={{ width: 20, height: 20, paddingLeft: 14 ,marginLeft:20 }} />
                        <Badge value={quantity} status="error" containerStyle={{ position: 'absolute', top: -6, left: 33, zIndex: 222222 }} />
                        </TouchableOpacity>
                    {user ?
                    <TouchableOpacity onPress={() =>  navigation.navigate(navigationStrings.UserProfileFeed)}>
                        <Image source={profileicon} style={{ width: 23, height: 20, marginLeft:19 ,paddingLeft: 14 }}  />
                    </TouchableOpacity> 
                       : <Text onPress={() =>  navigation.navigate(navigationStrings.Signin)} style={{color:"white",marginLeft:20 , fontWeight:'900'}}>Login</Text>
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