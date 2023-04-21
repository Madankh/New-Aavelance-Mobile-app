import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../adminNavbar/Navbar';
import { PermissionsCameraAndroid } from '../permissions';
import ImagePicker from 'react-native-image-crop-picker';
import { addProduct } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-native';
import { CategoriesModalPicker } from '../../Screens/view Screen/CategoriesModalPicker';
import { ElectronicCategoriesModalPicker } from '../../Screens/view Screen/ElectronicCategoriesModalPicker';
import { BeautyCategoriesModalPicker } from '../../Screens/view Screen/BeautyCategoriesModalPicker';
import { WomensFashionCategoriesModalPicker } from '../../Screens/view Screen/Women\'sFashionCategoriesModalPicker';
import { MenCategoriesModalPicker } from "../../Screens/view Screen/Men'sCategoriesModalPicker"
import axios from 'axios';

export default function CreateProduct() {
   const dispatch = useDispatch();

   const [file, setfile] = useState([]);
   const [uploading, setUploading] = useState(0);
   const [transferred, setTransferred] = useState(0);
   const [title, setTitle] = useState('');
   const [desc, setDesc] = useState('');
   const [productDetail, setproductDetail] = useState([]);
   const [subcategories, setSubcategories] = useState('');
   const [size, setSize] = useState([]);
   const [color, setColor] = useState([]);
   const [price, setPrice] = useState();
   const [Stock, setStock] = useState(0);
   const [categories, setCategories] = useState('');
   const [chooseData, setchooseData] = useState('Select categories')
   const [subchooseData, setsubchooseData] = useState('Select subcategories');
   const [Item_model_number, setItem_model_number] = useState('');


   const [brand, setbrand] = useState('');
   const [Manufacturer, setManufacturer] = useState('');
   const [ASIN, setASIN] = useState('');

   const [Skin_Type, setSkin_Type] = useState('');
   const [Product_Dimensions, setProduct_Dimensions] = useState('');
   const [Date_First_Available, setDate_First_Available] = useState('');
   const [Skin_Tone, setSkin_Tone] = useState('');
   const [Age_Range, setAge_Range] = useState('');
   const [Product_Benefits, setProduct_Benefits] = useState('');
   const [Material_Type_Free, setMaterial_Type_Free] = useState('');
   const [Scent, setScent] = useState('');
   const [Liquid_Volume, setLiquid_Volume] = useState('');
   const [Item_Weight, setItem_Weight] = useState('');
   const [Publisher, setPublisher] = useState('');
   const [Language, setLanguage] = useState('');
   const [Liquid_Type , setLiquid_Type] = useState('');
   const [Material, setMaterial] = useState('');
   const [Hair_Type, setHair_Type] = useState('');
   const [Country_of_origin, setCountry_of_origin] = useState('');



   const [modalVisible, setModalVisible] = useState(false);
   const [msg, setmsg] = useState('');


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


   const handleColor = (value) => {
      setColor(value.split(" "));
   };

   
   const handleSize = (value) => {
      setSize(value.split(" "));
   };
   const handleProductDetail = (value) => {
      setproductDetail(value.split(","));
   };

   const admin = useSelector((state) => state.seller);
   const [image , setimage]= useState('');
   let seller = admin.currentSeller;
   let accessToken = admin.currentSeller.accessToken;
   console.log(accessToken);


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

    // formData.append("img" , file[0])
    formData.append("title", title);
    formData.append("desc", desc);

    formData.append("price", price);
    formData.append("Stock", Stock);
   //  formData.append("desc", desc);

    formData.append("brand", brand);
    formData.append("Manufacturer", Manufacturer);
    formData.append("ASIN", ASIN);
    formData.append("Country_of_origin", Country_of_origin);
    formData.append("Item_model_number", Item_model_number);
    formData.append("Product_Dimensions", Product_Dimensions);
    formData.append("Material", Material);
    formData.append("subcategories", subchooseData);
    formData.append("Publisher", Publisher);
    formData.append("Language", Language);
    formData.append("Date_First_Available", Date_First_Available);
    formData.append("Skin_Tone", Skin_Tone);
    formData.append("Age_Range", Age_Range);
    formData.append("Product_Benefits", Product_Benefits);
    formData.append("Material_Type_Free", Material_Type_Free);
    formData.append("Scent", Scent);
    formData.append("Liquid_Volume", Liquid_Volume);
    formData.append("Liquid_Type", Liquid_Type);
    formData.append("Item_Weight", Item_Weight);
    formData.append("categories", chooseData);

    formData.append("Hair_Type", Hair_Type);
    formData.append("Skin_Type", Skin_Type);
    await axios.post("http://192.168.18.4:5000/api/products/product", formData, { headers: { 'Content-Type': 'multipart/form-data', token: accessToken } }).then((data) => {
      setmsg(data.data)
      console.log(data.data , "this is data")
      setModalVisible(true)
    })

   };

   return (
      <ScrollView>
         <Navbar />
         <View style={{ flexDirection: 'row' }}>
            <View style={styles.subContainer}>
               <Text style={styles.MainText}>New Product</Text>
               <View>
                  <Text style={{ color: "black", marginTop: 5, marginBottom: 5, }}>Product Images</Text>
                  <TouchableOpacity style={styles.imgforProduct} onPress={onSelectImage}  >
                     <Text style={styles.chooseimg}>Choose Images</Text>
                     <Image source={{ uri: `${image}` == '' ? 'https://www.creativefabrica.com/wp-content/uploads/2019/05/Add-icon-by-ahlangraphic-1-580x386.jpg' : `${image}` }} style={{ height: 200, width: 374 }} />
                  </TouchableOpacity>
               </View>
               <View>
                  <Text style={styles.inputText}>Title</Text>
                  <TextInput multiline style={styles.textinput} placeholder="Air Airpods" onChangeText={(value) => setTitle(value)} />
               </View>
               <View>
                  <Text style={styles.inputText}>Product Description</Text>
                  <TextInput multiline style={styles.textinput} placeholder="Product Description" onChangeText={(value) => setDesc(value)} />
               </View>
               <View>
                  <Text style={styles.inputText}>Product Details</Text>
                  <TextInput multiline style={styles.textinput} placeholder="Product Details"  onChangeText={handleProductDetail} />
               </View>

               <View>
                  <Text style={styles.inputText}>Categories</Text>
                  {/* <TextInput multiline style={styles.textinput} onChangeText={(value) => setCategories(value)} /> */}
                  <TouchableOpacity style={{ backgroundColor: "white", width: '100%', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 10 }}
                     onPress={() => changeModalVisibility(true)}>
                     <Text style={{ color: "black" }}>{chooseData}</Text>
                  </TouchableOpacity>
               </View>

               <Modal transparent={true} animationType='fade'
                  visible={isModalVisible} nRequestClose={() => changeModalVisibility(false)}>
                  <CategoriesModalPicker changeModalVisibility={changeModalVisibility}
                     setData={setData} />
               </Modal>

               <View>
                  <Text style={styles.inputText}>Subcategories</Text>

                  {chooseData === "Kid's Fashion" ? <View>
                     <TouchableOpacity style={{ backgroundColor: "white", width: '100%', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 10 }}
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
                     <TouchableOpacity style={{ backgroundColor: "white", width: '100%', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 10 }}
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
                     <TouchableOpacity style={{ backgroundColor: "white", width: '100%', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 10 }}
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
                     <TouchableOpacity style={{ backgroundColor: "white", width: '100%', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 10 }}
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
               {subchooseData === 'Hoodie' || subchooseData === 'Shirts' || subchooseData === 'T-Shirts' || subchooseData === 'Casual Shirts' || subchooseData === 'Formal Shirts' || subchooseData === 'Sweatshirts' || subchooseData === 'Sweaters' || subchooseData === 'Jackets' || subchooseData === 'Coats' || subchooseData === 'Suits' || subchooseData === 'Jeans' || subchooseData === 'Shorts' || subchooseData === 'Track Pants & Joggers' || subchooseData === 'Trousers' || subchooseData === 'Shoes' || subchooseData === 'Sandals and Floaters' || subchooseData === 'Socks' ?
                  <View>
                     <View>
                        <Text style={styles.inputText}>Brand</Text>
                        <TextInput multiline style={styles.textinput} placeholder="Brand" onChangeText={(value) => setbrand(value)} />
                     </View>
                     <View>
                        <Text style={styles.inputText}>Material</Text>
                        <TextInput multiline style={styles.textinput} placeholder="Material" onChangeText={(value) => setMaterial(value)} />
                     </View>
                     <View>
                        <Text style={styles.inputText}>Size</Text>
                        <TextInput multiline style={styles.textinput} placeholder="Size" onChangeText={handleSize} />
                     </View>
                     <View>
                        <Text style={styles.inputText}>Color</Text>
                        <TextInput multiline style={styles.textinput} placeholder="Color" onChangeText={handleColor} />
                     </View>
                     <View>
                        <Text style={styles.inputText}>Date First Available</Text>
                        <TextInput multiline style={styles.textinput} placeholder="Date First Available" onChangeText={(value) => setDate_First_Available(value)} />
                     </View>
                     <View>
                        <Text style={styles.inputText}>Manufacturer</Text>
                        <TextInput multiline style={styles.textinput} placeholder="Manufacturer" onChangeText={(value) => setManufacturer(value)} />
                     </View>
                     <View>
                        <Text style={styles.inputText}>Country of origin</Text>
                        <TextInput multiline style={styles.textinput} placeholder="Country of origin" onChangeText={(value) => setCountry_of_origin(value)} />
                     </View>
                     <View>
                        <Text style={styles.inputText}>ASIN</Text>
                        <TextInput multiline style={styles.textinput} placeholder="ASIN" onChangeText={(value) => setASIN(value)} />
                     </View>
                     <View>
                        <Text style={styles.inputText}>Item model number</Text>
                        <TextInput multiline style={styles.textinput} placeholder="Item model number" onChangeText={(value) => setItem_model_number(value)} />
                     </View>
                     <View>
                        <Text style={styles.inputText}>Product Dimensions</Text>
                        <TextInput multiline style={styles.textinput} placeholder="Product Dimensions" onChangeText={(value) => setProduct_Dimensions(value)} />
                     </View>

                  </View> : subchooseData === "Women's Bages" || subchooseData === 'Kurtas & Suits' || subchooseData === 'Shirts' || subchooseData === 'Sarees' || subchooseData === 'Jeans' || subchooseData === 'Shorts & Skirts' || subchooseData === 'Flats' || subchooseData === 'Coats' || subchooseData === 'Heels' || subchooseData === 'Boots' || subchooseData === 'Sleepwear & Loungewear' || subchooseData === 'Tops' || subchooseData === 'Co-ords' || subchooseData === 'Playsuits' || subchooseData === 'Blazers & Waistcoats' || subchooseData === 'Sweatshirts & Sweaters' ?
                     <View>
                        <View>
                           <Text style={styles.inputText}>Brand</Text>
                           <TextInput multiline style={styles.textinput} placeholder="Brand" onChangeText={(value) => setbrand(value)} />
                        </View>
                        <View>
                           <Text style={styles.inputText}>Material</Text>
                           <TextInput multiline style={styles.textinput} placeholder="Material" onChangeText={(value) => setMaterial(value)} />
                        </View>

                        <View>
                           <Text style={styles.inputText}>Size</Text>
                           <TextInput multiline style={styles.textinput} placeholder="Size" onChangeText={handleSize} />
                        </View>
                        <View>
                           <Text style={styles.inputText}>Color</Text>
                           <TextInput multiline style={styles.textinput} placeholder="Color" onChangeText={handleColor} />
                        </View>


                        <View>
                           <Text style={styles.inputText}>Date First Available</Text>
                           <TextInput multiline style={styles.textinput} placeholder="Date First Available" onChangeText={(value) => setDate_First_Available(value)} />
                        </View>
                        <View>
                           <Text style={styles.inputText}>Manufacturer</Text>
                           <TextInput multiline style={styles.textinput} placeholder="Manufacturer" onChangeText={(value) => setManufacturer(value)} />
                        </View>
                        <View>
                           <Text style={styles.inputText}>Country of origin</Text>
                           <TextInput multiline style={styles.textinput} placeholder="Country of origin" onChangeText={(value) => setCountry_of_origin(value)} />
                        </View>
                        <View>
                           <Text style={styles.inputText}>ASIN</Text>
                           <TextInput multiline style={styles.textinput} placeholder="ASIN" onChangeText={(value) => setASIN(value)} />
                        </View>
                        <View>
                           <Text style={styles.inputText}>Item model number</Text>
                           <TextInput multiline style={styles.textinput} placeholder="Item model number" onChangeText={(value) => setItem_model_number(value)} />
                        </View>
                        <View>
                           <Text style={styles.inputText}>Product Dimensions</Text>
                           <TextInput multiline style={styles.textinput} placeholder="Product Dimensions" onChangeText={(value) => setProduct_Dimensions(value)} />
                        </View>

                     </View> : subchooseData === 'Girl T-Shirts' || subchooseData === 'Boy Sweaters & Sweatshirts' || subchooseData === 'Girl Sweaters & Sweatshirts' || subchooseData === 'Boy Jackets' || subchooseData === 'Girl Jackets' || subchooseData === 'Shorts' || subchooseData === 'Track Pants' || subchooseData === 'Sandals and Floaters' || subchooseData === 'Ethnic Wear' || subchooseData === 'Boy Nightwear & Loungewear' || subchooseData === 'Girl Nightwear & Loungewear' || subchooseData === 'Sandals & Heels' || subchooseData === 'Flats & Flipflops' || subchooseData === 'Boy Clothing sets' || subchooseData === 'Girl Clothing sets' || subchooseData === 'Kurta Sets' || subchooseData === 'Boy Party Wear' || subchooseData === 'Girl Party Wear' || subchooseData === 'Lehenge choli' ?
                        <View>
                           <View>
                              <Text style={styles.inputText}>Brand</Text>
                              <TextInput multiline style={styles.textinput} placeholder="Brand" onChangeText={(value) => setbrand(value)} />
                           </View>
                           <View>
                              <Text style={styles.inputText}>Material</Text>
                              <TextInput multiline style={styles.textinput} placeholder="Material" onChangeText={(value) => setMaterial(value)} />
                           </View>

                           <View>
                              <Text style={styles.inputText}>Size</Text>
                              <TextInput multiline style={styles.textinput} placeholder="Size" onChangeText={handleSize} />
                           </View>
                           <View>
                              <Text style={styles.inputText}>Color</Text>
                              <TextInput multiline style={styles.textinput} placeholder="Color" onChangeText={handleColor} />
                           </View>


                           <View>
                              <Text style={styles.inputText}>Date First Available</Text>
                              <TextInput multiline style={styles.textinput} placeholder="Date First Available" onChangeText={(value) => setDate_First_Available(value)} />
                           </View>
                           <View>
                              <Text style={styles.inputText}>Manufacturer</Text>
                              <TextInput multiline style={styles.textinput} placeholder="Manufacturer" onChangeText={(value) => setManufacturer(value)} />
                           </View>
                           <View>
                              <Text style={styles.inputText}>Country of origin</Text>
                              <TextInput multiline style={styles.textinput} placeholder="Country of origin" onChangeText={(value) => setCountry_of_origin(value)} />
                           </View>
                           <View>
                              <Text style={styles.inputText}>ASIN</Text>
                              <TextInput multiline style={styles.textinput} placeholder="ASIN" onChangeText={(value) => setASIN(value)} />
                           </View>
                           <View>
                              <Text style={styles.inputText}>Item model number</Text>
                              <TextInput multiline style={styles.textinput} placeholder="Item model number" onChangeText={(value) => setItem_model_number(value)} />
                           </View>
                           <View>
                              <Text style={styles.inputText}>Product Dimensions</Text>
                              <TextInput multiline style={styles.textinput} placeholder="Product Dimensions" onChangeText={(value) => setProduct_Dimensions(value)} />
                           </View>

                        </View> : subchooseData === 'Lipstick' || subchooseData === 'Lip Gloss' || subchooseData === "Hand Cream" || subchooseData === 'Makeup Kit' || subchooseData === 'Lip Liner' || subchooseData === 'Mascara' || subchooseData === 'Eyeliner' || subchooseData === 'Kajal' || subchooseData === 'Foundation' || subchooseData === 'Nail Polish' || subchooseData === 'Face Moisturiser' || subchooseData === 'Cleanser' || subchooseData === 'Face Wash & Eye Cream' || subchooseData === 'Sunscreen' || subchooseData === 'Lip Balm' || subchooseData === 'Body Lotion' || subchooseData === 'Body Wash' || subchooseData === 'Fragrances' || subchooseData === "Men's Grooming" || subchooseData === 'Lip Gloss' || subchooseData === 'Concealer' || subchooseData === 'Compact' || subchooseData === "Baby Care" || subchooseData === "Skin Care" ?
                           <View>
                              <View>
                                 <Text style={styles.inputText}>Brand</Text>
                                 <TextInput multiline style={styles.textinput} placeholder="Brand" onChangeText={(value) => setbrand(value)} />
                              </View>
                              <View>
                                 <Text style={styles.inputText}>Skin Type</Text>
                                 <TextInput multiline style={styles.textinput} placeholder="Material" onChangeText={(value) => setSkin_Type(value)} />
                              </View>
                              <View>
                                 <Text style={styles.inputText}>Material</Text>
                                 <TextInput multiline style={styles.textinput} placeholder="Size" onChangeText={(value) => setMaterial(value)} />
                              </View>

                              <View>
                                 <Text style={styles.inputText}>Age Range</Text>
                                 <TextInput multiline style={styles.textinput} placeholder="Size" onChangeText={(value) => setAge_Range(value)} />
                              </View>

     
                     <View>
                        <Text style={styles.inputText}>Color</Text>
                        <TextInput multiline style={styles.textinput} placeholder="Color" onChangeText={handleColor} />
                     </View>
                              <View>
                                 <Text style={styles.inputText}>Date First Available</Text>
                                 <TextInput multiline style={styles.textinput} placeholder="Date First Available" onChangeText={(value) => setDate_First_Available(value)} />
                              </View>
                              <View>
                                 <Text style={styles.inputText}>Manufacturer</Text>
                                 <TextInput multiline style={styles.textinput} placeholder="Manufacturer" onChangeText={(value) => setManufacturer(value)} />
                              </View>
                              <View>
                                 <Text style={styles.inputText}>Country of origin</Text>
                                 <TextInput multiline style={styles.textinput} placeholder="Country of origin" onChangeText={(value) => setCountry_of_origin(value)} />
                              </View>
                              <View>
                                 <Text style={styles.inputText}>ASIN</Text>
                                 <TextInput multiline style={styles.textinput} placeholder="ASIN" onChangeText={(value) => setASIN(value)} />
                              </View>
                              <View>
                                 <Text style={styles.inputText}>Item model number</Text>
                                 <TextInput multiline style={styles.textinput} placeholder="Item model number" onChangeText={(value) => setItem_model_number(value)} />
                              </View>
                              <View>
                                 <Text style={styles.inputText}>Product Dimensions</Text>
                                 <TextInput multiline style={styles.textinput} placeholder="Product Dimensions" onChangeText={(value) => setProduct_Dimensions(value)} />
                              </View>

                           </View> : subchooseData === 'Shampoo' || subchooseData === 'Hair Cream' || subchooseData === 'Hair Oil' || subchooseData === 'Hair Gel' || subchooseData === 'Hair Color' || subchooseData === 'Hair Accessory' || subchooseData === 'Conditioner' || subchooseData === 'Hair Serum' || subchooseData === 'Hair Care' ?
                              <View>
                                 <View>
                                    <Text style={styles.inputText}>Brand</Text>
                                    <TextInput multiline style={styles.textinput} placeholder="Brand" onChangeText={(value) => setbrand(value)} />
                                 </View>
                                 <View>
                                    <Text style={styles.inputText}>Product Benefits</Text>
                                    <TextInput multiline style={styles.textinput} placeholder="Product Benefits" onChangeText={(value) => setProduct_Benefits(value)} />
                                 </View>
                                 <View>
                                    <Text style={styles.inputText}>Hair Type</Text>
                                    <TextInput multiline style={styles.textinput} placeholder="Hair Type" onChangeText={(value) => setHair_Type(value)} />
                                 </View>
                                 

                     <View>
                        <Text style={styles.inputText}>Color</Text>
                        <TextInput multiline style={styles.textinput} placeholder="Color" onChangeText={handleColor} />
                     </View>


                                 <View>
                                    <Text style={styles.inputText}>Material Type Free</Text>
                                    <TextInput multiline style={styles.textinput} placeholder="Material Type Free" onChangeText={(value) => setMaterial_Type_Free(value)} />
                                 </View>
                                 <View>
                                    <Text style={styles.inputText}>Scent</Text>
                                    <TextInput multiline style={styles.textinput} placeholder="Scent" onChangeText={(value) => setScent(value)} />
                                 </View>
                                 <View>
                                    <Text style={styles.inputText}>Liquid Volume</Text>
                                    <TextInput multiline style={styles.textinput} placeholder="Liquid Volume" onChangeText={(value) => setLiquid_Volume(value)} />
                                 </View>
                                 <View>
                                    <Text style={styles.inputText}>Item Weight</Text>
                                    <TextInput multiline style={styles.textinput} placeholder="Item Weight" onChangeText={(value) => setItem_Weight(value)} />
                                 </View>

                                 <View>
                                    <Text style={styles.inputText}>Manufacturer</Text>
                                    <TextInput multiline style={styles.textinput} placeholder="Manufacturer" onChangeText={(value) => setManufacturer(value)} />
                                 </View>
                                 <View>
                                    <Text style={styles.inputText}>Item model number</Text>
                                    <TextInput multiline style={styles.textinput} placeholder="Item model number" onChangeText={(value) => setItem_model_number(value)} />
                                 </View>
                                 <View>
                                    <Text style={styles.inputText}>ASIN</Text>
                                    <TextInput multiline style={styles.textinput} placeholder="ASIN" onChangeText={(value) => setASIN(value)} />
                                 </View>

                                 <View>
                                    <Text style={styles.inputText}>Product Dimensions</Text>
                                    <TextInput multiline style={styles.textinput} placeholder="Product Dimensions" onChangeText={(value) => setProduct_Dimensions(value)} />
                                 </View>

                              </View> : ""}


               <View>
                  <Text style={styles.inputText}>Real Price</Text>
                  <TextInput multiline style={styles.textinput} placeholder="Price" onChangeText={(value) => setPrice(value)} />
               </View>
               {/* <View>
                  <Text style={styles.inputText}>Discount Price</Text>
                  <TextInput multiline style={styles.textinput} placeholder="Price" onChangeText={(value) => setDiscountPrice(value)} />
               </View> */}
               <View>
                  <Text style={styles.inputText}>Size</Text>
                  <TextInput multiline style={styles.textinput} placeholder="Size" onChangeText={handleSize} />
               </View>
               <View>
                  <Text style={styles.inputText}>Stock</Text>
                  <TextInput multiline style={styles.textinput} placeholder="124" onChangeText={(value) => setStock(value)} />
               </View>
               <TouchableOpacity style={styles.createButton} onPress={handleChange}>
                  <Text style={styles.buttontext}>Create Product</Text>
               </TouchableOpacity>
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


      </ScrollView>
   )
}

const styles = StyleSheet.create({
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
   subContainer: {
      flex: 2.7,
      backgroundColor: '#E5E5E5',
      padding: 10
   },
   MainText: {
      color: 'black',
      fontSize: 24,
      fontWeight: '800'
   },
   chooseimg: {
      alignSelf: "center",
      fontWeight: '800',
      color: 'black'
   },
   imgforProduct: {
      width: 375,
      backgroundColor: 'white',
      paddingTop: 4,
      paddingBottom: 4,
      borderRadius: 10,
      marginTop: 10
   },
   inputText: {
      color: "black",
      marginTop: 15,
      marginBottom: 5
   },
   textinput: {
      backgroundColor: "white",
      borderRadius: 10
   },
   buttontext: {
      color: 'white'
   },
   createButton: {
      backgroundColor: 'black',
      alignItems: 'center',
      margin: 10,
      borderRadius: 10,
      padding: 10
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
   }
})