require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require("body-parser");

const contactController = require('./controllers/contactController');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

app.use('/contact', contactController);