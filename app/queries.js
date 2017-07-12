var file = require('./file');

module.exports = function(app) {

    app.post('/getAllVacancies', function(req, res){
        res.send(file.getAllVacancy());
    });

    app.post('/updateCurrentVacancy', function(req, res){
        file.updateVacancy(req.body.vacancy);
        res.status(200).send('Vacancy was updated');
    });

    app.post('/getAllReviews', function(req, res){
        res.send(file.getAllReviews());
    });

    app.post('/updateCurrentReview', function(req, res){
        file.updateReview(req.body.review);
        res.status(200).send('Review was updated');
    });

    app.post('/getReviewsMain', function(req, res){
        res.send(file.getReviewsMain());
    });

    app.post('/updateReviewMain', function(req, res){
        file.updateReviewMain(req.body.review);
        res.status(200).send('Review was added');
    });

};