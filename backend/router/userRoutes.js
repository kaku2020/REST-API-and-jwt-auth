const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const useController = require('../controller/userController');


// Register a new user
router.post('/register', useController.newUser);
// Log in a user
router.post('/login', useController.login);
//Update a user
router.put('/profile', middleware.auth,useController.updateProfile);
//Update a user picture
router.put('/profile-picture', middleware.auth, middleware.image,useController.updateProfilePicture);
//Output HelloWorld
router.get('/',useController.helloWorld);

module.exports = router;
