import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import * as React from 'react';
import { UserMessage } from '../function/user.messanger';

import ButtonElement from '../components/Button';

export default function AuthScreen({navigation,route,registerForPushNotificationsAsync}) {
    var user = new UserMessage(navigation,route)

    const [Login, onChangeLogin] = React.useState("")
    const [Password, onChangePassword] = React.useState("")
    const [ErrorText, onChangeErrorText] = React.useState("")
    
    async function sendForm() {
        let resulte = await user.Login(Login,Password)
        if(resulte?.jwt!=undefined){
            registerForPushNotificationsAsync().then(async(token) => {
                user.sendPushToken(token)
                navigation.navigate('HomeScreen')
            })
        }else if(resulte?.error!=undefined){
            onChangeErrorText(resulte.error)
        }
        return false;
    }
    return (<>
        <View style={styles.container}>
            
            <Image 
                style={styles.background}
                source={require('../images/background.jpg')}
            />
            <View style={styles.containerForm}>
                <Text
                    style={styles.h1}
                >
                    Авторизация
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Логин"
                    onChangeText={onChangeLogin}
                    value={Login}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Пароль"
                    onChangeText={onChangePassword}
                    value={Password}
                />
                <Text
                    style={ErrorText!==""?styles.error:styles.errorEmty}
                >
                    {ErrorText}
                </Text>
                <ButtonElement 
                    onPress={async () =>{
                        await sendForm()
                    }}
                    text="Войти"
                />
                <Text
                    style={styles.linkButton}
                    onPress={() =>{
                        navigation.navigate('RegistrationScreen')
                    }}
                >Регистраиця</Text>
            </View>
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