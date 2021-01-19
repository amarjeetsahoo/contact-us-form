const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("contact/addOrEdit", {
        viewTitle: "Insert Entry"
    });
});

module.exports = router;