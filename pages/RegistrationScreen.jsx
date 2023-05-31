import { StyleSheet, Button, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { UserMessage } from '../function/user.messanger';
import ButtonElement from '../components/Button';

export default function RegistrationScreen({navigation,route}) {
    var user = new UserMessage(navigation,route)
    
    const [RegisterOk, setRegisterOk] = React.useState(false)

    const [Login, onChangeLogin] = React.useState("")
    const [Email, onChangeEmail] = React.useState("")
    const [Name, onChangeName] = React.useState("")
    const [SecondName, onChangeSecondName] = React.useState("")
    const [LastName, onChangeLastName] = React.useState("")
    const [Password, onChangePassword] = React.useState("")
    const [PasswordT, onChangePasswordT] = React.useState("")
    
    const [ErrorText, onChangeErrorText] = React.useState("")

    async function sentRegister() {
        let data = {};
        data["Login"] = Login;
        data["Email"] = Email;
        data["Name"] = Name;
        data["SecondName"] = SecondName;
        data["LastName"] = LastName;
        data["Password"] = Password;
        data["PasswordT"] = PasswordT;

        let resulte = await user.Register(data)
        console.log(resulte)
        if(resulte?.id>0){
            setRegisterOk(true)
        }else if(resulte?.error!=undefined){
            onChangeErrorText(resulte.error)
        }
        return false;
    }

    return (
        RegisterOk==true?<>
            <View style={styles.container}>
                
                <Image 
                    style={styles.background}
                    source={require('../images/background.jpg')}
                />
                <View style={styles.containerForm}>
                    <Text
                        style={styles.h1}
                    >
                        Ваш аккаунт успешно зарегистрирован. Вам отправлено письмо для подтверждения регистрации.
                    </Text>
                    
                    <ButtonElement 
                        onPress={() =>{
                            navigation.navigate('AuthScreen')
                        }}
                        text="Войти"
                    />
                </View>
            </View>
        </>
        :
        <>
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
                        onChangeText={onChangeLogin}
                        value={Login}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        onChangeText={onChangeEmail}
                        value={Email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Фамилия"
                        onChangeText={onChangeLastName}
                        value={LastName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Имя"
                        onChangeText={onChangeName}
                        value={Name}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Отчество"
                        onChangeText={onChangeSecondName}
                        value={SecondName}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Пароль"
                        onChangeText={onChangePassword}
                        value={Password}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Подтверждение пароля"
                        onChangeText={onChangePasswordT}
                        value={PasswordT}
                    />
                    <Text
                        style={ErrorText!==""?styles.error:styles.errorEmty}
                    >
                        {ErrorText}
                    </Text>
                    <ButtonElement 
                        onPress={() =>{
                            sentRegister()
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
        </>
    )
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