import { useState, useContext, useEffect } from "react";
import PopupWithForm from '../PopupWithForm/PopupWithForm'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    //забираем значения инпутов 
    function handleNameChange(e) {
        setName(e.target.value)
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    //собираем данные из инпута и далее передадим их в api
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description
        });
        
    }
    //заполняем попап профиля данными с сервера 
    useEffect(() => {
        
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser])

    return (
        <PopupWithForm
            name={'edit-profile'}
            title={'Редактировать профиль'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__form-input popup__form-input_type_name" placeholder="Имя" type="text" value={name || ''} onChange={handleNameChange}
                required minLength="2" maxLength="40"
                autoComplete="off" />
            <span className="popup__form-error" id="name-error" style={{ display: 'none' }}>Вы пропустили это поле.</span>
            <input className="popup__form-input popup__form-input_type_occupation" placeholder="О себе" type="text" value={description || ''} onChange={handleDescriptionChange}
                required minLength="2"
                maxLength="200" autoComplete="off" />
            <span className="popup__form-error" id="occupation-error" style={{ display: 'none' }}>Вы пропустили это
                        поле.
            </span>
        </PopupWithForm>
    )

}

export default EditProfilePopup