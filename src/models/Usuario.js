import { pool } from '../config/db.js'

const all = async () => {
  const [usuarios] = await pool.execute('SELECT * FROM usuarios')
  return usuarios
}

const getById = async id => {
  const [usuario] = await pool.execute(
    'SELECT * FROM usuarios WHERE usuario_id = ?',
    [id]
  )
  return usuario
}

const store = async (nombres, apellidos, fechaNacimiento, rolId) => {
  const [resultado] = await pool.execute(
    'INSERT INTO usuarios(nombres, apellidos, fecha_nacimiento, rol_id) VALUES (?, ?, ?, ?)',
    [nombres, apellidos, fechaNacimiento, rolId]
  )
  return resultado
}

const update = async ({ id, nombres, apellidos, fechaNacimiento, rolId }) => {
    const [resultado] = await pool.execute('UPDATE usuarios SET nombres = ?, apellidos = ?, fecha_nacimiento = ?, rol_id = ? WHERE usuario_id = ?', [nombres, apellidos, fechaNacimiento, rolId, id])
  
    return resultado.affectedRows === 1
  }


  const updateById = async (id, fields) => {
    const setClause = Object.keys(fields).map(key => `${key} = ?`).join(', ')
    const values = Object.values(fields)
    values.push(id)
  
    const [resultado] = await pool.execute(
      `UPDATE usuarios SET ${setClause} WHERE usuario_id = ?`,
      values
    )
    return resultado
  }

  const deleteById = async id => {
    const [resultado] = await pool.execute(
      'DELETE FROM usuarios WHERE usuario_id = ?',
      [id]
    )
    return resultado.affectedRows === 1
  }

export default { all, getById, store, update, updateById, deleteById }