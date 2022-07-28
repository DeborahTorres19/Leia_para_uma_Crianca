const express = require('express')
const router = express.Router()

const controller = require("../controllers/livroController")

router.get('/all', controller.getAllLivro)
router.post('/create', controller.createLivro)
router.put('/update/:id', controller.updateLivro)
router.delete('/delete/:id', controller.deleteLivro)

module.exports = router