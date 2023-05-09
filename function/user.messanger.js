import { ApiControll } from "./api.messanger";

export class UserMessage{
    async Login(login,pass) {
        
        let api = new ApiControll()
        let dataUser = await api.user_login_send(login,pass);

        if(dataUser?.jwt!=undefined){
            api.saveTokenApp(dataUser?.jwt);
        }
            
        return dataUser;
    }

    async getNewsList(page) {
        let api = new ApiControll()
        return await api.news_list_send(page);
    }

    async getChatList(page) {
        let api = new ApiControll()
        return await api.messanger_get_list_chat_send(page);
    }

    async getChatInfo(id,page) {
        let api = new ApiControll()
        return await api.messanger_get_chat_id(id,page);
    }

    async addMessage(id,message) {
        let api = new ApiControll()
        return await api.messanger_add_message(id,message);
    }
    
    async isAuth() {
        let api = new ApiControll()
        let token = await api.getTokenApp();
        if(token!=undefined && token!=""){
            return token;
        }else{
            return false;
        }
    }

    async ExitAccount() {
        let api = new ApiControll()
        return await api.deleteTokenApp();
    }

    async Register(login,pass,nickname) {//Асинхронная функция регистрации пользователя
        try {//отлов ошибок в скрипте
            let dataFetch = await fetch(this.api_url+'/user/register/',{//Запрос по fetch
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login:login,//передача логина
                    password:pass,//передача пароля
                    nickname:nickname,//передача никнейма
                })
            });
            let json = await dataFetch.json();
            if(json?.res?.token){//Проверка наличия откена в ответе
                this.saveTokenApp(json.res.token);//Сохранение токена в память устройства
                this.token=json.res.token;//Сохранение токена пользователя в класс
                return json.res;
            }else{//Если токена в ответе нет, то возвращается ошибка
                return json.error;
            }
        } catch (error) {
            return error;//если есть ошибки в скрипте, то вернуть ошибку
        }
    }

    async GetUserInfo() {//Асинхронная функция регистрации пользователя
        this.token = await AsyncStorage.getItem('@'+this.NameUserToken);//получение токена изпамяти устройства
        try {//отлов ошибок в скрипте
            if(this.token==""){
                return {"error":"Пожалуйста авторезируйтесь"};
            }
            let dataUser = await this.sendApi('/user/get_info/',{
                token:this.token,//передача токена
            });
            if(json?.res?.id){//Проверка наличия откена в ответе
                this.saveTokenApp(json.res.token);//Сохранение токена в память устройства
                this.token=json.res.token;//Сохранение токена пользователя в класс
                return json.res;
            }else{//Если токена в ответе нет, то возвращается ошибка
                return json.error;
            }
        } catch (error) {
            return error;//если есть ошибки в скрипте, то вернуть ошибку
        }
    }

    async UserUpdate(colUpdate={}) {//Асинхронная функция регистрации пользователя
        this.token = await AsyncStorage.getItem('@'+this.NameUserToken);//получение токена изпамяти устройства
        var bodyFetch={//создание массива отправки
            token:this.token
        };
        for ( var key in colUpdate ) {//перебор отсравлекнных в функцию значений и добавление в массив отправки
            bodyFetch[key]=colUpdate[key];
        }
        try {//отлов ошибок в скрипте
            if(this.token==""){
                return {"error":"Пожалуйста авторезируйтесь"};
            }
            let dataFetch = await fetch(this.api_url+'/user/update/',{//Запрос по fetch
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyFetch)
            });
            let json = await dataFetch.json();
            if(json?.res?.status=="update"){//Проверка наличия статуса update в ответе
                return true;
            }else{//Если токена в ответе нет, то возвращается ошибка
                return false;
            }
        } catch (error) {
            return error;//если есть ошибки в скрипте, то вернуть ошибку
        }
    }
}