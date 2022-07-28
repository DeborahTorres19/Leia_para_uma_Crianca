const mongoose = require('mongoose')

const LivroSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    titulo:{
        type: String,
        required: true
    },
    autor:{
        type: String,
        required: true
    },
    genero:{
        type: String,
        required: true
    },
    ilustracao:{
        type: String,
        required: true
    },
    editora:{
        type: String,
        required: true
    },
    classificacaoEtaria:{
        type: String,
        required: true
    },
    anoDeLancamento:{
        type: Number,
        required: true
    },
    pais:{
        type: String,
        required: true
    },
    idDoador:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: new Date()
    }
})

module.exports = mongoose.model('livros', LivroSchema)