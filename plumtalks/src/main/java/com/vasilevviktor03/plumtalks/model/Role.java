package com.vasilevviktor03.plumtalks.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

@Data
@AllArgsConstructor
public class Role implements GrantedAuthority {
    private int id;
    private String authority;

    @Override
    public String getAuthority() {
        return authority;
    }
}
