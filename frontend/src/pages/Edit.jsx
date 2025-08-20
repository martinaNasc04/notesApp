import { useState } from "react"
import api from "../api"
import { useLocation, useNavigate } from "react-router-dom"

function Edit() {
    // Recuperando os dados da nota
    const location = useLocation()
    const note = location.state?.note

    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)
    const navigate = useNavigate()

    // Função para editar nota
    const editNote = (e) => {
        e.preventDefault()
        api.put(`/api/notes/edit/${note.id}/`, { title, content })
            .then((res) => {
                if (res.status === 200) {
                    alert('Nota editada com sucesso!')
                    navigate('/')
                }
                else alert('Erro ao editar a nota!')
            }).catch((error) => alert(error))
    }
    return <div>
        <h1 style={{ textAlign: 'center', marginTop:'10px'} } >Editar Nota</h1>
        <section className="form-section">
            <form onSubmit={editNote}>
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
                <input type='submit' value='Editar' ></input>
            </form>
        </section>

    </div>
}

export default Edit