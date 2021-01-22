const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.DB_CONN,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    },
    () => {
        console.log("Connected to Database");
    });

require('./contactModel');