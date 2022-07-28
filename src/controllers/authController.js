const DoadorModel = require('../models/doadorModel')
const OngModel = require('../models/OngModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginDoador = async (req, res) => {
    try {
        const { email, password } = req.body

        const doador = await DoadorModel.findOne({ email: email }).select("+password")

        if (!doador) {
            return res.status(400).json({ message: "Email ou senha incorretos." })
        }

        const checkPassword = await bcrypt.compare(password, doador.password)

        if (!checkPassword) {
            return res.status(400).json({ message: "Email ou senha incorretos." })
        }
        const SECRET = process.env.SECRET
        const token = jwt.sign({ id: doador._id, email: doador.email }, SECRET)

        res.status(200).json({
            message: "Login efetuado com sucesso.",
            token
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const loginOng = async (req, res) => {
    try {
        const { email, password } = req.body;

        const ong = await OngModel.findOne({ email: email }).select("+password");

        if (!ong) {
            return res.status(400).json({ message: "Email ou senha incorretos." })
        };

        const checkPassword = await bcrypt.compare(password, ong.password);

        if (!checkPassword) {
            return res.status(400).json({ message: "Email ou senha incorretos." })
        };
        const SECRET = process.env.SECRET;
        const token = jwt.sign({ id: ong._id, email: ong.email }, SECRET);

        res.status(200).json({
            message: "Login efetuado com sucesso.",
            token
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}

module.exports = {
    loginDoador,
    loginOng
}