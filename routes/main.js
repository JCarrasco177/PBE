
const express = require('express')
const router = express.Router();
const main = require('../controllers/MainController')
const users = require('../controllers/UsersController')
const post = require('../controllers/PostsController')
const topics = require('../controllers/TopicController')
const authMiddleware = require('../middleware/authenticate')

//Rutas
//MainController
router.get('/index',main.getIndex)
router.post('/post',authMiddleware.authenticate,main.getPost)
//Topics
router.post('/topics',authMiddleware.authenticate,topics.getTopics)
router.post('/getTopics',authMiddleware.authenticate,topics.getAllTopics)
router.post('/createTopic',authMiddleware.authenticate,topics.createTopic)
router.post('/getPostByTopics',authMiddleware.authenticate,topics.getPostByTopics)

//UsersController
router.get('/testmysql',users.testMysql)
router.post('/createuser',users.createUser)
router.post('/getuserbyid',users.getUserById)
router.post('/getpostbyid',users.getPostById)
router.post('/login',users.setLogin)
router.get('/avatar',users.getAvatar)
//post controller
router.post('/userPost',authMiddleware.authenticate ,post.userPost)
router.post('/postComment',authMiddleware.authenticate, post.postComment)

module.exports = router;