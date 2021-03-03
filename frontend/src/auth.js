import {BadRequest} from './utils/errors/BadRequest'
export const BASE_URL = 'https://api.mestoken.students.nomoredomains.icu';


export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
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
    .then((res) => {
        return res.ok ? res.json() : new BadRequest('Неверно введены данные')
    })
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
        return res.ok ? res.json() : new BadRequest('Неверно введены данные')
    })
}