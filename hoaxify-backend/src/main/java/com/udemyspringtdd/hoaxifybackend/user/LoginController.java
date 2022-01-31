package com.udemyspringtdd.hoaxifybackend.user;

import com.udemyspringtdd.hoaxifybackend.error.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @PostMapping("/api/1.0/login")
    void handleLogin(){}

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    ApiError handleAccessDeniedException(){
        return new ApiError(401, "Access error", "/api/1.0/login");
    }
}
