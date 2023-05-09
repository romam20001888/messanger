import * as React from 'react';
import { TouchableOpacity,Modal,ScrollView,StyleSheet,Text,Image,View } from 'react-native';

const ButtonBack = ({navigation,route,openPage}) => {
    console.log([navigation,openPage])
    return (
      <>
        
        <TouchableOpacity
            onPress={() =>{
                navigation.navigate(openPage)
            }}
            style={styles.containerMenuOpen}
        >
            <Image 
                style={styles.iconFilter}
                source={require('../images/back-button.png')}
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
export default ButtonBack