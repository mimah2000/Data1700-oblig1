package com.example.oblig1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Repository
public class BillettRepository {
    @Autowired
    private JdbcTemplate db;
    public void lagreAlleKunder(Billett innBillett) {
        String sql = "Insert INTO Billett (film, antall, fornavn, etternavn, tlf, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(), innBillett.getEtternavn(),
                innBillett.getTelefonnr(), innBillett.getEpost());
    }
    public List<Billett> hentAlleKunder() {
        String sql = "SELECT * FROM Billett ORDER BY etternavn";
        List<Billett> alleKunder = db.query(sql, new BeanPropertyRowMapper(Billett.class));
        return alleKunder;
    }
    public void slettAlleKunder(){
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
