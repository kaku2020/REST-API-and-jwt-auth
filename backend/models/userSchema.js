const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  },
  password: { type: String, required: true },
  phone: { type: String },
  image: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
