/*
File Name : index.js
Developers:  
Piraveen Udayakumar – 301102696
Yonas Berhane       – 301165447
Kyeongbin Noh       – 301130132
Ulkar Zakaryayeva   – 301107604 
Halim Yoo           – 301155567
Syeda Maria         - 301184173
 
Date: November 8, 2021
Description: Survey web application that has full CRUD functionality using Express, Node.JS, MongoDB and EJS templating engine.
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to the Survey Model
let surveyController = require('../controllers/survey');

/* GET Route for the Survey List page - READ Operation */
router.get('/', surveyController.displaySurveyList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', (req, res, next) => {
    res.render('contents/add', { title: 'Create Survey' });
});

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "owner": req.body.owner,
        "surveyId": req.body.surveyId,
        "status": req.body.status,
        "q1": req.body.q1,
        "q2": req.body.q2,
        "q3": req.body.q3
    });
    Survey.create(newSurvey, (err, Survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });

});

/* GET Route for displaying the Respond page - READ Operation */
router.get('/respond/:id', (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToRespond) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // show the edit page
            res.render('contents/respond', { title: 'Take Survey', survey: surveyToRespond });
        }
    });
});

/* POST Route for processing the Respond page - UPDATE Operation */
router.post('/respond/:id', (req, res, next) => {
    let id = req.params.id;
});

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // show the edit page
            res.render('contents/edit', { title: 'Edit Survey', survey: surveyToEdit });
        }
    });
});

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "owner": req.body.owner,
        "surveyId": req.body.surveyId,
        "status": req.body.status,
        "q1": req.body.q1,
        "q2": req.body.q2,
        "q3": req.body.q3
    });

    Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });

});

/* GET to perform Deletion - DELETE Operation */
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Survey.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
});

module.exports = router;