# 📝 Gestor de Notas con Docker Compose

Proyecto de ejemplo para aprender Docker Compose con un stack completo:
- **Backend:** Node.js + Express + PostgreSQL
- **Frontend:** React
- **Base de datos:** PostgreSQL

## 🚀 Cómo usar este proyecto

### Prerequisitos
- Docker instalado
- Docker Compose instalado

### Comandos principales

#### 1. Levantar todos los servicios
```bash
docker compose up
```

O en segundo plano:
```bash
docker compose up -d
```

#### 2. Ver los logs
```bash
# Todos los servicios
docker compose logs

# Solo un servicio específico
docker compose logs backend
docker compose logs frontend
docker compose logs postgres

# Seguir los logs en tiempo real
docker compose logs -f
```

#### 3. Ver servicios corriendo
```bash
docker compose ps
```

#### 4. Detener los servicios
```bash
docker compose down
```

#### 5. Detener y eliminar volúmenes (borra los datos)
```bash
docker compose down -v
```

#### 6. Reconstruir las imágenes
Si cambias código en los Dockerfiles:
```bash
docker compose up --build
```

#### 7. Ejecutar comandos dentro de un contenedor
```bash
# Acceder al contenedor del backend
docker compose exec backend sh

# Acceder a PostgreSQL
docker compose exec postgres psql -U admin -d notesdb
```

## 📂 Estructura del proyecto

```
notes-app/
├── docker-compose.yml        # Archivo principal de Docker Compose
├── backend/
│   ├── Dockerfile            # Imagen del backend
│   ├── package.json          # Dependencias Node.js
│   └── src/
│       └── index.js          # API REST
├── frontend/
│   ├── Dockerfile            # Imagen del frontend
│   ├── package.json          # Dependencias React
│   └── src/
│       ├── index.js          # Punto de entrada React
│       ├── App.js            # Componente principal
│       └── App.css           # Estilos
└── postgres/
    └── init.sql              # Script de inicialización de BD
```

## 🌐 Acceder a la aplicación

Una vez levantados los servicios:

- **Frontend (React):** http://localhost:3001
- **Backend (API):** http://localhost:3000
- **Base de datos:** localhost:5432

### Endpoints de la API

- `GET /` - Información de la API
- `GET /notes` - Obtener todas las notas
- `GET /notes/:id` - Obtener una nota por ID
- `POST /notes` - Crear nueva nota
- `PUT /notes/:id` - Actualizar nota
- `DELETE /notes/:id` - Eliminar nota

## 🔧 Troubleshooting

### Los contenedores no inician
```bash
# Ver logs de errores
docker compose logs

# Verificar que los puertos no estén ocupados
netstat -an | grep 3000
netstat -an | grep 3001
netstat -an | grep 5432
```

### El backend no se conecta a la base de datos
```bash
# Verificar que postgres esté corriendo
docker compose ps

# Ver logs de postgres
docker compose logs postgres

# Reiniciar servicios
docker compose restart
```

### Cambios en el código no se reflejan
```bash
# Reconstruir las imágenes
docker compose up --build
```

### Limpiar todo y empezar de nuevo
```bash
# Detener y eliminar todo
docker compose down -v

# Eliminar imágenes
docker compose down --rmi all

# Levantar de nuevo
docker compose up --build
```

## 📚 Conceptos clave de Docker Compose

- **services:** Define cada contenedor
- **image vs build:** Usa imagen existente o construye tu propia
- **ports:** Expone puertos (host:contenedor)
- **environment:** Variables de entorno
- **depends_on:** Orden de inicio de servicios
- **volumes:** Persistencia de datos
- **networks:** Comunicación entre contenedores

## ✨ Características del proyecto

✅ CRUD completo de notas  
✅ Persistencia de datos con volúmenes  
✅ Hot reload en desarrollo (cambios en código se reflejan automáticamente)  
✅ Comunicación entre contenedores por nombre  
✅ Healthcheck en PostgreSQL  
✅ Script de inicialización de base de datos  
✅ Interfaz responsive

## 🎓 Aprendizaje

Este proyecto te enseña:
- Cómo estructurar un proyecto con Docker Compose
- Comunicación entre contenedores
- Persistencia de datos
- Variables de entorno
- Dependencias entre servicios
- Desarrollo con hot reload en contenedores

¡Disfruta aprendiendo Docker Compose! 🐳
