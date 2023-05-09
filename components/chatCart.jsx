import * as React from 'react';
import { TouchableOpacity,StyleSheet,Text,View } from 'react-native';

const ChatCart = ({navigation,item}) => {
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
                <Text style={styles.containerNewsTitleText}>{item?.name}</Text>
                <Text style={styles.containerNewsTitleTextDate}>{item?.message?.date}</Text>
            </View>
            <View style={styles.containerNewsMessage}>
                <Text style={styles.containerNewsTitleText}>{item?.message?.text}</Text>
            </View>
        </TouchableOpacity>
      </>
    );
};


const styles = StyleSheet.create({
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
export default ChatCart