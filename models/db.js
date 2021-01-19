const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Contacts = require('./contactModel');

dotenv.config();
mongoose.connect(process.env.DB_CONN,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to Database");
});