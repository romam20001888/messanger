import {AsyncStorage} from 'react-native';

export class Messanger{
    constructor() {
      this.api_url = "http://176.96.228.59";
      this.token = "";
      this.NameUserToken = "UserToken";
    }

//Фунции user
    async Login(login,pass) {//Асинхронная функция авторизации пользователя
        try {//отлов ошибок в скрипте
            let dataFetch = await fetch(this.api_url+'/user/login/',{//Запрос по fetch
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login:login,//передача логина
                    password:pass,//передача пароля
                })
            });
            let json = await dataFetch.json();
            if(json?.res?.token){//Проверка наличия откена в ответе
                AsyncStorage.setItem('@'+this.NameUserToken,json.res.token);//Сохранение токена в память устройства
                this.token=json.res.token;//Сохранение токена пользователя в класс
                return json.res;
            }else{//Если токена в ответе нет, то возвращается ошибка
                return json.error;
            }
        } catch (error) {
            return error;//если есть ошибки в скрипте, то вернуть ошибку
        }
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
                AsyncStorage.setItem('@'+this.NameUserToken,json.res.token);//Сохранение токена в память устройства
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
            let dataFetch = await fetch(this.api_url+'/user/get_info/',{//Запрос по fetch
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token:this.token,//передача токена
                })
            });
            let json = await dataFetch.json();
            if(json?.res?.id){//Проверка наличия откена в ответе
                AsyncStorage.setItem('@'+this.NameUserToken,json.res.token);//Сохранение токена в память устройства
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
//Фунции messanger
    async getList() {//Асинхронная функция авторизации пользователя
      this.token = await AsyncStorage.getItem('@'+this.NameUserToken);//получение токена изпамяти устройства
      try {//отлов ошибок в скрипте
          let dataFetch = await fetch(this.api_url+'/messanger/get_list_chat/',{//Запрос по fetch
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  token:this.token,//передача токена
              })
          });
          let json = await dataFetch.json();
          if(json?.res?.length>0){//Проверка наличия откена в ответе
              return json.res;
          }else{//Если токена в ответе нет, то возвращается ошибка
              return json.error;
          }
      } catch (error) {
          return error;//если есть ошибки в скрипте, то вернуть ошибку
      }
    }
    async getById(id,num_page) {//Асинхронная функция авторизации пользователя
      this.token = await AsyncStorage.getItem('@'+this.NameUserToken);//получение токена изпамяти устройства
      try {//отлов ошибок в скрипте
          let dataFetch = await fetch(this.api_url+'/messanger/get_chat_id/',{//Запрос по fetch
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  token:this.token,//передача токена
                  id:id,//id чата 
                  num_page:num_page,//номер страницы чата 
              })
          });
          let json = await dataFetch.json();
          if(json?.res?.id>0){//Проверка наличия откена в ответе
              return json.res;
          }else{//Если токена в ответе нет, то возвращается ошибка
              return json.error;
          }
      } catch (error) {
          return error;//если есть ошибки в скрипте, то вернуть ошибку
      }
    }
    async sendMessage(id,message) {//Асинхронная функция авторизации пользователя
      this.token = await AsyncStorage.getItem('@'+this.NameUserToken);//получение токена изпамяти устройства
      try {//отлов ошибок в скрипте
          let dataFetch = await fetch(this.api_url+'/messanger/add_message/',{//Запрос по fetch
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  token:this.token,//передача токена
                  id:id,//id чата 
                  message:message,//номер страницы чата 
              })
          });
          let json = await dataFetch.json();
          if(json?.res?.message_id>0){//Проверка наличия откена в ответе
              return json.res;
          }else{//Если токена в ответе нет, то возвращается ошибка
              return json.error;
          }
      } catch (error) {
          return error;//если есть ошибки в скрипте, то вернуть ошибку
      }
    }
}