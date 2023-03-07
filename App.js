import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Messanger } from './function/messanger/index';
import * as React from 'react';

export default function App() {
  var message = new Messanger()
  
  React.useEffect(async()=>{
    let res = await message.GetUserInfo()
    console.log(await message.getById(1));
  },[])
  return (
    <View style={styles.container}>
      <Text>{message.api_url}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
