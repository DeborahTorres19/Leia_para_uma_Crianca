const express = require('express')
const router = express.Router()

const controller = require("../controllers/ongController")
const authController = require("../controllers/authController")

const { checkAuth } = require("../middleware/auth")

router.get('/all', checkAuth, controller.getAllOng)
router.post('/create', controller.createOng)
router.post('/login', authController.loginOng)
router.put('/update/:id', controller.updateOng)
router.delete('/delete/:d', checkAuth, controller.deleteOng)

module.exports = router
