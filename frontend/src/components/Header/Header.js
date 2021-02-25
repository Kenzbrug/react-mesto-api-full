import headerLogo from '../../images/headerLogo.svg';
import { Route, Link } from 'react-router-dom'

function Header({ onSignOut, userEmail }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место" />
      <Route exact path='/'>
        <div className='header__container'>
          <p className='header__container-text'>{userEmail.email}</p>
          <button className='header__signout-button' onClick={onSignOut}>
            Выйти
        </button>
        </div>
      </Route>
      <Route path='/signin'>
        <Link className='header__link' to='/signup'>
          Регистрация
        </Link>
      </Route>
      <Route path='/signup'>
        <Link className='header__link' to='/signin'>
          Войти
        </Link>
      </Route>

    </header>
  )
}

export default Header