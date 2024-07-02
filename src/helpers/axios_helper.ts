import axios from 'axios';
import { User } from '../types';
import { jwtDecode } from 'jwt-decode'

const defaultUser: User = {
  email: "",
  token: "",
  isAuth: false
}


export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token:any) => {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
};

export const removeToken = () =>{
  localStorage.removeItem('auth_token')
}

axios.defaults.baseURL = 'http://localhost:8080';

export const request = (method:string, url:string, data:any) => {

    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data});
};

export const authenticate = (token?: string): User =>{
  if(token){
    setAuthHeader(token);
  }

  //crear variable local
  //si el token por parametro no esta vacio lo
  //asigna, en otro caso lo trae del localstorage
  const _token = token ? token : getAuthToken();
  if(! _token){ 
    return {...defaultUser}
  }
  const decoded: any = jwtDecode(_token);
  const currentTime = Date.now() / 1000;

  if(decoded.exp < currentTime){
    removeToken();
    return{...defaultUser}
  }

  axios.defaults.headers.common["Authorization"] = _token
  return {...defaultUser, email: decoded.sub, token: _token, isAuth: true}
}

export const logout = (): User =>{
  removeToken()
  delete axios.defaults.headers.common["Authorization"];
  return {...defaultUser}
}