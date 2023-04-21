import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import navigationStrings from '../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import category from '../Screens/consts/category';
import category2 from "../Screens/consts/category2"

export default function Categories() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  return (
    <>

      <Text style={styles.showmoretext} onPress={() => navigation.navigate(navigationStrings.MainCategoryforButtonTab)} >Show more</Text>
      <ScrollView horizontal >
        <View style={styles.TopView}>
          {category.map((item) => (
            <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.Products, { item })} key={item.id}>
              <View style={styles.mainView}>
                <Text style={styles.CatText}>{item.name.slice(0, 14)}</Text>
                <Image style={styles.img} source={item.img} />
              </View>
            </TouchableOpacity>
          ))}

        </View>
      </ScrollView>
      <View>
        {category2.map((item) => (
          <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.Products, { item })}>
            <View style={styles.mainView1} key={item.id}>
              <Text style={styles.CatText} >{item?.name}</Text>
              <Image style={styles.img} source={item?.img} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  mainView: {
    marginLeft: 5,
    marginRight: 10,
    marginBottom: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 180
  },
  mainView1: {
    width: '100%',
    marginLeft: 5,
    marginRight: 10,
    marginBottom: 0,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  TopView: {
    marginTop: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10
  },
  CatText: {
    color: 'black', alignSelf: 'center',
    width: 250,
    paddingTop: 4, paddingBottom: 4, paddingLeft: 80, paddingRight: 0
  },
  img: {
    width: '100%', height: 200, marginLeft: 0, borderRadius: 10
  },
  showmoretext: {
    color: 'white',
    alignSelf: 'flex-end',
    marginBottom: -10,
    marginTop: 4,
    fontWeight: "900"
  }



})