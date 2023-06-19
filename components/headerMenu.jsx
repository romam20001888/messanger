import * as React from 'react';
import { TouchableOpacity,Modal,ScrollView,StyleSheet,Text,Image,View } from 'react-native';
import { UserMessage } from '../function/user.messanger';

const HeaderMenu = ({navigation,route,userInfo}) => {
    const [statusMenu, onChangeStatusMenu] = React.useState(false);
    var user = new UserMessage(navigation,route)
    
    return (
      <>
        
        <Modal
            animationType="slide"
            transparent={true}
            visible={statusMenu}
            onRequestClose={() => {
                onChangeStatusMenu(!statusMenu);
            }}
        >
            <View style={styles.containerMenu}>
                <View style={styles.containerMenuTitle}>
                    <Text style={styles.containerMenuTitleText}>Меню</Text>
                    <TouchableOpacity
                        onPress={() => onChangeStatusMenu(!statusMenu)}
                    >
                        <Text style={styles.containerMenuTitleClose}>╳</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerMenuContainer}>
                    <ScrollView>
                        <TouchableOpacity 
                            style={styles.containerMenuItem}
                            onPress={() =>{ 
                                onChangeStatusMenu(!statusMenu)
                                navigation.navigate('HomeScreen')
                            }}
                        >
                            <Text style={styles.iconMenuText}>Новости</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.containerMenuItem}
                            onPress={() =>{ 
                                onChangeStatusMenu(!statusMenu)
                                navigation.navigate('MessageScreen')
                            }}
                        >
                            <Text style={styles.iconMenuText}>Сообщения</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.containerMenuItem}
                            onPress={() =>{ 
                                onChangeStatusMenu(!statusMenu)
                                navigation.navigate('PersonalScreen')
                            }}
                        >
                            <Text style={styles.iconMenuText}>Личный кабинет</Text>
                        </TouchableOpacity>
                        {userInfo?.group?.is_admin=="Y"?<>
                            <TouchableOpacity 
                                style={styles.containerMenuItem}
                                onPress={() =>{ 
                                    onChangeStatusMenu(!statusMenu)
                                    navigation.navigate('ModerationScreen')
                                }}
                            >
                                <Text style={styles.iconMenuText}>Модерация пользователей</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.containerMenuItem}
                                onPress={() =>{ 
                                    onChangeStatusMenu(!statusMenu)
                                    navigation.navigate('ModerationActiveScreen')
                                }}
                            >
                                <Text style={styles.iconMenuText}>Список пользователей</Text>
                            </TouchableOpacity>
                        </>:<></>}
                        <TouchableOpacity 
                            style={styles.containerMenuItemExit}
                            onPress={() =>{
                                user.ExitAccount()
                                onChangeStatusMenu(!statusMenu)
                                navigation.navigate('AuthScreen')
                            }}
                        >
                            {/* <Image 
                                style={styles.iconMenu}
                                source={require('../images/logout.png')}
                            /> */}
                            <Text style={styles.iconMenuText}>Выход</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
        <TouchableOpacity
            onPress={() =>{
                onChangeStatusMenu(!statusMenu)
            }}
            style={styles.containerMenuOpen}
        >
            <Image 
                style={styles.iconFilter}
                source={require('../images/menu.png')}
            />
        </TouchableOpacity>
      </>
    );
};


const styles = StyleSheet.create({
    iconFilter: {
        width: 30,
        height: 30,
    },
    iconMenu:{
        width: 40,
        height: 40,
        marginRight:10
    },
    iconMenuText:{
        fontSize:18,
    },
    containerMenuContainer: {
        flex:1,
        width:"100%"
    },
    containerMenuItem: {
        flex:1,
        alignItems:"center",
        justifyContent:"flex-start",
        flexDirection:"row",
        fontSize:18,
        marginLeft:10,
        marginBottom:10
    },
    containerMenuItemExit: {
        flex:1,
        alignItems:"center",
        justifyContent:"flex-start",
        flexDirection:"row",
        fontSize:18,
        marginTop:30,
        marginLeft:10
    },
    containerMenuOpen: {
        fontSize:45,
        marginRight:20
    },
    containerMenuTitleClose: {
        fontSize:23,
        marginRight:10
    },
    containerMenuTitleText: {
        fontSize:23,
        marginLeft:10
    },
    containerMenu: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent:"flex-start",
        height:"100%",
        width:"100%",
        backgroundColor:"#fff"
    },
    containerMenuTitle: {
        flex: 0.05,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        height:"100%",
        width:"100%",
        marginBottom:10,
        backgroundColor:"#fff"
    },
    
});
export default HeaderMenu