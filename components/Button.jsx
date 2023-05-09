import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonElement({onPress,text}) {
    return (
        <>
            <TouchableOpacity
                onPress={onPress}
            >
                <LinearGradient
                    colors={['#1f8bf0', '#d41ff0']}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        {text}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 0,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:20,
        marginBottom:20,
        backgroundColor:"#17aaff",
    },
    buttonText:{
        textAlign:"center",
        color:"white"
    }
});