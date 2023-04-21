import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import navigationStrings from '../constants/navigationStrings'
import { useNavigation } from '@react-navigation/native'

export default function Product(items) {
   const navigation = useNavigation();
   const [maxRating , setmaxRating] = useState([1 , 2 , 3 , 4 , 5]);
   const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
   const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';
  return (
    <View>
      <TouchableOpacity style={styles.oneproductContainer1} key={items.items._id} onPress={() => navigation.navigate(navigationStrings.DetailsScreen , {items})}>
            <View style={styles.subchild} >
              {items?.items?.img?.slice(0,1).map((img)=>(
                <Image style={styles.img} source={{ uri: img}} />
              ))}
              <Text style={styles.text1}>{items?.items?.title.slice(0 , 60)}</Text>
              <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: 4 , marginLeft:5 }}>
                  {
                    maxRating.map((itemss, key) => {
                      return (
                        <TouchableOpacity activeOpacity={0.7} key={itemss}>
                          <Image style={{ width: 20, height: 16, resizeMode: 'contain', marginBottom: 10 }} source={itemss <= items?.items?.ratings ? { uri: starImgFilled } : { uri: starImgCorner }} />
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </View>
              <Text style={styles.text2}>NPR {items?.items?.price}</Text>
            </View>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
          text: {
            width: '97%',
            color: 'white',
            fontSize: 22,
            marginTop: 16,
            padding: 3,
            marginBottom: 14,
            backgroundColor: 'black',
            fontWeight: '900',
            marginLeft: 6,
            borderRadius:3
          },
          text2: {
            color: 'black',
            fontSize: 16,
            fontWeight: '700',
            marginLeft: 8,
            marginTop: -4,
            marginBottom: 4
          },
          img: {
            width: '90%', height: 139,marginLeft:10, borderRadius: 1, marginTop:10,  resizeMode: 'contain'
          },
          text1: {
            color: 'black',
            width: 166,
            marginLeft: 10,
            fontSize:13
          },
          submain: {
            flexDirection:"row",
        
        
          },
          submainpost:{
            flexDirection:"row",
            backgroundColor:"black",
            
          },
          subchild: {
            marginRight: -0
          }
        })