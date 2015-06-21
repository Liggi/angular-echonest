angular.module('MyApp', ['ngRoute'])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  	$locationProvider.html5Mode(true);
  	$routeProvider
  		.when('/', {
  			templateUrl: 'views/home.html',
  			controller: 'MainCtrl'
  		})
  		.otherwise({
  			redirectTo: '/'
  		})
  }]);