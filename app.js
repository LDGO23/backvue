const express = require('express');
const app = express();
const sequelize = require('./config/sequelize-config');
const usuariosRoutes = require('./routes/usuariosRoutes');
const categoriaingresos = require('./routes/categoriaIngresos');
const ingresos = require('./routes/ingresos.route');



// Conectar a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(error => {
    console.error('Error al conectar con la base de datos:', error);
  });
  app.use(express.json());
// Usar las rutas
app.use('/api/v1/usuarios', usuariosRoutes);
app.use('/api/v1/categoriaingresos', categoriaingresos);
app.use('/api/v1/ingresos', ingresos);
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});








// const express = require('express')
// const Sequelize = require('sequelize')
// const app = express()


// const sequelize = new Sequelize('datavue','root','',{
//     host:'localhost',
//     dialect:'mysql'
// }) 
// sequelize.authenticate()
//     .then(()=>{
//         console.log('Conexion correcta a la base de datos')
//     })
//     .catch( error =>{
//         console.log('error al conectar'+ error)
//     })

    
//         const usuarios = sequelize.define('usuario',{
//             "id": {type:Sequelize.INTEGER, primaryKey:true},
//             "name": {type:Sequelize.STRING},
//             "email": {type:Sequelize.STRING},
//             "password": {type:Sequelize.STRING}
//         })
        
    
//         usuarios.findAll({attributes:['id', 'name', 'email']}) 
//             .then(post=>{
//                 console.log(post)
//             })
//             .catch( error =>{
//                 console.log(error)
//             })
     

//             const saldo = sequelize.define('saldo',{
//                 "id": {type:Sequelize.INTEGER, primaryKey:true},
//                 "Cantidad": {type:Sequelize.INTEGER},
//                 "UserId": {type:Sequelize.INTEGER}
//             })
            
        
//             saldo.findAll({attributes:['id', 'Cantidad', 'UserId']}) 
//                 .then(post=>{
//                     console.log(post)
//                 })
//                 .catch( error =>{
//                     console.log(error)
//                 })

//                 const ingresos = sequelize.define('ingresos',{
//                     "id": {type:Sequelize.INTEGER, primaryKey:true},
//                     "Cantidad": {type:Sequelize.INTEGER},
//                     "NombreIngreso": {type:Sequelize.STRING},
//                     "Descripcion": {type:Sequelize.STRING},
//                     "CategoriaId": {type:Sequelize.INTEGER},
//                     "UserId": {type:Sequelize.INTEGER},
//                     "SaldoId": {type:Sequelize.INTEGER}
//                 })
                
            
//                 ingresos.findAll({attributes:['id', 'Cantidad','NombreIngreso', 'Descripcion', 'CategoriaId', 'UserId', 'SaldoId']}) 
//                     .then(post=>{
//                         console.log(post)
//                     })
//                     .catch( error =>{
//                         console.log(error)
//                     })
            


//         app.listen(3000, ()=>{
//             console.log('Servidor abierto en http://localhost:3000')
//         })