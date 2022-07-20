const utils = require('../resources/utils')
const moment = require('moment')
const connection = require('../config/db')
const { response } = require('express')


const userPost = (request,response) => {
 
  const user_id = request.body.user_id

  connection.query(
    `SELECT *,date_format(date,'%d/%m/%Y %h:%i:%s') as fixed_date FROM users 
     join posts on (users.id = posts.user_id)
    where users.id = ?`,
    [user_id],
    function(err, result, fields) {
      if (err) {console.log(err)}
        response.json(result)
    }
  );
}
const postComment = (request,response) => {
  const user_id = request.body.user_id
  const title = request.body.title
  const content = request.body.content
  connection.query(
    `INSERT INTO posts (user_id,title,content, date)
    VALUES(?,?,?,current_timestamp());`,
    [user_id,title,content],
    function(err) {
      if (err) {
        message = err
        response.json({state:false,message})
      }else{
        response.json({state:true,message:"Se insertó el comentario"})
      }
        
    }
  );
}


module.exports = {
  userPost,
  postComment,
}