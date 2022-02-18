package com.example.pocemainfo.services;

import com.example.pocemainfo.domain.Role;
import com.example.pocemainfo.domain.Utilisateur;
import com.example.pocemainfo.repo.RoleRepository;
import com.example.pocemainfo.repo.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.Collection;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {


    private UtilisateurRepository utilisateurRepository;
    private RoleRepository roleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AccountServiceImpl(UtilisateurRepository utilisateurRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }



    @Override
    public Utilisateur saveUser(String email, String password, String name) {
        Utilisateur utilisateur1=utilisateurRepository.findByEmail(email);
        if(utilisateur1!=null) throw new RuntimeException("User already exists");
        Utilisateur utilisateur=new Utilisateur();
        utilisateur.setEmail(email);
        utilisateur.setPassword(bCryptPasswordEncoder.encode(password));
        utilisateurRepository.save(utilisateur);
        addRoleToUser(email, name);
        addRoleToUser(email, "USER");
        return utilisateur;
    }

    @Override
    public Role save(Role name) {
        return roleRepository.save(name);
    }

    @Override
    public Utilisateur loadUserByEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }

    @Override
    public void addRoleToUser(String email, String name) {
        Utilisateur utilisateur=utilisateurRepository.findByEmail(email);
        Role role=roleRepository.findByName(name);
        utilisateur.getRoles().add(role);
    }
}
