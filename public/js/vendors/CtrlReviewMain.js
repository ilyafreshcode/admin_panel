app.controller("CtrlReviewMain", function ($scope, $http) {
    $scope.reviewsMan = [];
    $scope.reviewsWoman = [];

    $scope.savedIndex = 1;

    $http.post("/getReviewsMain").then(function (reviews) {
        $scope.reviewsMan = reviews.data.horizontal_cards;
        $scope.reviewsWoman = reviews.data.vertical_cards;
    });

    $scope.saveIndexForDelete = function(index){
        $scope.savedIndex = index;
    };

    $scope.deleteFromFirstSection = function(){
        $scope.reviewsMan.splice($scope.savedIndex, 1);
        saveChanges(true);
    };

    $scope.deleteFromSecondSection = function(){
        $scope.reviewsWoman.splice($scope.savedIndex, 1);
        saveChanges(false);
    };

    function saveChanges(isFirst){
        $http.post("/getReviewsMain").then(function (reviews) {
            var reviewsFile = reviews.data;
            (isFirst) ? reviewsFile.horizontal_cards = $scope.reviewsMan :
                reviewsFile.vertical_cards = $scope.reviewsWoman;
            console.log(reviewsFile);
            var newReviews = {review: reviewsFile};
            $http.post("/updateReviewMain", newReviews).then(function (reviews) {
                showNotification('Отзыв удален', 'ti-check');
            });
        });
    }

});

app.controller("CtrlEditFirstReviewMain", function ($scope, $http, $window, $routeParams, Upload) {
    $scope.reviewsData = [];
    $scope.oldImage = "";

    $http.post("/getReviewsMain").then(function (reviews) {
        $scope.reviewsData = reviews.data.horizontal_cards[$routeParams.reviewId];
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

app.controller("CtrlEditSecondReviewMain", function ($scope, $http, $window, $routeParams, Upload) {
    $scope.reviewsData = [];
    $scope.oldImage = "";

    $http.post("/getReviewsMain").then(function (reviews) {
        $scope.reviewsData = reviews.data.vertical_cards[$routeParams.reviewId];
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

app.controller("CtrlAddFirstReviewMain", function ($scope, $http, $window, Upload) {
    $scope.newReview = {
        img: "",
        text: "",
        name: "",
        title: ""
    };

    $scope.addReview = function(){
        Upload.upload({
            url: '/upload',
            data: {file: $scope.newReview.img}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            $scope.newReview.img = "/images/" + $scope.newReview.img.name;
            $scope.saveReview();
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

    $scope.saveReview = function(){
        $http.post("/getReviewsMain").then(function(reviews){
            var reviewFile = reviews.data;
            reviewFile.horizontal_cards.push($scope.newReview);
            var reviewForAdd = {review: reviewFile};
            $http.post("/updateReviewMain", reviewForAdd).then(function(response){
                 showNotification('Отзыв добавлен', 'ti-check');
                 $window.location.href = "#/review/main";
            });
        });
    };
});

app.controller("CtrlAddSecondReviewMain", function ($scope, $http, $window, Upload) {
    $scope.newReview = {
        img: "",
        text: "",
        name: "",
        title: ""
    };

    $scope.addReview = function(){
        Upload.upload({
            url: '/upload',
            data: {file: $scope.newReview.img}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            $scope.newReview.img = "/images/" + $scope.newReview.img.name;
            $scope.saveReview();
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

    $scope.saveReview = function(){
        $http.post("/getReviewsMain").then(function(reviews){
            var reviewFile = reviews.data;
            reviewFile.vertical_cards.push($scope.newReview);
            var reviewForAdd = {review: reviewFile};
            $http.post("/updateReviewMain", reviewForAdd).then(function(response){
                showNotification('Отзыв добавлен', 'ti-check');
                $window.location.href = "#/review/main";
            });
        });
    };


});