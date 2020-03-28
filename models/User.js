const mongoose = require('mongoose');

class absence {
  constructor(start_date, end_date, reason_code, current) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.reason_code = reason_code;
    this.current = current;
  }
}

const UserSchema = new mongoose.Schema({
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
  absences: {
    type: Array,
    default: new Array(), 
  },
  currentabsence: {
    type: absence,
    default: new absence()
  }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
