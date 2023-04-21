import { View, Text, StyleSheet, Modal } from 'react-native'
import { Image } from 'react-native';
import React from 'react'
import { TextInput } from 'react-native'
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import uploadimage from "../Admin/Images/gallery.png";
import Videoupload from "../Admin/Images/video.png"
import { useState } from 'react';
import { PermissionsCameraAndroid } from '../Admin/permissions';
import ImagePicker from 'react-native-image-crop-picker';
import { CategoriesModalPicker } from '../Screens/view Screen/CategoriesModalPicker';
import FastImage from 'react-native-fast-image'
import { ElectronicCategoriesModalPicker } from '../Screens/view Screen/ElectronicCategoriesModalPicker';
import { BeautyCategoriesModalPicker } from '../Screens/view Screen/BeautyCategoriesModalPicker';
import { WomensFashionCategoriesModalPicker } from '../Screens/view Screen/Women\'sFashionCategoriesModalPicker';
import { MenCategoriesModalPicker } from "../Screens/view Screen/Men'sCategoriesModalPicker"

import axios from 'axios';



export default function ContentPost() {
  let userDetails = useSelector(state => state.user)
  let accessToken = userDetails?.currentUser?.accessToken;
  const id = userDetails?.currentUser?.others?._id;
  const [title, settitle] = useState("");
  const [file, setfile] = useState(null);
  const [file2, setfile2] = useState(null)
  const [ProductLinkTxt, setProductLinkTxt] = useState('');
  const [ProductLink, setProductLink] = useState([]);

  const [chooseData, setchooseData] = useState('Select categories')
  const [subchooseData, setsubchooseData] = useState('Select subcategories');


  const [isModalVisible, setisModalVisible] = useState(false);
  const changeModalVisibility = (bool) => {
    setisModalVisible(bool)
  }

  const setData = (option) => {
    setchooseData(option);
  }

  const [subisModalVisible, setsubisModalVisible] = useState(false);
  const subchangeModalVisibility = (bool) => {
    setsubisModalVisible(bool)
  }

  const setsubData = (option) => {
    setsubchooseData(option);
  }



  const addProductHandle = () => {
    setProductLink(ProductLinkTxt);
  }


  const onSelectImage = async () => {
    const permissionStatus = await PermissionsCameraAndroid();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert(
        'File'
      )
    }
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      const imageUri = Platform.OS == 'ios' ? image : image;
      setfile(imageUri);
    });
  }


  const handlePost = async () => {
    // e.preventDefault();
    console.log(file, "File")

    const fileObject = {
      uri: file.path,
      name: file.path.split('/').pop(),
      type: file.mime,
    };


    // Create a new FormData object and append the image file to it
    const formData = new FormData();
    formData.append("image", fileObject);
    formData.append("title", title);
    formData.append("ProductLinks", ProductLink);
    formData.append("video", file2);
    formData.append("categories", chooseData);
    formData.append("subcategories", subchooseData);
    
    try {
      await axios.post("http://192.168.18.4:5000/api/post/user/post", formData, { headers: { 'Content-Type': 'multipart/form-data', token: accessToken } });
      alert("sucessfully upload post"),
        location.reload();
    } catch (error) {
      alert(error)
    }

  }


  return (
    <View style={styles.ContentPost}>
      <View style={styles.MainProfileContainerinfeed}>
        <FastImage source={{ uri: `${userDetails?.currentUser?.others?.profile}` }} style={{ width: 40, height: 40, borderRadius: 500 }} />
        <TextInput placeholder='Write a Title' multiline={true} style={styles.inputpostTitle} onChangeText={(value) => settitle(value)}></TextInput>
      </View>
      <View style={styles.categoriesItemcontainer}>
        <View style={styles.categoriesItem}>
          <TouchableOpacity onPress={onSelectImage}>
            <FastImage source={`${uploadimage}`} style={{ width: 30, height: 30, marginLeft: 0, borderRadius: 0 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelectImage}>
            <FastImage source={`${Videoupload}`} style={{ width: 30, height: 30, marginLeft: 15, borderRadius: 0, marginTop: -2 }} />

          </TouchableOpacity>

        </View>
        <View>
          <TouchableOpacity style={styles.addPostbtn}>
            <Text style={styles.text} onPress={handlePost}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.ProductToEarn}>
        <TextInput style={styles.addProductLink} multiline={true} placeholder="What You Wear Link Product to Earn" onChangeText={(value) => setProductLinkTxt(value)}></TextInput>
        <TouchableOpacity style={styles.addProductbtn} onPress={addProductHandle}>
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
      </View>
      <View>
        {ProductLink.length !== 0 ? <Text style={{ color: "black", fontSize: 14 }}>{`${ProductLink}`}</Text> : ""}
      </View> */}
      <View style={styles.cetegoriesContainer}>
        <View style={{backgroundColor:'gray' , padding:3, borderTopLeftRadius:10 }}>
          <View>
            <Text style={styles.inputText}>Categories</Text>
            {/* <TextInput multiline style={styles.textinput} onChangeText={(value) => setCategories(value)} /> */}
            <TouchableOpacity style={{ backgroundColor: "white", width: '100%', paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, borderTopLeftRadius:10,borderBottomRightRadius:10 }}
              onPress={() => changeModalVisibility(true)}>
              <Text style={{ color: "black" }}>{chooseData}</Text>
            </TouchableOpacity>
          </View>
          <Modal transparent={true} animationType='fade'
            visible={isModalVisible} nRequestClose={() => changeModalVisibility(false)}>
            <CategoriesModalPicker changeModalVisibility={changeModalVisibility}
              setData={setData} />
          </Modal>
        </View>

        <View style={{marginRight:20}}>
        <View style={{marginLeft:-10}}>
                  <Text style={styles.inputText}>Subcategories</Text>

                  {chooseData === "Kid's Fashion" ? <View>
                     <TouchableOpacity style={{ backgroundColor: "white", width: '100%', paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, borderTopLeftRadius:10,borderBottomRightRadius:10 }}
                        onPress={() => subchangeModalVisibility(true)}>
                        <Text style={{ color: "black" }}>{subchooseData}</Text>
                     </TouchableOpacity>
                     <Modal transparent={true} animationType='fade'
                        visible={subisModalVisible} nRequestClose={() => subchangeModalVisibility(false)}>
                        <ElectronicCategoriesModalPicker subchangeModalVisibility={subchangeModalVisibility}
                           setsubData={setsubData} />
                     </Modal>
                  </View> : ''}
                  {chooseData === "Beauty and Personal Care" ? <View>
                     <TouchableOpacity style={{ backgroundColor: "white", width: '100%', paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, borderTopLeftRadius:10,borderBottomRightRadius:10 }}
                        onPress={() => subchangeModalVisibility(true)}>
                        <Text style={{ color: "black" }}>{subchooseData}</Text>
                     </TouchableOpacity>
                     <Modal transparent={true} animationType='fade'
                        visible={subisModalVisible} nRequestClose={() => subchangeModalVisibility(false)}>
                        <BeautyCategoriesModalPicker subchangeModalVisibility={subchangeModalVisibility}
                           setsubData={setsubData} />
                     </Modal>
                  </View> : ''}
                  {chooseData === "Women's Fashion" ? <View>
                     <TouchableOpacity style={{ backgroundColor: "white", width: '100%', paddingTop: 4, paddingBottom:4, paddingLeft: 10, paddingRight: 10, borderTopLeftRadius:10,borderBottomRightRadius:10 }}
                        onPress={() => subchangeModalVisibility(true)}>
                        <Text style={{ color: "black" }}>{subchooseData}</Text>
                     </TouchableOpacity>
                     <Modal transparent={true} animationType='fade'
                        visible={subisModalVisible} nRequestClose={() => subchangeModalVisibility(false)}>
                        <WomensFashionCategoriesModalPicker subchangeModalVisibility={subchangeModalVisibility}
                           setsubData={setsubData} />
                     </Modal>
                  </View> : ''}
                  {chooseData === "Men's Fashion" ? <View>
                     <TouchableOpacity style={{ backgroundColor: "white", width: '100%', paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, borderTopLeftRadius:10,borderBottomRightRadius:10 }}
                        onPress={() => subchangeModalVisibility(true)}>
                        <Text style={{ color: "black" }}>{subchooseData}</Text>
                     </TouchableOpacity>
                     <Modal transparent={true} animationType='fade'
                        visible={subisModalVisible} nRequestClose={() => subchangeModalVisibility(false)}>
                        <MenCategoriesModalPicker subchangeModalVisibility={subchangeModalVisibility}
                           setsubData={setsubData} />
                     </Modal>
                  </View> : ''}
               </View>
        </View>
      </View>

      <View style={styles.ProductToEarn}>
        <TextInput style={styles.addProductLink} multiline={true} placeholder="What You Wear Link Product to Earn" onChangeText={(value) => setProductLinkTxt(value)}></TextInput>
        <TouchableOpacity style={styles.addProductbtn} onPress={addProductHandle}>
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
      </View>
      <View>
        {ProductLink.length !== 0 ? <Text style={{ color: "black", fontSize: 14 }}>{`${ProductLink}`}</Text> : ""}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  inputText:{
    color:'white',
    padding:3
  },
  MainProfileContainerinfeed: {
    flexDirection: 'row',
  },
  inputpostTitle: {
    width: "90%"
  },
  ContentPost: {
    marginTop: 10,
    backgroundColor: "white",
    width: "96%",
    marginLeft: 6,
    padding: 10,
    borderTopLeftRadius:10,
    borderBottomRightRadius:10

  },
  categoriesItemcontainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 4,
    justifyContent: "space-between"
  },
  categoriesItem: {
    flexDirection: 'row',
  },
  addProductbtn: {
    backgroundColor: "black",
    paddingLeft: 20,
    paddingRight: 30,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: -2,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  addPostbtn: {
    backgroundColor: "black",
    paddingLeft: 20,
    paddingRight: 33,
    paddingTop: 9,
    paddingBottom: 10,
    marginLeft: 6,
    borderRadius: 5
  },
  addProductLink: {
    borderStyle: 'dashed',
    borderWidth: 0.9,
    width: "80%",
    height: 40,
    borderRadius: 7
  },
  ProductToEarn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: "white"
  },
  cetegoriesContainer:{
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 10,
    alignItems:'center',
    justifyContent: "space-between",
    backgroundColor:'black',
    borderRadius:10,
  }
})