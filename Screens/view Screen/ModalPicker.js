import { StyleSheet,Text,View,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import React from 'react'

const OPTIONS = ['Cash on Delivery' , 'None'];
const WIDTH = Dimensions.get('window').width;

const ModalPicker = (props) => {
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
      <View style={[styles.modal , {width:WIDTH - 35 , height:50 , marginTop:400}]}>
        <ScrollView>
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )}

export {ModalPicker}

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
    alignItems:'flex-start'
  },
  text:{
    margin:20,
    fontSize:20,
    marginTop:11,
    color:"black"
  }
})