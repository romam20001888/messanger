import * as React from 'react';
import { TouchableOpacity,SafeAreaView,FlatList,StyleSheet,Text,Image,View, TextInput } from 'react-native';
import { UserMessage } from '../function/user.messanger';
import ChatMessage from '../components/chatMessage';

const ChatWindow = ({navigation,route}) => {
    var user = new UserMessage(navigation,route)
    const [Users,SetUsers] = React.useState([]);
    const [Message,SetMessage] = React.useState([]);
    const [refreshingIn, setRefreshingIn] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [MessagePage,SetMessagePage] = React.useState(1);

    React.useEffect(() => {
        navigation.setOptions({
            title:route.params.name,
        });
        updateList();
    }, [MessagePage]);

    async function updateList() {
        if(MessagePage==1){
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

        if(MessagePage==1){
            setRefreshingIn(false) 
        }
    }

    async function sendMessage() {
        let resulte = await user.addMessage(route.params.id,messageText)
        if(resulte?.error==undefined){
            SetMessagePage(1);
            updateList()
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
                    renderItem={({item}) => <ChatMessage item={item} users={Users} navigation={navigation}/>}
                    keyExtractor={item => item.id}
                    onEndReached={()=>{SetMessagePage(MessagePage+1)}}
                />
            </SafeAreaView>
        </View>
        <View style={styles.containerInputText}>
            <TextInput style={styles.inputText} defaultValue={messageText} onChangeText={text => setMessageText(text)}/>
            <TouchableOpacity 
                style={styles.buttonSend}
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
        width:"82%",
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