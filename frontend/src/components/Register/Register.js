import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Register = ({ onRegister}) => {

  const [data, setData] = useState({
    password: '',
    email: '',
    name: '',
    about: '',
    avatar: ''
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
    onRegister(data)
  }

  return (
      <div className="login">
        <p className="login__welcome">
          Регистрация
        </p>
        <form onSubmit={handleSubmit} className="login__form">

          <input className="login__form-input" required id="email" name="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} />

          <input className="login__form-input" required id="password" name="password" type="password" placeholder="Пароль" value={data.password} onChange={handleChange} />
          
          <input className="login__form-input" id="name" name="name" type="text" placeholder="Ваше имя" value={data.name} onChange={handleChange} />
          <input className="login__form-input" id="about" name="about" type="text" placeholder="Расскажи о себе" value={data.about} onChange={handleChange} />
          <input className="login__form-input" id="avatar" name="avatar" type="url" placeholder="Ссылка на Аватар" value={data.avatar} onChange={handleChange} />
          <div className="login__button-container">
            <button type="submit" onSubmit={handleSubmit} className="login__button">Зарегистрироваться</button>
          </div>
        </form>
        <div className="login__signin-container">
          <p className="login__question-signup">Уже зарегистрированы?</p>
          <Link className="login__login-link" to="/signin">Войти</Link>
        </div>
      </div>
  )
}

export default withRouter(Register)


