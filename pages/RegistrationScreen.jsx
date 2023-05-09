import { StyleSheet, Button, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { PageContext } from '../function/globalConstant';
import ButtonElement from '../components/Button';

export default function RegistrationScreen({navigation,setUser,user}) {

    const [message] = React.useContext(PageContext);
    
    // React.useEffect(async()=>{
    //     let res = await message.GetUserInfo()
    //     console.log(await message.getById(1));
    // },[])
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
                    Регистрация
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Логин"
                    // onChangeText={onChangeLogin}
                    // value={Login}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    // onChangeText={onChangeLogin}
                    // value={Login}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Фамилия"
                    // onChangeText={onChangeLogin}
                    // value={Login}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Имя"
                    // onChangeText={onChangeLogin}
                    // value={Login}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Отчество"
                    // onChangeText={onChangeLogin}
                    // value={Login}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Пароль"
                    // onChangeText={onChangePassword}
                    // value={Password}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Подтверждение пароля"
                    // onChangeText={onChangePassword}
                    // value={Password}
                />
                <Text
                    // style={ErrorText!==""?styles.error:styles.errorEmty}
                >
                    {/* {ErrorText} */}
                </Text>
                <ButtonElement 
                    onPress={() =>{
                        setUser("Admin")
                    }}
                    text="Регистрация"
                />
                <Text
                    style={styles.linkButton}
                    onPress={() =>{
                        navigation.navigate('AuthScreen')
                    }}
                >Войти</Text>
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