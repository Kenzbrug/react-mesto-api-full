import { useState } from "react";
import PopupWithForm from '../PopupWithForm/PopupWithForm'

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [namePlace, setNamePlace] = useState('')
    const [linkPlace, setLinkPlace] = useState('')

    //забираем значения инпутов
    function handleNamePlaceChange(e) {
        setNamePlace(e.target.value)
    }
    function handleLinkChange(e) {
        setLinkPlace(e.target.value)
    }

    //передаем значения 
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: namePlace,
            link: linkPlace,
        });
        setNamePlace('')
        setLinkPlace('')
    }
    return (
        <PopupWithForm
            name={'add-card'}
            title={'Новое место'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__form-input popup__form-input_type_place" placeholder="Название" type="text"
                name="name" id="titleCard" required minLength="1" maxLength="30" autoComplete="off" value={namePlace || ''} onChange={handleNamePlaceChange} />
            <span className="popup__form-error" id="titleCard-error" style={{ display: 'none' }}>Вы пропустили это поле.</span>
            <input className="popup__form-input popup__form-input_type_url" placeholder="Ссылка на картинку" type="url"
                name="link" id="cardUrl" required autoComplete="off" value={linkPlace || ''} onChange={handleLinkChange} />
            <span className="popup__form-error" id="cardUrl-error" style={{ display: 'none' }}>Введите адрес сайта.</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup