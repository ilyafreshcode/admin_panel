app.controller("CtrlPanel", function ($scope, $http, $window) {
    $scope.allVacancies = [];
    $http.post("/getAllVacancies").then(function (vacancies) {
        $scope.allVacancies = vacancies.data;
    });

    $scope.update = function(){
        var vacancies = {vacancy: $scope.allVacancies};
        $http.post("/updateCurrentVacancy", vacancies).then(function (response) {
            $window.location.href = "#/";
        });
    };
});
