import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function enviar(event) {
        event.preventDefault();
        const success = await enviarDatos(username, email, password);
        if (success) {
            navigate('/');
        }
    }

    return (
        <div>
            <h1>Registrar una cuenta</h1>

            <form onSubmit={enviar}>
                <input placeholder="Nombre" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Registrar</button>
            </form>
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