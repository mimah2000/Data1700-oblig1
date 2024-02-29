let billetter = [];

function kjopBillett() {
    const billett = {
        film: document.getElementById("lstVelgFilm").value,
        antall: document.getElementById("txtAntall").value,
        fornavn: document.getElementById("txtFornavn").value,
        etternavn: document.getElementById("txtEtternavn").value,
        telefonnr: document.getElementById("txtTelefonnr").value,
        epost: document.getElementById("txtEpost").value
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
        feilmeldinger.push("Telefonnr");
    }

    if (!epostRegex.test(billett.epost)) {
        document.getElementById("EpostError").innerHTML = "Ugyldig e-postadresse";
        feilmeldinger.push("Epost");
    }

    // Sjekk av antall
    let antall = Number(billett.antall);
    if (isNaN(antall) || antall <= 0 || antall > 10) {
        document.getElementById("AntallError").innerHTML = "Antallet må være et tall mellom 1 og 10";
        feilmeldinger.push("Antall");
    }

    // Hvis ingen feilmeldinger; legger til billett og oppdaterer listen
    if (feilmeldinger.length === 0) {
        billetter.push(billett);
        oppdaterBillettListe();
        tomFeltene();
    }
}

function oppdaterBillettListe() {
    let ut = "<table><tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>";
    for (let liste of billetter) {
        ut += "<tr><td>" + liste.film + "</td><td>" + liste.antall + "</td><td>" +
            liste.fornavn + "</td><td>" + liste.etternavn + "</td><td>" +
            liste.telefonnr + "</td><td>" + liste.epost + "</td></tr>";
    }
    ut += "</table>";
    document.getElementById("ut").innerHTML = ut;
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
}

function altDelete() {
    document.getElementById("ut").innerHTML = "";
    billetter = [];
}
