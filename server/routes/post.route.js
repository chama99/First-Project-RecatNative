const route = require('express').Router()
const postmodel = require('../controllers/post')
route.post('/addpost', (req, res) => {
    postmodel.addPost(req.body.userId, req.body.desc, req.body.img, req.body.likes, req.body.comments)
        .then((mssg) => res.status(200).json({  post: mssg, mssg: mssg }))
        .catch((err) => res.status(400).json({ err: err }))
})

route.get('/getpost', (req, res) => {

    postmodel.getPost().then((mssg) => res.json({ posts: mssg })).catch((err) => res.status(400).json(err))
})
route.get('/getPostById/:id', (req, res) => {

    postmodel.getPostsByIdUser(req.params.id).then((mssg) => res.json({ posts: mssg })).catch((err) => res.status(400).json(err))
})
module.exports = route