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

    /*
    ! er kjent som NOT-operatoren. Når den brukes i en betingelse,
    vil "!" foran en variabel/uttrykk gjøre uttrykket sant hvis variabelen/uttrykket er falskt og omvendt.
    Det er en måte å sjekke om en variabel ikke har en verdi, "er falsk", eller "er tom".
    F.eks. "!billett.film" vil sjekke om "billett.film" er tom, "null", "undefined", eller på en annen måte "falsk" (i en boolsk kontekst).
     */
    if (!billett.film || !billett.antall || !billett.fornavn || !billett.etternavn || !billett.telefonnr || !billett.epost) {
        if (!billett.antall) document.getElementById("AntallError").innerHTML = "Vennligst fyll inn antall";
        if (!billett.fornavn) document.getElementById("FornavnError").innerHTML = "Vennligst fyll inn fornavn";
        if (!billett.etternavn) document.getElementById("EtternavnError").innerHTML = "Vennligst fyll inn etternavn";
        if (!billett.telefonnr) document.getElementById("TelefonnrError").innerHTML = "Vennligst fyll inn telefonnr";
        if (!billett.epost) document.getElementById("EpostError").innerHTML = "Vennligst fyll inn epost";
    } else {
        billetter.push(billett);
        let ut = "<table><tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
            "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>";
        for (let liste of billetter) {
            ut += "<tr><td>" + liste.film + "</td><td>" + liste.antall + "</td><td>" +
                liste.fornavn + "</td><td>" + liste.etternavn + "</td><td>" +
                liste.telefonnr + "</td><td>" + liste.epost + "</td></tr>";
        }
        ut += "</table>";
        document.getElementById("ut").innerHTML = ut;

        document.getElementById("txtAntall").value = "";
        document.getElementById("txtFornavn").value = "";
        document.getElementById("txtEtternavn").value = "";
        document.getElementById("txtTelefonnr").value = "";
        document.getElementById("txtEpost").value = "";
        document.getElementById("AntallError").innerHTML = "";
        document.getElementById("FornavnError").innerHTML = "";
        document.getElementById("EtternavnError").innerHTML = "";
        document.getElementById("TelefonnrError").innerHTML = "";
        document.getElementById("EpostError").innerHTML = "";
    }
}

function altDelete() {
    document.getElementById("ut").innerHTML = "";
    billetter = [];
}
