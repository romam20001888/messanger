import * as React from 'react';
import { TouchableOpacity,StyleSheet,Text,View,Image } from 'react-native';
import { UserMessage } from '../function/user.messanger';

const ChatMessage = ({navigation,route,item,users,setMessageText,setMessageUpdated}) => {
    const [openSelect, setOpenSelect] = React.useState(false)
    var user = new UserMessage(navigation,route)
    function deleteMessage(){
        if(item?.id){
            user.sendDeleteMessage(item.id).then(res=>{
                console.log(res)
            })
        }
    }
    if(item==undefined){
        return (
          <>
            <View style={styles.containerNewsEmpty}>
                {/* <Text style={styles.containerNewsTitleTextEmpty}>Нет сообщений</Text> */}
            </View>
          </>
        );
    }else{
        return (
          <>
            <View
                style={(item?.my)==true?styles.containerNewsMy:styles.containerNews}
            >
                <TouchableOpacity 
                    style={styles.containerMyLeft} 
                    onPress={()=>{
                        if((item?.my)==true){
                            setOpenSelect(!openSelect)
                        }
                    }} 
                >
                    <View style={styles.containerNewsMessageHeader}>
                        <Text style={styles.containerNewsTitleText}>{users[item?.user_id]?.nickname}</Text>
                        <Text style={styles.containerNewsTitleTextDate}>{item?.date}</Text>
                    </View>
                    <View style={styles.containerNewsMessage}>
                        {item?.image?
                            <Image 
                                style={styles.chatImage}
                                source={{
                                  uri: item.image,
                                }}
                            />
                        :
                        <Text style={styles.containerNewsTitleText}>{item?.message}</Text>
                        }
                    </View>
                 </TouchableOpacity>
                <View style={openSelect?styles.containerMyLeftMenu:styles.containerMyLeftMenuNone}>
                    <TouchableOpacity 
                        onPress={()=>{
                            deleteMessage()
                            setOpenSelect(!openSelect)
                        }} 
                        style={styles.editButtonMessage}
                    >
                        <Image 
                            style={styles.editButtonMessageIcon}
                            source={require('../images/bin.png')}
                        />
                        <Text style={styles.containerNewsTitleText}>Удалить</Text>
                    </TouchableOpacity>
                    
                        {item?.image?
                            <></>
                            :
                            <TouchableOpacity 
                                onPress={()=>{
                                    setOpenSelect(!openSelect)
                                    setMessageText(item.message)
                                    setMessageUpdated(item.id)
                                }} 
                                style={styles.editButtonMessage}
                            >
                                <Image 
                                    style={styles.editButtonMessageIcon}
                                    source={require('../images/pencil.png')}
                                />
                                <Text style={styles.containerNewsTitleText}>Изменить</Text>
                            </TouchableOpacity>
                        }
                    
                    </View>
                </View>
          </>
        );
    }
};


const styles = StyleSheet.create({
    editButtonMessage:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    editButtonMessageIcon:{
        width:20,
        height:20
    },
    chatImage:{
        width:"100%",
        height:200,
        resizeMode: 'cover'

    },
    containerMyLeftMenu:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-around",
        flexDirection:"row",
        marginTop:5,
        backgroundColor:"white",
        width:"80%",
        borderRadius:10,
        padding:10,
        marginBottom:10
    },
    containerMyLeftMenuNone:{
        display:"none"
    },
    containerNewsEmpty:{
        textAlign:'center',
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    containerNewsTitleTextEmpty:{
        color:'white',
        fontSize:24,
        fontWeight:"bold",
        transform:[{ translate: ['-50%', '-50%']}]
    },
    iconMenu:{
        width: "100%",
        height: "100%",
        resizeMode: 'cover'
    },
    containerNewsMessageHeader:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row"
    },
    containerNewsMessage:{
        position:"relative",
        width: "100%",
    },
    containerMyLeft:{
        width:"80%",
        borderRadius:10,
        padding:10,
        backgroundColor:"white"
    },
    containerNews:{
        marginBottom:5,
        alignItems:"flex-start",
        marginHorizontal:5,
    },
    containerNewsMy:{
        marginBottom:5,
        alignItems:"flex-end",
        marginHorizontal:5,
    },
    
    containerNewsTitleTextDate: {
       fontSize:13,
       marginTop:10,
       textAlign:"left",
    },
    containerNewsTitleText: {
       fontSize:16,
       marginTop:10,
       textAlign:"left",
    },
    
});
export default ChatMessage