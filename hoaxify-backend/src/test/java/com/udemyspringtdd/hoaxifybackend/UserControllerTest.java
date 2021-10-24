package com.udemyspringtdd.hoaxifybackend;

import com.udemyspringtdd.hoaxifybackend.user.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {

    @Autowired
    TestRestTemplate testRestTemplate;

    @Test
    public void postUser_whenUserIsValid_receiveOK(){
        User user = new User();
        user.setUsername("test-user");
        user.setDisplayName("test-display");
        user.setPassword("P4ssword");


    }
}
