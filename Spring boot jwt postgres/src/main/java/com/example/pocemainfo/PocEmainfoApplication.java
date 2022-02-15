package com.example.pocemainfo;

import com.example.pocemainfo.domain.Role;
import com.example.pocemainfo.domain.Utilisateur;
import com.example.pocemainfo.repo.RoleRepository;
import com.example.pocemainfo.repo.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PocEmainfoApplication implements CommandLineRunner {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private RoleRepository roleRepository;


    public static void main(String[] args) {
        SpringApplication.run(PocEmainfoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
       Role R1 = roleRepository.save(new Role(null, "ADMIN", null));
       utilisateurRepository.save(new Utilisateur(null, "Hassan","Hassan", "hassan@gmail.com", "hassan123", R1));
    }
}
