const OngModel = require('../models/OngModel')
const { hashPassword } = require('../helpers/hashPassword')

const getAllOng = async (req, res) => {
    OngModel.find(function (error, ongs){
        if(error) {
            res.status(500).send({message: error.message})
        }
            res.status(200).send(ongs)
    })
}

const createOng = async (req, res) => {
    try {
        const { nome, email, password, telefone, endereco, bairro, cidade, estado, createdAt } = req.body;

        const newOng = new OngModel({
            nome,
            email,
            password,
            telefone,
            endereco,
            bairro,
            cidade,
            estado,
            createdAt
        });

        const passwordHashed = await hashPassword(newOng.password, res)
        newOng.password = passwordHashed

        const ong = await OngModel.findOne({ email: req.body.email });

        if (ong) {
            res.status(400).json({ message: "Ong já cadastrada no sistema." })
        }

        const savedOng = await newOng.save();

        res.status(201).json({
            message: "Ong cadastrada com sucesso.",
            savedOng
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}

const updateOng = async (req, res) => {
    try {
        let ong = await OngModel.findById(req.params.id)
        if(ong){
            ong.nome = req.body.nome || ong.nome
            ong.cpf = req.body.cpf || ong.cpf
            ong.email = req.body.email || ong.email
            ong.password = req.body.password || ong.password
            ong.telefone = req.body.telefone || ong.telefone
            ong.endereco = req.body.endereco || ong.endereco
            ong.bairro = req.body.bairro || ong.bairro
            ong.cidade = req.body.cidade || ong.cidade
            ong.estado = req.body.estado || ong.estado
        await ong.save()
        res.status(201).send({
            "message": "Ong atualizada com sucesso",
            ong
        })

        } else {
            res.status(400).json({
                "message": "Não foi possível identificar essa Ong"
            })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteOng = async (req, res) => {
    try {
        let ong = await OngModel.findById(req.params.id)
        await ong.delete()
        res.status(200).json({
            "message": "Ong delatada com sucesso!",
            ong
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getAllOng,
    createOng,
    updateOng,
    deleteOng
}