const express = require('express');
const router = express.Router();

// Data Models
const User = require('../../models/user');
const Absence = require('../../models/absence');

// @route   GET api/filter
// @desc    Filter absences based on { user } and { absence } query
// @access  Public
router.post('/', async (req, res) => {  
    const users = await User.find(req.body.userQuery);
    const filteredUserEmails = users.map(user => user.email);
    const filteredAbsencesBasedOnEmails = await Absence.find(req.body.absenceQuery).where('id').in(filteredUserEmails);
    res.json(filteredAbsencesBasedOnEmails);
});

module.exports = router;