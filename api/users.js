import http from 'k6/http';
import { config } from '../config.js'

export function CreateUser(payload){
    const params = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    return http.post(`${config.baseUrl}/users`, JSON.stringify(payload), params)
}

export function UpdateUser(payload, id){
    const params = {
        headers: {
            'Content-Type' : 'application/json'
        }  
    }
    return http.put(`${config.baseUrl}/users/${id}`, JSON.stringify(payload), params)
}
