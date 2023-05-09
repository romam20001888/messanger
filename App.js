
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



const Stack = createNativeStackNavigator();

export default function App() {
  
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
