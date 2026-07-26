import { Link, useNavigate } from 'react-router-dom';
import { Search, CircleUserRound, LogOut } from 'lucide-react';
import logoClubGamer from '../../assets/images/logohorizontal.png';
import './Header.css';
import useAuth from '../../hooks/useAuth.jsx';
import toast from 'react-hot-toast';

function Header({
    logoSrc = logoClubGamer,
    logoAlt = 'Logo',
    textoBienvenida = 'Bienvenido de vuelta a la plataforma',
    Avatar = CircleUserRound,
    placeholderBuscador = 'Buscar juegos...',
    username = 'Usuario'
}) {
    const auth = useAuth() || {};
    const user = auth.user;
    const nombreUsuario = user?.nombre || username;
    const { logout } = useAuth();
    const navigate = useNavigate();

    const cerrarSesion = () => {
        logout();
        toast.success("Sesión cerrada correctamente");
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/" className="header__logo-link">
                    <img src={logoSrc} alt={logoAlt} className="header__logo-image" />
                </Link>
            </div>

            <div className="header__search">
                <Search className="header__search-icon" size={18} />
                <input
                    className="header__search-input"
                    type="search"
                    placeholder={placeholderBuscador}
                    aria-label={placeholderBuscador}
                />
            </div>

            <div className="header__user">
                <div className="header__user-text">
                    <p className="header__user-name">Hola, {nombreUsuario}</p>
                    <p className="header__user-message">{textoBienvenida}</p>
                </div>
                <Avatar className="w-12 h-12" size={36} strokeWidth={1.25} />
                <button 
                    onClick={cerrarSesion} 
                    title="Cerrar sesión" 
                    className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-[#3D63FF]/20 hover:shadow-[0_0_12px_rgba(61,99,255,0.4)] rounded-xl transition-all border border-transparent hover:border-[#3D63FF]/30"
                >
                    <LogOut size={24} />
                </button>
            </div>

        </header>
    );
}

export default Header;
