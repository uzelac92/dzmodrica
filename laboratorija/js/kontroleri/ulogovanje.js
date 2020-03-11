app.controller('ulogovanjeCtrl', function($scope,webservice,$location,mojServis){
    $scope.korisnik = mojServis.getkorisnik();
    if($scope.korisnik.nalog != null && $scope.korisnik.nalog != undefined) {
        if($scope.korisnik.type == 'p4c') {
            $location.path('/pacijent');
        } else if($scope.korisnik.type == 'l4b'){
            $location.path('/laborant');
        }
    }

    // random sifra
    // console.log(Array(10).fill('0123456789abcdefghijklmnopqrstuvwxyz!-.?').map(x => x[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * x.length)]).join(''));

    $scope.ulogujSe = function() {
        var korime = $scope.korisnik.korime;
        var korsif = $scope.korisnik.korsifs;
        if(korime == '' || korime === undefined) {
            toastr.warning('Unesite korisničko ime.');
        } else if(korsif == '' || korsif === undefined) {
            toastr.warning('Unesite lozinku.');
        } else {
            var target = $(".spin");
            if (target.hasClass("done")) {
            } else {
                target.addClass("processing");

                var podaci = {
                    korime: '',
                    korsifr: '',
                    nalog: '',
                    sifranik: '',
                    type: ''
                };

                if(!isNaN(korime)) {
                    if(korime.length == 13) {
                        webservice.getKljucPacijent(korime,korsif).then(function (response) {
                            if(response.data.tajnost.prijava == 'uspesna') {
                                podaci = response.data.tajnost;
                                mojServis.setkorisnik(podaci.nalog,podaci.glavniKljuc,podaci.type);
                            } 
                        });
                    } else {
                        toastr.error('Vaše korisničko ime je JMBG, s toga mora biti 13 cifara');
                    }
                } else {
                    webservice.getKljucLaborant(korime,korsif).then(function (response) {
                        if(response.data.tajnost.prijava == 'uspesna') {
                            podaci = response.data.tajnost;
                            mojServis.setkorisnik(podaci.nalog,podaci.glavniKljuc,podaci.type);
                        }
                    });
                }

                setTimeout(function () {
                    target.removeClass("processing");
                    target.addClass("done");
                }, 1200);
                setTimeout(function () {
                    target.removeClass("done");
                    $scope.korisnik.korime = '';
                    $scope.korisnik.korsifs = '';
                    switch(podaci.type) {
                        case 'p4c': 
                            toastr.success('Uspesna prijava');
                            $location.path('/pacijent');
                            break;
                        case 'l4b': 
                            toastr.success('Uspesna prijava');
                            $location.path('/laborant');
                            break;
                        default:
                            toastr.error('Pogrešno korisničko ime ili lozinka');
                            break;
                    }
                    $scope.$apply();
                }, 1500);
            }
        }
    }

});