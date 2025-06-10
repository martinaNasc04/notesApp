import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/Form.css'

// Esse componente é responsável por renderizar um formulário de login ou registro
// dependendo do método passado como prop. Ele também lida com o envio do formulário,
function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Cadastrar";
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        // Tentar logar ou cadastrar o usuário
        try {
            const res = await api.post(route, { username, password })
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
            } else {
                navigate('/login')
            }
        }
        catch (error) {
            alert(error)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit}>
        <h1>{name}</h1>

        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />

        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />

        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form;