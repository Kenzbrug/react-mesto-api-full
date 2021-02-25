import { useRef } from "react";
import PopupWithForm from '../PopupWithForm/PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef('');
    //собираем данные из инпута и далее передадим их в api
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
        avatarRef.current.value = '';
    }

    return (
        <PopupWithForm
            name={'change-avatar'}
            title={'Обновить аватар'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__form-input popup__form-input-type-avatar-url" placeholder="Ссылка на аватар"
                type="url" name="avatar" id="avatarUrl" ref={avatarRef} required autoComplete="off" />
            <span className="popup__form-error" id="avatarUrl-error" style={{ display: 'none' }}>Заполните это поле.</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup