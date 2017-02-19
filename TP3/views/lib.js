var socket = io();

var app = angular.module('ChatModule', []);
app.controller('ChatController', function($scope, $http) {
  $scope.response = '';

  $http.get('/messages' , {}).then(function(result) {
    $scope.response = result.data;
  });

  socket.on('chat message', function(msg){
    $scope.response = $scope.list();
    $('#messages').append($('<li>').text(msg));
  });

  $scope.list = function () {
    $http.get('/messages' , {}).then(function(result) {
      $scope.response = result.data;
    });
    return $scope.response;
  };

  $scope.send = function () {
    $http.post("/messages", {
      params: {
        key: ($scope.response.length)+1, name: $scope.user, text: $scope.message}})
      .then(function successCallback(response) {
        let list = $scope.list();
        $scope.response = angular.copy(list);
    });
    socket.emit('chat message', $scope.message);
    $scope.message = '';
  };
});
