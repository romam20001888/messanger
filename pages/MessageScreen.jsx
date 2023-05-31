import { StyleSheet, SafeAreaView, FlatList,Image, TouchableOpacity, Modal,View ,Text, ScrollView, TextInput } from 'react-native';
import * as React from 'react';
import { UserMessage } from '../function/user.messanger';
import ChatCart from '../components/chatCart';

export default function MessageScreen({navigation,route}) {
    var user = new UserMessage(navigation,route)
    const [MessagePage,SetMessagePage] = React.useState(1);
    const [Message,SetMessage] = React.useState([]);
    const [refreshingIn, setRefreshingIn] = React.useState(false);
    const [statusMenu, onChangeStatusMenu] = React.useState(false);

    React.useEffect(()=>{ 
        updateList();
    },[MessagePage])

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
        if(MessagePage==1 && useUpdate){
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
        <TouchableOpacity
            style={styles.buttonAddChat} 
            onPress={()=>{
                onChangeStatusMenu(true);
            }}
        >
            <Image 
                style={styles.iconAddChat}
                source={require('../images/add.png')}
            />
        </TouchableOpacity>
        <Modal
            animationType="slide"
            transparent={true}
            visible={statusMenu}
            onRequestClose={() => {
                onChangeStatusMenu(!statusMenu);
            }}
        >
            <View style={styles.containerMenu}>
                <View style={styles.containerMenuTitle}>
                    <Text style={styles.containerMenuTitleText}>Контакты</Text>
                    <TouchableOpacity
                        onPress={() => onChangeStatusMenu(!statusMenu)}
                    >
                        <Text style={styles.containerMenuTitleClose}>╳</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerMenuContainer}>
                    <TextInput placeholder='Введите имя пользователя'/>
                    <ScrollView>
                        <TouchableOpacity 
                            style={styles.containerMenuItem}
                            onPress={() =>{ 
                                onChangeStatusMenu(!statusMenu)
                                navigation.navigate('HomeScreen')
                            }}
                        >
                            <Image 
                                style={styles.iconMenu}
                                source={require('../images/menu.png')}
                            />
                            <Text style={styles.iconMenuText}>Витя пертов</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    </>)
}


const styles = StyleSheet.create({
    iconFilter: {
        width: 30,
        height: 30,
    },
    iconMenu:{
        width: 40,
        height: 40,
        marginRight:10
    },
    iconMenuText:{
        fontSize:18,
    },
    containerMenuSeach:{
        marginBottom:10
    },
    containerMenuContainer: {
        flex:1,
        width:"100%"
    },
    containerMenuItem: {
        flex:1,
        alignItems:"center",
        justifyContent:"flex-start",
        flexDirection:"row",
        fontSize:18,
        marginLeft:10,
        marginBottom:10
    },
    containerMenuItemExit: {
        flex:1,
        alignItems:"center",
        justifyContent:"flex-start",
        flexDirection:"row",
        fontSize:18,
        marginTop:30,
        marginLeft:10
    },
    containerMenuOpen: {
        fontSize:45,
        marginRight:20
    },
    containerMenuTitleClose: {
        fontSize:23,
        marginRight:10
    },
    containerMenuTitleText: {
        fontSize:23,
        marginLeft:10
    },
    containerMenu: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent:"flex-start",
        height:"100%",
        width:"100%",
        backgroundColor:"#fff"
    },
    containerMenuTitle: {
        flex: 0.05,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        height:"100%",
        width:"100%",
        marginBottom:10,
        backgroundColor:"#fff"
    },
    iconAddChat: {
        width:50,
        height:50
    },
    buttonAddChat: {
        position:"absolute",
        bottom:10,
        right:10,
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
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