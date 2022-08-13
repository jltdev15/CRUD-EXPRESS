const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    emailAddress : {
        type: String,
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;