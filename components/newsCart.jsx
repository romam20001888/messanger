import * as React from 'react';
import { TouchableOpacity,Modal,ScrollView,StyleSheet,Text,Image,View } from 'react-native';

const NewsCart = ({navigation,item}) => {
    return (
      <>
        <TouchableOpacity 
            style={styles.containerNews}
            onPress={()=>{
                navigation.navigate('NewsDetail',{
                    id:item.id,
                })
                
            }}
        >
            <View style={styles.containerNewsImage}>
                <Image 
                    style={styles.iconMenu}
                    source={{
                        uri: 'https://vigmebel.acrodev.ru/upload/iblock/e2e/yzu9uupsfxdxbc0tvgmpemnqapcve3t1/Frame_19.png',
                    }}
                />
            </View>
            <Text style={styles.containerNewsTitleText}>{item.name}</Text>
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
    containerNewsImage:{
        position:"relative",
        width: "100%",
        height: 200,
    },
    containerNews:{
        padding:10,
        marginBottom:5,
        marginHorizontal:5,
        borderRadius:10,
        backgroundColor:"white"
    },
    
    containerNewsTitleText: {
       fontSize:16,
       marginTop:10,
       textAlign:"left",
    },
    
});
export default NewsCart