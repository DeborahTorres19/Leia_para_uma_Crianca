const express = require('express')
const router = express.Router()

const controller =  require("../controllers/doadorController")

router.get('/all', controller.getAllDoador)
router.post('/create', controller.createDoador)
router.put('/update/:id', controller.updateDoador)
router.delete('/delete/:id', controller.deleteDoador)

module.exports = router