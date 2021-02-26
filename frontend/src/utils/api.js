const config = {
    url: "http://ken.students.nomoreparties.space/",
    headers: {
        // authorization: '4b89edef-9be1-402e-a5c7-910a1504eece',
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
}

const handleResponse = (res) => {
    if (!res.ok) {
        console.log(`Ошибка: ${res.status} - ${res.statusText}`);
    }
    return res.json()
}

class Api {
    constructor(config) {
        this._headers = config.headers
        this._url = config.url
        this._cohort = config.cohort
    }
    //запрос на отрисовку карточек 
    getCardList() {
        // return fetch(`${this._url}${this._cohort}cards`, {
        return fetch(`${this._url}cards`, {
            headers: this._headers
        }).then(handleResponse)
    }
    //запрос на создание новой карточки
    createCard(data) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        }).then(handleResponse)
    }
    //запрос на изменение данных профайла
    setUserInfo(inputData) {
        return fetch(`${this._url}users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: inputData.name,
                about: inputData.about
            })
        }).then(handleResponse)
    }

    //забираем данные профайла с сервера
    getProfileInfo() {
        return fetch(`${this._url}users/me`, {
            headers: this._headers,
        }).then(handleResponse)
    }

    //удаляем карточку
    setCardDelete(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(handleResponse)
    }

    //запрос на удаление/добавление лайка
    changeLikeCardStatus(cardId, LikeState) {
        const method = LikeState ? "PUT" : "DELETE"
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method,
            headers: this._headers,
        })
            .then(handleResponse)
    }

    //редактирвоание аватара
    setUserAvatar(inputData) {
        return fetch(`${this._url}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: inputData.avatar,
            })
        })
            .then(handleResponse)
    }
}

const api = new Api(config)

export default api