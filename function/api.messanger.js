import { AsyncStorage } from 'react-native';

export class ApiControll{
    constructor() {
        this.NameUserToken = "UserToken";
        this.api_url = "https://messanger.romanrogankov.site";
        this.api_page = {
            "check_server":"/user/check/",
            "user_login":"/user/login/",
            "push_token":"/user/addPushToken/",
            "user_register":"/user/register/",
            "user_get_info":"/user/get_info/",
            "user_update":"/user/update/",
            "messanger_get_list_chat":"/message/getChatList/",
            "messanger_get_chat_id":"/message/getChat/",
            "messanger_add_message":"/message/addMessage/",
            "delete_message":"/message/deleteMessage/",
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
    
    
    async send_delete_message(id){
        let token = await this.getTokenApp(); // /user/addPushToken/
        return await this.sendApi(
            'delete_message',
            'POST',
            {
                'Content-Type':'application/json'
            },
            {
                token:token,
                id:id
            }
        );
    }

    async check_server_send(){
        let token = await this.getTokenApp(); // /user/addPushToken/
        return await this.sendApi(
            'check_server',
            'POST',
            {
                'Content-Type':'application/json'
            },
            {
                token:token
            }
        );
    }
    
    
    async send_push_token_send(tokenPush){
        let token = await this.getTokenApp(); // /user/addPushToken/
        return await this.sendApi(
            'push_token',
            'POST',
            {
                'Content-Type':'application/json'
            },
            {
                token:token,
                tokenPush:tokenPush
            }
        );
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

    async messanger_add_message(id,message="", idUpdated = undefined){
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
                idUpdated:idUpdated,
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
    
    async user_regiter_send(data){
        return await this.sendApi(
            'user_register',
            'POST',
            {
                'Content-Type':'application/json'
            },
            {
                data:data,
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