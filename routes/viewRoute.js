const express = require('express');
const viewController = require('../controllers/viewController');
const router = express.Router();

// const express = require('express')
// const ItemController= require('../controllers/ItemController');
// const router = express.Router();

router.route('/')
.get(viewController.homepageView);
router.route('/registration')
.get(viewController.loginView);


module.exports = router;