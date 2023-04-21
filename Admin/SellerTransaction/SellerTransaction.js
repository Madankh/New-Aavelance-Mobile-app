import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import Navbar from '../adminNavbar/Navbar'
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function SellerTransaction() {

  const seller = useSelector((state) => state.seller);
  let current = seller?.currentSeller;
  let accessToken = current?.accessToken;

  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    const getTransaction = async () => {
      try {
        const res = await axios.get(`http://192.168.18.4:5000/api/transfer/get/transaction`, {
          headers: {
            token: accessToken
          }
        })
        setTransaction(res.data);
      } catch (error) {

      }
    }
    getTransaction();
  }, [0])

  console.log(transaction, "transaction")
  return (
    <View >
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.LatestTransaction}>Latest Transactions</Text>
      </View>

      <View style={styles.transactionContainer}>
        <View style={styles.header}>
          <Text style={styles.text}>Your Transaction</Text>
          <Text style={styles.text}>Amount</Text>
          <Text style={styles.text}>Status</Text>
        </View>
      </View>
      {transaction.map((item) => (
        <View style={styles.amountContainer}>
          <View style={styles.row}>
            <View>
            <Text style={styles.text1}>Date</Text>
            <Text style={styles.text2} >{item?.createdAt}</Text>
            </View>
            <Text style={styles.text1}>{item?.amount}</Text>
            <Text style={styles.text1}>{item?.status}</Text>
          </View>
        </View>
      ))}

    </View>
  )
}

const styles = StyleSheet.create({
  LatestTransaction: {
    color: "black",
    paddingBottom: 5,
    marginTop: 10,
    fontSize: 16
  },
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "black",
    marginRight: 20
  },
  text1: {
    color: "black",
    marginLeft: 10,
    textAlign: 'left',
  },
  text2:{
    width:100,
    color:"black"
  },
  transactionContainer: {
    backgroundColor: "white",
    padding: 10
  },
  amountContainer: {
    backgroundColor: "white",
    padding: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: 10
  }
})
