package com.example.oblig1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
@RestController
public class BillettController {
    @GetMapping ("/")
    public Billett returBillett(Billett innBillett){
        return innBillett;
    }
}
 */
@RestController
public class BillettController {
    @Autowired
    private BillettRepository rep;

    /*
    This method is mapped to the endpoint /lagreAlle and takes a Kunde object (customer object) as input.
    It uses the rep object to save the customer object to the database via the lagreAlleKunder method
    of the KundeRepository interface.
     */
    @PostMapping("/lagreAlle")
    public void lagreAlle(Billett innBillett) {
        rep.lagreAlleKunder(innBillett);
    }

    /*
    return a list of all customer objects in the database using the rep object
    to access the hentAlleKunder method of the KundeRepository interface.
     */
    @GetMapping("/hentAlle")
    public List<Billett> hentAlle() {
        return rep.hentAlleKunder();
    }
    //clears all customer objects from the database using the rep object to access the slettAlleKunder method

    @GetMapping("/slettAlle")
    public void slettAlle() {
        rep.slettAlleKunder();
    }
}
