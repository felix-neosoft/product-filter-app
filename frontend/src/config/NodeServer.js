import axios from 'axios'

export const MAIN_URL = "http://localhost:8888/api"

export function fetchUser(){
    return axios.get(`${MAIN_URL}/fetchuser`)
}

export function productsfetch(){
    return axios.get(`${MAIN_URL}/products`)
}

export function addUser(data){
    return axios.post(`${MAIN_URL}/registeruser`,JSON.stringify(data))
}