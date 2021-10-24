package com.udemyspringtdd.hoaxifybackend.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private String username;
    private String displayName;
    private String password;


}
