import { StyleSheet,Text,View,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import React from 'react'

const OPTIONS = ['S','M','ML', 'L' , 'XL' , 'XXL' , '3X-L' , '4X-L'];
const WIDTH = Dimensions.get('window').width;

const SizeModalPicker = (props) => {
  const onPressItem = (option)=>{
    props.changeModalVisibility1(false);
    props.setData2(option);
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
    <TouchableOpacity onPress={()=> props.changeModalVisibility1(false)}
      style={styles.container}>
      <View style={[styles.modal , {width:WIDTH - 15 , height:300 , marginTop:40}]}>
        <ScrollView>
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )}

export {SizeModalPicker}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:"center"
  },
  modal:{
    backgroundColor:"white",
    borderRadius:10
  },
  option:{
    alignItems:'flex-start',
  },
  text:{
    margin:20,
    fontSize:20,
    marginTop:11,
    color:"black"
  }
})