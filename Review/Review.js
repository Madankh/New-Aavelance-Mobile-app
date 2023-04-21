import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function Review(product) {
    const navigation = useNavigation();
    const user = useSelector((state) => state.user);
    let accessToken = user.currentUser.accessToken;
    let id = product?.route?.params._id
    console.log(id);

    const [comment , setcomment] = useState();
    const [defaultRating , setdefaultRating] = useState(0);
    const [maxRating , setmaxRating] = useState([1 , 2 , 3 , 4 , 5]);

    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';
    const CustomRatingBar = ()=>{
      return (
        <View style={{justifyContent:"center" , flexDirection:'row' , marginTop:30}}>
          {
            maxRating.map((item , key) => {
              return (
                <TouchableOpacity activeOpacity={0.7} key={item}
                 onPress={()=> setdefaultRating(item)}>
                  <Image style={{width:30 , height:24,resizeMode:'contain' , marginBottom:10}} source={item <= defaultRating ? {uri: starImgFilled}: {uri:starImgCorner}}/>
                </TouchableOpacity>
              )
            })
          }
        </View>
      )
    }
    const handleSubmit = async()=>{
      try {
            await fetch(`http://192.168.18.143:5000/api/products/reviews/product`, {method: 'PUT',
              headers: { 'Content-Type': 'application/json' , token : accessToken },
              body: JSON.stringify({
                productid: id , comment : comment , rating:defaultRating
              })}).then(response => {
                response.json()
                  .then(data => {
                    console.log(data)
                  });
              })
          }catch (error) {
            console.error(error);
          }
}
  return (
    <View style={{backgroundColor:"black"}}> 
      <Text style={{color:"black" , fontSize:25 , alignSelf:'center' , fontWeight:'800'}}>Write a Review</Text>
      {/* <Text style={{color:"black" , marginTop:20, fontSize:20 , marginLeft:19 }}>Your Name</Text> */}
      <View>
       <CustomRatingBar/>
       <Image 
       />
      </View>
      <TextInput multiline={true} style={{backgroundColor:'white' , height:150 , marginLeft:10 , marginRight:10 , borderTopLeftRadius:20 , marginBottom:10 , borderBottomRightRadius:20}} onChangeText={(value)=> setcomment(value)}/>
      <TouchableOpacity style={{backgroundColor:'black', width:70 , marginLeft:290 , paddingTop:6 , paddingBottom:6 , borderRadius:5 }}>
          <Text style={{alignSelf:"center" , color:'white'}} onPress={handleSubmit}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}