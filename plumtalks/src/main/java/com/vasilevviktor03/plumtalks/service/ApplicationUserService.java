package com.vasilevviktor03.plumtalks.service;

import com.vasilevviktor03.plumtalks.model.ApplicationUser;
import com.vasilevviktor03.plumtalks.repository.ApplicationUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ApplicationUserService implements UserDetailsService {
    private final ApplicationUserRepository userRepository;

    public void save(ApplicationUser newUser) {
        userRepository.save(newUser);
    }

    public void update(ApplicationUser user) {
        userRepository.update(user);
    }

    public ApplicationUser findByUsername(String username) {
        return userRepository.findUserByUsername(username).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user not found."));
    }
}
