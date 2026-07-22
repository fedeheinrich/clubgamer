import { createContext } from "react";
import { useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    async function login(email, password) {
        try{
            const respuesta = await axios.post(
                import.meta.env.VITE_API_URL + "/auth/login",
                {
                    email,
                    password
                }
            );
            if (respuesta.status === 200) {
                setToken(respuesta.data.token);
                setUser(respuesta.data.user);
                localStorage.setItem("token", respuesta.data.token);
                return true;
            }
            else {
                return false;
            }
            
        } catch(error) {
            console.error('Error en la carga de datos:', error);
            return error;
        }
    }

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    }

    async function register(nombre, email, password) {
        try{
            const respuesta = await axios.post(
                import.meta.env.VITE_API_URL + "/auth/register",
                {
                    nombre,
                    email,
                    password
                }
            );
            if (respuesta.status === 200) {
                setToken(respuesta.data.token);
                setUser(respuesta.data.user);
                localStorage.setItem("token", respuesta.data.token);
                return true;
            }
            else {
                return false;
            }
            
        } catch(error) {
            console.error('Error en la carga de datos:', error);
            return error;
        }
    }

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value = {{
                token,
                user,
                login,
                logout,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
