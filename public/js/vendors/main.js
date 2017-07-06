(function() {
    var app = angular.module("panel", ["ngRoute"]);

    app.controller("CtrlPanel", function ($scope, $http) {

        $scope.allVacancies = [];

        $http.post("/getAllVacancies").then(function (vacancies) {
            $scope.allVacancies = vacancies.data;
            console.log(vacancies.data);
        });
    });


    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider
            .when("/", {
                templateUrl: "../routes/all_vacancies.html",
                controller: "CtrlPanel"
            });

    }]);
})();