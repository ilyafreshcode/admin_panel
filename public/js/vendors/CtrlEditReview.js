app.controller("CtrlEditReview", function ($scope, $http, $window, $routeParams, Upload) {
    $scope.reviewsData = [];
    $scope.oldImage = "";

    $http.post("/getAllReviews").then(function (reviews) {
        $scope.reviewsData = reviews.data.reviews[$routeParams.reviewId];
        $scope.oldImage = $scope.reviewsData.img;
    });

    $scope.update = function(){
        if($scope.oldImage !== $scope.reviewsData.img){
            $scope.upload();
        }
        else {
            $scope.saveChanges();
        }

    };

    $scope.upload = function(){
        Upload.upload({
            url: '/upload',
            data: {file: $scope.reviewsData.img}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            $scope.reviewsData.img = "/images/" + $scope.reviewsData.img.name;
            $scope.saveChanges();
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            $('.alert').show();
        }, function (evt) {
            $('.alert').hide();
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $('.progress').show();
            $('.progress .progress-bar').css("width", progressPercentage + "%");
        });
    };

    $scope.saveChanges = function(){
        $http.post("/getAllReviews").then(function (reviews) {
            var reviewsFile = reviews.data;
            reviewsFile.reviews[$routeParams.reviewId] = $scope.reviewsData;
            var newReviews = {review: reviewsFile};
            $http.post("/updateCurrentReview", newReviews).then(function (reviews) {
                showNotification('Отзыв изменён', 'ti-check');
                $window.location.href = "#/review";
            });
        });
    }
});