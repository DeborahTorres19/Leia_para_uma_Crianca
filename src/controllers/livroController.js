const LivroModel = require('../models/livroModel')
const mongoose = require('mongoose')

const getAllLivro = async (req, res) => {
    try {
        const livro = await LivroModel.find()
        res.status(200).send({"message": `Livro ${livro} localizado com sucesso!`})
    } catch (error) {
        response.status(500).send(error.message)
    }
}

const createLivro = async (req, res) => {
    try {
        const body = request.body
        const newLivro = await LivroModel.create(body)
        res.status(201).json({"message": "Livro cadastrado com sucesso!", newLivro})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateLivro = async (req, res) => {
    try {
        let livro = await LivroModel.findById(req.params.id)
        if(livro){
            livro.titulo = req.body.titulo || livro.titulo
            livro.autor = req.body.autor || livro.autor
            livro.genero = req.body.genero || livro.genero
            livro.ilustracao = req.body.ilustracao || livro.ilustracao
            livro.editora = req.body.editora || livro.editora
            livro.classificacaoEtaria = req.bodyclassificacaoEtaria || livro.classificacaoEtaria
            livro.anoDeLancamento = req.body.anoDeLancamento || livro.anoDeLancamento
            livro.pais = req.body.pais || livro.pais
            livro.idDoador = req.body.idDoador || livro.idDoador
            await livro.save()
            res.status(200).send({
                "message": `Livro ${livro} atualizado com sucesso!`
            }) 
        } else {
            res.status(400).json({message:"Não foi possível encontrar esse livro."})
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteLivro = async (req, res) => {
    try {
        let livro = await LivroModel.findById(req.params.id)
        livro.delete()
        res.status(200).json({"message":`Livro ${livro} deletado com sucesso!`})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getByTitulo = async (req, res) => {
    try {
        const livro = await LivroModel.find({titulo: req.query.titulo})
        res.status(200).send({"message": `Livro ${livro} encontrado com sucesso!`})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getAllLivro,
    createLivro,
    updateLivro,
    deleteLivro,
    getByTitulo
}