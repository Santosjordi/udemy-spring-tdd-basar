package com.udemyspringtdd.hoaxifybackend;

import com.udemyspringtdd.hoaxifybackend.user.User;
import com.udemyspringtdd.hoaxifybackend.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import java.util.stream.IntStream;

@SpringBootApplication
public class HoaxifyBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(HoaxifyBackendApplication.class, args);
    }

    @Bean
    @Profile("!test")
    CommandLineRunner run(UserService userService){
        return (args) -> {
            IntStream.range(1, 15).mapToObj(i -> {
                User user = new User();
                user.setUsername("user" + i);
                user.setDisplayName("display1"+i);
                user.setPassword("P4ssword");
                return user;
            }).forEach(userService::save);
        };
    }

}
