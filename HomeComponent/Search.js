import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SearchIcon from "../Images/icons8-search-32.png"
import navigationStrings from '../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
export default function Search() {
    const navigation = useNavigation();
    const [Searchvalue , setSearchvalue] = useState();
    const handleChangePage = (value)=>{
        if(value == "Enter"){
            console.log("Suman done")
        }
    }
    console.log(Searchvalue);
    return (
        <SafeAreaView>
            <View style={styles.main}>
                <View style={{flexDirection:'row' , alignItems:'center' , backgroundColor:"black" , borderRadius:10 , marginRight:70}}>
                   <Image source={SearchIcon} style={{ width: 23, height: 23, marginLeft:15 ,paddingLeft: 14 }} />
                    <TextInput  style={styles.textInput} placeholder={"Search products...."} onChangeText={(value)=>setSearchvalue(value)} placeholderTextColor={'white'}  />
                    <TouchableOpacity style={{marginLeft:10 , backgroundColor:'lightblue' , paddingTop:10, paddingBottom:10 , paddingLeft:10, paddingRight:10 , borderRadius:10}} onPress={() => navigation.navigate(navigationStrings.SearchProducts , {Searchvalue} )}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        padding: 8,
        // backgroundColor:"black"
    },
    textInput: {
        width: '86%',
        borderWidth: 1,
        height: 43,
        borderRadius: 10,
        color: "white",
        paddingLeft: 10,
        marginTop: 1,
        
    }
})