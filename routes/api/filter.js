const express = require('express');
const router = express.Router();

// Data Models
const User = require('../../models/User');
const Absence = require('../../models/Absence');

// @route   GET api/filter
// @desc    Filter absences based on { user } and { absence } query
// @access  Public
router.post('/', async (req, res) => {  
    console.log('hello')  
    console.log(req);
    const users = await User.find(req.body.userQuery)
    console.log('bye')
    console.log(users);
    const filteredUserEmails = users.map(user => user.email);
    const filteredAbsencesBasedOnEmails = await Absence.find(req.body.absenceQuery).where('id').in(filteredUserEmails)
    console.log('slatt')
    res.json(filteredAbsencesBasedOnEmails)
});

module.exports = router;