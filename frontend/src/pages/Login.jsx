import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logohorizontal from '../assets/images/logohorizontal.png';
import fondo from '../assets/images/fondo 3.jpg';
import imagen_login from '../assets/images/Inicio_de_sesion_imagen.png';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const inputClass = "w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500";

    async function enviar(event) {
        event.preventDefault();
        const success = await enviarCredenciales(email, password);
        if (success) {
            navigate('/');
        }
    }

    return (
        <div className="w-full min-h-screen bg-[#090915] flex justify-center items-center"
        style={{
            backgroundImage: `url(${fondo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
            <div className="w-1/2 flex justify-center items-center">
                <form onSubmit={enviar} className="flex flex-col gap-6 w-full max-w-md">
                    <img src={logohorizontal} alt="logo-horizontal" className="w-3/4"/>
                    <h1 className="text-6xl font-bold text-white">
                        INICIO DE
                        <br />
                        <span className="bg-gradient-to-r from-purple-600 to-cyan-400 bg-clip-text text-transparent">
                            SESIÓN
                        </span>
                    </h1>
                    <p className="text-gray-500">¡Bienvenido de nuevo!<br />Ingresa a tu cuenta para continuar</p>

                    <div className="flex flex-col">
                        <label className="text-white font-bold">Email</label>
                        <input type="email" placeholder="ej: tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white font-bold">Contraseña</label>
                        <input type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)}
                        className={inputClass}/>
                    </div>
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-lg text-white font-bold 
                    focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer" type="submit">Ingresar</button>
                    <div className="flex flex-row">
                    <p className="text-gray-500">¿No tienes una cuenta? <Link to="../Registro" className="text-blue-500 font-bold">Regístrate</Link></p>
                    </div>
                </form>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <img src={imagen_login} alt="imagen_login"/>
            </div>
        </div>
    )
}

async function enviarCredenciales(email, password) {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email,

                password

            })

        });

        const datos = await respuesta.json();
        
        if (respuesta.ok) {
            localStorage.setItem("token", datos.token)
            return true;
        }
        else {
            alert('Login inválido')
            return false;
        }
    }
    catch(error) {
        alert(error);
        return false;
    }
}

export default Login;