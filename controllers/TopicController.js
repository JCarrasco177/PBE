const utils = require('../resources/utils')
const connection = require('../config/db')
const { response } = require('express')

const getTopics = (request,response) =>{
    response.render('topics')
} 

const getAllTopics = (request,response) =>{
    connection.query(
        'SELECT * FROM topics',
        function(err, results, fields) {
            response.json(results)
        }
      );
}
const getPostByTopics = (request,response) =>{
    connection.query(
        'SELECT post FROM topics',
        function(err, results, fields) {
            response.json(results)
        }
      );
}
const createTopic = (request,response) =>{
    connection.query(
        'insert into topics(name,description) values (?,?)',
        [
            request.body.name,
            request.body.description
        ],
        function(err, results, fields) {
            if(err){
                response.status(500).json({message: `Se produjo un error al insrter ${err}`})
            }
            response.status(500).json({message: `Se insertó correctamente`})
        }
      );
}

module.exports = {
    getAllTopics,
    getTopics,
    createTopic,
    getPostByTopics,
}