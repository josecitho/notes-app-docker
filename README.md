# 📝 Gestor de Notas con Docker Compose

Proyecto de ejemplo para aprender Docker Compose con un stack completo:
- **Backend:** Node.js + Express + PostgreSQL
- **Frontend:** React
- **Base de datos:** PostgreSQL
- **pgAdmin:** Interfaz web para gestionar la base de datos

## 🚀 Cómo usar este proyecto

### Prerequisitos
- Docker Desktop instalado
- Docker Compose instalado (viene con Docker Desktop)

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
docker compose logs pgadmin

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

# Acceder a PostgreSQL desde la terminal
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
- **pgAdmin Web:** http://localhost:5050
- **Base de datos PostgreSQL:** localhost:5433 (puerto externo)

### Endpoints de la API

- `GET /` - Información de la API
- `GET /notes` - Obtener todas las notas
- `GET /notes/:id` - Obtener una nota por ID
- `POST /notes` - Crear nueva nota
- `PUT /notes/:id` - Actualizar nota
- `DELETE /notes/:id` - Eliminar nota

### 🔐 Credenciales

**Para pgAdmin Web (http://localhost:5050):**
- Email: `admin@admin.com`
- Password: `admin123`

**Para conectar pgAdmin a PostgreSQL:**
- Host: `postgres` (nombre del servicio dentro de Docker)
- Port: `5432` (puerto interno)
- Database: `notesdb`
- Username: `admin`
- Password: `secret123`

**Para conectar desde tu PC a PostgreSQL:**
- Host: `localhost` o `127.0.0.1`
- Port: `5433` (puerto externo - evita conflictos con PostgreSQL local)
- Database: `notesdb`
- Username: `admin`
- Password: `secret123`

## 🔧 Troubleshooting

### Los contenedores no inician
```bash
# Ver logs de errores
docker compose logs

# Verificar que los puertos no estén ocupados
netstat -an | grep 3000
netstat -an | grep 3001
netstat -an | grep 5433
netstat -an | grep 5050
```

### Conflicto con PostgreSQL local
Si tienes PostgreSQL instalado localmente en el puerto 5432, el proyecto usa el puerto **5433** para evitar conflictos.

**Error típico:** "port 5432 is already in use"

**Solución:** El proyecto ya está configurado para usar el puerto 5433. Si quieres cambiar el puerto:
1. Edita `docker-compose.yml`
2. Cambia `"5433:5432"` por otro puerto, ejemplo: `"5434:5432"`
3. Reinicia: `docker compose down && docker compose up -d`

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

### Error de autenticación en pgAdmin
**Síntoma:** "authentication failed for user admin"

**Causa:** Posible conflicto con PostgreSQL local o credenciales incorrectas

**Solución:**
1. Verifica que estés usando el puerto correcto:
   - Desde pgAdmin instalado localmente: puerto `5433`
   - Desde pgAdmin Web en Docker: host `postgres`, puerto `5432`
2. Verifica las credenciales:
   - Usuario: `admin`
   - Password: `secret123`

### pgAdmin Web no carga
```bash
# Ver logs de pgAdmin
docker compose logs pgadmin

# Reiniciar solo pgAdmin
docker compose restart pgadmin

# Espera 30 segundos y vuelve a intentar acceder a http://localhost:5050
```

### Limpiar todo y empezar de nuevo
```bash
# Detener y eliminar todo (incluyendo volúmenes)
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
✅ **pgAdmin Web integrado** - gestión de BD desde el navegador  
✅ Puerto personalizado para evitar conflictos (5433)

## 🗄️ Usar pgAdmin Web

pgAdmin Web está incluido en el proyecto para gestionar PostgreSQL desde el navegador.

### Acceso inicial

1. Abre http://localhost:5050
2. Inicia sesión con:
   - Email: `admin@admin.com`
   - Password: `admin123`

### Conectar a la base de datos

**Primera vez:**
1. Click derecho en "Servers" → "Register" → "Server..."
2. **Pestaña General:**
   - Name: `Notes Database`
3. **Pestaña Connection:**
   - Host: `postgres` (⚠️ NO uses "localhost")
   - Port: `5432`
   - Maintenance database: `notesdb`
   - Username: `admin`
   - Password: `secret123`
   - ✅ Marca "Save password"
4. Click "Save"

### Explorar datos

1. Navega a: Servers → Notes Database → Databases → notesdb → Schemas → public → Tables
2. Click derecho en "notes" → View/Edit Data → All Rows
3. Verás todas las notas creadas desde la aplicación

### Ejecutar consultas SQL

1. Click derecho en "notesdb" → Query Tool
2. Escribe tu SQL, por ejemplo:
   ```sql
   SELECT * FROM notes WHERE title LIKE '%Docker%';
   ```
3. Presiona F5 o click en ▶️ para ejecutar

---

## 🎓 Aprendizaje

Este proyecto te enseña:
- Cómo estructurar un proyecto con Docker Compose
- Comunicación entre contenedores
- Persistencia de datos
- Variables de entorno
- Dependencias entre servicios
- Desarrollo con hot reload en contenedores

¡Disfruta aprendiendo Docker Compose! 🐳
