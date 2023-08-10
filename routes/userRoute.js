const express = require('express');

const userController = require('./../controllers/userController');

const router = express.Router();


router.route('/view')
.get(userController.getAllUser);

router.route('/user/:id')
.get(userController.getUser);
router.route('/delete/:id')
.get(userController.deleteView);


router.route('/registration')
.post(userController.createUser);
router.route('/update')
.post(userController.updateUser)
router.route('/delete')
.post(userController.deleteUser);


module.exports = router;