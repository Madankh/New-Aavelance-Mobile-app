import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import Navbar from '../adminNavbar/Navbar';
import { publicRequest } from '../../redux/requestMethod';

export default function Sales() {
  const [sellerorders, setSellerOrders] = useState([]);

  const [seller7orders, setSeller7Orders] = useState([]);

  const [seller14orders, setSeller14Orders] = useState([]);
  const [seller21orders, setSeller21Orders] = useState([]);
  const [seller28orders, setSeller28Orders] = useState([]);
  // const [selectedValue, setSelectedValue] = useState();
  // const [selectedValue1, setSelectedValue1] = useState();

  const admin = useSelector((state) => state.seller);
  // let seller = admin;
  let accessToken = admin.currentSeller.accessToken;
  console.log(accessToken);

  useEffect(() => {
    const sellerorder = async () => {
      try {
        const res = await publicRequest.get('/order/get/userOrder', {
          headers: {
            token: accessToken
          }
        });
        setSellerOrders(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    sellerorder();
  }, [0])


  useEffect(() => {
    const seller7order = async () => {
      try {
        const res = await publicRequest.get('/order/get/previos/one/week/userOrder', {
          headers: {
            token: accessToken
          }
        });
        setSeller7Orders(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    seller7order();
  }, [0])



  useEffect(() => {
    const seller14order = async () => {
      try {
        const res = await publicRequest.get('/order/get/two/weeks/userOrder', {
          headers: {
            token: accessToken
          }
        });
        setSeller14Orders(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    seller14order();
  }, [0])


  useEffect(() => {
    const seller21order = async () => {
      try {
        const res = await publicRequest.get('/order/get/previous/three/weeks/userOrder', {
          headers: {
            token: accessToken
          }
        });
        setSeller21Orders(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    seller21order();
  }, [0])


  useEffect(() => {
    const seller28order = async () => {
      try {
        const res = await publicRequest.get('/order/get/previous/four/weeks/userOrder', {
          headers: {
            token: accessToken
          }
        });
        setSeller28Orders(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    seller28order();
  }, [0])


  return (
    <>
       <Navbar />
       <ScrollView>
      <View style={{marginTop:10 , backgroundColor:"black"}}>
       <Text style={styles.Days7Income}>7 Days Income</Text>
        {sellerorders?.items?.map((items)=>(

        <View key={items?._id}> 
          {items?.orderItems?.map((item)=>(


           <View style={{ marginTop: 15, marginBottom: 10, marginLeft: 18 }} key={item.index} >
          <Image style={styles.productImage}
            source={{
              uri: `${item?.imgKey[0]}`,
            }}
          
          />
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Product Title :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 , width:"60%" }}>{`${item?.title}`}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              City :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>Product Id</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
             Quantity :
            </Text>
            <Text style={{ color: 'white', marginTop: 7, width: '66%' }}>
              {item?.quantity}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Color :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{item?.color[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Size :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{item?.size[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Address :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{items?.shippingInfo?.address}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Price :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>NRP {item?.price}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>Status : {items?.orderStatus} </Text>
          </TouchableOpacity>
        </View>
                  
         ))}
         
        </View>
          ))}
         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
           <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }}>
             <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
               Net revenue
             </Text>
             <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
               NRP {sellerorders.amount}
             </Text>
           </TouchableOpacity>
           <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 23 }}>
             <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
               Total sales
             </Text>
             <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
               NRP {sellerorders.Sales}
             </Text>
           </TouchableOpacity>
         </View>

      </View>


      <View style={{marginTop:10 , backgroundColor:"black"}}>
       <Text style={styles.Days7Income}>7 Days Ago Income</Text>
        {seller7orders?.items?.map((items)=>(

        <View key={items?._id}> 
          {items?.orderItems?.map((item)=>(


           <View style={{ marginTop: 15, marginBottom: 10, marginLeft: 18 }} key={item.index} >
          <Image style={styles.productImage}
            source={{
              uri: `${item?.imgKey[0]}`,
            }}
          
          />

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Product Title :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 , width:"60%" }}>{`${item?.title}`}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              City :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>Product Id</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
             Quantity :
            </Text>
            <Text style={{ color: 'white', marginTop: 7, width: '66%' }}>
              {item?.quantity}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Color :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{item?.color[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Size :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{item?.size[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Address :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{items?.shippingInfo?.address}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Price :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>NRP {item?.price}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>Status : {items?.orderStatus} </Text>
          </TouchableOpacity>
        </View>
                  
         ))}
         
        </View>
          ))}
         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
           <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }}>
             <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
               Net revenue
             </Text>
             <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
               NRP {seller7orders.amount}
             </Text>
           </TouchableOpacity>
           <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 23 }}>
             <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
               Total sales
             </Text>
             <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
               NRP {seller7orders.Sales}
             </Text>
           </TouchableOpacity>
         </View>

      </View>


      <View style={{marginTop:10 , backgroundColor:"black"}}>
       <Text style={styles.Days7Income}>14 Days Ago Income</Text>
        {seller14orders?.items?.map((items)=>(

        <View key={items?._id}> 
          {items?.orderItems?.map((item)=>(


           <View style={{ marginTop: 15, marginBottom: 10, marginLeft: 18 }} key={item.index} >
          <Image style={styles.productImage}
            source={{
              uri: `${item?.imgKey[0]}`,
            }}
          
          />
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Product Title :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 , width:"60%" }}>{`${item?.title}`}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              City :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>Product Id</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
             Quantity :
            </Text>
            <Text style={{ color: 'white', marginTop: 7, width: '66%' }}>
              {item?.quantity}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Color :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{item?.color[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Size :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{item?.size[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Address :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{items?.shippingInfo?.address}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Price :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>NRP {item?.price}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>Status : {items?.orderStatus} </Text>
          </TouchableOpacity>
        </View>
                  
         ))}
         
        </View>
          ))}
         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
           <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }}>
             <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
               Net revenue
             </Text>
             <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
               NRP {seller14orders.amount}
             </Text>
           </TouchableOpacity>
           <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 23 }}>
             <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
               Total sales
             </Text>
             <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
               NRP {seller14orders.Sales}
             </Text>
           </TouchableOpacity>
         </View>

      </View>


      <View style={{marginTop:10 , backgroundColor:"black"}}>
       <Text style={styles.Days7Income}>21 Days Ago Income</Text>
        {seller21orders?.items?.map((items)=>(

        <View key={items?._id}> 
          {items?.orderItems?.map((item)=>(


           <View style={{ marginTop: 15, marginBottom: 10, marginLeft: 18 }} key={item.index} >
          <Image style={styles.productImage}
            source={{
              uri: `${item?.imgKey[0]}`,
            }}
          
          />

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Product Title :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 , width:"60%" }}>{`${item?.title}`}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              City :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>Product Id</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
             Quantity :
            </Text>
            <Text style={{ color: 'white', marginTop: 7, width: '66%' }}>
              {item?.quantity}
            </Text>
          </TouchableOpacity>


          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Color :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{item?.color[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Size :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{item?.size[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Address :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{items?.shippingInfo?.address}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Price :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>NRP {item?.price}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>Status : {items?.orderStatus} </Text>
          </TouchableOpacity>
        </View>
                  
         ))}
         
        </View>
          ))}
         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
           <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }}>
             <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
               Net revenue
             </Text>
             <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
               NRP {seller21orders.amount}
             </Text>
           </TouchableOpacity>
           <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 23 }}>
             <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
               Total sales
             </Text>
             <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
               NRP {seller21orders.Sales}
             </Text>
           </TouchableOpacity>
         </View>

      </View>


      <View style={{marginTop:10 , backgroundColor:"black"}}>
       <Text style={styles.Days7Income}>28 Days Ago Income</Text>
        {seller28orders?.items?.map((items)=>(

        <View key={items?._id}> 
          {items?.orderItems?.map((item)=>(


           <View style={{ marginTop: 15, marginBottom: 10, marginLeft: 18 }} key={item.index} >
          <Image style={styles.productImage}
            source={{
              uri: `${item?.imgKey[0]}`,
            }}
          
          />
         
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Product Title :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 , width:"60%" }}>{`${item?.title}`}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              City :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>Product Id</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
             Quantity :
            </Text>
            <Text style={{ color: 'white', marginTop: 7, width: '66%' }}>
              {item?.quantity}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Color :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{item?.color[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Size :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{item?.size[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Address :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>{items?.shippingInfo?.address}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>
              Price :{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 7 }}>NRP {item?.price}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', marginTop: 7, marginRight: 10 }}>Status : {items?.orderStatus} </Text>
          </TouchableOpacity>
        </View>
                  
         ))}
         
        </View>
          ))}
         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
           <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }}>
             <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
               Net revenue
             </Text>
             <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
               NRP {seller28orders.amount}
             </Text>
           </TouchableOpacity>
           <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 23 }}>
             <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
               Total sales
             </Text>
             <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
               NRP {seller28orders.Sales}
             </Text>
           </TouchableOpacity>
         </View>

      </View>



      </ScrollView>

     </>
 )};


 const styles = StyleSheet.create({
  Days7Income:{
    color:"white",
    fontSize:18,
    paddingLeft:120,
    padding:7,
    backgroundColor:'black',
    borderRadius:10
  },
  productImage:{
    height: 200, 
    // resizeMode: 'contain', 
    width: 350, 
    // marginLeft: -10
  }
})
