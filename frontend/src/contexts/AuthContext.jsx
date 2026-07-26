import { createContext } from "react";
import { useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    async function login(email, password) {
        try{
            const respuesta = await axios.post(
                import.meta.env.VITE_API_URL + "/auth/login",
                {
                    email,
                    password
                }
            );
            if (respuesta.data && respuesta.data.token) {
                setToken(respuesta.data.token);
                setUser(respuesta.data.user);
                localStorage.setItem("token", respuesta.data.token);
                localStorage.setItem("user", JSON.stringify(respuesta.data.user));
                return true;
            }
            else {
                throw new Error("Respuesta inválida del servidor");
            }
            
        } catch(error) {
            console.error('Error en login:', error);
            const errorMsg = error.response?.data?.error || "Error de conexión al iniciar sesión";
            throw new Error(errorMsg);
        }
    }

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
            if (respuesta.data && respuesta.data.token) {
                setToken(respuesta.data.token);
                setUser(respuesta.data.user);
                localStorage.setItem("token", respuesta.data.token);
                localStorage.setItem("user", JSON.stringify(respuesta.data.user));
                return true;
            }
            else {
                throw new Error("Respuesta inválida del servidor");
            }
            
        } catch(error) {
            console.error('Error en registro:', error);
            const errorMsg = error.response?.data?.error || "Error de conexión al registrar";
            throw new Error(errorMsg);
        }
    }

    const isAuthenticated = !!token && !!user;

    return (
        <AuthContext.Provider
            value = {{
                token,
                user,
                login,
                register,
                logout,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
