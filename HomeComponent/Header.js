import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import navigationStrings from '../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
export default function Header() {
    const user = useSelector((state)=> state.user);
    let accessToken = user?.currentUser?.accessToken;
    let current = user?.currentUser?.others;
    const navigation = useNavigation();
    const [active, setActive] = useState("")
    if(active == "Live Stream" ){
        navigation.navigate(navigationStrings.Livestream)
    }else if(active == "Your Feed"){
        navigation.navigate(navigationStrings.UserFeed)
    }else if(active == "Product"){
        navigation.navigate(navigationStrings.Home)
    }
    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
                <HeaderButton text="Discover" btnColor="black" textColor="white" active={active} setActive={setActive} />
                <HeaderButton text="Makeup" btnColor="black" textColor="white" active={active} setActive={setActive} />
                <HeaderButton text="Fashion" btnColor="white" textColor="black" active={active} setActive={setActive} />
                
            </View>
        </ScrollView>
    )
}

const HeaderButton = (props) => (
    <TouchableOpacity style={{
        backgroundColor: props.active == props.text ? "white" : "black", paddingVertical: 8, borderRadius: 30, paddingHorizontal: 16, marginTop: 10,marginLeft:10, shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 }, shadowOpacity: 1, shadowRadius: 2, elevation: 5
    }} onPress={() => props.setActive(props.text)}>
        <Text style={{ color: props.active == props.text ? "black" : "white", fontSize: 15, fontWeight: '900', }}>{props.text}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    main: {

    }

})