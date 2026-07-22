import { Link } from 'react-router-dom';
import logoClubGamer from '../../assets/images/logohorizontal.png';
import './Footer.css';
import {FaGithub} from "react-icons/fa";
import {FaFacebook} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
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
                        <a href="https://www.facebook.com/index.php/?lang=es-ES" target="_blank">
                            <FaFacebook />
                        </a>
                    </li>
                    <li class="inline">
                        <a href="https://www.instagram.com" target="_blank">
                            <FaInstagram />
                        </a>
                    </li>
                    <li class="github">
                        <a href="https://github.com/fedeheinrich/clubgamer" target="_blank">
                            <FaGithub />
                        </a>
                    </li>
                </ul>
            </div>
            {/* Contacto */}
            <div className= "contacto">
                <h3 id="titulo">Contacto</h3>
                <p>info@clubgamer.com</p>
                <p>+54 11 1234-5678</p>
            </div>
            {/* Enlaces rápidos*/}
            <div class="enlacesRápidos">
                <ul>
                    <li>Colecciones</li>
                    <li>
                        <Link to="/login" target="_blank">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/Juegos" target="_blank">
                            Juegos
                        </Link>
                    </li>
                    <li>
                        <Link to="/Registro" target="_blank">
                            Registro
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;