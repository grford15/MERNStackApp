const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//brings in mongoose & its schmema method

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  },
);
// sets up the userschema with the one field with the flags for it

const User = mongoose.model('User', userSchema);

module.exports = User;
