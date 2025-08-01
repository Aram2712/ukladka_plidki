
import axios from "axios";
import { baseUrl } from "./constants";
import { TPrice } from "./types";
// import type { TUser } from "./types";


const axiosMainUrl = axios.create({
    // baseURL: baseUrl,
})

axiosMainUrl.interceptors.request.use((config) => {
    if (config.url === `${baseUrl}/orders/create` || config.url === `${baseUrl}/services`){
        config.headers["Content-Type"] = "multipart/form-data";
    }
    else {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

export const signup = async (url: string, data: any) => {
    return await axiosMainUrl.post(url, data);
} 

export const signin = async (url: string, data: any) => {
    return await axiosMainUrl.post(url, data);
} 

export const createComment = async (url: string, data: any) => {
    return await axiosMainUrl.post(url, data);
} 

export const getComments = async (url: string) => {
    return await axiosMainUrl.get(url);
}

export const sendOrder = async (url: string, data: FormData) => {
    return await axiosMainUrl.post(url, data);
}

export const getOrders = async (url: string) => {
    return await axiosMainUrl.get(url);
}

export const createService = async (url: string, data: FormData) => {
    return await axiosMainUrl.post(url, data)
}

export const getServices = async (url: string) => {
    return await axiosMainUrl.get(url);
}

export const deleteService = async (url: string) => {
    return await axiosMainUrl.delete(url);
}

export const getAllUsers = async (url: string) => {
    return await axiosMainUrl.get(url);
}

export const deleteUser = async (url: string) => {
    return await axiosMainUrl.delete(url);
}

export const getAllForum = async (url: string) => {
    return await axiosMainUrl.get(url);
} 

export const submitForumNewData = async (url: string, data: any) => {
    return await axiosMainUrl.post(url, data)
}

export const deleteOrder= async (url: string) => {
    return await axiosMainUrl.delete(url);
}

export const getAllPrices = async (url: string) => {
    return await axiosMainUrl.get(url);
}

export const deletePrice= async (url: string) => {
    return await axiosMainUrl.delete(url);
}

export const createPrice = async (url: string, data: TPrice) => {
    return await axiosMainUrl.post(url, data)
}

export const readNews = async (url: string) => {
    return await axiosMainUrl.get(url);
}