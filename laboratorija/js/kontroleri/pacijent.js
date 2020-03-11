app.controller('pacCtrl', function($scope,$location,webservice,mojServis,Idle,Keepalive,$uibModal){
    $scope.korisnik = mojServis.getkorisnik();
    if($scope.korisnik.nalog == null || $scope.korisnik.nalog == undefined) {
        $location.path('/');
    } else {
        webservice.getJedanPacijent($scope.korisnik.sifranik,$scope.korisnik.nalog).then(function (response) {
            var podaci = response.data.records;
            if(podaci[0].stanje == 'uspesno') {
                $scope.pacijent = podaci[0];
                $scope.iFobtOK = true;
                if($scope.pacijent.imunoTabela != 0) {
                    $scope.nemaImunoHem = true;
                    prikazTabelePod();
                } else {
                    $scope.nemaImunoHem = false;
                }
            } else {
                $scope.iFobtOK = false;
            }
        });
        closeModals();
        Idle.watch();
    }
  
    $scope.printElem = function() {
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write('<html><head>');
        mywindow.document.write("<link href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.0/css/bootstrap.min.css\" integrity=\"sha384-SI27wrMjH3ZZ89r4o+fGIJtnzkAnFs3E4qz9DIYioCQ5l9Rd/7UAa8DHcaL8jkWt\" crossorigin=\"anonymous\" rel=\"stylesheet\"><link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.9.0/css/all.css\"><link rel=\"stylesheet\" href=\"css/mojStil.css\">");
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById('IDstampaj').innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/


        setTimeout(function () {
        mywindow.print();
        mywindow.close();
        }, 1000);

        return true;
    }

    function prikazTabelePod() {

        webservice.getImunoHemija($scope.korisnik.nalog,$scope.korisnik.sifranik).then(function (response) {
            if(response.status == 200) {
                var imunHemPod = response.data.imunoHemija[0];
                $scope.t3 = imunHemPod.t3;
                $scope.t4 = imunHemPod.t4;
                $scope.tsh = imunHemPod.tsh;
                $scope.ft3 = imunHemPod.ft3;
                $scope.ft4 = imunHemPod.ft4;
                $scope.antiTPOat = imunHemPod.antiTPOat;
                $scope.antiTGat = imunHemPod.antiTGat;
                $scope.cea = imunHemPod.cea;
                $scope.ca153 = imunHemPod.ca153;
                $scope.ca199 = imunHemPod.ca199;
                $scope.ca125 = imunHemPod.ca125;
                $scope.tpsa = imunHemPod.tpsa;
                $scope.fpsa = imunHemPod.fpsa;
                $scope.ige = imunHemPod.ige;
                $scope.vitd25oh = imunHemPod.vitd25oh;
                $scope.pth = imunHemPod.pth;
                $scope.feritin = imunHemPod.feritin;
                $scope.afp = imunHemPod.afp;
                $scope.dimer = imunHemPod.ddimer;
                $scope.fsh = imunHemPod.fsh;
                $scope.bhcg = imunHemPod.bhcg;
            }
        });
    }

    function closeModals() {
        if ($scope.warning) {
          $scope.warning.close();
          $scope.warning = null;
        }

        if ($scope.timedout) {
          $scope.timedout.close();
          $scope.timedout = null;
        }
    }

    $scope.$on('IdleStart', function() {
        closeModals();
        $scope.warning = $uibModal.open({
            templateUrl: 'warning-dialog.html',
            controller: 'customDialogCtrl',
            size: 'md',
        });
    });

    $scope.$on('IdleTimeout', function() {
        $scope.iskljuciMe();
    });

    $scope.$on('IdleEnd', function() {
        closeModals();
    });

    // random sifra
    // console.log(Array(10).fill('0123456789abcdefghijklmnopqrstuvwxyz!-.?').map(x => x[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * x.length)]).join(''));

    $scope.iskljuciMe = function() {
        $scope.pacijent = null;
        closeModals();
        Idle.unwatch();
        mojServis.logoutNalog();
    }

});