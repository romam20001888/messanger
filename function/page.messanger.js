import { ApiControll } from "./api.messanger";

export class PageControll{
    constructor(navigation,route) {
        this.navigation = navigation;
        this.route = route;
    }

    openPage(namePage, params={}){//Открыть страницу
        this.navigation.navigate(namePage, params)
    }
    async pageInit(namePage){
        let api = new ApiControll()
        let userInfo = api.user_get_info_send(await api.getTokenApp())
        console.log(userInfo)
        switch (namePage) {
            case "AuthScreen":
                break;
        
            default:
                break;
        }
    }
    exitApp(){//Выход из приложения
        let api = new ApiControll()
        api.deleteTokenApp()
        this.navigation.navigate("AuthScreen")
    }
}