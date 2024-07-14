const mongoose = require('mongoose');
const ApplicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    resume: { type: String },
    coverLetter: { type: String },
    status: { type: String, default: 'Pending' },
    appliedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Application', ApplicationSchema);