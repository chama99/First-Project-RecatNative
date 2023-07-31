const Post = require("../models/post.model")
const mongoose = require('mongoose')
var url = 'mongodb://localhost:27017/PremierProjet'

exports.addPost = (userId, desc, img, likes, comments) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            let post = new Post({
                userId:
                    userId,

                desc: desc,

                img: img,

                likes: likes,


                comments: comments,
            })
            post.save().then((post) => {
       
                resolve(post)
                sendVerificationEmail(user);
            }).catch((err) => {
                mongoose.disconnect()
                reject(err)
            })

        })
    })
}

exports.getPost = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Post.find()
        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })

    })
}
exports.getPostsById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Post.findById(id)
        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })

    })
}

exports.getPostsByIdUser = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            // Use a query object to filter posts with non-empty "nom" field
            return Post.find({
                userId: id});
        }).then((doc) => {
            mongoose.disconnect();
            resolve(doc);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
};