const DoadorModel = require('../models/doadorModel')
const OngModel = require('../models/OngModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

const loginDoador = (req, res) => {
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

const loginOng = (req, res) => {
    try {
        OngModel.findOne({ email: req.body.email }, (error, ong) => {
            console.log("ONG", ong)
            if(!ong) {
                return res.status(401).send({
                    message: "Ong não encontrado",
                    email: `${req.body.email}`
                })
            }
            const validPassword = bcrypt.compareSync(req.body.password, ong.password)
            console.log("A SENHA É VÁLIDA?", validPassword)

            if(!validPassword) {
                return res.status(401).send({
                    "message": "Login não autorizado",
                    "statusCode": 401
                })
            }

            const token = jwt.sign({name: ong.name}, SECRET)
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
    loginDoador,
    loginOng
}