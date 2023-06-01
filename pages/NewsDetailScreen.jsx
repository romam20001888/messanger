import { StyleSheet, Image, Text, View } from 'react-native';
import * as React from 'react';
import { UserMessage } from '../function/user.messanger';

export default function NewsDetail({navigation,route}) {
    var user = new UserMessage(navigation,route)
    const [News,SetNews] = React.useState({});

    React.useEffect(() => {
        getNewsDetail();
    }, [route.params.id]);

    async function getNewsDetail() {
        let resulte = await user.getNews(route.params.id)
        
        navigation.setOptions({
            title:resulte.name,
        });
        SetNews(resulte)
    }
    return (<>
        <View style={styles.containerNewsImage}>
            <Image 
                style={styles.iconMenu}
                source={{
                    uri: 'https://vigmebel.acrodev.ru/upload/iblock/e2e/yzu9uupsfxdxbc0tvgmpemnqapcve3t1/Frame_19.png',
                }}
            />
        </View>
        <Text style={styles.containerNewsTitleText}>{News.description}</Text>
    </>)
}

const styles = StyleSheet.create({
    iconMenu:{
        width: "100%",
        height: "100%",
        resizeMode: 'cover'
    },
    containerNewsImage:{
        position:"relative",
        width: "100%",
        height: 200,
    },
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