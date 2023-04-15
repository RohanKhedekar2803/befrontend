import axios from "axios";
import { authRoute, baseURL, getHeader } from "./config";


export const LoginUser = async(payload)=>{

    return await axios.post(`${baseURL}${authRoute.signin}`,payload).then((res)=>{
        return res.data;
    }).catch((err)=>{
        console.log(err.response.data.error)
        return {err:err.response.data.error}
    })

}

export const RegisterUser = async(payload)=>{
    return await axios.post(`${baseURL}${authRoute.signup}`,payload).then((res)=>{
        return res.data;
    }).catch((err)=>{
        return {err:"Error occurred"}
    })
}


export const Logout = async(payload)=>{
    console.log(`${baseURL}${authRoute.signout}`);
    return await axios.get(`${baseURL}${authRoute.signout}`).then((res)=>{
        localStorage.clear();
        return res.data;
    }).catch((err)=>{
        return {err}
    })

}

export const getWishList = async(id)=>{
    return await axios.post(`${baseURL}${authRoute.user}/${id}/wishlist`,getHeader()).then((res)=>{
        return res.data;
    }).catch((err)=>{
        return {err:"Error occurred"}
    })
}


