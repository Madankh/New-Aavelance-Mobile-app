import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';
import axios from 'axios';
import { useSelector } from 'react-redux';


const ProductsForsubcategory = (item) => {
    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState();
    const [selectedValue1, setSelectedValue1] = useState();
    const [filters, setfilters] = useState({});
    const [filterProducts, setfilterProducts] = useState([]);
    const [product , setProduct] = useState([]);
    const user = useSelector((state)=> state.user);
    const cat= item.route.params.product.name;

    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';


    const fetchApi = async()=>{
        try {
            const res = await axios.get( cat ? `http://192.168.18.4:5000/api/products/getallProduct?subcategories=${cat}` :`http://192.168.18.4:5000/api/products/getallProduct`);
            setProduct(res.data);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
      fetchApi()
    }, [])

    useEffect(() => {
        setfilterProducts(
            product?.filter((item) =>
                Object.entries(filters).every(([key, value]) =>
                    item[key]?.includes(value)
                )
            )
        )
    }, [product, cat, filters]);
    console.log(filters)
    return (
        <ScrollView>
        <View style={{backgroundColor:"black" , paddingBottom:10}}>
                <Text style={{color:'white' , alignSelf:'center' , fontSize:24 , fontWeight:"800"}}>{cat}</Text>

                
                <View style={{ flexDirection: 'row' }}>
                <View>
                    <Text style={{ color: "white", fontSize: 20, fontWeight: '900', marginLeft: 22, margin: 10 }}>Colors</Text>
                    <Picker filters={filters}
                       style={{ height: -10, width: 160 , backgroundColor:'white'}}
                        onValueChange={(itemValue) => setfilters({color:itemValue})}>
                        <Picker.Item label="Filter Color" value="select" />
                        <Picker.Item label="Red" value="red" />
                        <Picker.Item label="Black" value="black" />
                        <Picker.Item label="White" value="white" />
                        <Picker.Item label="Pink" value="Pink" />
                        <Picker.Item label="Sliver" value="Sliver" />
                    </Picker>
                </View>

                <View>
                            <Text style={{ color: "white", fontSize: 20, fontWeight: '900', marginLeft: 22, margin: 10 }}>Size</Text>
                            <Picker
                                selectedValue={selectedValue1}
                                style={{ width: 180, marginLeft: 22, color: 'black', backgroundColor: 'white', fontWeight: '900' }}
                                onValueChange={(itemValue) => setfilters({size:itemValue})}>
                                    <Picker.Item label="Filter Size" value="Filter Size" />
                                    <Picker.Item label="M" value="M" />
                                    <Picker.Item label="L" value="L" />
                                    <Picker.Item label="X" value="X" />
                                    <Picker.Item label="ML" value="M" />
                                    <Picker.Item label="S" value="S" />
                            </Picker>
                        </View>

            </View> 
            {filterProducts.map((items) => (
                <TouchableOpacity  key={items?._id}onPress={() => navigation.navigate(navigationStrings.DetailsScreen , {items})}>
                    <View style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
                        <Image style={styles.img} source={{ uri: `${items?.img}`}} />
                        <View>
                            <Text style={styles.text1}>{items?.title}....</Text>
                            <Text style={styles.text2}>NPR {items?.price}</Text>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: 0 , marginLeft:2 }}>
                                    {
                                        maxRating.map((itemss, key) => {
                                            return (
                                                <TouchableOpacity activeOpacity={0.7} key={itemss}>
                                                    <Image style={{ width: 20, height: 14, resizeMode: 'contain', marginBottom: 10 }} source={itemss <= items.ratings ? { uri: starImgFilled } : { uri: starImgCorner }} />
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                               
                            </View>

                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
        </ScrollView>
    )
}

export default ProductsForsubcategory

const styles = StyleSheet.create({
    text: {
        // width: '100%',
        color: 'white',
        fontSize: 22,
        marginTop: 16,
        padding: 3,
        marginBottom: 14,
        // fontWeight: '900',
        marginLeft: 6
    },
    text2: {
        color: 'white',
        fontSize: 17,
        fontWeight: '900',
        marginLeft: 8,
        marginTop: 4,
        marginBottom: 4
    },
    img: {
        width: '45%',
        height: 160,
        borderRadius: 10,
        resizeMode: 'contain'
    },
    text1: {
        color: 'white',
        width: 180,
        marginLeft: 10,
    },

})