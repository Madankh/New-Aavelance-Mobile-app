import { View, Text, Image , FlatList , TextInput , TouchableOpacity , StyleSheet } from 'react-native'
import React, { useRef, useState , useEffect} from 'react'
import { PermissionsCameraAndroid } from '../Admin/permissions';
import ImagePicker from 'react-native-image-crop-picker';
import { io } from 'socket.io-client';
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
export default function MessageList(CurrentChat) {
    let userDetails = useSelector(state => state.user)
    let id = userDetails?.currentUser?.others?._id;
    let user = userDetails?.currentUser?.others;
    let accesstoken = userDetails?.currentUser?.accessToken;
    let selectedChatCompare;
    const [imagePreview, setImagePreview] = useState(null);

    const scrollViewRef = useRef();

    const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

    const socket = useRef();
  
    const [image, setimage] = useState('');
      const ChatMessagee = (message) => {
        const isUser= userDetails?.currentUser?.others?._id;
        const senderName = isUser == message?.message?.sender?._id ? message?.message?.sender?.username : message?.message?.sender?.username;
      
        return (
          <View style={[styles.messageContainer, isUser == message?.message?.sender?._id ? styles.userMessageContainer : styles.otherMessageContainer]}>
            
            <View style={[styles.messageBubble, isUser == message?.message?.sender?._id ? styles.userMessageBubble : styles.otherMessageBubble]}>
                 {isUser == message?.message?.sender?._id ?  
                  <View style={{flexDirection:"row" , alignItems:'center'}}>
                    <Image source={{uri:`${message.message.sender.profile}`}}  style={styles.UseravatarImage} />
                    <Text style={styles.senderName}>{senderName}</Text>
                  </View>
                   : 
                  <View style={{flexDirection:"row" , alignItems:'center'}}>
                    <Image source={{uri:`${message.message.sender.profile}`}}  style={styles.UseravatarImage} />
                    <Text style={styles.senderName}>{senderName}</Text>
                  </View>}
                 
              <Text style={[styles.messageText, isUser == message?.message?.sender?._id ? styles.userMessageText : styles.otherMessageText]}>{message.message.content}</Text>
            </View>
          </View>
        );
     };

    const [file, setfile] = useState(null);
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

    
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    
    const fetchMessages = async()=>{
        if(!CurrentChat?.CurrentChat) return;
        try {
          const config = {
            headers: {
              token: `${accesstoken}`,
            },
          };
          const { data } = await axios.get(`http://139.162.11.30:80/api/message/get/all/group/msg/${CurrentChat?.CurrentChat?._id}`, config);
          setMessages(data);
          socket.current.emit("join chat" , CurrentChat?.CurrentChat?._id);
        } catch (error) {
          
        }
      }
    
      useEffect(()=>{
        if(CurrentChat !== ''){
          socket.current = io("http://139.162.11.30:80");
          socket.current.emit("setup" , user);
        }
       },[id]);
    
       
        const handleSendClick = async () => {
          if (message) {
            setMessages([...messages, { content: message, _id: uuidv4() , image:imagePreview, sender: { profile: `${userDetails?.currentUser?.others?.profile}`, username: `${userDetails?.currentUser?.others?.username}` , _id: `${userDetails?.currentUser?.others?._id}` } }]);
          try {
            await fetch(
              `http://139.162.11.30:80/api/message/send/msg`, {
                method: 'POST',
              headers: { 'Content-Type': 'application/json', token: accesstoken },
              body: JSON.stringify({
                sender: userDetails?.currentUser?.others?._id,
                content: message,
                image: imagePreview,
                chatId: CurrentChat?.CurrentChat?._id
              })
            })
            .then(response => {
              response.json()
              .then(data => {
                    socket.current.emit("new message" , data);
                    setMessages([...messages , data])
                  });
                })
          }
          catch (error) {
            console.error(error);
          }
          setMessage('');
        }
      };
    
      
      useEffect(()=>{
        fetchMessages();
        selectedChatCompare = CurrentChat?.CurrentChat;
      },[CurrentChat?.CurrentChat?._id])
      
    
      useEffect(() => {
       socket.current.on("Message received", (newMessageRecieved) => {
        // console.log(newMessageRecieved)
        // if(CurrentChat.CurrentChat._id !== newMessageRecieved.group._id){
        // }else{
          setMessages([...messages, newMessageRecieved]);
          
        // }
       });
     });


     const renderItem = ({ item }) => <ChatMessagee message={item} />;
    return (
      <View style={{ backgroundColor: "white", width: "94%", marginLeft: 12, borderRadius: 0, border: "none", paddingBottom: 20, flex: 1}}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item?._id.toString()}
        ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}
      />
      <View style={{ backgroundColor: "white" ,marginBottom:-20 , flexDirection:"row" , alignItems:'center'}}>
        <TouchableOpacity onPress={onSelectImage}>
          <FastImage style={{width:30 , height:30 , marginLeft:10}}  source={require('../Images/image-gallery.png')} />
        </TouchableOpacity>
        <TextInput multiline
          style={styles.textInput}
          placeholder="Type your message here"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={{backgroundColor:"black" , paddingTop:6 , paddingBottom:6 , paddingLeft:20 , paddingRight:20 , borderRadius:10}} onPress={handleSendClick}>
          <Text style={{color:"white"}}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
    
    )
}


const styles = StyleSheet.create({
    messageContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginVertical: 8,
    },
    userMessageContainer: {
      justifyContent: 'flex-end',
    },
    otherMessageContainer: {
      justifyContent: 'flex-start',
    },
    userMessageText: {
      textAlign: 'right',
      color:"white"
    },
    otherMessageText: {
      textAlign: 'left',
      color:"white"

    },
    messageBubble: {
      maxWidth: '95%',
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    userMessageBubble: {
      backgroundColor: '#0084FF',
      borderTopRightRadius: 0,
    },
    otherMessageBubble: {
      backgroundColor: 'gray',
      borderTopLeftRadius: 0,
      color:"white"
    },
    safeAreaView: {
  
    },
    inputContainer: {
      backgroundColor: "gray",
      borderRadius: 4,
      borderColor: "black"
    },
    scrollView: {
      height: "78%"
    },
    sendButton: {
      backgroundColor: 'black',
      padding: 10
    },
    textInput: {
      color: 'black',
      width:"67%"
  
    },
    sendButtonText: {
      color: 'white',
      textAlign: 'center'
    },
    senderName:{
        color:"white"
    },
    avatarImage:{
        width:30,
        height:30,
        borderRadius:20
    },
    UseravatarImage:{
        width:20,
        height:20,
        marginRight:3,
        borderRadius:20,
      
    }
  
  });
  
  