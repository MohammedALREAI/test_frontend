import axios from 'axios';
import config from "../config";


console.log("rrr",config.WS_BASE_URL);
const instance = axios.create({
    baseURL: config.WS_BASE_URL,
});

instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = (token ? token : '');
    config.headers.ContentType = 'application/json';
    return config;
});



export const getAll = async () => (
    await instance.post('users/all')
);

export const register = async (name, email, password) => {
    // phone, agency, role
    try {
    return await instance.post('auth/signup', {
         name, email, password
     })

        
    } catch (error) {
        throw  new Error("errrror",error)
        
    }


}
export const confirmRegister = async id => (
    await instance.post(`users/confirm/${id}`)
);

export const forgotPassword = async email => (
    await instance.post('users/forgotpassword', {email})
);

export const confirmReset = async (id, password) => (
    await instance.post(`users/resetpass/${id}`, {password})
);

export const login = async (email, password) => {
  try {
    return await instance.post('auth/login', {
          email, password
     })

        
    } catch (error) {
        throw  new Error("errrror login",error)
        
    }
}

export const logout = async token => (
    await instance.post('users/logout', {token})
);

export const edit = async (userID, name, email) => (
    await instance.post('/users/edit', {userID, name, email})
);
