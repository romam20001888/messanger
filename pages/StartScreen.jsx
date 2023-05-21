import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { UserMessage } from '../function/user.messanger';

export default function StartScreen({navigation,route}) {
    var user = new UserMessage(navigation,route)
    
    React.useEffect(()=>{ 
        checkUser();
    },[])
    
    async function checkUser() {
        let resulte = await user.isAuth()
        if(resulte==false){
            navigation.navigate('AuthScreen')
        }else{
            navigation.navigate('HomeScreen')
        }
    }
    return (<>
        <View style={styles.container}>
            <Text style={styles.h1}>
                messanger
            </Text>
        </View>
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