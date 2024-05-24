package com.vasilevviktor03.plumtalks.service;

import com.vasilevviktor03.plumtalks.model.ApplicationUser;
import com.vasilevviktor03.plumtalks.model.Role;
import com.vasilevviktor03.plumtalks.model.dto.LoginResponseDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.io.UnsupportedEncodingException;
import java.util.Random;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {
    private final ApplicationUserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final TokenService tokenService;
    private final JavaMailSender mailSender;

    public boolean registerUser(String username, String password, String siteUrl) {
        String encodedPassword = passwordEncoder.encode(password);
        String randomCode = new Random()
                .ints(48, 123)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(64)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        String verificationCode = username + "/" + randomCode;

        Role userRole = roleService.findByAuthority("USER");
        Set<Role> authorities = Set.of(userRole);

        ApplicationUser newUser = new ApplicationUser(0, username, encodedPassword, authorities, verificationCode, false);
        userService.save(newUser);
        try {
            sendVerificationEmail(newUser, siteUrl);
        }
        catch (Exception e) {
            return false;
        }

        return true;
    }

    public LoginResponseDTO loginUser(String username, String password) {
        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            String token = tokenService.generateJwt(auth);
            ApplicationUser currUser = userService.findByUsername(username);
            if (!currUser.isEnabled()) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);

            return new LoginResponseDTO(token, String.valueOf(currUser.getId()));
        }
        catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }

    private void sendVerificationEmail(ApplicationUser user, String siteUrl) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getUsername();
        String fromAddress = "betierlistalpha@gmail.com";
        String senderName = "BeTierList";
        String subject = "Verify your BeTierList account";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "BeTierList.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getUsername());
        String verifyUrl = siteUrl + "/auth/verify?code=" + user.getVerificationCode();
        content = content.replace("[[URL]]", verifyUrl);
        helper.setText(content, true);
        mailSender.send(message);
    }

    public boolean verify(String verificationCode) {
        String[] verSplit = verificationCode.split("/");
        ApplicationUser user = userService.findByUsername(verSplit[0]);

        if (user.isEnabled()) return true;
        if (!user.getVerificationCode().equals(verificationCode)) return false;

        user.setVerificationCode(null);
        user.setEnabled(true);
        userService.update(user);
        return true;
    }
}
