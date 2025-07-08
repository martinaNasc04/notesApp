import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useState, useEffect } from 'react';

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        // Verifica se o usuário está autorizado ao carregar o componente
        auth().catch(() => setIsAuthorized(false));
    }, [])

    // Função para atualizar o token de acesso usando o refresh token
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post('/api/token/refresh/', { refresh: refreshToken });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            }
            else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false);
        }
    }

    // Função para verificar se o usuário está autorizado
    const auth = async () => {
        // Verifica se o token expirou
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000
        if (tokenExpiration < now) {
            // Token expirou, tenta atualizar
            await refreshToken();

        }
        else {
            // Token ainda é válido
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return <div>Carregando...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute;