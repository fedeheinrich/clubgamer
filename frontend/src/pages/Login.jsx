import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function enviar(event) {
        event.preventDefault();
        const success = await enviarCredenciales(email, password);
        if (success) {
            navigate('/');
        }
    }

    return (
        <div>
            <h1>Iniciar sesión</h1>

            <form onSubmit={enviar}>
                <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Ingresar</button>
            </form>
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
