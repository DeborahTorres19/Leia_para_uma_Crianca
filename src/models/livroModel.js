const mongoose = require('mongoose')

const LivroSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    titulo:{
        type: String,
        required: true
    },
    texto:{
        type: String,
        required: true
    },
    ilustracao:{
        type: String,
        required: true
    },
    tradutores:{
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
    paginas:{
        type: Number,
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