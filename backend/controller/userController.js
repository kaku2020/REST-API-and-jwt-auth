const User = require('../models/userSchema');
const middleware = require('../middleware/middleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.newUser = async (req, res) => {
    const { name, email, password, phone, image } = req.body;
    console.log("inside newUser",name, email, password, phone, image);
    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log("inside  bcrypt.hash");
        return res.status(500).json({ error: err });
      } else {
        // Create a new user
        console.log("inside  bcrypt.hash else");
        const user = new User({
          name,
          email,
          password: hash,
          phone,
          image
        });
  
        // Save the user to the database
        user.save()
          .then(result => {
            console.log(result);
            res.status(201).json({ message: 'User created successfully',result : result });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      }
    });
  };

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    // Find the user in the database
    User.findOne({ email })
      .exec()
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Auth failed' });
        }
  
        // Check the password
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({ message: 'Auth failed' });
          }
  
          if (result) {
            // Generate a JWT token
            const token = jwt.sign(
              { email: user.email, userId: user._id },
              process.env.JWT_KEY,
              { expiresIn: '1d' }
            );
  
            return res.status(200).json({ message: 'Auth successful', token : token});
          }
  
          return res.status(401).json({ message: 'Auth failed' });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };

exports.updateProfile = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    // const image = req.file.filename;
    const image = "";
  
    const userId = req.userData.userId;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.name = name;
      user.email = email;
      user.phone = phone;
      user.image = image;
  
      const updatedUser = await user.save();
  
      return res.status(200).json({ message: 'Profile updated', user: updatedUser });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

exports.updateProfilePicture = async (req, res) => {
    
    const image = req.file.filename;
    const userId = req.userData.userId;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.image = image;
  
      const updatedUser = await user.save();
  
      return res.status(200).json({ message: 'Profile Picture updated', user: updatedUser });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

exports.helloWorld = async  (req, res) => {
    res.send('Hello, World!');
  };
