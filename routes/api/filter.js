const express = require('express');
const router = express.Router();

// Data Models
const User = require('../../models/User');
const Absence = require('../../models/Absence');

// @route   GET api/filter
// @desc    Filter absences based on { user } and { absence } query
// @access  Public
router.get('/', async (req, res) => {    
    const users = await User.find(req.body.userQuery)
    const filteredUserEmails = users.map(user => user.email);
    const filteredAbsencesBasedOnEmails = await Absence.find(req.body.absenceQuery).where('id').in(filteredUserEmails)
    res.json(filteredAbsencesBasedOnEmails)
});

module.exports = router;