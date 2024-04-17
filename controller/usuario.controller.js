const sequelize = require("../config/sequelize-config");
const Usuario = require("../models/usuario.model");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.obtenerUsuarios = async (req, res) => {
  try {
    const id = req.params.id; // Aquí debes usar req.params.id para obtener el valor del parámetro

    const data = await Usuario.findOne({
        where: {
            id: id
        },
    });

    if(!data) {
        return res.status(404).json({ message: 'No existe el usuario'});
    }

    // Convertir los datos a un objeto JavaScript y eliminar la propiedad password
    const userData = data.get({ plain: true });
    delete userData.password;

    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error("Error al obtener datos del usuario", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar si la contraseña coincide con la almacenada en la base de datos
    if (password !== usuario.password) {
      return res.status(401).json({ message: 'Credenciales inválidas pass' });
    }

    // Si las credenciales son válidas, generar un token con el ID, nombre y correo electrónico del usuario
    const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre, email: usuario.email }, 'tu_secreto', { expiresIn: '1h' });

    // Devolver el token y cualquier otra información necesaria
    res.status(200).json({ token, id: usuario.id, nombre: usuario.name, email: usuario.email });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

exports.registro = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = await Usuario.create({ name, email, password });

    // Devolver una respuesta exitosa
    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// exports.buscarUsuario = async (req, res) => {
//   try {
//     const id = req.params.id

//     const data = await Usuario.findOne({
//         where: {
//             id: id,
//             Estatus: 1,
//         },
//     });

//     if(!data) {
//         return res.status(404).json({ message: 'No existe el usuario'});
//     }

//     res.status(200).json({ success: true, data: data});
//   } catch (error) {
//     console.error("Error al obtener datos del usuario", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }; 

exports.buscarUsuario = async (req, res) => {
    try {
      const id = req.params.id
  
      const data = await Usuario.findOne({
          where: {
              id: id,
              Estatus: 1,
          },
      });
  
      if(!data) {
          return res.status(404).json({ message: 'No existe el usuario'});
      }
  
      // Convertir los datos a un objeto JavaScript y eliminar la propiedad password
      const userData = data.get({ plain: true });
      delete userData.password;
  
      res.status(200).json({ success: true, data: userData });
    } catch (error) {
      console.error("Error al obtener datos del usuario", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  exports.desactivarUsuario = async (req, res) => {
    try {
      const id = req.params.id
  
      const data = await Usuario.update({ Estatus: 0 }, {
          where: {
              id: id
          }
      });
  
      if(!data) {
          return res.status(404).json({ message: 'No existe el usuario'});
      }
  
      res.status(200).json({ success: true, message: 'Usuario desactivado' });
    } catch (error) {
      console.error("Error al desactivar el usuario", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
