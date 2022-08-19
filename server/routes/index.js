const express = require('express');
const {
  register,
  login,
  setAvatar,
  getAllUsers,
  myAccount,
} = require('../controllers/auth');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/myAccount', verifyToken, myAccount);
router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);
router.get('/allusers/:id', getAllUsers);

module.exports = router;
