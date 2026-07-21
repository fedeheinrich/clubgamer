import { Link } from 'react-router-dom';
import logoClubGamer from '../../assets/images/logohorizontal.png';
import './Footer.css';


//logo - iconos redes - about - privacy(?)
function Footer({logoSrc = logoClubGamer, logoAlt = 'Logo'}){
    return(
        <footer className="Footer">
            <div className="footer__logo  ">                
                <Link to="/" className="footer__logo-link  ">
                    <img src={logoSrc} alt={logoAlt} className="footer__logo-image " />
                </Link>
                {/*Agrego los links a la redes */}
                <ul>
                    <li class="inline">
                        Link a Facebook
                    </li>
                    <li class="inline">
                        Link a instagram
                    </li>
                    <li class="inline">
                        Link a github??
                    </li>
                </ul>
            </div>
            {/* Contacto */}
            <div className= "contacto">
                <h3>Contacto</h3>
                <p>info@clubgamer.com</p>
                <p>+54 11 1234-5678</p>
            </div>
            {/* Enlaces rápidos*/}
            <div class="enlacesRápidos">
                <ul>
                    <li>Catalogo</li>
                    <li>Colecciones</li>
                    <li>Login</li>
                    <li>Registro</li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;