const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NOTE: `id` will correspond to the User.email property

const AbsenceSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    current: {
        type: Boolean,
        required: true
    },
    processed: {
        type: Boolean,
        required: true
    }
});

module.exports = Absence = mongoose.model('Absence', AbsenceSchema);
