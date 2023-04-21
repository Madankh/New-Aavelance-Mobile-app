import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../constants/navigationStrings';
import { sellerregister } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function SellerSignup() {
  const seller = useSelector(state => state.seller);
  const {isFetching , error} = useSelector((state) => state.seller);
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhonenumber] = useState('');
  const [shopname, setshopname] = useState('');
  const [shopAddress, setshopAddress] = useState('');
  const [Pan_Number, setPan_Number] = useState('');
  const [National_id, setNational_id] = useState('');
  const [Post_Number, setPost_Number] = useState('');
  const [avatar , setavatar] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (seller.currentUser != null) {
      navigation.navigate(navigationStrings.Home, seller);
    } else {
      console.log('Error');
    }
  }, [seller]);

  const handleClick = () => {
    sellerregister(dispatch, {
      email,
      password,
      username,
      phoneNumber,
      shopname,
      shopAddress,
      Pan_Number,
      National_id,
      Post_Number,
    });
  };

  return (
    <ScrollView>
      <View style={styles.mainView}>
        <View style={styles.BottomView}>
          <Text style={styles.heading}>Create seller account</Text>
          <View style={styles.formView}>
            <TextInput
              style={styles.textInput}
              placeholder={'Email address'}
              placeholderTextColor={'white'}
              onChangeText={value => setEmail(value)}
            />
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder={'**********'}
              placeholderTextColor={'white'}
              onChangeText={value => setpassword(value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Username'}
              placeholderTextColor={'white'}
              onChangeText={value => setUsername(value)}
            />
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder={'phone number'}
              placeholderTextColor={'white'}
              onChangeText={value => setPhonenumber(value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Shopname'}
              placeholderTextColor={'white'}
              onChangeText={value => setshopname(value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'shopAddress'}
              placeholderTextColor={'white'}
              onChangeText={value => setshopAddress(value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Pan_Number'}
              placeholderTextColor={'white'}
              onChangeText={value => setPan_Number(value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'National_id'}
              placeholderTextColor={'white'}
              onChangeText={value => setNational_id(value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Post_Number'}
              placeholderTextColor={'white'}
              onChangeText={value => setPost_Number(value)}
            />
            
            <TouchableOpacity style={styles.buttonlog} onPress={handleClick}>
              <Text style={styles.text}>Signup</Text>
            </TouchableOpacity>
            {error?.errors?.map((item)=>(
            <Text style={{color:'red' , marginTop:10 , textAlign:"left"}} key={item.param}>{item.msg}</Text> 
            ))}
            <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={() => navigation.navigate(navigationStrings.SellerSignin)
              }>
              <Text style={styles.text1}>Already have account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  TopView: {
    width: '100%',
    // height: 150,
    backgroundColor: 'black',
  },
  BottomView: {
    width: '100%',
    backgroundColor: '#000',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  heading: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 55,
  },
  formView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
  textInput: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    height: 53,
    borderRadius: 10,
    color: 'white',
    paddingLeft: 10,
    marginTop: 25,
  },
  buttonlog: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 112,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  text1: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
