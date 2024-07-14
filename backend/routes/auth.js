const express = require('express');
const router = express.Router();
const { register, login, googleAuth, googleAuthCallback, googleAuthRedirect, facebookAuth, facebookAuthCallback, facebookAuthRedirect, linkedinAuth, linkedinAuthCallback, linkedinAuthRedirect } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback, googleAuthRedirect);
router.get('/facebook', facebookAuth);
router.get('/facebook/callback', facebookAuthCallback, facebookAuthRedirect);
router.get('/linkedin', linkedinAuth);
router.get('/linkedin/callback', linkedinAuthCallback, linkedinAuthRedirect);

module.exports = router;
