const express = require('express');
const router = express.Router();
const { getUser, followCompany, uploadCompanyLink } = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get('/', auth, getUser);
router.post('/follow/:id', auth, followCompany);
router.post('/company-link', auth, uploadCompanyLink);

module.exports = router;
