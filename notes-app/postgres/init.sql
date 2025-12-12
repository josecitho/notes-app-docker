-- Script de inicialización de la base de datos
-- Se ejecuta automáticamente cuando PostgreSQL inicia por primera vez

CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar algunas notas de ejemplo
INSERT INTO notes (title, content) VALUES 
    ('Mi primera nota', 'Esta es una nota de ejemplo creada automáticamente'),
    ('Lista de compras', 'Leche, pan, huevos, café'),
    ('Ideas de proyecto', 'Aprender Docker Compose, crear API REST, practicar React');

-- Mostrar mensaje de confirmación
SELECT 'Base de datos inicializada correctamente!' as message;
