import { Link } from 'react-router-dom';
import logoClubGamer from '../../assets/images/logohorizontal.png';
import './Header.css';

function Header({
    logoSrc = logoClubGamer,
    logoAlt = 'Logo',
    username = 'Usuario',
    textoBienvenida = 'Bienvenido de vuelta a la plataforma',
    avatarSrc = 'https://i.pravatar.cc/150?img=3',
    placeholderBuscador = 'Buscar juegos, colecciones y más...'
}) {
    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/" className="header__logo-link">
                    <img src={logoSrc} alt={logoAlt} className="header__logo-image" />
                </Link>
            </div>

            <div className="header__search">
                <input
                    className="header__search-input"
                    type="search"
                    placeholder={placeholderBuscador}
                    aria-label={placeholderBuscador}
                />
            </div>

            <div className="header__user">
                <div className="header__user-text">
                    <p className="header__user-name">Hola, {username}</p>
                    <p className="header__user-message">{textoBienvenida}</p>
                </div>
                <img src={avatarSrc} alt="Avatar" className="header__avatar" />
            </div>

        </header>
    );
}

export default Header;