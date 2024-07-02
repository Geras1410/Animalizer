import { User } from "../../types";
import { AuthActions } from "../actions/authActions";
import { authenticate, logout } from "../../helpers/axios_helper"
import { produce } from "immer";


//Estado inicial para cuando esta autenticado el usuario
export const authInitialState:User = authenticate();


//Definir el reducer
export const AuthReducer = produce((state: User, action: AuthActions): User =>{
    switch(action.type){
        case "login":
            state = authenticate(action.token);
            return state;
        case "logout":
            state = logout();
            return state;
        default:
            return state;
    }

});