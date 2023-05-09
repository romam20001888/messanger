import * as React from 'react';
import AuthScreen from '../pages/AuthScreen';
import HomeScreen from '../pages/HomeScreen';
import RegistrationScreen from '../pages/RegistrationScreen';

export const PageContext= React.createContext();


export const PageList = {
    "PageNoAuth":[
        {
            "name":"AuthScreen",
            "component":AuthScreen,
            "options":{headerShown: false}
        },
        {
            "name":"RegistrationScreen",
            "component":RegistrationScreen,
            "options":{headerShown: false}
        },
    ],
    "Admin":[
        {
            "name":"HomeScreen",
            "component":HomeScreen,
        }
    ],
};