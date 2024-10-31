import axios, { AxiosResponse } from "axios";



export enum ResponseCode {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    NETWORK_ERROR = "ERR_NETWORK",
    UN_KNOWN = "UN_KNOWN"
}
/* eslint-disable @typescript-eslint/no-explicit-any */

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});


export interface CustomAxiosResponse<T> extends AxiosResponse<T> {
    data: T;
}

export interface Response<T> {
    data: T;
    status: number | ResponseCode | any;
    message: string;
}




