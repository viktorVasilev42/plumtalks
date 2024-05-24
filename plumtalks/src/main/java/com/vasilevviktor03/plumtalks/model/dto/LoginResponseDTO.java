package com.vasilevviktor03.plumtalks.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginResponseDTO {
    private String jwt;
    private String userId;
}
