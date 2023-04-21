import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { publicRequest } from '../redux/requestMethod';
import { Modal } from 'react-native';
import { TextInput } from 'react-native';
import Topheader from '../HomeComponent/Topheader';
export default function UserOrder(currentuserProps) {
    const user = useSelector((state) => state.user);
    let id = user?.currentUser?.others?._id;
    let accessToken = user?.currentUser?.accessToken;

    const [modalVisible, setModalVisible] = useState(false);
    const [reason , setreason] = useState('');
    const [orderid, setorderid] = useState("");
    console.log(id)
    const [order, setorder] = useState([]);
    let moreorder = [];
    let all = [];
    let allitems = [];
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await publicRequest.get(`/order/myOrder`, {
                    headers: {
                        token: accessToken
                    }
                });

                setorder(res.data)

            } catch (error) {

            }
        }
        getOrders();
    }, [0])
    moreorder = order?.products;
    console.log(moreorder);
   

    const handleReturn = async(items)=>{
        setModalVisible(true);
        setorderid(items);
        console.log("s",items)
      
    }

    const handledelete = async(items)=>{
        await fetch(
            `http://192.168.18.4:5000/api/order/deleteOrder/${items}`, {method: 'DELETE',
            headers: { 'Content-Type': 'application/json' , token : accessToken },
            body: JSON.stringify({
              return_order_reason:`${reason}`,
              status:`Return processing`,
            })})
            .then(response => {
              response.json()
                .then(data => {
                  setModalVisible(false);
                  {alert(data)}
                });
            })
    }

    const handleReturnOrder = async (orderid) => {
        console.log(orderid,"a")
        await fetch(
          `http://192.168.18.4:5000/api/order/return/order/update/status/${orderid}`, {method: 'PUT',
          headers: { 'Content-Type': 'application/json' , token : accessToken },
          body: JSON.stringify({
            return_order_reason:`${reason}`,
            status:`Return processing`,
          })})
          .then(response => {
            response.json()
              .then(data => {
                setModalVisible(false);
                {data.success === true ? alert("Your request has been submited"):alert(data)}
              });
          })
    }

    return (
        <View>
                <Topheader/>
            <ScrollView>
                <View style={{ backgroundColor: "black", alignItems: "center", padding: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                    <Text style={{ color: "white", fontSize: 25, fontWeight: '900' }}>Your Order</Text>
                </View>

                {moreorder == 'undefined' ? <TouchableOpacity><Text style={{ color: "black" }}>You don't have any orders</Text></TouchableOpacity>
                    :

                    <View>
                        {moreorder?.map((itemss) => (
                            <View style={styles.orderItemview} key={itemss?._id}>

                                {itemss.orderItems?.map((items) => (
                                    <View key={items._id} style={{ flexDirection: 'row', flex: 0 }}>
                                        {items?.imgKey?.slice(0,1).map((subimg)=>(
                                            <Image source={{ uri: `${subimg}` }} style={{ height: 130, width: 100, margin: 10, marginTop: 50  }} />
                                        ))}
                                        <View style={{ marginTop: 40 }}>
                                            <View>
                                                {/* <Text style={{ color: 'black', fontWeight: '600', width: 220, marginBottom: 4 }}>Id : {itemss._id}</Text> */}
                                                <Text style={{ color: 'black', fontWeight: '600', width: 220, marginBottom: 0 }}>Title :{items?.title?.slice(0, 90)}</Text>
                                                <Text style={{ color: 'black', fontWeight: '600', width: 220, marginBottom: 0 }}>Price : {items.price}</Text>
                                                <View style={{ flexDirection: 'row', marginRight: 4, marginBottom: 4 }}>
                                                    <Text style={{ marginRight: 4, fontSize: 14, color: 'black', fontWeight: '600' }}>Color : </Text>
                                                    <View style={styles.color}></View>
                                                </View>
                                                <Text style={{ color: 'black', fontWeight: '600', marginBottom: 0 }}> Quantity : {items.quantity}</Text>
                                                <Text style={{ color: 'black', fontWeight: '600', marginBottom: 0 }}> Size : { }</Text>
                                            </View>
                                            <Text style={{ color: 'red', fontWeight: '800' }}>Total Cost : {itemss?.Total_amount } </Text>
                                            <Text style={{ color: 'black', fontWeight: '600' }}>Status : {itemss?.orderStatus} </Text>
                                            <Text style={{ color: 'black', fontWeight: '600' }}>Payment methods : {itemss?.PaymentMethods} </Text>
                                            {itemss?.orderStatus === "Processing" ? 
                                            <TouchableOpacity onPress={() => handledelete(itemss._id)} style={{ backgroundColor: 'black', width: 100, paddingTop: 3, paddingBottom: 3, borderRadius: 4, marginTop: 10 }}>
                                            <Text style={{ color: "white", marginLeft: 10 }}>Cancel Order</Text>
                                        </TouchableOpacity> : 
                                            <TouchableOpacity onPress={() => handleReturn(itemss._id)} style={{ backgroundColor: 'black', width: 100, paddingTop: 3, paddingBottom: 3, borderRadius: 4, marginTop: 10 }}>
                                                <Text style={{ color: "white", marginLeft: 10 }}>Return order</Text>
                                            </TouchableOpacity>
                                            }

                                        </View>


                                    </View>
                                ))}
                            </View>

                        ))}


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
                                    <TextInput style={styles.textInput} placeholder={"Why You Want to Return Product"} placeholderTextColor={'black'} onChangeText={(value) => setreason(value)} />
                                    {reason == '' ? <Pressable disabled={true}
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={()=>handleReturnOrder(orderid)}
                                    >
                                        <Text style={styles.textStyle}>Return</Text>
                                    </Pressable>:<Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={()=>handleReturnOrder(orderid)}
                                    >
                                        <Text style={styles.textStyle}>Return</Text>
                                    </Pressable> }
                                    
                                </View>
                            </View>
                        </Modal>

                    </View>

                }


            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    orderItemview: {
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: "white",
        borderColor: "black",
        paddingLeft: 20,
        alignSelf: 'center',
        paddingRight: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 4.84,

        elevation: 5,
        borderRadius: 10
    },
    color: {
        backgroundColor: 'red',
        height: 13,
        width: 13,
        borderRadius: 10,
        marginLeft: 10,
        margin: 5,
        marginLeft: 3
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
        paddingLeft: 50,
        paddingRight: 50,
        marginTop: 20,

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
        textAlign: "left"
    },
    textInput: {
        width: '90%',
        borderWidth: 1,
        borderColor: "black",
        height: 53,
        borderRadius: 10,
        color: "black",
        paddingLeft: 10,
        marginTop: 25
    },
})