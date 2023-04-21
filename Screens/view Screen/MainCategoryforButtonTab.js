import { View, Text, SafeAreaView,StyleSheet, Icon, TextInput, TouchableOpacity,FlatList, Dimensions, ScrollView, Image } from 'react-native';
import React from 'react';
import categoryDetails from '../consts/categoryDetails';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';
import Topheader from '../../HomeComponent/Topheader';
import { useSelector } from 'react-redux';
const width = Dimensions.get("screen").width / 2 - 25;

const MainCategoryforButtonTab = () => {
  const navigation = useNavigation();
  const user = useSelector((state)=> state.user);
  let cat;
  const Card = ({ item }) => {
    return (
      <>
      <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.Products , {item} )}>
        <View style={style.card}>
          <View style={style.imgContainer} >
            <Image source={item.img} style={{ flex: 1, resizeMode:'cover', width:'110%' }} />
          </View>
        </View>
          <Text style={style.productTitle}>{item?.name}</Text>
      </TouchableOpacity>
      </>
    )
  }
  return (
    <>
      <SafeAreaView style={{ paddingHorizontal: 10, backgroundColor: 'black' , marginBottom:40 , height:999 }}>
        <Topheader/>
        <FlatList 
        showsVerticalScrollIndicator={false}
        numColumns={2} data={categoryDetails}
        renderItem={({ item }) => <Card item={item} />} />
      </SafeAreaView>
        </>
  );
};


const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    // height: 180,
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 14,
  },
  imgContainer:{
    height: 120, alignItems: 'center', width: 150
  },
  productTitle:{
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 24, 
    marginLeft:12 , 
    color:"white"
  }
})

export default MainCategoryforButtonTab;