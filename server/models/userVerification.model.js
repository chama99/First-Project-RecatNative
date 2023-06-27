const mongoose = require('mongoose');

const UserVerificationSchema = mongoose.Schema({
    userId: String,

    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,
});

module.exports = mongoose.model('UserVerification', UserVerificationSchema);
