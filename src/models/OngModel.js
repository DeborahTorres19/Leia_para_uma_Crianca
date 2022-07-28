const mongoose = require('mongoose')

const OngSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    nome:{
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
    endereco:{
        type: String,
        required: true
    },
    bairro:{
        type: String,
        required: true
    },
    cidade:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: new Date()
    }
})

module.exports = mongoose.model('ongs', OngSchema)