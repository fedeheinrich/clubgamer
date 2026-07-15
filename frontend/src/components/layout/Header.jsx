import { Link } from 'react-router-dom';
import logoClubGamer from '../../assets/images/logohorizontal.png';

function Header({
    logoSrc = logoClubGamer,
    logoAlt = 'Logo',
    username = 'Usuario',
    textoBienvenida = 'Bienvenido de vuelta a la plataforma',
    avatarSrc = 'https://i.pravatar.cc/150?img=3',
    placeholderBuscador = 'Buscar juegos, colecciones y más...'
}) {
    return (
        <header>
            <div className="...">
                <Link to="/" className="...">
                    <img src={logoSrc} alt={logoAlt} className="..." />
                </Link>
            </div>

            <div className="...">
                <input placeholder={placeholderBuscador} />
            </div>

            <div className="...">
                <p>Hola, {username}</p>
                <p>{textoBienvenida}</p>
                <img src={avatarSrc} alt="Avatar" className="..." />
            </div>

        </header>
    );
}

export default Header;