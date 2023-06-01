import { StyleSheet, Image, Text, View } from 'react-native';
import * as React from 'react';
import { UserMessage } from '../function/user.messanger';

export default function ModerationDetail({navigation,route}) {
    var user = new UserMessage(navigation,route)
    const [News,SetNews] = React.useState({});

    React.useEffect(() => {
        getNewsDetail();
    }, [route.params.id]);

    async function getNewsDetail() {
        let resulte = await user.getUserModeration(route.params.id)
        console.log(resulte)
        navigation.setOptions({
            title:resulte.nickname,
        });
        SetNews(resulte)
    }
    return (<>
        <Text style={styles.containerNewsTitleText}>Почта: {News.email}</Text>
        <Text style={styles.containerNewsTitleText}>Логин: {News.login}</Text>
        <Text style={styles.containerNewsTitleText}>Никнейм: {News.nickname}</Text>
        <Text style={styles.containerNewsTitleText}>Фамилия: {News.last_name}</Text>
        <Text style={styles.containerNewsTitleText}>Имя: {News.name}</Text>
        <Text style={styles.containerNewsTitleText}>Отчество: {News.second_name}</Text>
        <Text style={styles.containerNewsTitleText}>Активность: {News.active}</Text>
        <Text style={styles.containerNewsTitleText}>Группа: {News.group}</Text>
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