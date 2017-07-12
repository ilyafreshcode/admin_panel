app.controller("CtrlReviewMain", function ($scope, $http) {
    $scope.reviewsMan = [];
    $scope.reviewsWoman = [];

    $http.post("/getReviewsMain").then(function (reviews) {
        $scope.reviewsMan = reviews.data.horizontal_cards;
        $scope.reviewsWoman = reviews.data.vertical_cards;
    });

});

app.controller("CtrlEditFirstReviewMain", function ($scope, $http, $window, $routeParams) {
    $scope.reviewsData = [];

    $http.post("/getReviewsMain").then(function (reviews) {
        $scope.reviewsData = reviews.data.horizontal_cards[$routeParams.reviewId];
    });

    $scope.update = function(){
        $http.post("/getReviewsMain").then(function (reviews) {
            var reviewsFile = reviews.data;
            reviewsFile.horizontal_cards[$routeParams.reviewId] = $scope.reviewsData;
            var newReviews = {review: reviewsFile};
            $http.post("/updateReviewMain", newReviews).then(function (reviews) {
                showNotification('Отзыв изменён', 'ti-check');
                $window.location.href = "#/review/main";
            });
        });
    };
});

app.controller("CtrlEditSecondReviewMain", function ($scope, $http, $window, $routeParams) {
    $scope.reviewsData = [];

    $http.post("/getReviewsMain").then(function (reviews) {
        $scope.reviewsData = reviews.data.vertical_cards[$routeParams.reviewId];
    });

    $scope.update = function(){
        $http.post("/getReviewsMain").then(function (reviews) {
            var reviewsFile = reviews.data;
            reviewsFile.vertical_cards[$routeParams.reviewId] = $scope.reviewsData;
            var newReviews = {review: reviewsFile};
            $http.post("/updateReviewMain", newReviews).then(function (reviews) {
                showNotification('Отзыв изменён', 'ti-check');
                $window.location.href = "#/review/main";
            });
        });
    };
});

app.controller("CtrlAddFirstReviewMain", function ($scope, $http, $window, $routeParams) {
    $scope.newReview = {
        img: "",
        text: "",
        name: "",
        title: ""
    };

    $scope.addReview = function(){
        $http.post("/getReviewsMain", function(reviews){
            var reviewFile = reviews.data;
            reviewFile.horizontal_cards.push($scope.newReview);
            var reviewForAdd = {review: reviewFile};
            /*$http.post("/updateReviewMain", reviewForAdd, function(response){
                 showNotification('Отзыв добавлен', 'ti-check');
                 $window.location.href = "#/review/main";
             });*/
        });
    };
});

app.controller("CtrlAddSecondReviewMain", function ($scope, $http, $window, $routeParams) {
    $scope.newReview = {
        img: "",
        text: "",
        name: "",
        title: ""
    };

    $scope.addReview = function(){
        $http.post("/getReviewsMain", function(reviews){
            var reviewFile = reviews.data;
            reviewFile.vertical_cards.push($scope.newReview);
            var reviewForAdd = {review: reviewFile};
            /*$http.post("/updateReviewMain", reviewForAdd, function(response){
             showNotification('Отзыв добавлен', 'ti-check');
             $window.location.href = "#/review/main";
             });*/
        });
    };
});