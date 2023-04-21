import { View, Text , Image, TouchableOpacity , Modal, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { UpdateModal } from './UpdateModal';
import Navbar from '../adminNavbar/Navbar';

export default function ChangeorderStatus(items) {
    const product = items.route.params;
    const title = product?.items?.orderItems;
    const [msg , setmsg] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    

    const [chooseData , setchooseData] = useState(`${product?.items?.orderStatus}`);
    const [isModalVisible, setisModalVisible] = useState(false);
    const changeModalVisibility = (bool)=>{
        setisModalVisible(bool)
    }

    const setData = (option)=>{
      setchooseData(option);
    }

   const handleClick = async()=>{
      await fetch(`http://192.168.18.4:5000/api/order/update/status/${product?.items?._id}`,
       {method: 'PUT',headers: { 'Content-Type': 'application/json'} ,  body: JSON.stringify({status:`${chooseData}`})}) 
       .then(response => {
        response.json()
          .then(data => {
            setmsg(data?.msg);
            console.log(data?.msg)
            setModalVisible(true)
          });
      })

    }

  return (
    <View>
      <Navbar/>
        {product?.items?.orderItems?.map((item)=>(
          <View>
            {item?.imgKey?.slice(0,1).map((img)=>(
              <Image source={{ uri: `${img}` }} style={{ height: 300 , width: '80%' , marginLeft:20 }}/>
            ))}

          </View>
           ))}
        <View style={{flexDirection: 'row', marginLeft:10 , marginTop:6}}>
           <Text style={{marginRight:10 , color:'black'}}>Product ID:</Text>
           <Text>{product.items?._id}</Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft:10 ,  marginTop:6}}>
           <Text style={{marginRight:10 , color:'black'}}>Product:</Text>
           {product?.items?.orderItems?.map((item)=>(
               <Text style={{marginRight:10}}>{item?.title.slice(0 , 55)}</Text>
           ))}
        </View>

        <View style={{flexDirection: 'row', marginLeft:10 ,  marginTop:6}}>
           <Text style={{marginRight:10 , color:'black'}}>Quantity  :</Text>
           {product?.items.orderItems?.map((item)=>(
               <Text style={{marginRight:10}}>{item?.quantity}</Text>
           ))}
        </View>

        <View style={{flexDirection: 'row', marginLeft:10 ,  marginTop:6}}>
           <Text style={{marginRight:10 , color:'black'}}>Price:</Text>
           {product?.items?.orderItems?.map((item)=>(
               <Text style={{marginRight:10}}>NPR {item?.price}</Text>
           ))}
        </View>

        <View style={{flexDirection: 'row', marginLeft:10 , marginTop:6}}>
           <Text style={{marginRight:10 , color:'black'}}>Subcategories:</Text>
           {product.items.orderItems.map((item)=>(
               <Text style={{marginRight:10}}>{item.subcategories}</Text>
           ))}
        </View>

        <View style={{flexDirection: 'row', marginLeft:10 , marginTop:6}}>
           <Text style={{marginRight:10 , color:'black'}}>Color:</Text>
           {product.items.orderItems.map((item)=>(
               <Text style={{marginRight:10}}>{item.color}</Text>
           ))}
        </View>

        <View style={{flexDirection: 'row', marginLeft:10 , marginTop:6}}>
           <Text style={{marginRight:10 , color:'black'}}>City:</Text>
           <Text>{product.items.shippingInfo.city}</Text>
        </View>

        <View style={{flexDirection: 'row', marginLeft:10 , marginTop:6}}>
           <Text style={{marginRight:10 , color:'black'}}>Address:</Text>
           <Text>{product.items.shippingInfo.address}</Text>
        </View>

        <View style={{flexDirection: 'row', marginLeft:10 , marginTop:6}}>
           <Text style={{marginRight:10 , color:'black'}}>Address 2 :</Text>
           <Text>{product.items.shippingInfo.address_2}</Text>
        </View>

        <View style={{flexDirection: 'row', marginLeft:10 , marginTop:6}}>
           <Text style={{marginRight:10 , color:'black'}}>Total_amount:</Text>
           <Text style={{color:"black"}}>{product?.items?.Total_amount}(Without Taking by marketplace)</Text>
        </View>

        <View style={{flexDirection: 'row', marginLeft:10 , marginTop:6}}>
           <Text style={{marginRight:10 , color:'black'}}>state :</Text>
           <Text>{product.items.shippingInfo.state}</Text>
        </View>

        <View style={{flexDirection: 'row', marginLeft:10 , marginTop:6 }}>
            <View style={{flexDirection: 'row' , alignItems:'center'}}>
                <Text style={{marginRight:10 , color:'black'}}>orderStatus :</Text>

                
                  <TouchableOpacity style={{ backgroundColor: "white", width: '90%', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 10 }}
                      onPress={() => changeModalVisibility(true)} >
                      <Text style={{ color: "black" }}>{chooseData}</Text>
                  </TouchableOpacity>

                  <Modal transparent={true} animationType='fade'
                      visible={isModalVisible} nRequestClose={() => changeModalVisibility(false)}>
                      <UpdateModal changeModalVisibility={changeModalVisibility}
                          setData={setData} />
                  </Modal>

            </View>
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{`${msg}`}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Oky</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

            <TouchableOpacity style={{marginLeft:0 , backgroundColor:'green' , paddingLeft:32 , paddingRight:32 , paddingTop:5 , paddingBottom:5  , borderRadius:10}} onPress={handleClick}>
                <Text style={{color:'white' , fontWeight:'600' , marginLeft:140}}>Done</Text>
            </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({
  touchbutton: {
    backgroundColor: 'white',
    paddingLeft: 7,
    paddingRight: 6,
    marginBottom: 15,
    borderRadius: 12,
    flexDirection:'row',
    alignItems:'center',

  },
  text: {
    color: 'black',
  },
  text1: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    paddingLeft:50,
    paddingRight:50,
    marginTop:20,
    
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign:"left"
  }
})


