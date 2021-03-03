import {BadRequest} from './utils/errors/BadRequest'

export const BASE_URL = 'https://api.mestoken.students.nomoredomains.icu';


const checkresponse = (response) => response.ok ? response.json() : Promise.reject('Неверно введены данные')

export const register = (userData) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then((res) => {
        return res.ok ? res.json() : new BadRequest('Неверно введены данные')
    })
}


export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
    .then(checkresponse)
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject('Неверно введены данные')
        })
}