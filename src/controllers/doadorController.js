const DoadorModel = require('../models/doadorModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const getAllDoador = async (req, res) => {
    try {
        const doador = await DoadorModel.find().select("-senha -cpf")
        res.status(200).send({"message": `O doador ${doador} foi identificado com sucesso!`})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const createDoador = async (req, res) => {
    try {
        const newDoador = new DoadorModel(req.body)
        const savedDoador = await newDoador.save()

        res.status(201).send({"message": `Doador ${savedDoador} criado com sucesso!`})
    } catch (error) {
        res.status(500).send(error.message)
    }
    
    // try {
    //     const {email, password} = req.body

    //     const userExistente = await DoadorModel.findOne({email: email})
    //     if(userExistente){
    //         return res.status(422).json({"Erro:" : "Esse email já está cadastrado."})
    //     }

    //     const salt = await bcryptgenSalt(12)
    //     const passwordHash = await bcrypt.hash(password, salt)

    //     const novoDoador = new DoadorModel({
    //         nome:req.body.name,
    //         cpf:req.body.cpf,
    //         email:req.body.email,
    //         senha:req.body.senha,
    //         telefone:req.body.telefone
    //     })

    //     const doador = await novoDoador.save()
    //     novoDoador.password = undefined
    //     res.status(200).json({"message": `Doador ${novoDoador} cadastrado com sucesso!`})
    // } catch (error) {
    //     res.status(500).send(error.message)
    // }
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
        res.status(200).json({"message":`Doador ${doador} deletado com sucesso!`})
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