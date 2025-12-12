import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Formulario
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Cargar notas al iniciar
  useEffect(() => {
    fetchNotes();
  }, []);

  // Obtener todas las notas
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/notes`);
      if (!response.ok) throw new Error('Error al cargar notas');
      const data = await response.json();
      setNotes(data);
      setError(null);
    } catch (err) {
      setError('No se pudo conectar con el servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Crear o actualizar nota
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/notes/${editingId}` : `${API_URL}/notes`;
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error('Error al guardar nota');

      // Limpiar formulario y recargar
      setTitle('');
      setContent('');
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      alert('Error al guardar la nota');
      console.error(err);
    }
  };

  // Editar nota
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content || '');
    setEditingId(note.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Eliminar nota
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta nota?')) return;

    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar nota');
      fetchNotes();
    } catch (err) {
      alert('Error al eliminar la nota');
      console.error(err);
    }
  };

  // Cancelar edición
  const handleCancel = () => {
    setTitle('');
    setContent('');
    setEditingId(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 Gestor de Notas</h1>
        <p className="subtitle">Proyecto con Docker Compose</p>
      </header>

      <main className="container">
        {/* Formulario */}
        <div className="form-container">
          <h2>{editingId ? '✏️ Editar Nota' : '➕ Nueva Nota'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Título de la nota"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-title"
            />
            <textarea
              placeholder="Contenido de la nota"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input-content"
              rows="4"
            />
            <div className="button-group">
              <button type="submit" className="btn btn-primary">
                {editingId ? '💾 Actualizar' : '➕ Crear'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  ❌ Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de notas */}
        <div className="notes-container">
          <h2>📋 Mis Notas</h2>
          
          {loading && <p className="message">Cargando notas...</p>}
          
          {error && <p className="message error">{error}</p>}
          
          {!loading && !error && notes.length === 0 && (
            <p className="message">No hay notas. ¡Crea tu primera nota!</p>
          )}
          
          {!loading && !error && notes.length > 0 && (
            <div className="notes-grid">
              {notes.map((note) => (
                <div key={note.id} className="note-card">
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <div className="note-footer">
                    <small>
                      {new Date(note.created_at).toLocaleDateString('es-ES')}
                    </small>
                    <div className="note-actions">
                      <button onClick={() => handleEdit(note)} className="btn-icon edit">
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(note.id)} className="btn-icon delete">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
