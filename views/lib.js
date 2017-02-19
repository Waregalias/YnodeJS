var app = angular.module('AnnuaireModule', []);

app.controller('AnnuaireController', function($scope, $http) {
  $scope.master = {};

  $http.get('/users' , {}).then(function(result) {
    $scope.master = result.data;
  });

  $scope.list = function () {
    $http.get('/users' , {}).then(function(result) {
      $scope.master = result.data;
    });
  };

  $scope.add = function() {
     $http.post("/users", {
       params: {
         key: ($scope.master.length)+1, firstname: $scope.firstname, lastname: $scope.lastname, gender: $scope.gender}})
       .then(function successCallback(response) {
         $scope.successClass = 'bg-success';
         $scope.success = "L'utilisateur a été ajouté avec succès.";
         let list = $scope.list();
         $scope.master = angular.copy(list);
       });
  };

  $scope.delete = function(params) {
    $http({
      method: 'delete',
      url: '/users',
      data: {
          key: params
      },
      headers: {
          'Content-type': 'application/json;charset=utf-8'
    }})
    .then(function(response) {
      $scope.successClass = 'bg-danger';
      $scope.success = "L'utilisateur a été supprimé avec succès.";
      let list = $scope.list();
      $scope.master = angular.copy(list);
    }, function(rejection) {
      console.log(rejection.data);
    });
  };
});
