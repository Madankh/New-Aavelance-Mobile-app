import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import Navbar from '../adminNavbar/Navbar';
import { publicRequest } from '../../redux/requestMethod';
import axios from 'axios';

export default function Returnorder() {
  const [sellerorders, setSellerOrders] = useState([]);
  const admin = useSelector((state) => state.seller);
  // let seller = admin;
  let accessToken = admin.currentSeller.accessToken;
  console.log(accessToken);

  const [sales, setSales] = useState([]);

  useEffect(() => {
    const TotSales = async () => {
      try {
        const res = await axios.get('http://139.162.11.30:80/api/order/get/return/userOrder', {
          headers: {
            token: accessToken
          }
        })
        console.log(res.data);
        setSales(res.data);
      } catch (error) {

      }
    }
    TotSales();
  }, [0])


console.log(sales)
  return (
    <>
       <Navbar />
      <FlatList data={sales.itemss} renderItem={(element) => {
        {console.log(element?.item)}
        return <View style={{backgroundColor:"gray"}}> 
          {element?.item?.orderItems?.map((item)=>(


           <View style={{ marginTop: 5, marginBottom: 5, marginLeft:10 , marginRight:10, padding:10 , borderRadius:10 , backgroundColor:"white" }} key={element.index} >
            
          <Image source={{uri: `${item?.imgKey[0]}`}} style={{ height: 200, resizeMode: 'contain', width: 600, marginLeft: -150 }}/>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'black', marginTop: 7, marginRight: 10 }}>Product Id :</Text>
            <Text style={{ color: 'black', marginTop: 7, width: '66%' }}>
              {item?._id}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', marginTop: 7, marginRight: 10 }}>
              Product Title :{' '}
            </Text>
            <Text style={{ color: 'black', marginTop: 7 , width:"60%" }}>
              {`${item?.title}`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', marginTop: 7, marginRight: 10 }}>
            Return Order Reason :{' '}
            </Text>
            <Text style={{ color: 'black', marginTop: 7 }}>{element?.item?.return_order_reason}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', marginTop: 7, marginRight: 10 }}>
              City : {' '}
            </Text>
            <Text style={{ color: 'black', marginTop: 7 }}>{element?.item?.shippingInfo?.city}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', marginTop: 7, marginRight: 10 }}>
            Address : {' '}
            </Text>
            <Text style={{ color: 'black', marginTop: 7 }}>{element?.item?.shippingInfo?.address}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', marginTop: 7, marginRight: 10 }}>Color :</Text>
            <Text style={{ color: 'black', marginTop: 7 }}>{item?.color[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', marginTop: 7, marginRight: 10 }}>Size :</Text>
              <Text style={{ color: 'black', marginTop: 7 }}>{item?.size[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', marginTop: 7, marginRight: 10 }}>Address :</Text>
            <Text style={{ color: 'black', marginTop: 7 }}>
              {element?.item?.shippingInfo?.address}
              </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', marginTop: 7, marginRight: 10 }}>Price : </Text>
            <Text style={{ color: 'black', marginTop: 7 }}>NRP : {item?.price}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'black', marginTop: 7, marginRight: 10 }}>Status : {element?.item?.orderStatus} 
            </Text>
          </TouchableOpacity>
        </View>
                  
         ))} 
        </View>
      }} />

     {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
       <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }}>
         <Text style={{ color: 'black', fontSize: 18, fontWeight: '800' }}>
           Net revenue
         </Text>
         <Text style={{ color: 'black', fontSize: 14, fontWeight: '600' }}>
           NRP {sellerorders.amount}
         </Text>
       </TouchableOpacity>
       <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 23 }}>
         <Text style={{ color: 'black', fontSize: 18, fontWeight: '800' }}>
           Total sales
         </Text>
         <Text style={{ color: 'black', fontSize: 14, fontWeight: '600' }}>
           NRP {sellerorders.Sales}
         </Text>
       </TouchableOpacity>
     </View> */}
     </>
 )};
