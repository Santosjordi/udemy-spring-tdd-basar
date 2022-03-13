package com.udemyspringtdd.hoaxifybackend.user;

import com.udemyspringtdd.hoaxifybackend.shared.CurrentUser;
import com.udemyspringtdd.hoaxifybackend.user.vm.UserVM;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @PostMapping("/api/1.0/login")
    UserVM handleLogin(@CurrentUser User loggedInUser){
        return new UserVM(loggedInUser);
    }
}
