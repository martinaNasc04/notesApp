import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../api'
import Note from '../components/Note'
import '../styles/Home.css'
import Edit from './Edit';

function Home() {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getNotes()
    }, [])

    // Buscando as notas
    const getNotes = () => {
        api.get('/api/notes/')
            .then((res) => res.data)
            .then((data) => setNotes(data))
            .catch((err) => alert(err))
    }

    // Deletando uma nota
    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert('Nota deletada com sucesso!')
                else alert('Erro ao deletar a nota!')
                getNotes()

            }).catch((error) => alert(error))
    }



    // Criando uma nova nota
    const createNote = (e) => {
        e.preventDefault()
        api.post('/api/notes/', { title, content })
            .then((res) => {
                if (res.status === 201) {
                    alert('Nota criada com sucesso!')
                    setTitle('')
                    setContent('')
                }
                else alert('Erro ao criar a nota!')
                getNotes()
            }).catch((error) => alert(error))
    }

    // Função para abrir o modal de edição
    const editPage = (note) => {
        // Navega para a rota de edição com os dados da nota
        navigate(`/edit/${note.id}`, { state: { note } });
    }

    //logout
    const logout = () => {
        localStorage.clear()
        navigate('/login')

    }
    return <div>

        <div className="home-container">
            <header className="home-header">
                <h1>Note App</h1>
                <button className='logout' onClick={logout}>Sair</button>
            </header>
            <section className="notes-section">
                <h1>Suas Notas</h1>

                <div className='notes'>
                    {notes.length === 0 ? <p> Não há notas...&#128533;</p> :
                        notes.map((note) => <Note note={note} onDelete={deleteNote} editPage={editPage} key={note.id} />)}
                </div>

            </section>

            <section className="form-section">
                <form onSubmit={createNote}>
                    <h2>Criar nota</h2>
                    <label htmlFor="title">Título:</label>
                    <br />
                    <input type="text"
                        id='title'
                        name='title'
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                    />
                    <br />
                    <label htmlFor="content">Nota:</label>
                    <textarea
                        id='content'
                        name='content'
                        required
                        value={content}

                        onChange={(e) => setContent(e.target.value)}
                    />
                    <br />
                    <input type='submit' value='Criar' ></input>
                </form>
            </section>

        </div>



    </div>
}

export default Home