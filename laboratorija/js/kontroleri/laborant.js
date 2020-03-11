app.controller('labCtrl', function($scope,$location,mojServis,webservice,Idle,Keepalive,$uibModal){
    $scope.korisnik = mojServis.getkorisnik();
    if($scope.korisnik.nalog == null || $scope.korisnik.nalog == undefined) {
        $location.path('/');
    } else {
        closeModals();
        Idle.watch();
    }
    $scope.izabrano = false;
    // document.addEventListener('contextmenu', event => event.preventDefault());

    $scope.dodajRez = function(licBr,rez) {
        webservice.putIFOBT(licBr,$scope.korisnik.sifranik,rez).then(function (response) {
            $scope.initPacs();
        });
    }

    $scope.kreirajPacijenta = function() {
        var imePrezime = $scope.imePrezime;
        var imeRoditelja = $scope.imeRoditelja;
        var licniBroj = $scope.licniJMBG;
        
        if(imePrezime == undefined || imePrezime == '') {
            toastr.error('Unesi ime pacijenta!');
        } else if(imeRoditelja == undefined || imeRoditelja == '') {
            toastr.error('Unesi ime jednog roditelja!');
        } else if(licniBroj == undefined || licniBroj == '' || licniBroj.length != 13) {
            toastr.error('Unesi pravilan JMBG od pacijenta!');
        } else {
            var vData = {
                vImePrezime:imePrezime,
                vImeRoditelja:imeRoditelja,
                vLicniBroj:licniBroj,
                vGlavniKljuc:$scope.korisnik.sifranik
            };
            
            webservice.putPacijent(vData).then(function (response) {
                if(response.data.status == "success") {
                    $scope.imePrezime = '';
                    $scope.imeRoditelja = '';
                    $scope.licniJMBG = '';
                    var sifra = response.data.sifra;
                    var el = document.createElement('div');
                    el.innerHTML = '<h3>'+imePrezime+':</h3>';
                    el.innerHTML += '<p>Korisnicko ime: <b>'+licniBroj+'</b></p>';
                    el.innerHTML += '<p>Lozinka ime: <b>'+sifra+'</b></p>';
                    printReg(el);
                    $scope.initPacs();
                    toastr.success('Uspesna registracija pacijenta');
                } else {
                    toastr.error('Neuspesna registracija pacijenta');
                }
            });
        }

    }

    function printReg(elem) {
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + elem.innerHTML + '</html>');
        popupWinindow.document.close();
    }

    $scope.prikaziDetalje = function(pac) {
        $scope.stariPodaci = pac;
        $scope.imePrezime = pac.nazivPacijenta;
        $scope.imeRoditelja = pac.pacijentOtac;
        $scope.licniJMBG = pac.pacijentJMBG;
        $scope.lozinka = pac.pacSifra;
        $scope.kliknuto = true;
        $scope.izabrano = true;
        $scope.showPac = true;
    }

    $scope.prikazTabelePod = function(jmbg) {
        $scope.showImuno = true;

        webservice.getImunoHemija(jmbg,$scope.korisnik.sifranik).then(function (response) {
            if(response.status == 200) {
                $scope.prikazano = true;
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

    $scope.zavediImunoHemiju = function() {
        var pacJMBG = $scope.imunoJMBG;
        var t3 = $scope.t3 == undefined ? '' : $scope.t3;
        var t4 = $scope.t4 == undefined ? '' : $scope.t4;
        var tsh = $scope.tsh == undefined ? '' : $scope.tsh;
        var ft3 = $scope.ft3 == undefined ? '' : $scope.ft3;
        var ft4 = $scope.ft4 == undefined ? '' : $scope.ft4;
        var antiTPOat = $scope.antiTPOat == undefined ? '' : $scope.antiTPOat;
        var antiTGat = $scope.antiTGat == undefined ? '' : $scope.antiTGat;
        var cea = $scope.cea == undefined ? '' : $scope.cea;
        var ca153 = $scope.ca153 == undefined ? '' : $scope.ca153;
        var ca199 = $scope.ca199 == undefined ? '' : $scope.ca199;
        var ca125 = $scope.ca125 == undefined ? '' : $scope.ca125;
        var tpsa = $scope.tpsa == undefined ? '' : $scope.tpsa;
        var fpsa = $scope.fpsa == undefined ? '' : $scope.fpsa;
        var ige = $scope.ige == undefined ? '' : $scope.ige;
        var vitd25oh = $scope.vitd25oh == undefined ? '' : $scope.vitd25oh;
        var pth = $scope.pth == undefined ? '' : $scope.pth;
        var feritin = $scope.feritin == undefined ? '' : $scope.feritin;
        var afp = $scope.afp == undefined ? '' : $scope.afp;
        var dimer = $scope.dimer == undefined ? '' : $scope.dimer;
        var fsh = $scope.fsh == undefined ? '' : $scope.fsh;
        var bhcg = $scope.bhcg == undefined ? '' : $scope.bhcg;

        var vData = {
            jmbg:pacJMBG,
            kljuc:$scope.korisnik.sifranik,
            t3 : t3,
            t4 : t4,
            tsh : tsh,
            ft3 : ft3,
            ft4 : ft4,
            antiTPOat : antiTPOat,
            antiTGat : antiTGat,
            cea : cea,
            ca153 : ca153,
            ca199 : ca199,
            ca125 : ca125,
            tpsa : tpsa,
            fpsa : fpsa,
            ige : ige,
            vitd25oh : vitd25oh,
            pth : pth,
            feritin : feritin,
            afp : afp,
            dimer : dimer,
            fsh : fsh,
            bhcg : bhcg
        };

        
        webservice.putImunoHemija(vData).then(function (response) {
            if(response.data.status == "success") {
                toastr.success('Podaci su zavedeni');
                $scope.initPacs();
                $scope.anulirajTabelu();
            } else {
                toastr.error('Neuspesno');
            }
        });
        
    }

    $scope.anulirajTabelu = function() {
        $scope.t3 = "";
        $scope.t4 = "";
        $scope.tsh = "";
        $scope.ft3 = "";
        $scope.ft4 = "";
        $scope.antiTPOat = "";
        $scope.antiTGat = "";
        $scope.cea = "";
        $scope.ca153 = "";
        $scope.ca199 = "";
        $scope.ca125 = "";
        $scope.tpsa = "";
        $scope.fpsa = "";
        $scope.ige = "";
        $scope.vitd25oh = "";
        $scope.pth = "";
        $scope.feritin = "";
        $scope.afp = "";
        $scope.dimer = "";
        $scope.fsh = "";
        $scope.bhcg = "";
    }

    $scope.prikazTabele = function(jmbg) {
        $scope.imunoJMBG = jmbg;
        $scope.showImuno = true;
        $scope.prikazano = false;
    }

    $scope.nulirajPolja = function() {
        $scope.imePrezime='';
        $scope.imeRoditelja='';
        $scope.licniJMBG='';
        $scope.lozinka='';
        $scope.kliknuto=false;
        $scope.izabrano = false;
    }

    $scope.initPacs = function() {
        webservice.getSviPacijenti($scope.korisnik.sifranik).then(function (response) {
            if(response.status == 200) {
                $scope.podaci = response.data.pacijenti;
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
        $location.path('/');
    });

    $scope.iskljuciMe = function() {
        closeModals();
        Idle.unwatch();
        mojServis.logoutNalog();
    }
});