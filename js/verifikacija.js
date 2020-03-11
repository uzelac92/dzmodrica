app.service('mojServis', function($location){
    var korisnik = {
        nalog: '',
        sifranik: '',
        type: '',
    }
    return {
        getkorisnik: function() {
            if(korisnik.nalog == "" && korisnik.sifranik == "") {
                korisnik.nalog = localStorage.getItem('kor_nalog');
                korisnik.sifranik = localStorage.getItem('kor_kljuc');
                korisnik.type = localStorage.getItem('kor_type');
            }
            return korisnik;
        },
        setkorisnik: function(nalog,kljuc,type) {
            localStorage.setItem('kor_nalog',nalog);
            localStorage.setItem('kor_kljuc',kljuc);
            localStorage.setItem('kor_type',type);
            korisnik.nalog = nalog;
            korisnik.sifranik = kljuc;
            korisnik.type = type;
        },
        logoutNalog: function() {
            korisnik.nalog = '';
            korisnik.sifranik = '';
            korisnik.type = '';
            localStorage.removeItem('kor_nalog');
            localStorage.removeItem('kor_kljuc');
            localStorage.removeItem('kor_type');
            localStorage.clear();
            $location.path('/');
        }
    }
})