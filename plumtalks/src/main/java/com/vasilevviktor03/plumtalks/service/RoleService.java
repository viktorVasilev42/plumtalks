package com.vasilevviktor03.plumtalks.service;

import com.vasilevviktor03.plumtalks.model.Role;
import com.vasilevviktor03.plumtalks.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public void save(Role newRole) {
        roleRepository.save(newRole);
    }

    public Role findByAuthority(String authority) {
        return roleRepository.findByAuthority(authority).orElseThrow(NoSuchElementException::new);
    }
}
