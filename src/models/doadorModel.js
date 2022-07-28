const mongoose = require('mongoose')

const DoadorSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    nome:{
        type: String,
        required: true
    },
    cpf:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    telefone:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('doadores', DoadorSchema)