
import { Messanger } from './function/messanger';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import AuthScreen from './pages/AuthScreen';
import RegistrationScreen from './pages/RegistrationScreen';
import HomeScreen from './pages/HomeScreen';
import HeaderMenu from './components/headerMenu';
import StartScreen from './pages/StartScreen';
import MessageScreen from './pages/MessageScreen';
import ChatWindow from './pages/СhatWindowScreen';
import ButtonBack from './components/buttonBackPage';


import * as TaskManager from 'expo-task-manager';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { UserMessage } from './function/user.messanger';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
  console.log('Received a notification in the background!');
});
Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

const Stack = createNativeStackNavigator();

export default function App() {
  var user = new UserMessage(false,false)
  
  React.useEffect(()=>{
    registerForPushNotificationsAsync().then(token => {
      user.sendPushToken(token)
    })
  })

  return (
      <NavigationContainer>
        <Stack.Navigator headerMode="screen" navigationOptions screenOptions={({ navigation }) => ({
          headerLeft: () => <HeaderMenu navigation={navigation} />,
        })}>
          <Stack.Screen 
            name="StartScreen"
            component={StartScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: 'Новости'
            }}
          />
          <Stack.Screen 
            name="MessageScreen"
            component={MessageScreen}
            options={{
              title: 'Сообщения'
            }}
          />
          <Stack.Screen 
            name="ChatWindowScreen"
            component={ChatWindow}
            options={
              ({ navigation}) => ({
                headerLeft: () => (
                  <ButtonBack navigation={navigation} openPage="MessageScreen" />
                )
              })
            }
            
          />
          <Stack.Screen 
            name="AuthScreen"
            component={AuthScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="RegistrationScreen"
            component={RegistrationScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}





async function schedulePushNotification(title="You've got mail! 📬",body='Here is the notification body', notData='goes here') {
  await Notifications.scheduleNotificationAsync({
    content: {
      title:title,
      body: body,
      data: { data: notData },
      sound: true
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
		try {
			token = await Notifications.getExpoPushTokenAsync();
		}catch(err){
			console.log(`failed to get token error ${err}`);
		}
    token = token.data
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}
