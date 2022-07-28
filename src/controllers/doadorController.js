const DoadorModel = require('../models/doadorModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const getAllDoador = async (req, res) => {
    DoadorModel.find(function (error, doadores){
        if(error) {
            res.status(500).send({message: error.message})
        }
            res.status(200).send(doadores)
    })
}

const createDoador = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    if(emailExists) {
        res.status(401).send({
            "message": "Email já cadastrado"
        })
    }

    try {
        const newDoador = new DoadorModel(req.body)
        const savedDoador = await newDoador.save()

        res.status(201).send({
            "message": "Doador criado com sucesso!",
            savedDoador
        })
    } catch (error) {
        console.error(error)
    }

}

const updateDoador = async (req, res) => {
    try {
        let doador = await DoadorModel.findById(req.params.id)
        if(doador){
            doador.nome = req.body.nome || doador.nome
            doador.cpf = req.body.cpf || doador.cpf
            doador.email = req.body.email || doador.email
            doador.telefone = req.body.telefone || doador.telefone
        await doador.save()
        res.status(200).send({"message":`O doador ${doador} foi atualizado com sucesso!`})
        } else {
            res.status(400).json({"message":"Não foi possível identificar esse doador."})
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteDoador = async (req,res) => {
    try {
        let doador = await DoadorModel.findById(req.params.id)
        doador.delete()
        res.status(200).json({
            "message":"Doador deletado com sucesso!",
        doador
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getAllDoador,
    createDoador,
    updateDoador,
    deleteDoador
}