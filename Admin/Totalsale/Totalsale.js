import { View, Text, Image } from 'react-native'
import React from 'react'
import Topheader from '../../HomeComponent/Topheader'
import { ScrollView } from 'react-native'

export default function Totalsale() {
  return (
    <>
      <Topheader />
      <ScrollView style={{ backgroundColor: 'white' }}>
        <ScrollView >
          <Text style={{color:"black" , marginLeft:12 , backgroundColor:"black" , marginTop:10 , width:"94%" , color:"white" , justifyContent:"center" , flexDirection:"row" , margin:"auto" , paddingLeft:70 , fontWeight:"700" , padding:5 , borderTopLeftRadius:10 , borderBottomRightRadius:10}}>7 days Revenue</Text>
          <View style={{ backgroundColor: "black", margin: 10, padding: 10, paddingBottom: 60 }}>
            <Image source={{ uri: 'https://www.creativefabrica.com/wp-content/uploads/2019/05/Add-icon-by-ahlangraphic-1-580x386.jpg' }} style={{ height: 120, width: 244, justifyContent: "center", marginLeft: 40, borderRadius: 5 }} />
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam facere fugit rem non distinctio assumenda cum beatae iure architecto obcaecati quidem quia dolores quisquam, excepturi deleniti qui minima, blanditiis nisi?</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Color : Red</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Size : Red</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Price : 1203</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Quantity : 123</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>categories : Men's Fashion</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>subcategories : T-shirt</Text>
          </View>

          <View style={{ backgroundColor: "black", margin: 10, padding: 10 }}>
            <Image source={{ uri: 'https://www.creativefabrica.com/wp-content/uploads/2019/05/Add-icon-by-ahlangraphic-1-580x386.jpg' }} style={{ height: 120, width: 244, justifyContent: "center", marginLeft: 40, borderRadius: 5 }} />
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam facere fugit rem non distinctio assumenda cum beatae iure architecto obcaecati quidem quia dolores quisquam, excepturi deleniti qui minima, blanditiis nisi?</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Color : Red</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Size : Red</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Price : 1203</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Quantity : 123</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>categories : Men's Fashion</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>subcategories : T-shirt</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ paddingLeft: 20 }}>
              <Text style={{ color: "black" }}>Revenue</Text>
              <Text style={{ color: "black" }}>NPR : 400404</Text>
            </View>
            <View style={{ paddingLeft: 20 }}>
              <Text style={{ color: "black" }}>Sales</Text>
              <Text style={{ color: "black" }}>NPR : 400404</Text>
            </View>

            <View style={{ paddingLeft: 20 }}>
              <Text style={{ color: "black" }}>Marketplace</Text>
              <Text style={{ color: "black" }}>NPR : 400404</Text>
            </View>
          </View>
        </ScrollView>


        <ScrollView >
        <Text style={{color:"black" , marginLeft:12 , backgroundColor:"black" , marginTop:10 , width:"94%" , color:"white" , justifyContent:"center" , flexDirection:"row" , margin:"auto" , paddingLeft:70 , fontWeight:"700" , padding:5 , borderTopLeftRadius:10 , borderBottomRightRadius:10}}>Previous 7 days Revenue</Text>
        {/* <Text>Previous 7 days Revenue</Text> */}
          <View style={{ backgroundColor: "black", margin: 10, padding: 10, paddingBottom: 60 }}>
            <Image source={{ uri: 'https://www.creativefabrica.com/wp-content/uploads/2019/05/Add-icon-by-ahlangraphic-1-580x386.jpg' }} style={{ height: 120, width: 244, justifyContent: "center", marginLeft: 40, borderRadius: 5 }} />
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam facere fugit rem non distinctio assumenda cum beatae iure architecto obcaecati quidem quia dolores quisquam, excepturi deleniti qui minima, blanditiis nisi?</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Color : Red</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Size : Red</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Price : 1203</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Quantity : 123</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>categories : Men's Fashion</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>subcategories : T-shirt</Text>
          </View>

          <View style={{ backgroundColor: "black", margin: 10, padding: 10 }}>
            <Image source={{ uri: 'https://www.creativefabrica.com/wp-content/uploads/2019/05/Add-icon-by-ahlangraphic-1-580x386.jpg' }} style={{ height: 120, width: 244, justifyContent: "center", marginLeft: 40, borderRadius: 5 }} />
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam facere fugit rem non distinctio assumenda cum beatae iure architecto obcaecati quidem quia dolores quisquam, excepturi deleniti qui minima, blanditiis nisi?</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Color : Red</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Size : Red</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Price : 1203</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Quantity : 123</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>categories : Men's Fashion</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>subcategories : T-shirt</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ paddingLeft: 20 }}>
              <Text style={{ color: "black" }}>Revenue</Text>
              <Text style={{ color: "black" }}>NPR : 400404</Text>
            </View>
            <View style={{ paddingLeft: 20 }}>
              <Text style={{ color: "black" }}>Sales</Text>
              <Text style={{ color: "black" }}>NPR : 400404</Text>
            </View>

            <View style={{ paddingLeft: 20 }}>
              <Text style={{ color: "black" }}>Marketplace</Text>
              <Text style={{ color: "black" }}>NPR : 400404</Text>
            </View>
          </View>
        </ScrollView>



        <ScrollView >
          <Text style={{color:"black" , marginLeft:12 , backgroundColor:"black" , marginTop:10 , width:"94%" , color:"white" , justifyContent:"center" , flexDirection:"row" , margin:"auto" , paddingLeft:70 , fontWeight:"700" , padding:5 , borderTopLeftRadius:10 , borderBottomRightRadius:10}}>Previous 28 days Revenue</Text>
          <View style={{ backgroundColor: "black", margin: 10, padding: 10, paddingBottom: 60 }}>
            <Image source={{ uri: 'https://www.creativefabrica.com/wp-content/uploads/2019/05/Add-icon-by-ahlangraphic-1-580x386.jpg' }} style={{ height: 120, width: 244, justifyContent: "center", marginLeft: 40, borderRadius: 5 }} />
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam facere fugit rem non distinctio assumenda cum beatae iure architecto obcaecati quidem quia dolores quisquam, excepturi deleniti qui minima, blanditiis nisi?</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Color : Red</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Size : Red</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Price : 1203</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Quantity : 123</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>categories : Men's Fashion</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>subcategories : T-shirt</Text>
          </View>

          <View style={{ backgroundColor: "black", margin: 10, padding: 10 }}>
            <Image source={{ uri: 'https://www.creativefabrica.com/wp-content/uploads/2019/05/Add-icon-by-ahlangraphic-1-580x386.jpg' }} style={{ height: 120, width: 244, justifyContent: "center", marginLeft: 40, borderRadius: 5 }} />
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam facere fugit rem non distinctio assumenda cum beatae iure architecto obcaecati quidem quia dolores quisquam, excepturi deleniti qui minima, blanditiis nisi?</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Color : Red</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Size : Red</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Price : 1203</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>Quantity : 123</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>categories : Men's Fashion</Text>
            <Text style={{ color: "white", width: "85%", marginLeft: 35, paddingTop: 5 }}>subcategories : T-shirt</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ paddingLeft: 20 }}>
              <Text style={{ color: "black" }}>Revenue</Text>
              <Text style={{ color: "black" }}>NPR : 400404</Text>
            </View>
            <View style={{ paddingLeft: 20 }}>
              <Text style={{ color: "black" }}>Sales</Text>
              <Text style={{ color: "black" }}>NPR : 400404</Text>
            </View>

            <View style={{ paddingLeft: 20 }}>
              <Text style={{ color: "black" }}>Marketplace</Text>
              <Text style={{ color: "black" }}>NPR : 400404</Text>
            </View>
          </View>
        </ScrollView>

      </ScrollView>
    </>
  )
}