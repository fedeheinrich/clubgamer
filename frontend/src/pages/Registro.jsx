import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logohorizontal from '../assets/images/logohorizontal.png';
import fondo from '../assets/images/fondo 3.jpg';
import coleccion from '../assets/images/coleccion1.png';
import estrella from '../assets/images/estrella1.png';
import lupa from '../assets/images/lupa.png';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const inputClass = "w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500";

    async function enviar(event) {
        event.preventDefault();
        const success = await enviarDatos(username, email, password);
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
          <div className="w-1/2 flex flex-col justify-center items-center gap-6">
            <img src={logohorizontal} alt="logo-horizontal" className="w-2/5"/>
            <h1 className="text-6xl font-bold text-white">
              UNITE A
              <br/>
              <span className="bg-gradient-to-r from-purple-600 to-cyan-400 bg-clip-text text-transparent">
                CLUB GAMER
              </span>
            </h1>
            <p className="text-gray-500 font-bold">CREA UNA CUENTA Y COMIENZA TU COLECCIÓN</p>

            <div className="flex flex-col gap-6 justify-center items-center">
              <div className="flex flex-row w-full gap-2">
                <img src={coleccion} alt="coleccion" className="border border-blue-500 rounded-lg p-3"/>
                <p className="text-white"><span className="font-bold">Guarda tus juegos</span><br/>Organiza tu colección</p>
              </div>
              <div className="flex flex-row w-full gap-2">
                <img src={estrella} alt="estrella" className="border border-blue-500 rounded-lg p-3"/>
                <p className="text-white"><span className="font-bold">Puntuálos</span><br/>Califica y lleva el control</p>
              </div>
              <div className="flex flex-row w-full gap-2">
                <img src={lupa} alt="lupa" className="border border-blue-500 rounded-lg p-3"/>
                <p className="text-white"><span className="font-bold">Descubrí</span><br/>Conoce tus próximos juegos favoritos</p>
              </div>
            </div>
            
          </div>

          <div className="w-1/2 flex justify-center items-center">
            <form onSubmit={enviar} className="flex flex-col gap-10 w-full max-w-md border-2 border-purple-500 rounded-lg px-10 py-10 shadow-2x1">
              <div className="flex flex-col justify-center items-center w-full">
                <h3 className="text-4xl bg-gradient-to-r from-purple-600 to-cyan-400 bg-clip-text text-transparent">Registro</h3>
                <p className="text-gray-500 font-bold">Completa los datos para crear la cuenta</p>
              </div>

              <div className="flex flex-col">
                <label className="text-white font-bold">Nombre</label>
                <input placeholder="Tu nombre" value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass}/>
              </div>
              <div className="flex flex-col">
                <label className="text-white font-bold">Email</label>
                <input type="email" placeholder="ej: tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass}/>
              </div>
              <div className="flex flex-col">
                <label className="text-white font-bold">Contraseña</label>
                <input type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass}/>
              </div>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-lg text-white font-bold 
              focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer" type="submit">Crear cuenta</button>
              <p className="text-gray-500">¿Ya tienes una cuenta? <Link to='../Login' className="text-blue-500 font-bold">Iniciar sesión</Link></p>
            </form>
          </div>
        </div>
    )
}

async function enviarDatos(nombre, email, password) {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL + "/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                nombre,
                
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
            alert('Registro inválido')
            console.log(datos);
            return false;
        }
    }
    catch(error) {
        alert(error);
        return false;
    }
}

export default Register;