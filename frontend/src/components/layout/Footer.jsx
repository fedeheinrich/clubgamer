import { Link } from 'react-router-dom';
import logoClubGamer from '../../assets/images/logohorizontal.png';

function Footer({logoSrc = logoClubGamer, logoAlt = 'Logo'}){
    return(
        <footer className="footer">
            <div className="footer__logo">
                <Link to="/" className="footer__logo-link">
                    <img src={logoSrc} alt={logoAlt} className="footer__logo-image" />
                </Link>
            </div>
        </footer>
    );
}

export default Footer;