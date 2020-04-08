const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AbsenceSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    associatedUsersEmail: {
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
