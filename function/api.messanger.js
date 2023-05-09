import { AsyncStorage } from 'react-native';

export class ApiControll{
    constructor() {
        this.NameUserToken = "UserToken";
        this.api_url = "http://176.96.228.59";
        this.api_page = {
            "user_login":"/user/login/",
            "user_register":"/user/register/",
            "user_get_info":"/user/get_info/",
            "user_update":"/user/update/",
            "messanger_get_list_chat":"/message/getChatList/",
            "messanger_get_chat_id":"/message/getChat/",
            "messanger_add_message":"/message/addMessage/",
            "news_list":"/news/getlist/",
        };
    }

    async sendApi(namePageApi, method='POST', headers={}, body={}){
        if(headers['Content-Type']===undefined){
            headers['Content-Type']='application/json';
        }

        let dataFetch = await fetch(this.api_url+this.api_page[namePageApi],{
            method: method, 
            headers: headers,
            body: JSON.stringify(body)
        });
        return await dataFetch.json();
    }

    
    async news_list_send(page){
        let token = await this.getTokenApp();
        if(token!==undefined){
            return await this.sendApi(
                'news_list',
                'POST',
                {
                    'Content-Type':'application/json'
                },
                {
                    token:token,
                    page:page
                }
            );
        }else{
            return [];
        }
    }

    async messanger_add_message(id,message=""){
        let token = await this.getTokenApp();
        return await this.sendApi(
            'messanger_add_message',
            'POST',
            {
                'Content-Type':'application/json'
            },
            {
                token:token,
                id:id,
                message:message,
            }
        );
    }
    
    async messanger_get_chat_id(id,page){
        let token = await this.getTokenApp();
        return await this.sendApi(
            'messanger_get_chat_id',
            'POST',
            {
                'Content-Type':'application/json'
            },
            {
                token:token,
                id:id,
                num_page:page,
            }
        );
    }
    
    async messanger_get_list_chat_send(page){
        let token = await this.getTokenApp();
        return await this.sendApi(
            'messanger_get_list_chat',
            'POST',
            {
                'Content-Type':'application/json'
            },
            {
                token:token,
                page:page,
            }
        );
    }

    async user_login_send(login, pass){
        return await this.sendApi(
            'user_login',
            'POST',
            {
                'Content-Type':'application/json'
            },
            {
                login:login,
                password:pass,
            }
        );
    }
    
    async user_register_send(login, pass, nick){
        return await this.sendApi(
            'user_register',
            'POST',
            {
                'Content-Type':'application/json'
            },
            {
                login:login,
                password:pass,
                nickname:nick,
            }
        );
    }
    
    async user_get_info_send(token){
        return await this.sendApi(
            'user_get_info',
            'POST',
            {
                'Content-Type':'application/json'
            },
            {
                token:token,
            }
        );
    }
    
    async user_update_send(token, data){
        data["token"]=token;
        return await this.sendApi(
            'user_update',
            'POST',
            {
                'Content-Type':'application/json'
            },
            data
        );
    }
    saveTokenApp(token){
        AsyncStorage.setItem('@'+this.NameUserToken,token);
    }

    async deleteTokenApp(){
        try {
            await AsyncStorage.removeItem('@'+this.NameUserToken);
            return true;
        }
        catch(exception) {
            return false;
        }
    }

    async getTokenApp(){
        return await AsyncStorage.getItem('@'+this.NameUserToken);
    }

    async decodeTokenApp(){
        // в разработке
        return ""
    }

}