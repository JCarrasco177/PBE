
const connection = require('../config/db')
const utils = require('../resources/utils')
const jwt = require('jsonwebtoken')
const auth = require("../middleware/authenticate")
require('dotenv').config()
//const avatar = require('../resources/img/avatar')

const testMysql = (request,response) =>{
    connection.query(
        'SELECT * FROM users',
        function(err, results, fields) {
            response.json(results[1])
        }
      );

}
const createUser = (request,response)=>{
    connection.query(
        `insert into users values (DEFAULT,?,?,?)`,
        [request.body.name,
        request.body.lastName,
        utils.btoa(request.body.password)
    ],
        function(err, results, fields) {
            if (err) {
                response.json({message:"Ha ocurrido un error en la insercion "+err})
            }else{
                response.json({message:"Correcto!"})
            }

        }
      );
}
const getUserById = (request,response)=>{
    auth.authenticate(request,response)
    connection.query(
        'SELECT * FROM users where id = ?',
        [request.body.id],
        function(err, results, fields) {
            response.json(results)
        }
      );

}
const getPostById = (request,response)=>{
    auth.authenticate(request,response)
    connection.query(
        'SELECT content FROM posts where user_id = ?',
        [request.body.id],
        function(err, results, fields) {
            response.json(results)
        }
      );

}
const setLogin  = (request,response) =>{
    const usuario = utils.limpiarRequest(request.body)
    if((request.body.usuario == undefined)||(request.body.password == undefined)){
        response.status(400).json({message: "Debe proporcionar usuarios y password", state:false})
    }
    connection.query(
        'SELECT * FROM users where name = ? and password = ?',
        [
            request.body.usuario,
            utils.btoa(request.body.password)
        ],
        function(err, userResult, fields) {
            console.log(userResult)
             if(userResult.length >0){
                const user = userResult[0]
                const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
                response.json({
                    message:"Login Exitoso",
                    state :true, 
                    user_id:userResult[0].id,
                    accessToken
                });
            }else{
                response.json({message:"Login Fallido",state :false});
            }
        }
      );

}
const getAvatar = (request,response) =>{
   // response.render(avatar)
}
module.exports = { testMysql,
                   createUser,
                   getUserById,
                   setLogin,
                   getAvatar,
                   getPostById,
                 }