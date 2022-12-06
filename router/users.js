const UserControllers = require('../controllers/userController');
const router = require('express').Router()

router.post('/login', UserControllers.login)// POST nya kepake buat login form (butuh buat req.body)
router.post('/register', UserControllers.register)//add new user [ini buat ADMIN]
router.post('/google-login', UserControllers.userLoginGoogle)// POST nya kepake buat login form (butuh buat req.body)

module.exports = router;