import axios from 'axios';

export const api=axios.create({
    baseURL: process.env.API_ADDR
})

export async function signUp(email,password){
    try{
        const signUpData={
            email:email,
            password:password
        };
        const userAuth = await api.post('/users',signUpData,{
            headers:{
                Authorization:'none',
            },
        });

        if(!(userAuth.status==201)) throw Error;

        return userAuth.data;

    }catch(error){
        throw new Error(error)
    }
}