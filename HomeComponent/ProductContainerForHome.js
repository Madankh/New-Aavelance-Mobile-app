import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings'

export default function ProductContainerForHome(item) {
          const [maxRating , setmaxRating] = useState([1 , 2 , 3 , 4 , 5]);
          const navigation = useNavigation();
          const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
          const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';
          const items = item.item
  return (
    <View style={{backgroundColor:"white" , marginLeft:16 , marginTop:10 , borderRadius:10}}>
      <TouchableOpacity key={items?._id} onPress={() => navigation.navigate(navigationStrings.DetailsScreen , {items})} >
              <View  style={styles.subchild} key={items?.items?.id} >
                {items?.img?.slice(0,1).map((img)=>(
                  <FastImage style={styles.img} source={{ uri: img}} resizeMode={FastImage.resizeMode.contain} />
                ))}
                <Text style={styles.text1}>{items?.title.slice(0 , 60)}.....</Text>

                <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: 4 }}>
                    {
                      maxRating.map((itemss, key) => {
                        return (
                          <TouchableOpacity activeOpacity={0.7} key={itemss}>
                            <FastImage style={{ width: 20, height: 16,  marginBottom: 10 , marginLeft:5 }} resizeMode={FastImage.resizeMode.contain} source={itemss <= items?.ratings ? { uri: starImgFilled } : { uri: starImgCorner }} />
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                </View>
                <Text style={styles.text2}>NPR {items?.price}</Text>
              </View>
            </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
          text: {
            width: '100%',
            color: 'black',
            fontSize: 22,
            marginTop: 16,
            padding: 3,
            marginBottom: 14,
            fontWeight: '900',
            marginLeft: 6
          },
          text2: {
            color: 'black',
            fontSize: 13,
            fontWeight: '900',
            marginLeft: 8,
            marginTop: 0,
            marginBottom: 4
          },
          img: {
            width: 139, height: 139,marginLeft:10, borderRadius: 1, marginTop:10,  resizeMode: FastImage.resizeMode.contain
          },
          text1: {
            color: 'black',
            width: 166,
            marginLeft: 10,
            fontSize:12
          },
          submain: {
            flexDirection: 'row'
          },
          submainpost:{
            flexDirection:"row",
            backgroundColor:"black"
          },
          subchild: {
            marginRight: -0,
          },

        })