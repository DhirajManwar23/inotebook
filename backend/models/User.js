
const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: {
      type: String,
      required : true
    },
    email: {
      type: String,
      required : true,
      index:true,
      unique:true,
      sparse:true
    },
    password: {
      type: String,
      required : true
    },
    date: {
      type: String,
      default : Date.now
    },

  });

  const User = mongoose.model('user', UserSchema);
  UserSchema.index();
  module.exports = User;