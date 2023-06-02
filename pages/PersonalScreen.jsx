import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import * as React from 'react';
import { UserMessage } from '../function/user.messanger';
import ButtonElement from '../components/Button';
import { ScrollView } from 'react-native';


export default function PersonalScreen({navigation,route}) {
    var user = new UserMessage(navigation,route)
    const [News,SetNews] = React.useState({});
    const [GloupList,SetGloupList] = React.useState([]);


    
    const [MessageBotton, setMessageBotton] = React.useState("Сохранить")
    const [Login, onChangeLogin] = React.useState("")
    const [Email, onChangeEmail] = React.useState("")
    const [Nickname, onChangeNickname] = React.useState("")
    const [Name, onChangeName] = React.useState("")
    const [SecondName, onChangeSecondName] = React.useState("")
    const [LastName, onChangeLastName] = React.useState("")

    React.useEffect(() => {
        getNewsDetail();
    }, []);
    
    async function sendUser() {
        setMessageBotton("Сохранение...")
        let updatet = {}
        updatet["id"] = News?.id
        if(News?.email!=Email){
            updatet["email"] = Email
        }
        if(News?.login!=Login){
            updatet["login"] = Login
        }
        if(News?.name!=Name){
            updatet["name"] = Name
        }
        if(News?.last_name!=LastName){
            updatet["last_name"] = LastName
        }
        if(News?.second_name!=SecondName){
            updatet["second_name"] = SecondName
        }
        if(News?.nickname!=Nickname){
            updatet["nickname"] = Nickname
        }

        let resulte = await user.getUpdateModeration(updatet)
        if(resulte){
            setMessageBotton("Данные сохранены")
            setTimeout(() => {
                setMessageBotton("Сохранить")
            }, 1000);
        }
    }

    async function getNewsDetail() {
        let resulte = await user.getUserPersonal()
        navigation.setOptions({
            title:resulte.nickname,
        });
        SetNews(resulte)
        onChangeEmail(resulte?.email)
        onChangeLogin(resulte?.login)
        onChangeName(resulte?.name)
        onChangeLastName(resulte?.last_name)
        onChangeSecondName(resulte?.second_name)
        onChangeNickname(resulte?.nickname)
        
        let resulteGroup = await user.getUserGroupList()
        SetGloupList(resulteGroup)
    }
    return (<>
        <View style={styles.containerNews}>
            <ScrollView>
                <View style={styles.containerNewsInput}>
                    <Text style={styles.containerNewsTitleText}>Почта:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmail}
                        value={Email}
                    />
                </View>
                <View style={styles.containerNewsInput}>
                    <Text style={styles.containerNewsTitleText}>Логин:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeLogin}
                        value={Login}
                    />
                </View>
                <View style={styles.containerNewsInput}>
                    <Text style={styles.containerNewsTitleText}>Никнейм:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNickname}
                        value={Nickname}
                    />
                </View>
                <View style={styles.containerNewsInput}>
                    <Text style={styles.containerNewsTitleText}>Фамилия:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeLastName}
                        value={LastName}
                    />
                </View>
                <View style={styles.containerNewsInput}>
                    <Text style={styles.containerNewsTitleText}>Имя:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeName}
                        value={Name}
                    />
                </View>
                <View style={styles.containerNewsInput}>
                    <Text style={styles.containerNewsTitleText}>Отчество:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeSecondName}
                        value={SecondName}
                    />
                </View>
                <ButtonElement 
                    onPress={async () =>{
                        sendUser()
                    }}
                    text={MessageBotton}
                />
            </ScrollView>
        </View>
    </>)
}

const styles = StyleSheet.create({
    input: {
        paddingVertical:5,
        paddingHorizontal:10,
        borderWidth: 1,
        borderRadius:20,
        marginBottom:20
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