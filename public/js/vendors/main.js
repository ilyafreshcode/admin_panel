(function() {
    var app = angular.module("panel", ["ngRoute"]);

    app.controller("CtrlPanel", function ($scope, $http) {
        $scope.allVacancies = [];
        $http.post("/getAllVacancies").then(function (vacancies) {
            $scope.allVacancies = vacancies.data;
        });
    });

    app.controller("CtrlAddVacancy", function ($scope, $http, $window) {
        $scope.newVacancy = {
            name: "",
            isActive: true
        };
        $scope.addNewVacancy = function(){
            $scope.newVacancy.isActive.toString();

            if($scope.newVacancy.name !== "") {
                $http.post("/addVacancy", $scope.newVacancy).then(function (response) {
                    $window.location.href = "#/";
                }, function errorCallback(response) {
                    if(response.status !== -1){
                        $(".alert").show();
                    }
                });
            }
        };
    });

    app.controller("CtrlEditVacancy", function ($scope, $routeParams, $http) {
        var currentId =  {vacancyId: $routeParams.vacancyId};

        $scope.editVacancy = {
            vacancyId: $routeParams.vacancyId,
            name: "",
            isActive: true,
            experience: "",
            pluses: "",
            offer: ""
        };

        $http.post("/getCurrentVacancy", currentId).then(function (response) {
            console.log(response.data);
            $scope.editVacancy.name = response.data.name;
            if(parseInt(response.data.active) !== 1)
                $scope.editVacancy.isActive = false;
            $scope.editVacancy.experience = response.data.experienceText;
            $scope.editVacancy.pluses = response.data.plusText;
            $scope.editVacancy.offer = response.data.offerText;
        });

        $scope.update = function(){
            $http.post("/updateCurrentVacancy", $scope.editVacancy).then(function (response) {
                $window.location.href = "#/";
            }, function errorCallback(response) {
                if(response.status !== -1){
                    //$(".alert").show();
                }
            });
        };

    });

    app.controller("CtrlReview", function ($scope, $http) {

    });


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
            .when("/vacancy/add", {
                templateUrl: "../routes/add_vacancy.html",
                controller: "CtrlAddVacancy"
            })
            .when("/vacancy/edit/:vacancyId", {
                templateUrl: "../routes/edit_vacancy.html",
                controller: "CtrlEditVacancy"
            })
            .when("/review", {
                templateUrl: "../routes/review.html",
                controller: "CtrlReview"
            })
            .otherwise({
                mplateUrl: "../routes/all_vacancies.html",
                controller: "CtrlPanel"
            });

    }]);
})();