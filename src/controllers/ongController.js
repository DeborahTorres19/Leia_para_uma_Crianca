const OngModel = require('../models/OngModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const getAllOng = async (req, res) => {
    OngModel.find(function (error, ongs){
        if(error) {
            res.status(500).send({message: error.message})
        }
            res.status(200).send(ongs)
    })
}

const createOng = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const emailExists = await OngModel.exists({ email: req.body.email });

    if(emailExists) {
        res.status(401).send({
            "message": "Email já cadastrado"
        })
    }
    
    try {
        const newOng = new OngModel(req.body)
        const savedOng = await newOng.save()

        res.status(201).send({
            "message": "Ong criada com sucesso!",
            savedOng
        })
    } catch (error) {
        console.error(error)
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
        ong.delete()
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