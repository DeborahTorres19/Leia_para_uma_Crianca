const DoadorModel = require('../models/doadorModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

const login = (req, res) => {
    try {
        DoadorModel.findOne({ email: req.body.email }, (error, doador) => {
            console.log("DOADOR", doador)
            if(!doador) {
                return res.status(401).send({
                    message: "Doador não encontrado",
                    email: `${req.body.email}`
                })
            }
            const validPassword = bcrypt.compareSync(req.body.password, doador.password)
            console.log("A SENHA É VÁLIDA?", validPassword)

            if(!validPassword) {
                return res.status(401).send({
                    "message": "Login não autorizado",
                    "statusCode": 401
                })
            }

            const token = jwt.sign({name: doador.name}, SECRET)
            console.log("TOKEN CRIADO:", token)

            res.status(200).send({
                "message": "Login autorizado",
                token
            });

        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    login
}