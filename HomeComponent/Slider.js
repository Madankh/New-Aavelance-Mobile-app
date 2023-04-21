import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import navigationStrings from '../constants/navigationStrings'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Slider = () => {
  const navigation = useNavigation();
  const user = useSelector((state)=> state.user);
  return (
    <View style={styles.mainSliderContainer}>
      <ImageBackground style={styles.sliderContainer} source={require("../Images/Slider2.png")} imageStyle={{ borderRadius: 10 }}>
        <Text style={styles.mainTitle} >Welcome to Aavelance</Text>
        <Text style={styles.SubTitle} >Buy your favourite Fashion Products </Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buyTitle}>Buy Now</Text>
        </TouchableOpacity>
      </ImageBackground>

    </View>
  )
}
export default Slider
const styles = StyleSheet.create({
  mainSliderContainer:{
    backgroundColor: 'black',
    justifyContent: 'space-between',
    borderRadius: 2
  },
  sliderContainer:{
    width: "98%",
    marginLeft:10,
    height: 180,
    borderRadius: 50
  },
  mainTitle:{
      fontSize: 15,
      fontWeight: '800',
      color: 'black',
      marginTop: 50, marginLeft: 10
  },
  SubTitle:{
    color: 'black',
    fontSize: 12, 
    fontWeight: '400', 
    marginLeft: 10,
    width:180
  },
  buttonContainer:{
    width: 70,
    color: 'white',
    backgroundColor: 'black',
    marginLeft: 6,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 10 ,
    alignContent:'center'
  },
  buyTitle:{
    color: 'white',
    marginLeft: 7
  }
})
