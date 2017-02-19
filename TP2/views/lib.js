var app = angular.module('fileUpload', ['ngFileUpload']);
app.controller('fileController', ['$scope', 'Upload', '$http', function ($scope, Upload, $http) {
    $scope.submit = function() {
        $scope.upload($scope.file);
    };

    $scope.upload = function (file) {
      Upload.upload({
          url: '/api/photo',
          data: {file: $scope.picFile}
      }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + ' sent to server. Response: ' + resp.data);
      });
      // $http({
      //   method: 'post',
      //   url: '/api/photo',
      //   headers: {'Content-Type': 'multipart/form-data'},
      //   data: {
      //     upload: $scope.picFile
      //   }
      // });
    };
}]);

$(document).ready(function() {
     $('#uploadForm').submit(function() {
        $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({
            error: function(xhr) {
              status('Error: ' + xhr.status);
            },
            success: function(response) {
              $("#status").empty().text(response);
              console.log(response);
            }
        });
        return false;
    });
});
