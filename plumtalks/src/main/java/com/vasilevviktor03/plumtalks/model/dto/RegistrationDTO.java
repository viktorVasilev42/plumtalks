package com.vasilevviktor03.plumtalks.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RegistrationDTO {
    private String username;
    private String password;
}
