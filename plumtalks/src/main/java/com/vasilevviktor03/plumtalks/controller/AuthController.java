package com.vasilevviktor03.plumtalks.controller;

import com.vasilevviktor03.plumtalks.model.dto.LoginResponseDTO;
import com.vasilevviktor03.plumtalks.model.dto.RegistrationDTO;
import com.vasilevviktor03.plumtalks.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authService;

    @PostMapping("/register")
    public boolean registerUser(@RequestBody RegistrationDTO body, HttpServletRequest request) {
        return authService.registerUser(body.getUsername(), body.getPassword(), getSiteUrl(request));
    }

    private String getSiteUrl(HttpServletRequest request) {
        String siteUrl = request.getRequestURL().toString();
        return siteUrl.replace(request.getServletPath(), "");
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody RegistrationDTO body) {
        return authService.loginUser(body.getUsername(), body.getPassword());
    }

    @GetMapping("/verify")
    public String verifyUser(@RequestParam String code) {
        return (authService.verify(code)) ? "verify_success" :"verify_fail";
    }
}
