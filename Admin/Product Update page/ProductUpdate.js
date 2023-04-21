import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Platform, Alert, ScrollView , Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import { PermissionsCameraAndroid } from '../permissions';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Modal } from 'react-native';

export default function ProductUpdate(item) {
  const admin = useSelector((state) => state.seller);
  let seller = admin.currentSeller;
  let accessToken = admin.currentSeller.accessToken;
  console.log(accessToken);
  let product = item.route.params;

  console.log(product.item.img, 'jsfsjfhsdjfsdfhsdfsdjhfs')

  
  const [updateProduct, setupdateProduct] = useState('');
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`http://192.168.18.4:5000/api/products/find/${product?.item?._id}`);
        setupdateProduct(res.data)
      } catch (error) {

      }
    }
    getProducts();
  }, [0])


  const [modalVisible, setModalVisible] = useState(false);
  const [msg, setmsg] = useState('');
  const [file, setfile] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [productDetail, setproductDetail] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [price, setPrice] = useState('');
  const [Stock, setStock] = useState();

  const onSelectImage = async () => {
    const permissionStatus = await PermissionsCameraAndroid();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert(
        'File'
      )
    }
    ImagePicker.openPicker({
      multiple: true,
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      const imageUri = Platform.OS == 'ios' ? image : image;
      setfile(imageUri);
      if(file.length > 0){
        setimage(file[0].path)
      }
    });
  }
  


  const handleColor = (value) => {
    setColor(value.split(" "));
 };

 const handleSize = (value) => {
    setSize(value.split(" "));
 };

 const handleProductDetail = (value) => {
  setproductDetail(value.split(","));
};



  
  const handleChange = async () => {
    const fileObjects = [];
      for (let i = 0; i < file.length; i++) {
        const fileObject = {
          uri: file[i].path,
          name: file[i].path.split('/').pop(),
          type: file[i].mime,
        };
        fileObjects.push(fileObject);
      }
  
      
      
      const formData = new FormData();
          for (let i = 0; i < fileObjects.length; i++) {
            formData.append("img", fileObjects[i]);
          }

        for(let i = 0 ; i < color.length ; i++){
          formData.append("color", color[i]);
        }

        for(let i = 0 ; i < size.length ; i++){
          formData.append("size", size[i]);
        }

        for(let i = 0; i < productDetail.length; i++){
          formData.append("productDetail", productDetail[i]);
        }
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("price", price);
        formData.append("Stock", Stock);
        try {
          await axios.put(`http://192.168.18.4:5000/api/products/${product.item._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data', token: accessToken } }).then((data) => {
            setmsg(data.data);
            setModalVisible(true)
          })
          
        } catch (error) {
          console.error(error);
        }

      };

  const navigation = useNavigation();
  return (
    <>
      <ScrollView>
        <View style={styles.mainView1}>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {product?.item?.img.slice(0,1).map((imgg)=>(
              <Image source={{ uri: `${imgg}` }}
                style={{ height: 250, width: '60%' }} />
              
            ))}
            <Text style={styles.text}>{product.item.title.slice(0, 50)}</Text>
          </View>

          <View style={styles.mainView}>
            <View style={{ flexDirection: 'row', width: 400 }}>
              <Text style={{ marginRight: 170, color: 'black' }}>id</Text>
              <Text style={{ color: 'black', flexWrap: 'wrap' }}>{product.item._id}</Text>
            </View>

            {/* <View style={{ flexDirection: 'row', width: 400, }}>
            <Text style={{ marginRight: 150 , color:'black' }}>Sales</Text>
            <Text style={{color:'black'}}>0</Text>
          </View> */}

            <View style={{ flexDirection: 'row', width: 400, }}>
              <Text style={{ marginRight: 150, color: 'black' }}>Stock</Text>
              <Text style={{ color: 'black' }}>{product.item.Stock}</Text>
            </View>
          </View>

        </View>

        <View style={{ flex: 2.7, backgroundColor: '#E5E5E5', padding: 10 }}>
          <Text style={{ color: 'black', fontSize: 24, fontWeight: '800', alignSelf: 'center' }}>Update Product</Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: "black", marginTop: 5, marginBottom: 5, fontSize: 16, fontWeight: '700', marginTop: 10 }}>Product Images</Text>
            <TouchableOpacity style={{ width: 120, backgroundColor: 'white', paddingTop: 4, paddingBottom: 4, borderRadius: 10, marginTop: 10 }} onPress={onSelectImage}>
              <Text style={{ alignSelf: "center", fontWeight: '800', color: 'black' }}>Choose Images</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.InputTtile}>Title</Text>
            <TextInput style={styles.inputText} multiline placeholder="Product Title" onChangeText={(value) => setTitle(value)} />
          </View>
          <View>
            <Text style={styles.InputTtile} >Product Description</Text>
            <TextInput style={styles.inputText} multiline placeholder="Product Description" onChangeText={(value) => setDesc(value)} />
          </View>
          <View>
            <Text style={styles.InputTtile} >Product Details</Text>
            <TextInput style={styles.inputText} multiline placeholder="Product Details"  onChangeText={handleProductDetail} />
          </View>

          <View>
            <Text style={styles.InputTtile}>Size</Text>
            <TextInput multiline style={styles.inputText}  placeholder="Size" onChangeText={handleSize} />
          </View>

       

          <View>
            <Text style={styles.InputTtile}>Color</Text>
            <TextInput multiline style={styles.inputText} placeholder="Color" onChangeText={handleColor} />
          </View>

          <View>
            <Text style={styles.InputTtile} >Stock</Text>
            <TextInput style={styles.inputText} multiline placeholder="Stock" onChangeText={(value) => setStock(value)} />
          </View>

          <View>
            <Text style={styles.InputTtile} >Price</Text>
            <TextInput style={styles.inputText} multiline placeholder="Price" onChangeText={(value) => setPrice(value)} />
          </View>

          <TouchableOpacity style={styles.updateContainer} onPress={handleChange}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: "white" }}>Update Product</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    </>
  )
}

const styles = StyleSheet.create({
  mainView: {
    marginLeft: 10,

  },
  mainView1: {
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
  text: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: -0,
    marginBottom: 10,
    color:"black"
  },
  productUpdate: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.6,
    shadowRadius: 11.14,

    elevation: 17,
  },
  textForDashbord: {
    margin: 4,
    fontSize: 18,
    color: 'black',
    fontWeight: '600'
  },
  revanueContainer: {
    margin: 5,
    backgroundColor: '#E5E5E5',
    paddingLeft: 7,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10
  },
  textForMenu: {
    marginLeft: 6,
  },
  inputText: {
    backgroundColor: "white",
    borderRadius: 10,
    padding:15,
  },
  InputTtile: {
    color: "black",
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '700'
  },
  updateContainer: {
    width: '40%', height: 24, backgroundColor: 'black', alignContent: 'center', marginTop: 10, marginLeft: 100, borderRadius: 4
  },modalView: {
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
 }
})