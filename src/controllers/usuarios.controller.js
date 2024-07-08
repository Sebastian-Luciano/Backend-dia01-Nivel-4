import usuarioModel from '../models/Usuario.js'

export const getUsuarios = async (req, res) => {
    const usuarios = await usuarioModel.all()
    res.json(usuarios)
}

export const getUsuarioById = async (req, res) => {
    const { id } = req.params
    const resultado = await usuarioModel.getById(id)

    if (resultado.length === 0) return res.status(404).json({ message: 'No se encontró el usuario' })

    res.json(resultado[0])
}

export const storeUsuario = async (req, res) => {
    const { nombres, apellidos, fechaNacimiento, rolId } = req.body
    const resultado = await usuarioModel.store(nombres, apellidos, fechaNacimiento, rolId)

    if (resultado.affectedRows !== 1) return resultado.status(500).json({ message: 'No se pudo insertar el usuario' })

    res.status(201).json({ message: 'Usuario creado' })
}


export const updateUsuario = async (req, res) => {
    const { nombres, apellidos, fechaNacimiento, rolId } = req.body
    const { id } = req.params

    if (!id || !nombres || !apellidos || !fechaNacimiento || !rolId) {
        return res.status(400).json({ message: 'Faltan datos en el formulario' })
    }

    const resultado = await usuarioModel.update({ id, nombres, apellidos, fechaNacimiento, rolId })

    if (resultado) {
        return res.json({ message: 'Usuario actualizado' })
    } else {
        return res.status(404).json({ message: 'Usuario no encontrado o no se pudo actualizar' })
    }
}


export const updateUsuarioPatch = async (req, res) => {
    const { id } = req.params
    const fields = req.body
  
    if (!id || Object.keys(fields).length === 0) {
      return res.status(400).json({ message: 'ID de usuario inválido o no se proporcionaron campos para actualizar' })
    }
  
    const resultado = await usuarioModel.updateById(id, fields)
  
    if (resultado.affectedRows !== 1) {
      return res.status(404).json({ message: 'No se encontró el usuario para actualizar' })
    }
  
    res.json({ 
      message: 'Usuario actualizado correctamente',
      updatedFields: Object.keys(fields)
    })
  }

  export const deleteUsuario = async (req, res) => {
    const { id } = req.params
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'ID de usuario inválido' })
    }
    const resultado = await usuarioModel.deleteById(id)
    
    if (resultado === 0) {
      return res.status(404).json({ message: 'No se encontró el usuario para eliminar' })
    }
    res.json({ message: 'Usuario eliminado correctamente' })
  }