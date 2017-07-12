var fs = require('fs');
var jsonfile = require('jsonfile');

exports.getAllVacancy = function(){
    return JSON.parse(fs.readFileSync('./freshcodeit.github.io/_data/single.json'));
};

exports.updateVacancy = function(vacancy){
    jsonfile.writeFileSync('./freshcodeit.github.io/_data/single.json', vacancy);
};

exports.getAllReviews = function(){
    return JSON.parse(fs.readFileSync('./freshcodeit.github.io/_data/review.json'));
};

exports.updateReview = function(review){
    jsonfile.writeFileSync('./freshcodeit.github.io/_data/review.json', review);
};

exports.getReviewsMain = function(){
    return JSON.parse(fs.readFileSync('./freshcodeit.github.io/_data/main.json'));
};

exports.updateReviewMain = function(review){
    jsonfile.writeFileSync('./freshcodeit.github.io/_data/main.json', review);
};