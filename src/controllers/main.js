angular.module('MyApp')
  .controller('MainCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {
    $scope.location = "";
    $scope.message = "";

    $scope.searchOnLocation = function() {
      $scope.message = "";

      $http.get('/api/location/' + $scope.location).
        success(function(data, status, headers, config) {
          $scope.artists = data.artists;
        }).
        error(function(data, status, headers, config) { 
          $scope.message = "Unexpected error attempting to retrieve location data."
        });
    }

    $scope.clearLocationCache = function () {
      $http.post('/api/cache/clear')
        .success(function(data, status, headers, config) {
          $scope.message = "Cache cleared!";
        }).
        error(function(data, status, headers, config) {
          $scope.message = "Unexpected error attempting to clear cache.";
        });
    }

    $scope.dismissMessage = function () {
      $scope.message = "";
    }

  }]);