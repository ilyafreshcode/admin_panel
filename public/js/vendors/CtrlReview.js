app.controller("CtrlReview", function ($scope, $http) {
    $scope.reviewsData = [];

    $http.post("/getAllReviews").then(function (reviews) {
        $scope.reviewsData = reviews.data;
    });

});
