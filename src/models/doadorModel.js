const mongoose = require('mongoose')

const DoadorSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    nome:{
        type: String,
        required: true
    },
    cpf:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    senha:{
        type: String,
        required: true
    },
    telefone:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: new Date()
    }
})

module.exports = mongoose.model('doadores', DoadorSchema)