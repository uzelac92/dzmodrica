var app = angular.module('dzPrijava', ['ngRoute','ui.bootstrap', 'ngIdle','ngAnimate', 'ngSanitize']);

app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $routeProvider
    .when("/", 
    {
        title: 'Prijava',
        templateUrl : "prijavnica.html",
        controller: 'ulogovanjeCtrl'
    })
    .when("/laborant", 
    {
        title: 'Laborant',
        templateUrl : "l4b0r4nt.html",
        controller: 'labCtrl'
    })
    .when("/pacijent", 
    {
        title: 'Nalaz',
        templateUrl : "kalupHTML.html",
        controller: 'pacCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
   
}]);

app.config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
    IdleProvider.idle(600);
    IdleProvider.timeout(10);
    KeepaliveProvider.interval(10);

    IdleProvider.interrupt('keydown wheel mousedown touchstart touchmove scroll');
}]);


app.controller('customDialogCtrl', function ($scope, $uibModalInstance, $rootScope) {

    //-- Variables --//
    $rootScope.$on("CallParentMethod", function () {
      $uibModalInstance.dismiss('Canceled');
    });
  
    //-- Methods --//
    $scope.cancel = function () {
      $uibModalInstance.dismiss('Canceled');
    }; // end cancel
  
    $scope.save = function () {
      $uibModalInstance.close($scope.user.name);
    }; // end save
  
    $scope.hitEnter = function (evt) {
      if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.user.name, null) || angular.equals($scope.user.name, '')))
        $scope.save();
    };
  }) 
  
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});