import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
// import Message from './Message';
import Message from "../HomeComponent/Message"

const Chattopheader = () => {
    const userDetails = useSelector((state) => state.user);
    const accesstoken = userDetails.currentUser.accessToken;
    console.log(accesstoken)
    const [CurrentChat, setcurrentChat] = useState(null);
    const [groupName, setGroupName] = useState('');
    const [groupMembers, setGroupMembers] = useState([]);
    const [Groups , setGroups] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    
    console.log(CurrentChat)

    const handlesubmit = (e) => {
        // handle create group logic
    };
    console.log(Groups , "Groups")
    const handleSearch = async (value) => {
        setSearchResult(value);

        if (!value) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    token: `${accesstoken}`,
                },
            };
            const { data } = await axios.get(`http://192.168.18.4:5000/api/auth/get/search/user?search=${searchResult}`, config);
            setLoading(false);
            setSearchResult(data);
            console.log(searchResult,"searchResult")
        } catch (error) {

        }
    };


    useEffect(() => {
        const getGroup = async () => {
          const config = {
            headers: {
              token: `${accesstoken}`,
            },
          };
          const { data } = await axios.get(`http://192.168.18.4:5000/api/chat/groups`, config);
          setGroups(data)
        }
        getGroup();
      },[])

      const currentChatGroup =(item)=>{
        setcurrentChat(item);
      }

    // const handleAddUser = (item) => {
    //     if (groupMembers.some((member) => member?._id === item?._id)) {
    //         alert("User already added in group");
    //     } else {
    //         setGroupMembers([...groupMembers, item]);
    //         setSearchResult([]);
    //     }
    // }

    // const handleDelete = (item) => {
    //     setGroupMembers(groupMembers.filter((sel) => sel._id !== item?._id));
    // }


    return (
        <View style={{flex:1}}>
            {!Groups?.groups?.length >= 0 ? (
             <View style={styles.options}>
             <View style={{ overflow: "hidden" , flex:1 }} vertical>
               <TouchableOpacity style={styles.showmoreButtton}  onPress={() => setModalIsOpen(true)}>
                 <Image style={styles.createPostIcon}  source={require('../Images/icons8-create-50.png')} />
                 <Text style={{ textAlign: "center", marginLeft: 4 }} >New Chat</Text>
               </TouchableOpacity>
               {CurrentChat !== null ? (
                 <Message CurrentChat={CurrentChat}/>
               ) : (
                 Groups?.groups?.map((item)=>(
                   <TouchableOpacity style={styles.chatconversationHistory} onPress={()=>currentChatGroup(item)} key={item?._id}>
                     <Image style={styles.image} source={require('../Images/Kidss.jpg')} />
                     <View>
                       <Text style={styles.option}>{item?.Chatname}</Text>
                       <Text style={{ marginLeft: 14 }}>Open a message</Text>
                     </View>
                   </TouchableOpacity>
                 ))
               )}
             </View>
             </View>

            ) : (
                <ImageBackground source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/792/639/808/pattern-monochrome-telegram-logo-cats-hd-wallpaper-preview.jpg' }} style={styles.backgroundImage}>
                    <TouchableOpacity style={styles.showmoreButttonn} onPress={() => setModalIsOpen(true)}>
                        <Image style={styles.createPostIcon} source={require('../Images/icons8-create-50.png')} />
                        <Text style={{ textAlign: "center", marginLeft: 4 }}>New Chat</Text>
                    </TouchableOpacity>
                    <View style={styles.subContainerforgroupChatCreateContainer}>
                        <Text style={{ color: 'white', fontSize: 53, marginLeft: 15, marginTop: 110 }}>Create a Group to Chat</Text>
                    </View>
                </ImageBackground>
            )}

            <Modal visible={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} transparent={true}>
            <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ width: "90%", height: "90%", backgroundColor: "#fff", borderWidth: 1, borderColor: "#000", borderRadius: 10, padding: 20,}}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', marginBottom: 10 }}>Create New Group</Text>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ marginBottom: 5 }}>Group Name:</Text>
                                <TextInput style={{  borderColor: 'gray',  borderRadius: 10,  borderWidth: 1,  padding: 10,  width: "100%"}} placeholder="Write a Group Name" value={groupName} onChangeText={(value) => setGroupName(value)} />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ marginBottom: 5 }}>Group Members:</Text>
                                <TextInput style={{ borderColor: 'gray', borderRadius: 10, borderWidth: 1, padding: 10,}} placeholder="Add Users" onChangeText={(value) => handleSearch(value)} />
                                {groupMembers.map((item) => (
                                    <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 3, backgroundColor: 'gray', padding: 2, borderRadius: 10}}>
                                        <Image source={{ uri: item.profile }}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 50,
                                                marginRight: 7,
                                            }}
                                        />
                                        <Text style={{ color: 'white' }}>{item.username}</Text>
                                        <Text
                                            style={{ marginLeft: 30, color: 'red' }}
                                            onPress={() => handleDelete(item)}
                                        >
                                            X
                                        </Text>
                                    </View>
                                ))}
                            </View>
                            
                            {searchResult?.map((item)=>{
                                <View>
                                    <Text>a</Text>
                                </View>
                            })}
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={handlesubmit}
                                    style={{
                                        borderRadius: 10,
                                        padding: 10,
                                        margin: 10,
                                        backgroundColor: '#008CBA',
                                        color: "red",
                                        border: 'none',
                                    }}
                                >
                                    <Text>Create Group</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setModalIsOpen(false)}
                                    style={{
                                        borderRadius: 10,
                                        padding: 10,
                                        margin: 10,
                                        backgroundColor: '#ccc',
                                        color: '#fff',
                                        border: 'none',
                                    }}
                                >
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    column: {
        alignItems: 'center',
        marginRight: 10
    },
    Upgrade: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 90
    },
    containerText: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20

    },
    createPostIcon: {
        width: 20,
        height: 20,
        marginBottom: 4
    },
    options: {
        backgroundColor: "black",
        flex:1
    },
    option: {
        color: "black",
        marginLeft: 13
    },
    showmoreButtton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        width: 120,
        marginLeft: 15,
        padding: 6,
        borderRadius: 4
    },
    showmoreButttonn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        width: 120,
        marginLeft: 15,
        padding: 6,
        borderRadius: 4,
        marginTop: 13
    },
    chatconversationHistory: {
        width: "92%",
        flexDirection: "row",
        padding: 8,
        marginLeft: 15,
        marginRight: 45,
        borderRadius: 13,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 5
    },
    backgroundImage: {
        height: 620,
    },
    subContainerforgroupChatCreateContainer: {
        height: 400,
        marginTop: 20,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 30
    }

});

export default Chattopheader;
