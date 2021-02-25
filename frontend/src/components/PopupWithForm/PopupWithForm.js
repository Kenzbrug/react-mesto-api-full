function PopupWithForm({ title, name, isOpen, onClose, children, onSubmit }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_open" : ""}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="reset" aria-label="кнопка закрыть" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form action="#" className="popup__form" noValidate name={name} onSubmit={onSubmit}>
                    {children}
                    <button className="popup__save popup__save-buttonOff" type="submit" aria-label="кнопка сохранить" onClick={onClose}>Сохранить</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm