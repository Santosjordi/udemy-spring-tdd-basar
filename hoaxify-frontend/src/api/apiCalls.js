import axios from "axios";


export const signup = (user) => {
    return axios.post('/api/1.0/users', user);
}

export const login = (user) => {
    return axios.post('/api/1.0/login', {}, { auth: user});
}

export const setAuthorizationHeaders = ({username, password, isLoggedIn}) => {
    if(isLoggedIn){
        axios.defaults.headers.common['Authorization'] = `Basic ${btoa(username + ':' + password)}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }

}

export const listUsers = (param = {page: 0, size: 3}) => {
    axios.get(`/api/1.0/users?page=${param.page || 0}&size=${param.size || 3}`);
}
