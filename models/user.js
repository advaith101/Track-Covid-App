const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    admin: {
      type: Boolean,
      default: false
    },
    location: {
      type: String,
      default: "Boston, MA"
    },
    department: {
      type: String,
      default: "Human Resources"
    }
});

module.exports = User = mongoose.model('User', UserSchema);
