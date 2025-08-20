import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/Form.css'
import LoadingIndicator from "./LoadingIndicator";

// Esse componente é responsável por renderizar um formulário de login ou registro
// dependendo do método passado como prop
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

    const registerPage = () => {
        navigate('/register')
    }

    const loginPage = () => {
        navigate('/login')
    }

    return <div className="container">
        
        <form className="form-container" onSubmit={handleSubmit}>
            <h1 className="form-title">Note App</h1>
            <h1>{name}</h1>

            <div className="input-group">

                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Usuário"
                />
            </div>

            <div className="input-group">

                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                />
            </div>

            {loading && <LoadingIndicator />}

            <button className="form-button" type="submit">
                {name}
            </button>

            {method === "login" && (
                <p className="switch-text">Não possui uma conta? Clique aqui para <a className='type-link' onClick={registerPage}>cadastrar</a></p>
            )}

            {method === "register" && (
                <p className="switch-text">Já possui uma conta? Clique aqui para <a className="type-link" onClick={loginPage}>entrar</a></p>
            )}

        </form>
    </div>

}

export default Form;