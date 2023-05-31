import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import * as Notifications from 'expo-notifications';
import { UserMessage } from '../function/user.messanger';

export default function StartScreen({navigation,route,setServerCheck,ServerCheck,responseListener,registerForPushNotificationsAsync}) {
    var user = new UserMessage(navigation,route)
    
    React.useEffect(()=>{ 
        registerForPushNotificationsAsync().then(async(token) => {
            user.sendPushToken(token)
        })
        const interval = setInterval(() => {
            checkUser();
        }, 1000);
        return () => clearInterval(interval);
    },[])
    
    React.useEffect(()=>{ 

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          if(response?.notification?.request?.content?.data){
            navigation.navigate(
                response.notification.request.content.data.ScreenOpen,
                response.notification.request.content.data
            )
          }
          console.log(response.notification.request.content.data.ScreenOpen)
        });
        
        return () => {
          Notifications.removeNotificationSubscription(responseListener.current);
        };
    },[])
    
    async function checkUser() {
        
        let server = await user.checkServer()

        let arrayRouters = navigation.getState()?.routes
        let arrayRoutersNow = arrayRouters[arrayRouters.length-1]
        
        if(server==true){
            let resulte = await user.isAuth()
            if(resulte==false){
                if(arrayRoutersNow?.name!=="AuthScreen" && arrayRoutersNow?.name!=="RegistrationScreen"){
                    navigation.navigate('AuthScreen')
                }
            }else if(arrayRoutersNow?.name=="StartScreen"){
                navigation.navigate('HomeScreen')
            }
        }
        setServerCheck(server)
        
    }

    return (<>
        <View style={styles.container}>
            <Text style={styles.h1}>
                messanger
            </Text>
            {ServerCheck!==true?<>
            <Text style={styles.h2}>
                Нет подключения к серверу
            </Text>
            <Text style={styles.h2}>
                Повторное подключение...
            </Text>
            </>:<></>}
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
    h2: {
        fontSize:20,
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