package com.example.pocemainfo.repo;

import com.example.pocemainfo.domain.Role;
import com.example.pocemainfo.domain.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.server.ExposesResourceFor;

import javax.persistence.Id;
import java.lang.annotation.Target;
import java.util.List;

@RepositoryRestResource
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    public Utilisateur findByEmail(String email);
}
