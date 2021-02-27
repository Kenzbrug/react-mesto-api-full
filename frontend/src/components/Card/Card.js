import { useContext } from "react";
import CurrentUserContext from '../../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext)
    //проверка создателя карточки
    const isOwn = card.cardOwner === currentUser._id;
    //проверяем лакнули ли мы карточку
    const isLiked = card.likes.some((user) => user === currentUser._id);
    //в зависимости владельца карточки добавляем/убираем отображение иконки "удалить"
    const cardDeleteButtonClassName = (
        `card__button-delete ${isOwn ? 'card__button-delete_hidden' : 'card__button-delete_invisible'}`
    );
    //изменяем цвет лайка, если мы его лайкнули
    const cardLikeButtonClassName = (`card__button-like ${isLiked ? 'card__button-like_active' : ''}`)

    function handleClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="card">
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} ></button>
            <img className="card__img" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="card__footer">
                <h2 className="card__footer-title">{card.name}</h2>
                <div className="card__conteiner-like">
                    <button className={cardLikeButtonClassName} type="button" aria-label="кнопка-сердечко, нравится" onClick={handleLikeClick}></button>
                    <div className="card__quantity-like">{card.likes.length}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;