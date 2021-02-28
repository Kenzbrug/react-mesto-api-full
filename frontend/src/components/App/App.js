import { useState, useEffect } from "react";
import { Route, Switch, withRouter, useHistory } from 'react-router-dom'

import Header from '../../components/Header/Header';
import Footer from '../Footer/Footer';
import ImagePopup from '../ImagePopup/ImagePopup';
import Main from '../Main/Main';
import api from '../../utils/api'
import Login from '../Login/Login';
import Register from "../Register/Register";
import * as auth from '../../auth';
import InfoTooltip from '../InfoTooltip/InfoTooltip'

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

//подписываемся на контекст
import CurrentUserContext from '../../contexts/CurrentUserContext'

import EditProfilePopup from '../EditProfilePopup/EditProfilePopup'
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup'
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup'

function App() {
    // стейты для попапов аватарки, профиля, карточки
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    // стейты для информационного попапа при регистрации
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
    const [isInfoTooltipStatus, setInfoTooltipStatus] = useState(false)


    const [selectedCard, setIsSelectedCard] = useState(undefined)
    const [cards, setCards] = useState([])
    const [currentUser, setCurrentUser] = useState('')

    const [loggedIn, setLoggedIn] = useState(false)
    const [userEmail, setUserEmail] = useState(
        {
            email: ''
        })

    // меняем значение стета для открытия попапов
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setIsSelectedCard(card)
    }
    //функция закрытия всех попапов
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsSelectedCard(false)
        setIsInfoTooltipOpen(false)
    }

    const history = useHistory()

    // проверка наличия токена
    const handleTokenCheck = (jwt) => {
        auth.getContent(jwt)
            .then((res) => {
                if (res) {
                    let userEmail = {
                        email: res.email
                    }
                    setLoggedIn(true)
                    // обновляем стейт email'a
                    setUserEmail(userEmail)
                    // при удачной проверке перебрасываем на главную страницу
                    history.push('/')
                }
            })
            .catch((res) => {
                console.log(`Ошибка: ${res.status} - ${res.statusText}`)
            })
    }

    const handleLogin = (data) => {
        const { password, email } = data
        return auth.authorize(password, email)
            .then((data) => {
                if (data.token) {
                    setLoggedIn(true)
                    localStorage.setItem('jwt', data.token)
                    window.location.reload()
                    // проверяем токен для отрисовки нужного email в header
                    handleTokenCheck(localStorage.getItem('jwt'))
                    history.push('/')
                    
                } else if (data.message || data.error) {
                    console.log(`Ошибка: ${data.message || data.error}`);
                }
            })
            .catch((res) => {
                console.log(`Ошибка: ${res.status} - ${res.statusText}`)
            })
    }

    // при выходе удаляем токен и переходим на страницу входа
    const hendleSignOut = () => {
        localStorage.removeItem('jwt')
        history.push('/signin')
    }


    const handleRegister = (userData) => {
        const { password, email } = userData
        return auth.register(password, email)
            .then((res) => {
                if (res.error || res.message) {
                    setIsInfoTooltipOpen(true)
                    setInfoTooltipStatus(false)
                }
                else {
                    setIsInfoTooltipOpen(true)
                    setInfoTooltipStatus(true)
                    history.push('/signin')
                }
            })
            .catch((res) => {
                console.log(`Ошибка: ${res.status} - ${res.statusText}`)
            })
    }

    // обновляем данные профайла
    function handleUpdateUser(profileData) {
        api
            .setUserInfo(profileData)
            .then((saveProfileData) => {
                //обновляем state профиля в кнтексте
                setCurrentUser(saveProfileData)
            })
            .catch((res) => {
                console.log(`Ошибка: ${res.status} - ${res.statusText}`);
            })
    }
    // обновляем аватар профайла
    function handleUpdateAvatar(urlAvatar) {
        api
            .setUserAvatar(urlAvatar)
            .then((saveAvatarData) => {
                //обновляем state аватара в котексте
                setCurrentUser(saveAvatarData)
            })
            .catch((res) => {
                console.log(`Ошибка: ${res.status} - ${res.statusText}`);
            })
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(usersIdid => usersIdid === currentUser._id);

        // // Отправляем запрос в API и получаем обновлённые данные карточки
        api
            .changeLikeCardStatus(card.cardId, !isLiked)
            .then((item) => {
                const newCard = {
                    cardOwner: item.owner,
                    cardId: item._id,
                    link: item.link,
                    name: item.name,
                    likes: item.likes
                }
                // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
                const newCards = cards.map((c) => c.cardId === card.cardId ? newCard : c);
                // Обновляем стейт
                setCards(newCards);
            })
            .catch((res) => {
                console.log(`Ошибка: ${res.status} - ${res.statusText}`);
            })
    }
    function handleCardDelete(card) {
        api.setCardDelete(card.cardId)
            .then(() => {
                const newCards = cards.filter(c => c.cardId !== card.cardId);
                setCards(newCards);
            })
            .catch((res) => {
                console.log(`Ошибка: ${res.status} - ${res.statusText}`);
            })
    }

    //добавляем, отрисовываем карточку
    function handleAddCard(inputDataPlace) {
        api
            .createCard(inputDataPlace)
            .then((item) => {
                const newCard = {
                    cardId: item._id,
                    cardOwner: item.owner,
                    likes: item.likes,
                    link: item.link,
                    name: item.name,
                }
                setCards([newCard, ...cards])
            })
            .catch((res) => {
                console.log(`Ошибка: ${res.status} - ${res.statusText}`);
            })
    }
    // запрос на отрисовку карточек
    useEffect(() => {
        api
            .getCardList()
            .then((data) => {
                const card = data.map((item) => {
                    return {
                        cardOwner: item.owner,
                        cardId: item._id,
                        link: item.link,
                        name: item.name,
                        likes: item.likes
                    }
                })
                setCards(card)
            })
            .catch((res) => {
                console.log(`Ошибка: ${res.status} - ${res.statusText}`);
            })
    }, [])

    useEffect(() => {
        api
            .getProfileInfo()
            .then((profileInfo) => {
                //обновляем state контекста при первой загрузе данных с сервера
                setCurrentUser(profileInfo)
            })
            .catch((res) => {
                console.log(`Ошибка: ${res.status} - ${res.statusText}`);
            })
    }, [])

    // проверяем наличие правильного токена при рендере страницы
    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            handleTokenCheck(jwt)
        }
    }, [])

    // проверяем залогинены мы или нет, чтобы перенаправить на главную страницу
    useEffect(() => {
        if (loggedIn) {
            history.push('/')
        }
    }, [loggedIn])

    return (
        <div className="body">
            <CurrentUserContext.Provider value={currentUser}>
                <Header onSignOut={hendleSignOut} userEmail={userEmail} />
                <Switch>
                    <Route path='/signin'>
                        <Login onLogin={handleLogin} />
                    </Route>

                    <Route path='/signup'>
                        <Register onRegister={handleRegister} />
                    </Route>

                    <ProtectedRoute
                        exact
                        path='/'
                        loggedIn={loggedIn}
                        component={Main}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditProfile={handleEditProfileClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                    />
                </Switch>
                <Footer />

                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    status={isInfoTooltipStatus} />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser} />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar} />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddCard} />

                <ImagePopup name={'type_image'} card={selectedCard} onClose={closeAllPopups} />

            </CurrentUserContext.Provider>
        </div>
    );
}

export default withRouter(App);
