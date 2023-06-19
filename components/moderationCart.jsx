import * as React from 'react';
import { TouchableOpacity,Modal,ScrollView,StyleSheet,Text,Image,View } from 'react-native';

const ModerationCart = ({navigation,item, users}) => {
    return (
      <>
        <TouchableOpacity 
            style={styles.containerNews}
            onPress={()=>{
                navigation.navigate(users==true?'ModerationDetailActiveScreen':'ModerationDetailScreen',{
                    id:item.id,
                })
                
            }}
        >
            <Text style={styles.containerNewsTitleText}>{item.nickname}</Text>
        </TouchableOpacity>
      </>
    );
};


const styles = StyleSheet.create({
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
export default ModerationCart