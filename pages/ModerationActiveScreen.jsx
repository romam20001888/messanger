import { StyleSheet, SafeAreaView, Text, FlatList, View } from 'react-native';
import * as React from 'react';
import { UserMessage } from '../function/user.messanger';
import ModerationCart from '../components/moderationCart';

export default function ModerationActiveScreen({navigation,route}) {
    const [News,SetNews] = React.useState([]);
    const [NewsPage,SetNewsPage] = React.useState(1);
    const [refreshingIn, setRefreshingIn] = React.useState(false);
    var user = new UserMessage(navigation,route)

    React.useEffect(()=>{ 
        const interval = setInterval(() => {
            updateList();
        }, 1000);
        return () => clearInterval(interval);
    },[])

    async function updateList() {
        setRefreshingIn(true) 
        let resulte = await user.getModerationActiveList(NewsPage)
        SetNews(resulte)
        setRefreshingIn(false) 
    }
    return (<>
        <SafeAreaView>
            <FlatList
                data={News}
                renderItem={({item}) => <ModerationCart item={item} users={true} navigation={navigation}/>}
                keyExtractor={item => item.id}
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