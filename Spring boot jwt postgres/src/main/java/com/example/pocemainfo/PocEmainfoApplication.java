package com.example.pocemainfo;

import com.example.pocemainfo.domain.Role;
import com.example.pocemainfo.domain.Utilisateur;
import com.example.pocemainfo.repo.RoleRepository;
import com.example.pocemainfo.repo.UtilisateurRepository;
import com.example.pocemainfo.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.stream.Stream;

@SpringBootApplication
public class PocEmainfoApplication{

//    @Autowired
//    private UtilisateurRepository utilisateurRepository;
//
//    @Autowired
//    private RoleRepository roleRepository;


    public static void main(String[] args) {
        SpringApplication.run(PocEmainfoApplication.class, args);
    }

    @Bean
    CommandLineRunner start(AccountService accountService){
        return args->{
            accountService.save(new Role(null,"USER"));
            accountService.save(new Role(null,"ADMIN"));
            Stream.of("user1","user2","user3","admin").forEach(un->{
                accountService.saveUser(un,"1234");
            });

        };
    }

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
