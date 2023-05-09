import { UserMessage } from "./user.messanger";

export class Messanger{
    constructor(navigation,route) {
        this.api_url = "http://176.96.228.59";
        this.token = "";
        this.NameUserToken = "UserToken";
        this.navigation = navigation;
        this.route = route;
    }
}