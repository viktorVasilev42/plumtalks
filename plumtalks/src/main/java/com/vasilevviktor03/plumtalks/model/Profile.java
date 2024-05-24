package com.vasilevviktor03.plumtalks.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Profile {
    private int userId;
    private String displayName;
}
