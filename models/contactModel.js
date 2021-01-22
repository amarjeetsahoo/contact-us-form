const mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    // lastname: {
    //     type: String
    // },
    email: {
        type:String,
        
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }
});

// Custom validation for email
contactSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Contacts', contactSchema);