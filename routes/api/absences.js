const express = require('express');
const router = express.Router();

// Absence Model
const Absence = require('../../models/Absence');

// @route   GET api/absences
// @desc    Get an absence
// @access  Public
router.post('/', (req, res) => {
    Absence.find({ id: req.body.email })    
        .then(absence => res.json(absence))
        .catch(err => console.log('Absence not found. Error:' + err));
});

// @route   POST api/absences/create
// @desc    Create an absence
// @access  Public
router.post('/create', (req, res) => {
    const newAbsence = new Absence({
        id: req.body.id,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        reason: req.body.reason,
        current: req.body.current,
        processed: req.body.processed
    });

    newAbsence.save().then(absence => res.json(absence)).catch((err) => console.log("Error:" + err));
});

// @route   PUT api/absences
// @desc    Update an absence's processed attribute
// @access  Public
router.put('/', (req, res) => {
    Absence.findOneAndUpdate(
        {id: req.body.id},
        {processed: req.body.processed}, {new: true, useFindAndModify: false})
        .then(() => res.json())
        .catch(err => console.log(err));
});

// @route   DELETE api/absences
// @desc    Delete an absence
// @access  Public
router.delete('/', (req, res) => {
    Absence.deleteOne({ id: req.body.id })
    .then((val) => res.json({success: val.deletedCount}))
})

// @route   GET api/absences/all
// @desc    Get all absences
// @access  Public
router.get('/all', (req, res) => {
    Absence.find()
        .then(absences => res.json(absences))
        .catch(err => console.log('Absences not found. Error:' + err));
});

module.exports = router;