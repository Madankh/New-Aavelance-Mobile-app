import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import Navbar from '../adminNavbar/Navbar';
import { publicRequest } from '../../redux/requestMethod';

export default function Order() {
  const [sellerorders , setSellerOrders] = useState([]);

  const [selectedValue, setSelectedValue] = useState();
  const [selectedValue1, setSelectedValue1] = useState();

  const admin = useSelector((state)=> state.seller);
  let seller = admin;
  let accessToken = admin.currentSeller.accessToken;
  console.log(accessToken);

  useEffect(() => {
    const sellerorder = async() =>{
      try {
        const res = await publicRequest.get('/order/get/proccessing/userOrders' , {
          headers:{
            token : accessToken
          }
        });
          setSellerOrders(res.data);
      } catch (error) {
        console.log(error)
      }
    }
        sellerorder();
  }, [0])
  console.log(sellerorders)

  return (
    <ScrollView>
    <View style={{backgroundColor:'black'}}>
      <Navbar/>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', alignSelf: 'center'}}>User Orders</Text>

    {sellerorders?.map((item )=>(
      <View style={{marginTop: 15, marginBottom: 10 , marginLeft:18}} key={item._id}>
        <Image
          source={{
            uri: 'https://www.cnet.com/a/img/resize/ed9d21e0b5fc41677529b23e512d85097aebb534/2021/10/03/5c27a4a2-9365-4182-9738-0cab4ca42cc0/img-5704.jpg?auto=webp&fit=crop&height=675&width=1200',
          }}
          style={{height: 200, resizeMode: 'contain' , width:600 , marginLeft:-120}}
        />
        <TouchableOpacity style={{flexDirection: 'row' , alignItems:'center'}}>
          <Text style={{color: 'white', marginTop: 7, marginRight: 10}}>
            Product Title :
          </Text>
            {item.orderItems.map((item)=>(
            <Text style={{color: 'white', marginTop: 7 , width:'66%'}}>
           {item.title}
           </Text>
            ))}
        </TouchableOpacity>
       
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={{color: 'white', marginTop: 7, marginRight: 10}}>Product Id :{' '}</Text>
          {item.orderItems.map((item)=>(
            <Text style={{color: 'white', marginTop: 7}}>{item._id}</Text>
          ))}
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={{color: 'white', marginTop: 7, marginRight: 10}}>
            Price :{' '}
          </Text>{item.orderItems.map((item)=>(<Text style={{color: 'white', marginTop: 7}}>{item.price}</Text> ))}
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={{color: 'white', marginTop: 7, marginRight: 10}}>
            Color :
          </Text>
          {item.orderItems.map((item)=>(
            <Text style={{color: 'white', marginTop: 7}}>{item.color}</Text>
          ))}
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', marginTop: 7, marginRight: 10}}>Quantity :{' '}</Text>{item.orderItems.map((item)=>(
              <Text style={{color: 'white', marginTop: 7}}>{item.quantity}</Text>
            ))}
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={{color: 'white', marginTop: 7, marginRight: 10}}>Address :</Text>
          <Text style={{color: 'white', marginTop: 7}}>{item.shippingInfo.address}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={{color: 'white', marginTop: 7, marginRight: 10}}>Address_2 :</Text>
          <Text style={{color: 'white', marginTop: 7}}>{item.shippingInfo.address_2}</Text>
        </TouchableOpacity>


        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={{color: 'white', marginTop: 7, marginRight: 10}}>Phone Number :</Text>
          <Text style={{color: 'white', marginTop: 7}}>{item.shippingInfo.phone_Number}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={{color: 'white', marginTop: 7, marginRight: 10}}>City :</Text>
          <Text style={{color: 'white', marginTop: 7}}>{item.shippingInfo.city}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection:'row' , alignItems:'center'}}>
          <Text style={{color: 'white', marginTop: 7 , marginRight:10}}>Status : {item.orderStatus} </Text>
        </TouchableOpacity>
      </View>
  ))}

      {/* <View style={{flexDirection:'row' , justifyContent:'space-around'}}>
      <TouchableOpacity style={{paddingLeft: 10, paddingRight: 10}}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '800'}}>
          Net revanue
        </Text>
        <Text style={{color: 'white', fontSize: 14, fontWeight: '600'}}>
          NRP {sellerorders.Amount}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{paddingLeft: 10, paddingRight: 23}}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '800'}}>
          Total sales
        </Text>
        <Text style={{color: 'white', fontSize: 14, fontWeight: '600'}}>
          NRP 80000
        </Text>
      </TouchableOpacity>
    </View> */}

    
    </View>
    </ScrollView>
  );
}
