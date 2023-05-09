import * as React from 'react';
import { TouchableOpacity,StyleSheet,Text,View } from 'react-native';

const ChatMessage = ({navigation,item,users}) => {
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
            <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('ChatWindowScreen',{
                        id:item.id,
                        name:item.name,
                    })
                }}
                onLongPress={()=>{
                    alert("тут будет удалить чат) возможно даже в шапку запихаю")
                }}
                style={styles.containerNews}
            >
                <View style={styles.containerNewsMessageHeader}>
                    <Text style={styles.containerNewsTitleText}>{users[item?.user_id]?.nickname}</Text>
                    <Text style={styles.containerNewsTitleTextDate}>{item?.date}</Text>
                </View>
                <View style={styles.containerNewsMessage}>
                    <Text style={styles.containerNewsTitleText}>{item?.message}</Text>
                </View>
            </TouchableOpacity>
          </>
        );
    }
};


const styles = StyleSheet.create({
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
    containerNews:{
        padding:10,
        marginBottom:5,
        marginHorizontal:5,
        borderRadius:10,
        backgroundColor:"white"
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