import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ToastAndroid } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState } from 'react';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import ButtomTabs from '../../HomeComponent/ButtomTabs';
import navigationStrings from '../../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
import { addProduct } from '../../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import Topheader from '../../HomeComponent/Topheader';
import axios from 'axios';
import { Button } from 'react-native';
import FeedPost from '../../HomeComponent/FeedPost';
import Product from '../../HomeComponent/Product';
import FastImage from 'react-native-fast-image'

const numstars = 5;

export default function DetailsScreen(items , productLink ) {

  
  const [size, setSize] = useState('select');
  const [color, setColor] = useState();
  const navigation = useNavigation();
  const [quantity, setquatity] = useState(1);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  let Userid = user?.currentUser?.others?._id;
  const id = items?.route?.params?.items?._id;
  const NeedToImproveAffId = items?.route?.params?.productLink;
  const affid = NeedToImproveAffId?.slice(31 , 57);
  console.log(id , "newid")
  
  // const handlecopy = (link)=>{
    //   Clipboard.setString(link);
    //   ToastAndroid.show('Link copied to clipboard', ToastAndroid.SHORT);
    // }
    function handlecopy(link) {
      Clipboard.setString(link);
      ToastAndroid.show('Link copied to clipboard', ToastAndroid.SHORT);
    }
    
    
    useEffect(() => {
      const getProduct = async () => {
        try {
          const res = await axios.get(`http://192.168.18.4:5000/api/products/find/${id}`);
          setProduct(res.data);
        } catch (error) { }
      };
      getProduct();
    }, [id]);
    
    const [Posts, setPosts] = useState([]);
    useEffect(() => {
      const getPosts = async () => {
        try {
          const res = await axios.get(`http://192.168.18.143:5000/api/post/getallpost?category=${product?.categories}&subcategories=${product?.subcategories}`)
          setPosts(res.data);
        } catch (error) {
  
        }
      }
      getPosts();
    }, [product.categories])

    const [products , setProducts]= useState([]);

    useEffect(() => {
      const getProducts = async ()=>{
        try {
          const res = await axios.get(`http://192.168.18.143:5000/api/products/getallProduct?category=${product?.categories}&&subcategories=${product?.subcategories}`)
          setProducts(res.data)
        } catch (error) {
          
        }
      }
      getProducts();
    }, [product.categories])

    console.log(products , product.categories , product.subcategories);


  const handleQuanity = type => {
    if (type === 'des') { quantity > 1 && setquatity(quantity - 1) } else {
      setquatity(quantity + 1);
    }
  };

  const handleClick = () => { dispatch(addProduct({ ...product, quantity, color, size , affid })) };
  // {console.log(product.subcategories[0] , "Product")}

  const defaultRating = product?.ratings;
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';
  const CustomRatingBar = () => {
    return (
      <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: 30 }}>
        {
          maxRating.map((items, key) => {
            return (
              <TouchableOpacity activeOpacity={0.7} key={items}>
                <FastImage style={{ width: 30, height: 24,  marginBottom: 10 }} resizeMode={FastImage.resizeMode.contain} source={items <= defaultRating ? { uri: starImgFilled } : { uri: starImgCorner }} />
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
  return (
    <>
      <ScrollView>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
          <View key={product?._id}>
            <Topheader />
            <View style={styles.imageContainer} >
              {product?.img?.slice(0,1).map((imgg)=>(
                <FastImage source={{ uri: `${imgg}` }} style={{ width: 250, height: 250, resizeMode: 'contain' }} resizeMode={FastImage.resizeMode.contain} />
              ))}
            </View>
            <Text style={styles.headerTitle}>{product?.title}</Text>
            <View
              style={{ marginBottom: 1, backgroundColor: 'black', paddingLeft: 9 }}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <CustomRatingBar />
                {/* <Text style={{ color: 'white' }}> (0)</Text> */}
              </View>
              <View>
                <View style={styles.priceofproduct}>
                  <View>
                    <Text style={styles.priceText}>NPR {product?.price}</Text>
                  </View>
                  <View style={styles.addtocart}>
                    <Text style={styles.number} onPress={() => handleQuanity('des')}> - </Text>
                    <Text style={styles.incrProduct}>{quantity}</Text>
                    <Text style={styles.number} onPress={() => handleQuanity('inc')}>+</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity><Text style={styles.soldby} onPress={() => navigation.navigate(navigationStrings.ProductPage, product)}>Sold By : Shop.com</Text></TouchableOpacity>

              <View style={{ marginTop: 10, paddingTop: 6, flexDirection: 'row', alignItems: 'center', }}>
                <Text style={styles.ColorText}>Select Colors:</Text>
                {product?.color?.map((item) => (
                  <TouchableOpacity onPress={()=>setColor(item)}  style={{ backgroundColor: "white",  marginLeft: 10,paddingTop:2, paddingBottom:2, paddingLeft:6,paddingRight:6,borderRadius:10 }}>
                    <Text style={{color:"black"}}>{item}</Text>
                  </TouchableOpacity>
                ))}

              </View>

              <View style={{ marginTop: 10, paddingTop: 6, flexDirection: 'row', alignItems: 'center', }}>
                <Text style={styles.ColorText}>Select Size</Text>
                {product?.size?.map((item) => (
                    <TouchableOpacity style={{backgroundColor:"white" , marginLeft:6 , marginTop:10 , marginBottom:10 , paddingLeft:5 , paddingRight:5  }}>
                      <Text onPress={()=>setSize(item)} style={{color:'black' , marginTop:5 , marginLeft:3}}>{item}</Text>
                    </TouchableOpacity>
                ))}
              </View>


              <View>
                <TouchableOpacity style={styles.buttonlog} onPressIn={handleClick}  >
                  <Text style={styles.textbuy}>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonlog} onPress={handleClick}>
                  <Text style={styles.textbuy}>Add to Cart</Text>
                </TouchableOpacity>
                <Button style={styles.copyproductlink} onPress={() => handlecopy(`http://localhost:3000/product/find/${product?._id}?affid=${Userid}`)} title="Copy Product Link" />
                
              </View>
              <View style={{ backgroundColor: 'black' }}>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.DescritionText}>Description:</Text>
                  <Text style={styles.normalText}>{product?.desc}</Text>
                  <View style={styles.imageContainer}>
                    <FastImage
                      source={{
                        url: 'https://images.prismic.io/frameworkmarketplace/cca31de3-3b75-4932-af96-7646b7eba6c7__DSC3630-Edit-cropped.jpg',
                      }}
                      style={{ width: '100%', height: 250, resizeMode: 'contain' }} resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                </View>

                <View style={{ paddingTop: 10 }}>
                  <Text style={styles.Detailheader}>Product Details:</Text>
                  {product?.productDetail?.map((item)=>(
                    <Text style={styles.normalText}>{`\u29BF ${item}`}</Text>

                  ))}
                </View>


                <Text style={styles.headerText}>Product Specifications</Text>
          {product?.subcategories === 'Hoodie' || product?.subcategories === 'Shirts' || product?.subcategories === 'T-Shirts' || product?.subcategories === 'Casual Shirts' || product?.subcategories === 'Formal Shirts' || product?.subcategories === 'Sweatshirts' || product?.subcategories === 'Sweaters' || product?.subcategories === 'Jackets' || product?.subcategories === 'Coats' || product?.subcategories === 'Suits' || product?.subcategories === 'Jeans' || product?.subcategories === 'Shorts' || product?.subcategories === 'Track Pants & Joggers' || product?.subcategories === 'Trousers' || product?.subcategories === 'Shoes' || product?.subcategories === 'Sandals and Floaters' || product?.subcategories === 'Socks' ? 
          <View>
            <Text style={styles.normalText}>Brand : {`${product?.brand}`}</Text>
            <Text style={styles.normalText}>Material : {`${product?.Material}`}</Text>
            <Text style={styles.normalText}>Date First Available : {`${product?.Date_First_Available}`}</Text>
            <Text style={styles.normalText}>Manufacturer : {`${product?.Manufacturer}`}</Text>
            <Text style={styles.normalText}>Country_of_origin : {`${product?.Country_of_origin}`}</Text>
            <Text style={styles.normalText}>ASIN : {`${product?.ASIN}`}</Text>
            <Text style={styles.normalText}>Item model number : {`${product?.Item_model_number}`}</Text>
            <Text style={styles.normalText}>Product Dimensions : {`${product?.Product_Dimensions}`}</Text>
          </View>:product?.subcategories == "Drones Products"? 
          <View>
            <Text style={styles.normalText}>App-Controlled : {`${product?.App_Controlled}`}</Text>
            <Text style={styles.normalText}>Integrated GPS : {`${product?.Integrated_GPS}`}</Text>
            <Text style={styles.normalText}>SKU : {`${product?.SKU}`}</Text>
            <Text style={styles.normalText}>Integrated Camera : {`${product?.Integrated_Camera}`}</Text>
            <Text style={styles.normalText}>Programmable : {`${product?.Programmable}`}</Text>
            <Text style={styles.normalText}>Batteries : {`${product?.Batteries}`}</Text>
          </View>:product?.subcategories == "Generators and Power Suppliers"? 
          <View>
            <Text>Makeup : {`${product?.Makeup}`}</Text>
          </View>:product?.subcategories == "Audio device" ? 
          <View>
            <Text style={styles.normalText}>Model : {`${product?.Model}`}</Text>
            <Text style={styles.normalText}>Connector_1 : {`${product?.Connector_1}`}</Text>
            <Text style={styles.normalText}>Compatible Operating System : {`${product?.Compatible_Operating_System}`}</Text>
            <Text style={styles.normalText}>Special Feature : {`${product?.Special_Feature}`}</Text>
            <Text style={styles.normalText}>SKU : {`${product?.SKU}`}</Text>
            <Text style={styles.normalText}>Wireless Connectivity : {`${product?.Wireless_Connectivity}`}</Text>
            <Text style={styles.normalText}>Bluetooth : {`${product?.Bluetooth}`}</Text>
            <Text style={styles.normalText}>Build in Battery : {`${product?.Build_in_Battery}`}</Text>
            <Text style={styles.normalText}>Cable Length : {`${product?.Cable_Length}`}</Text>
            
          </View>:product?.subcategories == "Camera" ? 
          <View>
            <Text style={styles.normalText}>Model : {`${product?.Model}`}</Text>
            <Text style={styles.normalText}>Form Factor : {`${product?.Form_Factor}`}</Text>
            <Text style={styles.normalText}>Effective Still Resolution : {`${product?.Effective_Still_Resolution}`}</Text>
            <Text style={styles.normalText}>Special Feature : {`${product?.Special_Feature}`}</Text>
            <Text style={styles.normalText}>Optical Zoom : {`${product?.Optical_Zoom}`}</Text>
            <Text style={styles.normalText}>Connectivity Technology : {`${product?.Connectivity_Technology}`}</Text>
            <Text style={styles.normalText}>Screen Size : {`${product?.Screen_Size}`}</Text>
            <Text style={styles.normalText}>Photo Sensor Size : {`${product?.Photo_Sensor_Size}`}</Text>
            <Text style={styles.normalText}>Batteries : {`${product?.Batteries}`}</Text>
            <Text style={styles.normalText}>Item model number : {`${product?.Item_model_number}`}</Text>
          </View>:product?.subcategories == "Smartwatches"? 
          <View>
            <Text style={styles.normalText}>Display Type : {`${product?.Display_Type}`}</Text>
            <Text style={styles.normalText}>Material Type : {`${product?.Material}`}</Text>
            <Text style={styles.normalText}>SKU : {`${product?.SKU}`}</Text>
            <Text style={styles.normalText}>Movement : {`${product?.Movement}`}</Text>
            <Text style={styles.normalText}>Batteries : {`${product?.Batteries}`}</Text>
          </View>:product?.subcategories == "Clothing"? 
          <View>
            <Text style={styles.normalText}>Clothing Material : {`${product?.Model}`}</Text>
            <Text style={styles.normalText}>SKU : {`${product?.SKU}`}</Text>
            <Text style={styles.normalText}>Item model number : {`${product?.Item_model_number}`}</Text>
          </View>:product?.subcategories == "Traditional Clothing"? 
          <View>
            <Text style={styles.normalText}>Material : {`${product?.Material}`}</Text>
            <Text style={styles.normalText}>Item model number : {`${product?.Item_model_number}`}</Text>
          </View>:product?.subcategories == "Women's Bages"? 
          <View>
            <Text style={styles.normalText}>Material : {`${product?.Material}`}</Text>
            </View>:product?.subcategories == "Shoes"? 
          <View>
            <Text style={styles.normalText}>Material : {`${product?.Material}`}</Text>
            <Text style={styles.normalText}>Item model number : {`${product?.Item_model_number}`}</Text>

          </View>:product?.subcategories == "Girl's Fashion"? 
          <View>
             <View>Material : {`${product?.Material}`}</View>
             <View>Item model number : {`${product?.Item_model_number}`}</View>

          </View>:product?.subcategories == "Lingeris, Sleep and Lounge"? 
          <View>
            <View>Material : {`${product?.Material}`}</View>
          </View>:product?.subcategories == "Men's Underwear"? 
          <View>
            <View>Material : {`${product?.Material}`}</View>
          </View>:product?.subcategories == "Men's Bages"? 
          <View>
            <View>Material : {`${product?.Material}`}</View>
          </View>:product?.subcategories == "Boy's Fashion"? 
          <View>
            <View>Material</View>
          </View>:product?.subcategories == "Accessories"? 
          <View>
            <View>Material : {`${product?.Material}`}</View>
          </View>:null
          }


        </View>
      </View>

      {products.length !== 0 ?
         <View style={{backgroundColor:"white"}}>
           <Text style={styles.Feedtext}>Similar Product</Text>
           <ScrollView horizontal >
             <View style={styles.submainproduct}>
               {products.map((item) => (
                 <Product items={item}/>
                 // <Text>Hi</Text>
               ))}
           </View>
  
           </ScrollView>
           </View>
      :""}

      {Posts.length !== 0 ?
         <View>
           <Text style={styles.Feedtext}>User Post</Text>
           <ScrollView horizontal >
             <View style={styles.submainpost}>
               {Posts.map((item) => (
                 <FeedPost post={item}/>
                 // <Text>Hi</Text>
               ))}
           </View>
  
           </ScrollView>
           </View>
      :""}
            <View style={{ marginTop: 40 }}>
              <Text style={styles.text1}>Customers reviews</Text>
              <View style={styles.ratingContainer}>
                <CustomRatingBar />
                <Text style={styles.text}>{product.ratings} out of 5</Text>
              </View>
              <TouchableOpacity style={styles.buttonforReview}>
                {user.currentUser !== null ? <Text style={{ color: 'black', fontSize: 17, fontWeight: '700' }} onPress={() => navigation.navigate(navigationStrings.Review, product)}> Write Review</Text> :  <Text style={{ color: 'black', fontSize: 17, fontWeight: '700' }} onPress={() => navigation.navigate(navigationStrings.Signin)}> Write Review</Text>  }
                
              </TouchableOpacity>
            </View>

            {product?.reviews?.map((items) => (
              <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <FastImage source={{ uri: 'https://i.pinimg.com/750x/3f/0e/34/3f0e3480ada2c82190a17824325ecad4.jpg' }} style={{ width: '10%', borderRadius: 500, height: 40, resizeMode: 'contain' }} />
                  <Text style={{ color: 'white', fontWeight: '800', paddingTop: 0, marginLeft: 10 }}>{items?._id}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: -22, marginLeft: 24, alignItems: "center", marginLeft: 44 }}>
                  <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: 30 }}>
                    {
                      maxRating.map((item, key) => {
                        return (
                          <TouchableOpacity activeOpacity={0.7} key={item}>
                            <FastImage style={{ width: 30, height: 24,  marginBottom: 10 }} resizeMode={FastImage.resizeMode.contain} source={item <= items?.rating ? { uri: starImgFilled } : { uri: starImgCorner }} />
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                  <Text style={{ color: 'white', fontWeight: '900', marginLeft: 10, marginTop: 16 }}>Rating by user</Text>
                </View>
                <View>
                  <Text style={{ color: 'white', marginTop: 5, marginLeft: 25, marginRight: 10, marginLeft: 50 }}>{items.comment}</Text>
                </View>
              </View>

            ))}
          </View>

        </SafeAreaView>
      </ScrollView>
      <ButtomTabs />
    </>
  );
}



const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  imageContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 14,
    width: '95%',
    marginTop: 10,
    paddingLeft: 13,
    color: 'white',
  },
  priceofproduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -12,
  },
  copyproductlink:{
    borderRadius:20,
    backgroundColor:'white'
  },
  addtocart: {
    flexDirection: 'row',
    paddingLeft: 170,
  },
  priceText: {
    fontWeight: '600',
    color: 'white',
    fontSize: 18,
  },
  incrProduct: {
    fontWeight: '900',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 18,
    marginBottom: 12,
    marginTop: 5,
  },
  number: {
    fontWeight: '900',
    color: 'white',
    margin: 5,
    paddingLeft: 3,
    paddingRight: 3,
    fontSize: 18,
    marginBottom: 8,
  },
  normalText: {
    fontSize: 15,
    marginLeft: 8,
    fontWeight: '400',
    color: 'white',
    padding:6
  },
  headerText:{fontSize: 22,
    marginBottom:10,
    marginTop:20,
    fontWeight: '900',
    backgroundColor:"white",
    color: 'black',},
  ColorText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '900',
  },
  Detailheader: {
    color: 'white',
    fontSize: 21,
    fontWeight: '900',
    backgroundColor:"white",
    color:"black"
  },
  DescritionText: {
    color: 'white',
    fontSize: 21,
    fontWeight: '800',
  },
  rating: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  buttonlog: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    marginVertical: 7,
    paddingHorizontal: 24,
    marginTop: 0,
    marginRight: 10,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'white',
  },
  soldby: {
    color: 'white',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingLeft: 28,
  },
  textbuy: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    paddingLeft: 28,
  },
  text1: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
    alignSelf: 'center',
  },
  color: {
    backgroundColor: 'white',
    // height: 20,
    width: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  color2: {
    backgroundColor: 'red',
    height: 20,
    width: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  color3: {
    backgroundColor: 'cyan',
    height: 20,
    width: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  color4: {
    backgroundColor: 'indigo',
    height: 20,
    width: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  color6: {
    backgroundColor: 'gold',
    height: 20,
    width: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  ratingContainer: {
    padding: 10,
    alignSelf: 'center',
    alignContent: 'center',
    // flexDirection: 'row',
  },
  buttonforReview: {
    width: '38%',
    paddingTop: 4,
    paddingLeft: 5,
    borderRadius: 20,
    alignItems: 'center',

    backgroundColor: '',
    paddingRight: 4,
    paddingBottom: 4,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  productSize: {
    width: 180,
    color: 'white',
    backgroundColor: 'black',
    fontWeight: '900'
  },
  submainpost:{
    flexDirection:"row",
    backgroundColor:"black",
    
  },
  submainproduct:{
    flexDirection:'row',
    backgroundColor:"white"
  },
  Feedtext:{
   backgroundColor:"black",
   color:"white",
   fontSize:16,
   fontWeight:'800',
   paddingLeft:10
  }
});
