package com.example.pocemainfo.sec;

import com.auth0.jwt.JWT;
import com.example.pocemainfo.domain.Utilisateur;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JWTAuthentificationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;
    public JWTAuthentificationFilter(AuthenticationManager authentificationManagerBuilder){
        this.authenticationManager=authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response){
        Utilisateur utilisateur1=null;
        try{
            utilisateur1 = new ObjectMapper().readValue(request.getInputStream(),Utilisateur.class);
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(utilisateur1.getEmail(),utilisateur1.getPassword())
            );
        }catch (IOException e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        List<String> roles=new ArrayList<>();
        authResult.getAuthorities().forEach(a->{
            roles.add(a.getAuthority());
        });

        // String jwt = JWT.create();

    }
}
