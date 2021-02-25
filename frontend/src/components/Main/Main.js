import { useContext } from "react";
import Card from '../Card/Card.js'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
    const userContext = useContext(CurrentUserContext)
    return (
        <main className="">
            <section className="profile">
                <div className="profile__ava-block">
                    <button type="button" className="profile__button-avatar-edit" onClick={onEditAvatar}></button>
                    <>
                        <img className="profile__avatar-img" src={userContext.avatar} alt={userContext.name} />
                    </>
                </div>
                <div className="profile__info">
                    <div>
                        <div className="profile__common">
                            <h1 className="profile__name">{userContext.name}</h1>
                            <button className="profile__button-change" type="button" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__occupation">{userContext.about}</p>
                    </div>
                    <button className="prifile__button-add" type="button" onClick={onAddPlace}></button>
                </div>
            </section>
            <section className="cards">
                <ul className="cards__lists">
                    {/* отрисовываем карточки полученные с сервера */}
                    {cards.map((card) => {
                        return (<Card key={card.cardId} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)
                    })}
                </ul>
            </section>
        </main>
    )
}

export default Main