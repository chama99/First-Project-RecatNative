
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
let UserVerification = require('../models/userVerification.model')
var User = require('../models/user.model')

var url = 'mongodb://localhost:27017/PremierProjet'
const { v4: uuidv4 } = require('uuid');
const path = require('path');





// ili chyb3th email lil user
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chamahaddad93@gmail.com',
        pass: 'hciigyzcyhxmxwmf'
    }
});

// tasti beha gconnection mta gmail
transporter.verify((error, success) => {
    if (error) {
        console.error('Error verifying transporter:', error);
    } else {
        console.log('Transporter verified');
    }
});
exports.register = (nom, prenom, email, password, image) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.findOne({ email: email })

        }).then((doc) => {
            if (doc) {
                mongoose.disconnect()
                resolve('Cet email existe déja')

            } else {
                bcrypt.hash(password, 10).then((hashPass) => {
                    let user = new User({
                        nom: nom,
                        prenom: prenom,
                        email: email,
                        password: hashPass,
                        image: image,
                        verified: false,
                    })
                    user.save().then((user) => {

                        resolve(user)
                        sendVerificationEmail(user);
                    }).catch((err) => {
                        mongoose.disconnect()
                        reject(err)
                    })
                }).catch((err) => reject(err))
            }
        })
    })
}
//verification email
const sendVerificationEmail = ({ _id, email }) => {

    const currentUrl = "http://192.168.3.121";

    const uniqueString = uuidv4() + _id;// kima token 
    //chnwa chikoun fyh email 
    const mailOptions = {
        from: 'chamahaddad93@gmail.com',
        to: email,
        subject: 'verify your account ',
        html: `<h1>Hello ${email}</h1><br/> <p>Please Verify your account .</p>
    <br/><p>Clik this link <a href=${currentUrl + "/verify/" + _id + "/" + uniqueString} >here</a>  .</p> `

    };
    const saltRounds = 10;
    bcrypt
        .hash(uniqueString, saltRounds)
        .then((hasheduniqueString) => {
            const newVerification = new UserVerification({
                userId: _id,
                uniqueString: hasheduniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 21600000, // yo93d 6hr lien
            });
            newVerification.save()
                .then(() => {
                    transporter.sendMail(mailOptions)
                        .then(() => {

                            console.log('Verified');

                        })
                        .catch((error) => {
                            console.log('Error Sending Mail:', error);
                        })

                }
                )
                .catch((error) => {
                    console.log("Error in sending verification Email", error);
                })



        })

        .catch(() => {
            res.status(500).send({
                message: err.message || "Some error occurred while ."
            });
        })
}
exports.verify = (req, res) => {
    let { userId, uniqueString } = req.params;
    UserVerification.find({ userId })
        .then((result) => {
            if (result.length > 0) {

                const { expiresAt } = result[0];


                const hasheduniqueString = result[0].uniqueString;
                //tasti ithawa9t t3adech 6hr
                if (expiresAt < Date.now()) {
                    UserVerification.deleteOne({ userId })
                        .then(result => {
                            User.deleteOne({ _id: userId })
                                .then(() => {
                                    let message = " Link has expired . Please sign up again "
                                    res.redirect(`/verified/error=true&message=${message}`)
                                })
                                .catch(error => {
                                    let message = " Account record doesn't exist or has been verified already "
                                    res.redirect(`/verified/error=true&message=${message}`)
                                })
                        })
                        .catch((error) => {
                            console.log('Error deleting the user', error);

                            let message = " An error occurred while clearing expired user verification record "
                            res.redirect(`/verified/error=true&message=${message}`)
                        });


                }
                else {
                    // valid record exists so we validate
                    bcrypt
                        .compare(uniqueString, hasheduniqueString)
                        .then(result => {
                            if (result) {
                                User.updateOne({ _id: userId }, { verified: true })
                                    .then(() => {
                                        UserVerification.deleteOne({ userId })
                                            .then(() => {
                                                res.sendFile(path.join(__dirname, "./verified.html"));
                                            })
                                            .catch(error => {
                                                console.log(" Error updating account", error);

                                            })
                                    }).catch(error => {
                                        console.log(" Error updating account", error);

                                    })
                            } else {
                                let message = "Invalid verification details passed  "
                                res.redirect(`/verified/error=true&message=${message}`)
                            }

                        })
                        .catch(error => {
                            let message = " An error occurred while comparing uniqueString "
                            res.redirect(`/verified/error=true&message=${message}`)
                        })
                }

            } else {
                let message = " Account record doesn't exist or has been verified already "
                res.redirect(`/verified/error=true&message=${message}`)
            }

        })
        .catch((error) => {
            console.log(error);
            let message = " An error occurred while "
            res.redirect(`/verified/error=true&message=${message}`)
        })
}

exports.verified = (req, res) => {

    res.sendFile(path.join(__dirname, "./verified.html"))


}
const privatekey = "this key hdhfkflflfl"
exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.findOne({ email: email })
        }).then((user) => {
            if (!user) {
                mongoose.disconnect()
                const mssg = "Mot de passe ou email invalide"
                resolve(mssg)
            } else {
                if (!user.verified) {
                    const mssg = "L'e-mail n'a pas été vérifié."
                    resolve(mssg)
                } else {
                    bcrypt.compare(password, user.password).then((same) => {
                        if (same) {
                            //ykhazynly data mou3ayna ,token nestha9ouh cote sécurite bch net2kdou mn user msajill aandy 
                            let token = jwt.sign({ id: user._id }, privatekey, {
                                expiresIn: '5h'
                            })
                            mongoose.disconnect()
                            resolve({ token, user })

                        }
                        else {
                            mongoose.disconnect()
                            const mssg = "Mot de passe ou email invalide"
                            resolve(mssg)
                        }
                    }).catch((err) => {
                        mongoose.disconnect()
                        reject(err)
                    })
                }



            }
        })
    })
}

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.find()
        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })

    })
}
exports.getUsersById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.findById(id)
        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })

    })
}

exports.updateUser = (id, nom, prenom, image) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.updateOne({ _id: id }, { nom: nom, prenom: prenom, image: image })
        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })

    })
}
exports.updatePassword = (id, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(url)
            .then(() => {
                return bcrypt.hash(password, 10);
            })
            .then((hashPassword) => {
                return User.updateOne({ _id: id }, { password: hashPassword });
            })
            .then((doc) => {
                mongoose.disconnect();
                resolve("Mot de passe est changé ");
            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
            });
    });
};


const generateRandomPassword = () => {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
};

exports.ForgetPassword = (email) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.findOne({ email: email })
        }).then((user) => {
            if (!user) {
                mongoose.disconnect()
                const mssg = " email n'existe pas"
                resolve(mssg)
            } else {
                if (!user.verified) {
                    const mssg = "L'e-mail n'a pas été vérifié."
                    resolve(mssg)
                } else {
                    const newPassword = generateRandomPassword();

                    // Update the user's password in the database
                    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                        if (err) {
                            resolve("Error occurred while generating new password.")
                        } else {
                            // Update the user's password in the User collection
                            User.findByIdAndUpdate(user._id, { password: hashedPassword })
                                .then(() => {
                                    //continuer avec l'e-mail pour réinitialiser le mot de passe
                                    resolve("Veuillez consulter votre e-mail pour prendre un nouveau mot de passe.")
                                    sendResetEmail(user, newPassword)
                                })
                                .catch(() => {


                                    resolve("Error occurred while updating user's password.")

                                });
                        }
                    });


                }



            }
        }).catch((error) => {
            resolve(error)
        })
    })
}

const sendResetEmail = ({ _id, email }, newPassword) => {
 
  
            const mailOptions = {
                from: 'chamahaddad93@gmail.com',
                to: email,
                subject: 'Password reset',
                html: `<h3>Hello, ${email}</h3><br/><p>Your new password is: ${newPassword}</p> `

            };
            transporter.sendMail(mailOptions)
                .then(() => {
                    console.log('password reset email sent')
                })
                .catch(error => console.log(error))

        
}






