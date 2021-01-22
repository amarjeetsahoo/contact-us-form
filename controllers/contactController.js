const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = mongoose.model('Contacts');

router.get('/', (req, res) => {
    res.render("contact/addOrEdit", {
        viewTitle: "Insert Entry"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var contact = new Contact();
    contact.fullName = req.body.fullName;
    contact.email = req.body.email;
    contact.mobile = req.body.mobile;
    contact.city = req.body.city;
    contact.save((err, doc) => {
        if (!err)
            res.redirect('contact/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("contact/addOrEdit", {
                    viewTitle: "Insert Entry",
                    contact: req.body
                });
            }
            else
                console.log('Error during INSERTION: ' + err);
        }
    });
}

function updateRecord(req, res) {
    Contact.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('contact/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("contact/addOrEdit", {
                    viewTitle: 'Update contact',
                    contact: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Contact.find((err, docs) => {
        if (!err) {
            res.render('contact/list', {
                list: docs.map(doc => doc.toJSON())
            });
        }
        else {
            console.log('Error in retrieving contact list: ' + err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

// router.get('/:id', (req, res) => {
//     Contact.findById(req.params.id, (err, doc) => {
//         if (!err) {
//             res.render("contact/addOrEdit", {
//                 viewTitle: "Update Contact",
//                 contact: doc
//             });
//         }
//     });
// });

router.get('/delete/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/contact/list');
        }
        else { console.log('Error in contact delete :' + err); }
    });
});

module.exports = router;