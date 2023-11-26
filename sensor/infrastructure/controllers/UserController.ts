/*import { Request, Response } from 'express';
import { hashPassword } from '../utils/passwordUtils'; // Utilidad para hashear contraseñas
import { User } from '../models/User'; // Modelo de usuario

export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, correo, telefono, contrasena } = req.body;

    // Verificar si el correo ya está registrado
    const usuarioExistente = await User.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Hashear la contraseña antes de guardarla en la base de datos
    const contrasenaHasheada = await hashPassword(contrasena);

    // Crear un nuevo usuario
    const nuevoUsuario = new User({
      nombre,
      apellido,
      correo,
      telefono,
      contrasena: contrasenaHasheada,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    // Puedes generar un token de autenticación y devolverlo al cliente si lo deseas

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};*/
