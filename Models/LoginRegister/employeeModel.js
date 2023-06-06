const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    employee_id: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true
    },
    appointment_date: {
        type: String
    },
    dob: {
        type: String
    },
});
const employeeUser = mongoose.model('employee', employeeSchema);

module.exports = employeeUser;