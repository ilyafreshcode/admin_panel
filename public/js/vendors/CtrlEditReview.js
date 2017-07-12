app.controller("CtrlEditReview", function ($scope, $http, $window, $routeParams) {
    $scope.reviewsData = [];

    $http.post("/getAllReviews").then(function (reviews) {
        $scope.reviewsData = reviews.data.reviews[$routeParams.reviewId];
    });

    $scope.update = function(){
        $http.post("/getAllReviews").then(function (reviews) {
            var reviewsFile = reviews.data;
            reviewsFile.reviews[$routeParams.reviewId] = $scope.reviewsData;
            var newReviews = {review: reviewsFile};
            $http.post("/updateCurrentReview", newReviews).then(function (reviews) {
                showNotification('Отзыв изменён', 'ti-check');
                $window.location.href = "#/review";
            });
        });
    };
});