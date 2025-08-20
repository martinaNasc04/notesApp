import '../styles/Note.css'

function Note({ note, onDelete, editPage }) {
    
    const formattedDate = new Date(note.created_at).toLocaleDateString('pt-BR')

    return <div className="note-container">
        <div className='content'>

            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
        </div>
        <div className='buttons'>
            <button className="edit-button" onClick={() => editPage(note)}>Editar</button>
            <button className="delete-button" onClick={() => onDelete(note.id)}>Deletar</button>

        </div>
    </div>


}

export default Note