var app = angular.module('dzmodrica', ['ui.bootstrap']);

app.controller('glavniCtrl', function($scope,$uibModal,mojServis){

    mojServis.logoutNalog();
  
  	$scope.scrollInto = function(neki) {
      document.getElementById(neki).scrollIntoView({
        behavior: 'smooth'
      });

    }

    $scope.pokaziProzor = function() {
        $uibModal.open({
            templateUrl: 'prozor.html',
            controller: 'customDialogCtrl',
            size: 'lg',
        });
    }
    $scope.pokaziLab = function() {
        $uibModal.open({
            templateUrl: 'lab.html',
            controller: 'customDialogCtrl',
            size: 'xl',
        });
    }
    $scope.pokaziPed = function() {
        $uibModal.open({
            templateUrl: 'ped.html',
            controller: 'customDialogCtrl',
            size: 'xl',
        });
    }
    $scope.pokaziVijesti1 = function() {
      $uibModal.open({
          templateUrl: 'vijesti1.html',
          controller: 'customDialogCtrl',
          size: 'lg',
      });
    }
    $scope.pokaziVijesti2 = function() {
      $uibModal.open({
          templateUrl: 'vijesti2.html',
          controller: 'customDialogCtrl',
          size: 'lg',
      });
    }
    $scope.pokaziVijesti3 = function() {
      $uibModal.open({
          templateUrl: 'vijesti3.html',
          controller: 'customDialogCtrl',
          size: 'lg',
      });
    }
    $scope.pokaziPat = function() {
      $uibModal.open({
          templateUrl: 'pat.html',
          controller: 'customDialogCtrl',
          size: 'lg',
      });
    }
    $scope.pokaziVijesti4 = function() {
      $uibModal.open({
          templateUrl: 'vijesti4.html',
          controller: 'customDialogCtrl',
          size: 'lg',
      });
    }
    $scope.pokaziStom = function() {
      $uibModal.open({
          templateUrl: 'stom.html',
          controller: 'customDialogCtrl',
          size: 'lg',
      });
    }
    $scope.pokaziCbr = function() {
      $uibModal.open({
          templateUrl: 'cbr.html',
          controller: 'customDialogCtrl',
          size: 'xl',
      });
    }
    $scope.pokaziHes = function() {
      $uibModal.open({
          templateUrl: 'hes.html',
          controller: 'customDialogCtrl',
          size: 'lg',
      });
    }
    $scope.pokaziProzorcir = function() {
      $uibModal.open({
          templateUrl: '/cyrillic/prozor.html',
          controller: 'customDialogCtrl',
          size: 'lg',
      });
  }
  $scope.pokaziLabcir = function() {
      $uibModal.open({
          templateUrl: '/cyrillic/lab.html',
          controller: 'customDialogCtrl',
          size: 'xl',
      });
  }
  $scope.pokaziPedcir = function() {
      $uibModal.open({
          templateUrl: '/cyrillic/ped.html',
          controller: 'customDialogCtrl',
          size: 'xl',
      });
  }
  $scope.pokaziVijesti1cir = function() {
    $uibModal.open({
        templateUrl: '/cyrillic/vijesti1.html',
        controller: 'customDialogCtrl',
        size: 'lg',
    });
  }
  $scope.pokaziVijesti2cir = function() {
    $uibModal.open({
        templateUrl: '/cyrillic/vijesti2.html',
        controller: 'customDialogCtrl',
        size: 'lg',
    });
  }
  $scope.pokaziVijesti3cir = function() {
    $uibModal.open({
        templateUrl: '/cyrillic/vijesti3.html',
        controller: 'customDialogCtrl',
        size: 'lg',
    });
  }
  $scope.pokaziPatcir = function() {
    $uibModal.open({
        templateUrl: '/cyrillic/pat.html',
        controller: 'customDialogCtrl',
        size: 'lg',
    });
  }
  $scope.pokaziVijesti4cir = function() {
    $uibModal.open({
        templateUrl: '/cyrillic/vijesti4.html',
        controller: 'customDialogCtrl',
        size: 'lg',
    });
  }
  $scope.pokaziStomcir = function() {
    $uibModal.open({
        templateUrl: '/cyrillic/stom.html',
        controller: 'customDialogCtrl',
        size: 'lg',
    });
  }

  $scope.pokaziCbrcir = function() {
    $uibModal.open({
        templateUrl: '/cyrillic/cbr.html',
        controller: 'customDialogCtrl',
        size: 'xl',
    });
  }
  $scope.pokaziHescir = function() {
    $uibModal.open({
        templateUrl: '/cyrillic/hes.html',
        controller: 'customDialogCtrl',
        size: 'lg',
    });
  }
});


app.controller('customDialogCtrl', function ($scope, $uibModalInstance, $rootScope) {
    //-- Variables --//
    $rootScope.$on("CallParentMethod", function () {
      $uibModalInstance.dismiss('Canceled');
  
    });
  
    $scope.user = {
      name: ''
    };
  
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
  }) // end controller(customDialogCtrl)
  
  function myFunction(x) {
    x.classList.toggle("change");
  }