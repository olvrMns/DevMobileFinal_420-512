import axios from 'axios';
import  IP_BACKEND  from '../config';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

/*
export const api=axios.create({
    baseURL: process.env.API_ADDR
})
    */

export const api = axios.create({
    baseURL:IP_BACKEND
})

// Function to set the JWT in AsyncStorage
export async function setToken(token) {
    try {
        await AsyncStorage.setItem('jwt', token);
    } catch (error) {
        console.error('Error setting token:', error);
    }
}

// Function to get the JWT from AsyncStorage
export async function getToken() {
    try {
        return await AsyncStorage.getItem('jwt');
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
}

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    async (config) => {
        const token = await getToken(); // Retrieve the token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



export async function signIn(usernameOrEmail,pwd){
    try{
        console.log(`Trying to signIn with username: ${usernameOrEmail} and password: ${pwd}`);

        const signInData={
            usernameOrEmail: usernameOrEmail,
            pwd: pwd
        };
        const userAuth = await api.post('/users/signin',signInData,{
            headers:{
                Authorization:'none',
            },
        });

        if(!(userAuth.status==200)) throw Error;

        // Store the token on successful sign-in
        await setToken(userAuth.data.token);

        return userAuth.data;

    }catch(error){
        throw new Error(error)
    }
}