import { StyleSheet, Image, Text, View } from 'react-native';
import * as React from 'react';
import { UserMessage } from '../function/user.messanger';

export default function PersonalScreen({navigation,route}) {
    
    return (<>
        <Text style={styles.containerNewsTitleText}>Страница в разработе</Text>
    </>)
}

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