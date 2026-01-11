const express = require('express');
const router = express.Router();

const user = require('../controllers/user/user.controller');

router.get('/findAllUsers', user.FindAllUsers);
router.get('/findByIdUser',user.FindByIdUSer);


module.exports = router;