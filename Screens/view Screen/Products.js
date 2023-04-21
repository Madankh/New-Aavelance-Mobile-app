import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../constants/navigationStrings';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MenFashion, WomenFashion, KidFashio, Book, Beauty } from "../../HomeComponent/subcatdata"
import ButtonTabs from '../../HomeComponent/ButtomTabs'
import { Modal } from 'react-native';
import { ColorModalPicker } from './ColorModalPicker';
import { SizeModalPicker } from './SizeModalPicker';


const Products = (item) => {
    const navigation = useNavigation();
    const [filters, setfilters] = useState([]);
    const [filterProducts, setfilterProducts] = useState([]);
    const [selectedValue1, setSelectedValue1] = useState();
    const [product, setProduct] = useState([]);
    const [subcat, Setsubcat] = useState('');
    const [Color, setColor] = useState('Color');
    const [Size, setSize] = useState('Size');

    const user = useSelector((state) => state.user);
    const cat = item.route.params.item.name;
    const isWomen = "Women's Fashion";
    const isMen = "Men's Fashion";
    const isKid = "Kid's Fashion";
    const isBook = "Books";
    const isBeauty = "Beauty and Personal Care";
    const arr = [3, 4];
    console.log(arr.push({ color: 5 }))
    console.log(arr)

    const handleChange = (item) => {
        if (item !== '' && item !== undefined) {
            Setsubcat(item)
            console.log(item)
        } else {
            Setsubcat('');
        }
    };
    console.log(subcat);


    const [isModalVisible, setisModalVisible] = useState(false);
    const changeModalVisibility = (bool) => {
        setisModalVisible(bool)
    }

    const [isModalVisible1, setisModalVisible1] = useState(false);
    const changeModalVisibility1 = (bool) => {
        setisModalVisible1(bool)
    }



    const setData = (option) => {
        setColor(option);
        setfilters(prevFilters => ({
            ...prevFilters,
            color: option
        }));
    }


    const setData2 = (option) => {
        setSize(option);
        setfilters(prevFilters => ({
            ...prevFilters,
            size: option
        }));
    }
    console.log(filters)
    const fetchApi = async () => {
        try {
            const res = await axios.get(subcat !== '' && subcat !== undefined && subcat !== "Show All" ? `http://192.168.18.4:5000/api/products/getallProduct?category=${cat}&subcategories=${subcat}` : `http://192.168.18.4:5000/api/products/getallProduct?category=${cat}`);
            setProduct(res.data);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchApi()
    }, [subcat])


    useEffect(() => {
        setfilterProducts(
            product?.filter(item =>
                Object.entries(filters).every(([key, value]) =>
                    item[key]?.includes(value)
                )
            )
        );
    }, [product, cat, filters]);


    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

    return (
        <>
            <ScrollView>
                <View style={{ backgroundColor: "black", paddingBottom: 10 }}>
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 24, fontWeight: "800" }}>{cat}</Text>

                    <ScrollView horizontal className="submobilecat">
                        {cat == isWomen ? WomenFashion.map((item) => (
                            <TouchableOpacity style={{ backgroundColor: "black", margin: "auto", paddingLeft: 1 }} key={item.id} onPress={() => handleChange(item.value)}>
                                <Image source={{ uri: `${item.img}` }} style={styles.subcatmobileimage} alt="" />
                                <Text style={{ color: "white", marginLeft: 0, textAlign: 'left', width: 70 }}>{item.value}</Text>
                            </TouchableOpacity>
                        )) : cat == isMen ? MenFashion.map((item) => (
                            <TouchableOpacity style={{ backgroundColor: "black", margin: "auto", paddingLeft: 1 }} key={item.id} onPress={() => handleChange(item.value)}>
                                <Image source={{ uri: `${item.img}` }} style={styles.subcatmobileimage} alt="" />
                                <Text style={{ color: "white", marginLeft: 0, textAlign: 'left', width: 70 }}>{item.value}</Text>
                            </TouchableOpacity>
                        )) : cat == isKid ? KidFashio.map((item) => (
                            <TouchableOpacity style={{ backgroundColor: "black", margin: "auto", paddingLeft: 1 }} key={item.id} onPress={() => handleChange(item.value)}>
                                <Image source={{ uri: `${item.img}` }} style={styles.subcatmobileimage} alt="" />
                                <Text style={{ color: "white", marginLeft: 0, textAlign: 'left', width: 70 }}>{item.value}</Text>
                            </TouchableOpacity>
                        )) : cat == isBeauty ? Beauty.map((item) => (
                            <TouchableOpacity style={{ backgroundColor: "black", margin: "auto", paddingLeft: 1 }} key={item.id} onPress={() => handleChange(item.value)}>
                                <Image source={{ uri: `${item.img}` }} style={styles.subcatmobileimage} alt="" />
                                <Text style={{ color: "white", marginLeft: 0, textAlign: 'left', width: 70 }}>{item.value}</Text>
                            </TouchableOpacity>
                        )) : cat == isBook ? Book.map((item) => (
                            <TouchableOpacity style={{ backgroundColor: "black", margin: "auto", paddingLeft: 1 }} key={item.id} onPress={() => handleChange(item.value)}>
                                <Image source={{ uri: `${item.img}` }} style={styles.subcatmobileimage} alt="" />
                                <Text style={{ color: "white", marginLeft: 0, textAlign: 'left', width: 70 }}>{item.value}</Text>
                            </TouchableOpacity>
                        )) : ""}
                    </ScrollView>





                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: "white", fontSize: 20, fontWeight: '900', marginLeft: 2, margin: 10 }}>Colors</Text>
                            <TouchableOpacity style={{ backgroundColor: "white", width: '90%', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 10 }}
                                onPress={() => changeModalVisibility(true)}>
                                <Text style={{ color: "black" }}>{Color}</Text>
                            </TouchableOpacity>
                            <Modal transparent={true} animationType='fade'
                                visible={isModalVisible} nRequestClose={() => changeModalVisibility(false)}>
                                <ColorModalPicker changeModalVisibility={changeModalVisibility}
                                    setData={setData} />
                            </Modal>

                        </View>

                        <View style={{ marginLeft: 240 }}>
                            <Text style={{ color: "white", fontSize: 20, fontWeight: '900', marginLeft: 2, margin: 10 }}>Size</Text>
                            <TouchableOpacity style={{ backgroundColor: "white", width: '100%', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 10 }}
                                onPress={() => changeModalVisibility1(true)}>
                                <Text style={{ color: "black" }}>{Size}</Text>
                            </TouchableOpacity>
                            <Modal transparent={true} animationType='fade'
                                visible={isModalVisible1} nRequestClose={() => changeModalVisibility1(false)}>
                                <SizeModalPicker changeModalVisibility1={changeModalVisibility1}
                                    setData2={setData2} />
                            </Modal>

                        </View>

                    </View>
                    {filterProducts?.map((items) => (
                        <TouchableOpacity key={items._id} onPress={() => navigation.navigate(navigationStrings.DetailsScreen, { items })}>
                            <View style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
                                {items.img.slice(0,1).map((imgg)=>(
                                    <Image style={styles.img} source={{ uri: `${imgg}` }} />
                                ))}
                                <View>
                                    <Text style={styles.text1}>{items.title.slice(0, 90)}....</Text>
                                    <Text style={styles.text2}>NPR {items.price}</Text>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: 0, marginLeft: 2 }}>
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
                                        {/* <Text style={{ color: 'white', fontWeight: '900', marginLeft: 4 }}>24</Text> */}
                                    </View>

                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <ButtonTabs />
        </>
    )
}

export default Products

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
        borderRadius: 5,
        resizeMode: 'contain'
    },
    text1: {
        color: 'white',
        width: 180,
        marginLeft: 10,
    },
    catTitle2: {
        marginLeft: 10
    },
    submobileitems: {
        flexDirection: "row"
    },
    subcatmobileimage: {
        // border: 1 Solid "#d62d6b",
        // transition: 0.6s,
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    subcatmobiletitle: {
        color: "white"
    },
    submobilecat: {
        flexDirection: "row",
        margin: "auto",
        // textAlign:"start",
        // overFlowY:"scroll",
        // display:"none",
        // overflow:"scroll"

    }

})