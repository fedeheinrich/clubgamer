import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function enviar(event) {
        event.preventDefault();
        await enviarCredenciales(email, password);
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
        const respuesta = await fetch(process.env.REACT_APP_API_URL/*import.meta.env.VITE_API_URL*/, {

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
        }
        else {
            alert('Login inválido')
        }
    }
    catch(error) {
        alert(error);
    }
}

export default Login;
