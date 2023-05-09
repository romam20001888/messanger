import { StyleSheet, SafeAreaView, Text, FlatList, View } from 'react-native';
import * as React from 'react';
import { UserMessage } from '../function/user.messanger';
import NewsCart from '../components/newsCart';

export default function HomeScreen({navigation,route}) {
    const [News,SetNews] = React.useState([]);
    const [NewsPage,SetNewsPage] = React.useState(1);
    const [refreshingIn, setRefreshingIn] = React.useState(false);
    var user = new UserMessage(navigation,route)

    React.useEffect(()=>{ 
        updateList();
    },[NewsPage])

    async function updateList() {
        if(NewsPage==1){
            setRefreshingIn(true) 
        }
        let resulte = await user.getNewsList(NewsPage)
        if(NewsPage==1){
            SetNews(resulte)
        }else{
            var newsSavePage = News;
            if(resulte?.length>=0){
                resulte.forEach(element => {
                    newsSavePage.push(element)
                });
                SetNews(newsSavePage)
            }
        }
        if(NewsPage==1){
            setRefreshingIn(false) 
        }
    }
    return (<>
    
        <SafeAreaView>
            <FlatList
                data={News}
                refreshing={refreshingIn}
                onRefresh={()=>{SetNewsPage(1)}}
                renderItem={({item}) => <NewsCart item={item} navigation={navigation}/>}
                keyExtractor={item => item.id}
                onEndReached={()=>{SetNewsPage(NewsPage+1)}}
            />
        </SafeAreaView>
    </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});