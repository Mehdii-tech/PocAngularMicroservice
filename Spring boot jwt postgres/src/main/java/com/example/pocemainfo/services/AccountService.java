package com.example.pocemainfo.services;

import com.example.pocemainfo.domain.Role;
import com.example.pocemainfo.domain.Utilisateur;

public interface AccountService {

    public Utilisateur saveUser(String email, String password);
    public Role      save(Role name);
    public Utilisateur loadUserByEmail(String email);
    public void addRoleToUser(String email,String name);
}
