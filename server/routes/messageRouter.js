const { addMessage, getMessage } = require('../controllers/messageControllers');

const router = require('express').Router();

router.post('/addmsg', addMessage);
router.post('/getmsg', getMessage);

module.exports = router;
