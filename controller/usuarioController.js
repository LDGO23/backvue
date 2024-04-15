const sequelize = require("../config/sequelize-config");
const Usuario = require("../models/Usuario");


exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
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
