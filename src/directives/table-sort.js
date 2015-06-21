angular.module('MyApp')
  .directive('tableSort', ['$log', function($log) {
    return { 
      link: function(scope, element, attrs) {
        element.stupidtable();
      }
    };
  }]);