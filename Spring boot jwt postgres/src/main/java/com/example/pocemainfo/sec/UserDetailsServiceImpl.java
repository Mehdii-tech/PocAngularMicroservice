package com.example.pocemainfo.sec;

import com.example.pocemainfo.domain.Utilisateur;
import com.example.pocemainfo.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private AccountService accountService;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Utilisateur utilisateur=accountService.loadUserByEmail(email);
        if (utilisateur==null) throw new UsernameNotFoundException("invalid user");
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        utilisateur.getRoles().forEach(r->{
            authorities.add(new SimpleGrantedAuthority(r.getName()));
        });
        return new User(utilisateur.getEmail(), utilisateur.getPassword(), authorities);
    }
}
