app.factory('webservice', function ($http) {

    var obj = {};

    var labPrijava = 'https://dzmodrica.com/laboratorija/p4c1j3nt_4p1/pr1j4vn1c3/l4b0r4nt.php';
    var pacPrijava = 'https://dzmodrica.com/laboratorija/p4c1j3nt_4p1/pr1j4vn1c3/p4c1j3nt.php';

    var jedanPac = 'https://dzmodrica.com/laboratorija/p4c1j3nt_4p1/pr1k4z1/jedanP4c1j3nt.php';
    var sviPac = 'https://dzmodrica.com/laboratorija/p4c1j3nt_4p1/pr1k4z1/sviP4c1j3nt1.php';
    var jedanImuno = 'https://dzmodrica.com/laboratorija/p4c1j3nt_4p1/pr1k4z1/jedanImunoHemija.php';

    var ubaciPac = 'https://dzmodrica.com/laboratorija/p4c1j3nt_4p1/ub4c1/ubaciP4c1j3nt4.php';
    var ubaciIFOBT = 'https://dzmodrica.com/laboratorija/p4c1j3nt_4p1/ub4c1/ubaci1F0BT.php';
    var ubaciImunoHemija = 'https://dzmodrica.com/laboratorija/p4c1j3nt_4p1/ub4c1/ubaciImuno.php';
    
    
    obj.putIFOBT = function (id,kljuc,rez) {
        return $http.post(ubaciIFOBT + '?id='+id+"&kljuc="+kljuc+"&rez="+rez);
    }
    obj.putPacijent = function (data) {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        return $http.post(ubaciPac,data)
    }
    obj.putImunoHemija = function (data) {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        return $http.post(ubaciImunoHemija,data)
    }

    obj.getKljucLaborant = function(user,pass) {
        return $http.get(labPrijava + '?nalog='+ user + '&sifra=' + pass);
    }
    obj.getKljucPacijent = function(user,pass) {
        return $http.get(pacPrijava + '?nalog='+ user + '&sifra=' + pass);
    }

    obj.getJedanPacijent= function(kljuc,jmbg) {
        return $http.get(jedanPac + '?kljuc='+ kljuc + '&id=' + jmbg);
    }
    obj.getSviPacijenti= function(kljuc) {
        return $http.get(sviPac + '?kljuc='+ kljuc);
    }
    obj.getImunoHemija= function(id, kljuc) {
        return $http.get(jedanImuno + '?id='+ id + '&kljuc=' + kljuc);
    }

    return obj;

});