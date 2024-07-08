import { Router } from 'express';
import { deleteUsuario, getUsuarioById, getUsuarios, storeUsuario, updateUsuario, updateUsuarioPatch } from '../controllers/usuarios.controller.js'

const router =  Router();

router.get('/api/usuarios', getUsuarios)
router.get('/api/usuarios/:id', getUsuarioById)
router.post('/api/usuarios', storeUsuario)
router.put('/api/usuarios/:id', updateUsuario)
router.patch('/api/usuarios/:id', updateUsuarioPatch)
router.delete('/api/usuarios/:id', deleteUsuario)


export default router