import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import navigationStrings from '../constants/navigationStrings'
import Header from '../HomeComponent/Header'
import Topheader from '../HomeComponent/Topheader'
import Slider from '../HomeComponent/Slider'
import Categories from '../HomeComponent/Categories'
import ButtomTabs from '../HomeComponent/ButtomTabs'
import Subcategories from '../HomeComponent/Subcategories'
import Subcategories1 from '../HomeComponent/Subcategories1'
import Subcategories2 from '../HomeComponent/Subcategories2'
import Subcategories3 from '../HomeComponent/Subcategories3'
import { useNavigation } from '@react-navigation/native';
import Productpage from '../Admin/ProductPage/ProductPage'
import { useSelector } from 'react-redux'

import AmHome from '../Admin/HomeForAdmin/AmHome'
import Subcategories4 from '../HomeComponent/Subcategories4'


export default function Home(id) {
    const navigation = useNavigation();
    const user = useSelector((state)=> state.user);
    console.log(user)

    const admin = useSelector((state)=> state.seller);
    let seller = admin.currentSeller
    return (
        <>
                {seller ? 
                <AmHome/>
                 :<>
                <Topheader />
                 <ScrollView>
                        <View style={{ backgroundColor: 'black' }}>
                            <Slider />
                            <Categories />
                            <Header />
                            <Subcategories1 />
                            <Subcategories2 />
                            <Subcategories3 />
                            {/* <Subcategories /> */}
                            <Subcategories4 />
                        </View>
                    </ScrollView>
                   <ButtomTabs />
                   </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        marginTop: 30,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },

})