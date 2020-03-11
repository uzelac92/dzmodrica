app.controller('glavniCtrl', function($scope,mojServis,$location){

    $scope.korisnik = mojServis.getkorisnik();
    if($scope.korisnik.nalog == null || $scope.korisnik.nalog == undefined) {
        $location.path('/');
    }

});