var app = angular.module("panel", ["ngRoute", "ngFileUpload"]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });
    $routeProvider
        .when("/", {
            templateUrl: "../all_vacancies.html",
            controller: "CtrlPanel"
        })
        .when("/vacancy/edit/:vacancyId", {
            templateUrl: "../edit_vacancy.html",
            controller: "CtrlEditVacancy"
        })
        .when("/review", {
            templateUrl: "../review.html",
            controller: "CtrlReview"
        })
        .when("/review/edit/:reviewId", {
            templateUrl: "../edit_review.html",
            controller: "CtrlEditReview"
        })
        .when("/review/add", {
            templateUrl: "../add_review.html",
            controller: "CtrlAddReview"
        })
        .when("/review/main", {
            templateUrl: "../main_review.html",
            controller: "CtrlReviewMain"
        })
        .when("/review/edit/main_first/:reviewId", {
            templateUrl: "../edit_review.html",
            controller: "CtrlEditFirstReviewMain"
        })
        .when("/review/edit/main_second/:reviewId", {
            templateUrl: "../edit_review.html",
            controller: "CtrlEditSecondReviewMain"
        })
        .when("/review/add_main_first", {
            templateUrl: "../add_review.html",
            controller: "CtrlAddFirstReviewMain"
        })
        .when("/review/add_main_second", {
            templateUrl: "../add_review.html",
            controller: "CtrlAddSecondReviewMain"
        })
        .otherwise({
            templateUrl: "../all_vacancies.html",
            controller: "CtrlPanel"
        });
}]);
