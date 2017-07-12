app.controller("CtrlAddReview", function ($scope, $http, $window, $routeParams) {

    $scope.newReview = {
        text: "",
        name: "",
        title: ""
    };

    $scope.addReview = function(){
        $http.post("/getAllReviews", function(reviews){
            var reviewFile = reviews.data;
            reviewFile.reviews.push($scope.newReview);
            var reviewForAdd = {review: reviewFile};
            /*$http.post("/updateCurrentReview", reviewForAdd, function(response){
                showNotification('Отзыв добавлен', 'ti-check');
                $window.location.href = "#/review";
            });*/
        });
    };

});