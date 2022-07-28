const DoadorModel = require('../models/doadorModel')
const { hashPassword } = require('../helpers/hashPassword')

const getAllDoador = async (req, res) => {
    DoadorModel.find(function (error, doadores){
        if(error) {
            res.status(500).send({message: error.message})
        }
            res.status(200).send(doadores)
    })
}

const createDoador = async (req, res) => {
    try {
        const { nome, cpf, email, password, telefone, createdAt } = req.body;

        const newDoador = new DoadorModel({
            nome,
            cpf,
            email,
            password,
            telefone
        });

        const passwordHashed = await hashPassword(newDoador.password, res)
        newDoador.password = passwordHashed

        const doador = await DoadorModel.findOne({ email: req.body.email });

        if (doador) {
            res.status(400).json({ message: "Doador já cadastrado no sistema" })
        }

        const savedDoador = await newDoador.save();

        res.status(201).json({
            message: "Doador cadastrado com sucesso.",
            savedDoador
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }    

}

const updateDoador = async (req, res) => {
    try {
        let doador = await DoadorModel.findById(req.params.id)
        if(doador){
            doador.nome = req.body.nome || doador.nome
            doador.cpf = req.body.cpf || doador.cpf
            doador.email = req.body.email || doador.email
            doador.password = req.body.password || doador.password
            doador.telefone = req.body.telefone || doador.telefone
        await doador.save()
        res.status(201).send({
            "message": "Doador atualizado com sucesso",
            doador
        })
        } else {
            res.status(400).json({
            "message": "Não foi possível identificar esse doador."
        })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteDoador = async (req,res) => {
    try {
        let doador = await DoadorModel.findById(req.params.id)
        await doador.delete()
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