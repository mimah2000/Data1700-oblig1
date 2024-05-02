/*//Erklærer en variabel kalt billetter og initialiserer den til en tom array
let billetter = [];
function lagreBillett() {
    //Lager en boolean variabel "error" og setter den til false
    let error = false;
    //Lager objektet billett med egenskaper for hver av skjemainndataene.
    let billett = {
        film: document.getElementById("film").value,
        antall: document.getElementById("antall").value,
        fornavn: document.getElementById("fornavn").value,
        etternavn: document.getElementById("etternavn").value,
        tlf: document.getElementById("tlf").value,
        epost: document.getElementById("epost").value
    }
    /*
    Går gjennom hver egenskap i billett-objektet i en for in-løkke.
    Sjekker om verdien er en tom streng.
    Er den tom så ber den brukeren om å skrive inn og setter feilmld error til sann.
     */

    for (let i in billett) {
        if(billett[i] === "") {
            document.getElementById(i + "Error").innerHTML = "Vennligst fyll ut " + i;
            error = true;
          //Hvis den ikke er tom, sletter den innerHTMl-egenskapen til feilmld error.
        } else {
            document.getElementById(i + "Error").innerHTML = "";
        }
    }
    if(!error) {
        if (billett.antall < 1) {
            document.getElementById("antallError").innerHTML = "Antallet må være minst 1";
            error = true;
        }
        //Sjekker om tlf har 8 sifre
        if(billett.tlf.length !== 8) {
            document.getElementById("tlfError").innerHTML = "Vennligst skriv inn 8 sifre"
            error = true;
        }
        //Sjekker om epoist er gyldig og inneholder @ og.
        if (!billett.epost.includes(`@´) || !billett.epost.includes(".")) {
        document.getElementById("epostError").innerHTML = "Ugyldig epostadresse";
        error = true;
        }
    }
    //Hvis error er false, så legges billett-objektet til billetter-arrayet ved å bruke push()-metoden
    //og oppdaterer listen over billetter ved å bruke visBilletter()-funksjonen.
    if(!error) {
        billetter.push(billett);
        tomInput();
        visBilletter(billetter);

        $.post("/lagreAlle", billett, function (data) {
            console.log("Data saved to server:", data);
            hentAlle();
        });
    }

    function tomInput() {
        const input = ["film", "antall", "fornavn", "etternavn", "tlf", "epost"]
        for (let i = 0; i < input.length; i++) {
            document.getElementById(input[i]).value = "";
        }
    }
}

/*
Oppretter variabelen input som inneholder ID-ene til input-feltene som skal tømmes
ved hjelp av en for-løkke settes hvert av input-felt vediene til en tom streng
funksjonen brukes for å tømme input-feltene, slik at brukeren kan fylle ut en ny billett.
 */

//viser listen over billetter som er kjøpt.
    function visBilletter(billetter){
        let ut =
        <tr>
            <th>Film</th>
            <th>Antall</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>Telefonnummer</th>
            <th>E-post</th>
        </tr>

        //for-løkke som iterer gjennom billett-arrayet og genererer en HTML-streng som representerer hver billett(billett)
        //vil bli brukt til å oppdatere HTML-tabellen som viser alle de kjøpte billettene.
        for(let billett of billetter) {
            ut +=
                "<tr>" +
                "<td>" + billett.film + "</td>" +
                "<td>" + billett.antall + "</td>" +
                "<td>" + billett.fornavn + "</td>" +
                "<td>" + billett.etternavn + "</td>" +
                "<td>" + billett.tlf + "</td>" +
                "<td>" + billett.epost + "</td>" +
                "</tr>"
        }
            //På slutten vil ut-strengen inneholde alle billettene i billett-arrayet.
            $("#billetter").html(ut);
    }
    //sender objekt til server
    function hentAlle() {
        $.get("/hentAlle", function (data) {
            console.log("data received from server", data);
            visBilletter(data);
        });
    }
//funksjonen sletter all billettinformasjon i arrayet.
//den sletter også tabellen med billettinformasjonen ved å sette ID-en "billetter" til en tom string
function clearAll() {
    //slette data fra server
    $.get("/slettAlle", function (){
        console.log("All data deleted from server.");
        hentAlle();
    });
        //slette data fra klient
    billetter.length = 0;
    $("#billetter").html("");
} 
*/

//Erklærer en variabel kalt billetter og initialiserer den til en tom array
let billetter = [];

function lagreBillett() {
    let error = false;
    let billett = {
        film: document.getElementById("film").value,
        antall: document.getElementById("antall").value,
        fornavn: document.getElementById("fornavn").value,
        etternavn: document.getElementById("etternavn").value,
        tlf: document.getElementById("tlf").value,
        epost: document.getElementById("epost").value
    };

    for (let i in billett) {
        if (billett[i] === "") {
            document.getElementById(i + "Error").innerHTML = "Vennligst fyll ut " + i;
            error = true;
        } else {
            document.getElementById(i + "Error").innerHTML = "";
        }
    }

    if (!error) {
        if (billett.antall < 1) {
            document.getElementById("antallError").innerHTML = "Antallet må være minst 1";
            error = true;
        }
        if (billett.tlf.length !== 8) {
            document.getElementById("tlfError").innerHTML = "Vennligst skriv inn 8 sifre";
            error = true;
        }
        if (!billett.epost.includes('@') || !billett.epost.includes(".")) {
            document.getElementById("epostError").innerHTML = "Ugyldig epostadresse";
            error = true;
        }
    }

    if (!error) {
        billetter.push(billett);
        tomInput();
        visBilletter(billetter);

        $.post("/lagreAlle", billett, function (data) {
            console.log("Data saved to server:", data);
            hentAlle();
        });
    }
}

function tomInput() {
    const inputs = ["film", "antall", "fornavn", "etternavn", "tlf", "epost"];
    inputs.forEach(input => {
        document.getElementById(input).value = "";
    });
}

function visBilletter(billetter) {
    let ut = "<tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>E-post</th></tr>";
    billetter.forEach(billett => {
        ut += \`<tr><td>${billett.film}</td><td>${billett.antall}</td><td>${billett