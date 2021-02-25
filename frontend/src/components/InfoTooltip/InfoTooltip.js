import infoTooltip_success from '../../images/infoTooltip_success.svg';
import infoTooltip_fail from '../../images/infoTooltip_fail.svg';




function InfoTooltip({ isOpen, onClose, status}) {
    return (
        <div className={`popup ${isOpen ? "popup_open" : ""}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="reset" aria-label="кнопка закрыть" onClick={onClose}></button>
                <img className="popup__confirm-img" src={status ? infoTooltip_success : infoTooltip_fail} alt={`${status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`} />
                <h2 className="popup__title">{`${status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip