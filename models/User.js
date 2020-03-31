const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

class Absence {
  constructor(start_date, end_date, reason_code, current) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.reason_code = reason_code;
    this.current = current;
  }

  toBSON() {
    return {
      start_date: this.start_date,
      end_date: this.end_date,
      reason_code: this.reason_code,
      current: this.current
    }
  }

}

// // This is an alternative
// const absenceSchema = new Schema({
//   start_date: Date,
//   end_date: Date,
//   reason_code: String,
//   current: Boolean // not sure what type this is supposed to be
// });

class AbsenceSchema extends mongoose.SchemaType {
  cast (v) {
    let x = {
      start_date: v.start_date,
      end_date: v.end_date,
      reason_code: v.reason_code,
      current: v.current
    }
    return new Absence(x)
  }
}

Schema.Types.Absence = AbsenceSchema;

const UserSchema = Schema({
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
    type: [Absence],
    default: [new Absence()], 
  },
  currentAbsence: {
    type: Absence,
    default: new Absence()
  }
});

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', UserSchema);

User.paginate().then({})

module.exports = User;
