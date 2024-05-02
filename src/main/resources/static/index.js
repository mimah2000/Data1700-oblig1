function velg() {
    var filmValg = document.getElementById("lstVelgFilm").value;
    console.log("Valgt film: "+filmValg);
}

function kjopBillett() {
    const billett = {
        film: $("#lstVelgFilm").val(), //document.getElementById("lstVelgFilm").value,
        antall: $("#txtAntall").val(),//document.getElementById("txtAntall").value,
        fornavn: $("#txtFornavn").val(),//document.getElementById("txtFornavn").value,
        etternavn: $("#txtEtternavn").val(),//document.getElementById("txtEtternavn").value,
        telefonnr: $("#txtTelefonnr").val(),//document.getElementById("txtTelefonnr").value,
        epost: $("#txtEpost").val(),//document.getElementById("txtEpost").value
    };

    //Regex (regular expression) uttrykk:
    const telefonnrRegex = /^\d{8}$/;
    const epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let feilmeldinger = [];

    // Sjekk for tomme felter
    if (!billett.film || !billett.antall || !billett.fornavn || !billett.etternavn || !billett.telefonnr || !billett.epost) {
        alert("Fyll ut alle feltene.");
        feilmeldinger.push("tomme felt");
    }

    // Validering med regex
    if (!telefonnrRegex.test(billett.telefonnr)) {
        document.getElementById("TelefonnrError").innerHTML = "Ugyldig telefonnummer";
        document.getElementById("TelefonnrError").className="text-danger";
        feilmeldinger.push("Telefonnr");
    } else{
        document.getElementById("TelefonnrError").innerHTML="";
    }

    if (!epostRegex.test(billett.epost)) {
        document.getElementById("EpostError").innerHTML = "Ugyldig e-postadresse";
        document.getElementById("EpostError").className="text-danger";
        feilmeldinger.push("Epost");
    } else{
        document.getElementById("EpostError").innerHTML="";
    }

    // Sjekk av antall
    let antall = Number(billett.antall);
    if (isNaN(antall) || antall <= 0 || antall > 10) {
        document.getElementById("AntallError").innerHTML = "Antallet må være et tall mellom 1 og 10";
        document.getElementById("AntallError").className ="text-danger";
        feilmeldinger.push("Antall");
    } else{
        document.getElementById("AntallError").innerHTML="";
    }

    // Hvis ingen feilmeldinger; legger til billett og oppdaterer listen
    if (feilmeldinger.length === 0) {
        $.post("/lagreAlle", billett, function () {
            oppdaterBillettListe();
            tomFeltene();
        });
    }
}

function oppdaterBillettListe() {
    // get fra serveren List<bilett>
    $.get("/hentAlle", function(data){
        console.log(data);
        let billetter = data
        if (billetter.length === 0){
            $("#billetter").html("Det er ingen billetter i databasen.")
            return;
        }
        let ut = "<table class='table table-striped'>" +
            "<tr>" +
            "<th>Film</th><th>Antall</th><th>Fornavn</th>" +
            "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>";
        for (let liste of billetter) {
            ut += "<tr><td>" + liste.film + "</td><td>" + liste.antall + "</td><td>" +
                liste.fornavn + "</td><td>" + liste.etternavn + "</td><td>" +
                liste.telefonnr + "</td><td>" + liste.epost + "</td></tr>";
        }
        ut += "</table>";
        $("#billetter").html(ut);
        //document.getElementById("ut").innerHTML = ut;
    });
}

function tomFeltene() {
    document.getElementById("lstVelgFilm").value = "4568";
    document.getElementById("txtAntall").value = "";
    document.getElementById("txtFornavn").value = "";
    document.getElementById("txtEtternavn").value = "";
    document.getElementById("txtTelefonnr").value = "";
    document.getElementById("txtEpost").value = "";
    // Rens også feilmeldinger
    document.getElementById("TelefonnrError").innerHTML = "";
    document.getElementById("EpostError").innerHTML = "";
    document.getElementById("AntallError").innerHTML = "";
    $("#tomFeltene").html("");
}

function altDelete() {
    ut = "";
    $("#billetter").html(ut);
    $.get("/slettAlle", function(data) {
        console.log(data);
        //document.getElementById("ut").innerHTML = "";
        //billetter = [];
        $("#billetter").html("Billettene er slettet");
        return;
    });
}

/*
let billetter = [];

function velg() {
    var filmValg = document.getElementById("lstVelgFilm").value;
    console.log("Valgt film: "+filmValg);
}
function kjopBillett() {
    const billett = {
        film: $("#lstVelgFilm").val(),
        antall: $("#txtAntall").val(),
        fornavn: $("#txtFornavn").val(),
        etternavn: $("#txtEtternavn").val(),
        telefonnr: $("#txtTelefonnr").val(),
        epost: $("#txtEpost").val()
    };

    let feilmeldinger = validerBillett(billett);

    if (feilmeldinger.length === 0) {
        $.post("/lagreBillett", billett, function(data) {
            if (data.success) {
                billetter.push(billett);
                oppdaterBillettListe();
                tomFeltene();
                alert("Billett kjøpt!");
            } else {
                alert("Det oppstod en feil ved lagring av billetten.");
            }
        }).fail(function() {
            alert("Serverfeil: Kunne ikke fullføre forespørselen.");
        });
    } else {
        // Vis feilmeldinger til bruker
        feilmeldinger.forEach(function(feil) {
            $("#"+feil+"Error").html("Feil i " + feil);
        });
    }
}

function validerBillett(billett) {
    let feilmeldinger = [];
    const telefonnrRegex = /^\d{8}$/;
    const epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!billett.film || !billett.antall || !billett.fornavn || !billett.etternavn || !billett.telefonnr || !billett.epost) {
        feilmeldinger.push("tomme felt");
    }
    if (!telefonnrRegex.test(billett.telefonnr)) {
        feilmeldinger.push("Telefonnr");
    }
    if (!epostRegex.test(billett.epost)) {
        feilmeldinger.push("Epost");
    }
    let antall = Number(billett.antall);
    if (isNaN(antall) || antall <= 0 || antall > 10) {
        feilmeldinger.push("Antall");
    }

    return feilmeldinger;
}

 */



