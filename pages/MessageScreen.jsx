import { StyleSheet, SafeAreaView, FlatList,Text } from 'react-native';
import * as React from 'react';
import { UserMessage } from '../function/user.messanger';
import ChatCart from '../components/chatCart';

export default function MessageScreen({navigation,route}) {
    var user = new UserMessage(navigation,route)
    const [MessagePage,SetMessagePage] = React.useState(1);
    const [Message,SetMessage] = React.useState([]);
    const [refreshingIn, setRefreshingIn] = React.useState(false);

    React.useEffect(()=>{ 
        updateList();
    },[MessagePage])

    async function updateList() {
        if(MessagePage==1){
            setRefreshingIn(true) 
        }
        let resulte = await user.getChatList(MessagePage)
        
        if(MessagePage==1){
            SetMessage(resulte)
        }else{
            var messageSavePage = Message;
            if(resulte?.length>=0){
                resulte.forEach(element => {
                    messageSavePage.push(element)
                });
                SetMessage(messageSavePage)
            }
        }
        if(MessagePage==1){
            setRefreshingIn(false) 
        }
    }
    return (<>
        <SafeAreaView>
            <FlatList
                data={Message}
                refreshing={refreshingIn}
                onRefresh={()=>{SetMessagePage(1)}}
                renderItem={({item}) => <ChatCart item={item} navigation={navigation}/>}
                keyExtractor={item => item.id}
                onEndReached={()=>{SetMessagePage(MessagePage+1)}}
            />
        </SafeAreaView>
    </>)
}


const styles = StyleSheet.create({
    
    logoContainer: {
        marginBottom:15
    },
    linkButton:{
        width:"100%",
        textAlign:"center"
    },
    background:{
        position:"absolute",
        height:"100%",
        width:"100%",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    containerForm:{
        backgroundColor:"white",
        borderRadius:20,
        width:"80%",
        padding:20
    },
    h1: {
        fontSize:25,
        fontWeight:"600",
        marginBottom:20

    },
    input: {
        paddingVertical:5,
        paddingHorizontal:10,
        borderWidth: 1,
        borderRadius:20,
        marginBottom:20
    },
    error: {
        color:"red",
        marginBottom:20
    },
    errorEmty: {
        color:"red",
    },
});