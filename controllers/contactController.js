const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("contact/addOrEdit", {
        viewTitle: "Insert Entry"
    });
});

router.post('/', (req, res) => {
    console.log("Hi");
})

module.exports = router;