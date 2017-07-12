var app = angular.module("panel", ["ngRoute"]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });
    $routeProvider
        .when("/", {
            templateUrl: "../routes/all_vacancies.html",
            controller: "CtrlPanel"
        })
        .when("/vacancy/edit/:vacancyId", {
            templateUrl: "../routes/edit_vacancy.html",
            controller: "CtrlEditVacancy"
        })
        .when("/review", {
            templateUrl: "../routes/review.html",
            controller: "CtrlReview"
        })
        .when("/review/edit/:reviewId", {
            templateUrl: "../routes/edit_review.html",
            controller: "CtrlEditReview"
        })
        .when("/review/add", {
            templateUrl: "../routes/add_review.html",
            controller: "CtrlAddReview"
        })
        .when("/review/main", {
            templateUrl: "../routes/main_review.html",
            controller: "CtrlReviewMain"
        })
        .when("/review/edit/main_first/:reviewId", {
            templateUrl: "../routes/edit_review.html",
            controller: "CtrlEditFirstReviewMain"
        })
        .when("/review/edit/main_second/:reviewId", {
            templateUrl: "../routes/edit_review.html",
            controller: "CtrlEditSecondReviewMain"
        })
        .when("/review/add_main_first", {
            templateUrl: "../routes/add_review.html",
            controller: "CtrlAddFirstReviewMain"
        })
        .when("/review/add_main_second", {
            templateUrl: "../routes/add_review.html",
            controller: "CtrlAddSecondReviewMain"
        })
        .otherwise({
            templateUrl: "../routes/all_vacancies.html",
            controller: "CtrlPanel"
        });
}]);
