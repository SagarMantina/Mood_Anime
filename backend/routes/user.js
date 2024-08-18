const express   = require('express')

const router    = express.Router();

const userController = require('../controllers/userController');
const { getSignup, getLogin, getLogout } = userController;


router.get('/signup', getSignup);
router.get('/login', getLogin);
router.get('/logout', getLogout);
// router.get('/popular', getPopularMovies);
// router.get('/feed', getFeedMovies);
// router.get('/similar', getSimilarMoveis);
// router.get('/mood', getMoodMovies);
// router.get('/toprated', getTopRatedMovies);

module.exports = router;