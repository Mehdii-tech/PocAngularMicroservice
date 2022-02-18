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
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

@SpringBootApplication
public class PocEmainfoApplication{



    @Autowired
    private RepositoryRestConfiguration repositoryRestConfiguration;


    public static void main(String[] args) {
        SpringApplication.run(PocEmainfoApplication.class, args);
    }

    @Bean
    CommandLineRunner start(AccountService accountService){
        repositoryRestConfiguration.exposeIdsFor(Utilisateur.class, Role.class);;
        return args->{
            accountService.save(new Role(null,"USER"));
            accountService.save(new Role(null,"ADMIN"));
            Stream.of("user1@outlook.fr","user2@gmail.com","user3@hotmail.fr","admin@yahoo.fr").forEach(un->{
                accountService.saveUser(un,"12345", new String("ADMIN") );
            });

        };
    }

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
