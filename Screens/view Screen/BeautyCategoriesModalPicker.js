import { StyleSheet,Text,View,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import React from 'react'

const OPTIONS = ["Beauty Tools" , "Hair Care" , "Skin Care" , "Lipstick" , "Lip Gloss" , "Lip Liner" , "Mascara" , "Eyeliner" , "Kajal" , "Foundation" , "Nail Polish" , "Face Moisturiser" , "Cleanser" , "Face Wash & Eye Cream" , "Sunscreen" , "Body Lotion" , "Lip Balm" , "Body Wash" , "Body Scrub" , "Shampoo" , "Hair Cream" , "Hair Oil" , "Hair Gel" , "Hair Color" , "Hair Accessory" , "Fragrances" , "Men's Grooming" ];
const WIDTH = Dimensions.get('window').width;

const BeautyCategoriesModalPicker = (props) => {
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

export {BeautyCategoriesModalPicker}

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