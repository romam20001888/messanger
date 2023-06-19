import * as React from 'react';
import { TouchableOpacity,SafeAreaView,FlatList,StyleSheet,PermissionsAndroid,Image,View, TextInput } from 'react-native';
import { UserMessage } from '../function/user.messanger';
import ChatMessage from '../components/chatMessage';
import * as DocumentPicker from 'expo-document-picker';

const ChatWindow = ({navigation,route}) => {
    var user = new UserMessage(navigation,route)
    const [Users,SetUsers] = React.useState([]);
    const [Message,SetMessage] = React.useState([]);
    const [refreshingIn, setRefreshingIn] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageUpdated, setMessageUpdated] = React.useState(undefined);
    const [MessagePage,SetMessagePage] = React.useState(1);
    const [singleFile, setSingleFile] = React.useState(null);


    const checkPermissions = async () => {
        try {
          const result = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          );
    
          if (!result) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title:
                  'You need to give storage permission to download and save the file',
                message: 'App needs access to your camera ',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the camera');
              return true;
            } else {
              Alert.alert('Error', I18n.t('PERMISSION_ACCESS_FILE'));
    
              console.log('Camera permission denied');
              return false;
            }
          } else {
            return true;
          }
        } catch (err) {
          console.warn(err);
          return false;
        }
      };
    React.useEffect(() => {
        navigation.setOptions({
            title:route.params.name,
        });
        updateList();
    }, [MessagePage,route.params.name]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            updateList(false);
        }, 1000);
        return () => clearInterval(interval);
        
    }, []);

    async function updateList(useUpdate = true) {
        if(MessagePage==1 && useUpdate){
            setRefreshingIn(true) 
        }
        
        let resulte = await user.getChatInfo(route.params.id,MessagePage)
        
        if(MessagePage==1){
            SetMessage(resulte.messages)
            SetUsers(resulte.users)
        }else{
            var messageSavePage = Message;
            if(resulte?.messages?.length>=0){
                resulte.messages.forEach(element => {
                    messageSavePage.push(element)
                });
                SetMessage(messageSavePage)
            }
        }

        if(MessagePage==1 && useUpdate){
            setRefreshingIn(false) 
        }
    }

    async function sendMessage() {
        let resulte = await user.addMessage(route.params.id,messageText,messageUpdated)
        if(resulte?.error==undefined){
            SetMessagePage(1);
            updateList(false)
            SetMessagePage(1);
        } 
        setMessageUpdated(undefined)
    }


    const uploadImage = async () => {
        if (singleFile != null) {
            const data = new FormData();
        
            data.append('file_attachment', {
                uri: singleFile.uri,
                name: singleFile.name,
                type: singleFile.mimeType,
            });
    
            let resulte = await user.uploadImage(route.params.id,data)
            setSingleFile(null);
        }
    };

    async function selectFile() {
        try {
          const result = await checkPermissions();
          if (result) {
            let resulte = await DocumentPicker.getDocumentAsync({
              copyToCacheDirectory: false,
              type: 'image/*',
            });
    
            if (resulte.type === 'success') {
              setSingleFile(resulte);
              uploadImage()
            }
            console.log(resulte)
          }

        } catch (err) {
          setSingleFile(null);
          return false;
        }
    }
    
    
    return (
      <>
        <View style={styles.containerMessage}>
            <Image 
                style={styles.iconBackground}
                source={require('../images/background.jpg')}
            />
            <SafeAreaView>
                <FlatList
                    inverted={true}
                    ListEmptyComponent={()=><ChatMessage />}
                    data={Message}
                    refreshing={refreshingIn}
                    onRefresh={()=>{SetMessagePage(1)}}
                    renderItem={({item}) => <ChatMessage item={item} users={Users} setMessageText={setMessageText} setMessageUpdated={setMessageUpdated} navigation={navigation}/>}
                    keyExtractor={item => item.id}
                    onEndReached={()=>{SetMessagePage(MessagePage+1)}}
                />
            </SafeAreaView>
        </View>
        <View style={styles.containerInputText}>
            <TouchableOpacity
                style={styles.buttonSend}
                activeOpacity={0.5}
                onPress={selectFile}>
                <Image 
                    style={styles.iconSend}
                    source={require('../images/file-add.png')}
                />
            </TouchableOpacity>
            <TextInput 
                style={styles.inputText} 
                value={messageText} 
                onChangeText={text => setMessageText(text)}
            />
            <TouchableOpacity 
                style={styles.buttonSend}
                activeOpacity={0.5}
                onPress={()=>{
                    sendMessage()
                    setMessageText("")
                }}
            >
                <Image 
                    style={styles.iconSend}
                    source={require('../images/send-message.png')}
                />
            </TouchableOpacity>
        </View>
      </>
    );
};


const styles = StyleSheet.create({
    containerMessage:{
        flex:1,
        paddingTop:5,
    },
    containerInputText:{
        height:60,
        backgroundColor:"white",
        flexDirection:"row"
    },
    inputText:{
        borderColor:"grey",
        width:"70%",
        height:40,
        borderWidth:1,
        marginHorizontal:5,
        marginVertical:10,
        fontSize:14,
        paddingHorizontal:10,
        borderRadius:20
    },
    buttonSend:{
        marginHorizontal:5,
        marginVertical:10,
        width:40,
        height:40,
        borderRadius:50,
        paddingHorizontal:12,
        paddingVertical:6,
    },
    iconSend:{
        width:30,
        height:30,
    },
    iconBackground:{
        width: "100%",
        height: "100%",
        position:"absolute"
    }
});
export default ChatWindow