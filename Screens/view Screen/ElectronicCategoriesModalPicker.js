import { StyleSheet,Text,View,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import React from 'react'

const OPTIONS = ["T-Shirts" , "Girl T-Shirts" , "Shirts" , "Boy Sweaters , Sweatshirts" , "Girl Sweaters , Sweatshirts" , "Boy Jackets" , "Girl Jackets" , "Coats" , "Suits" , "Jeans" , "Shorts" , "Track Pants","Casual Shoes" , "Sandals and Floaters" , "Ethnic Wear" , "Boy Nightwear , Loungewear" , "Girl Nightwear , Loungewear" , "Shoes" , "Sandals , Heels" , "Flats , Flipflops" ];
const WIDTH = Dimensions.get('window').width;

const ElectronicCategoriesModalPicker = (props) => {
  const onPressItem = (option)=>{
    props.subchangeModalVisibility(false);
    props.setsubData(option);
  }
  const option = OPTIONS.map((item , index)=>{
    return (
      <TouchableOpacity style={styles.option} key={index} onPress={()=> onPressItem(item)}>
         <Text style={styles.text}>
           {item}
         </Text>
      </TouchableOpacity>
    )
  })
  return (
    <TouchableOpacity onPress={()=> props.subchangeModalVisibility(false)}
      style={styles.container}>
      <View style={[styles.modal , {width:WIDTH - 5 , height:200 , marginTop:400}]}>
        <ScrollView>
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )}

export {ElectronicCategoriesModalPicker}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:"center"
  },
  modal:{
    backgroundColor:"black",
    borderRadius:10
  },
  option:{
    alignItems:'flex-start'
  },
  text:{
    margin:20,
    fontSize:14,
    marginTop:11,
    color:"white"
  }
})