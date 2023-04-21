import { StyleSheet,Text,View,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import React from 'react'

const OPTIONS = ["Kid's Fashion" , "Beauty and Personal Care" , "Women's Fashion" , "Men's Fashion"  ];
const WIDTH = Dimensions.get('window').width;

const CategoriesModalPicker = (props) => {
  const onPressItem = (option)=>{
    props.changeModalVisibility(false);
    props.setData(option);
  }
  const option = OPTIONS.map((item , index)=>{
    console.log(item)
    return (
      <TouchableOpacity style={styles.option} key={index} onPress={()=> onPressItem(item)}>
         <Text style={styles.text}>
           {item}
         </Text>
      </TouchableOpacity>
    )
  })
  return (
    <TouchableOpacity onPress={()=> props.changeModalVisibility(false)}
      style={styles.container}>
      <View style={[styles.modal , {width:WIDTH - 5 , height:200 , marginTop:300}]}>
        <ScrollView>
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )}

export {CategoriesModalPicker}

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