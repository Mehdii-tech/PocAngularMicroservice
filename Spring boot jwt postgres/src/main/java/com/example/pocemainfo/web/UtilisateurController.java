package com.example.pocemainfo.web;

import com.example.pocemainfo.domain.Utilisateur;
import com.example.pocemainfo.services.AccountService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UtilisateurController {
    @Autowired
    private AccountService accountService;
    @PostMapping("/register")
    public Utilisateur register(@RequestBody UserForm userForm){
        return accountService.saveUser(userForm.getEmail(), userForm.getPassword(), new String("ADMIN"));
    }

}
@Data
class UserForm{
    private String email;
    private String password;
}
