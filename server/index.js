const express=require('express')

const routeuser=require('./routes/user.route')
const app=express()
const multer = require('multer');
const cors=require('cors')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',routeuser)
// Configuration de Multer pour la gestion des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Répertoire de stockage des images
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Utilisez le nom d'origine pour le fichier
    },
});

const upload = multer({ storage: storage });

// Définissez une route pour la gestion du téléchargement d'une image
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        res.status(400).send('Aucune image sélectionnée');
    } else {
        res.send('Image téléchargée avec succès');
    }
});
app.use(cors());
app.listen(80)