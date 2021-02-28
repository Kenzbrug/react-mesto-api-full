import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [data, setData] = useState({
        password: '',
        email: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(data)
    }

    return (
            <div className="login">
                <p className="login__welcome">
                    Вход
                </p>
                <form onSubmit={handleSubmit} className="login__form">

                    <input className="login__form-input" required id="email" name="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} />

                    <input className="login__form-input" required id="password" name="password" type="password" placeholder="Пароль" value={data.password} onChange={handleChange} />
                    <div className="login__button-container">
                        <button type="submit" onSubmit={handleSubmit} className="login__button">Войти</button>
                    </div>
                </form>
            </div>
    )
}

export default withRouter(Login)