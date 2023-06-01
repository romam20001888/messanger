import { StyleSheet, SafeAreaView, Text, FlatList, View } from 'react-native';
import * as React from 'react';
import { UserMessage } from '../function/user.messanger';
import ModerationCart from '../components/moderationCart';

export default function ModerationScreen({navigation,route}) {
    const [News,SetNews] = React.useState([]);
    const [NewsPage,SetNewsPage] = React.useState(1);
    const [refreshingIn, setRefreshingIn] = React.useState(false);
    var user = new UserMessage(navigation,route)

    React.useEffect(()=>{ 
        updateList();
    },[NewsPage])

    async function updateList() {
        setRefreshingIn(true) 
        let resulte = await user.getModerationList(NewsPage)
        SetNews(resulte)
        setRefreshingIn(false) 
    }
    return (<>
        <SafeAreaView>
            <FlatList
                data={News}
                refreshing={refreshingIn}
                onRefresh={()=>{SetNewsPage(1)}}
                renderItem={({item}) => <ModerationCart item={item} navigation={navigation}/>}
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