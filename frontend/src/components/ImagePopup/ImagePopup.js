function ImagePopup({ card, onClose, name }) {

    return (
        <div className={`popup popup_${name} ${card && "popup_open"}`}>
            <div className="popup__open-image">
                <button className="popup__close-button" type="button" aria-label="кнопка сохранить" onClick={onClose}></button>
                <form className="popup__form popup__container-image">
                    <img className="popup__image" src={card ? card.link : undefined} alt={card ? card.name : undefined} />
                    <figcaption className="popup__image-title">{card ? card.name : undefined}</figcaption>
                </form>
            </div>
        </div>
    )
}

export default ImagePopup