import express from 'express'
import usuariosRoutes from './routes/usuarios.routes.js'

const app = express()

app.use(express.json())
app.use(usuariosRoutes)

app.listen(3000, () => console.log('Servidor en http://localhost:3000'))