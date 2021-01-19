const mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    message: {
        type: String
    }
});

mongoose.model('Contacts', contactSchema);