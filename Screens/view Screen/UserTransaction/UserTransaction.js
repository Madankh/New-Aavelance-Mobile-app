import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import Topheader from '../../../HomeComponent/Topheader'
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function UserTransaction() {
  const [transaction, setTransaction] = useState([]);
  let userDetails = useSelector(state => state.user)
  let accessToken = userDetails?.currentUser?.accessToken;
  const id = userDetails?.currentUser?.others?._id
  console.log(accessToken , "accessToken")
  useEffect(() => {
    const getTransaction = async () => {
      try {
        const res = await axios.get(`http://139.162.11.30:80/api/influencer/transaction/get/transaction`,
          {
            headers: {
              token: accessToken
            }
          })
        setTransaction(res.data);
      } catch (error) {

      }
    }
    getTransaction();
  }, [])
  console.log(transaction, "Transaction")
  return (
    <View >
      <Topheader />
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
      {transaction?.map((item) => (
        <View style={styles.amountContainer}>
          <View style={styles.row}>
            <Text style={styles.text1}>Aavelance</Text>
            <Text style={styles.text1}>NRP {item?.amount}</Text>
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
