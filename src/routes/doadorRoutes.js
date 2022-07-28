const express = require('express')
const router = express.Router()

const controller =  require("../controllers/doadorController")
const authController = require("../controllers/authController")

const { checkAuth } = require("../middleware/auth")

router.get('/all', checkAuth, controller.getAllDoador)
router.post('/create', controller.createDoador)
router.post('/login', authController.loginDoador)
router.put('/update/:id', controller.updateDoador)
router.delete('/delete/:id', checkAuth, controller.deleteDoador)

module.exports = router