package com.udemyspringtdd.hoaxifybackend;

import com.udemyspringtdd.hoaxifybackend.user.User;
import com.udemyspringtdd.hoaxifybackend.user.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    TestEntityManager testEntityManager;

    @Autowired
    UserRepository userRepository;

    /* does not require before, as dataJpa is already cleaning the database after each test*/

    @Test
    public void findByUsername_whenUserExists_returnsUser(){
        User user = new User();

        user.setUsername("test-user");
        user.setDisplayName("test-display");
        user.setPassword("P4ssword");

        testEntityManager.persist(user);

        User inDB = userRepository.findByUsername("test-user");
        assertThat(inDB).isNotNull();
    }

    @Test
    public void findByUsername_whenUserDoesNotExists_returnsNull(){
        User inDB = userRepository.findByUsername("non-existent-user");
        assertThat(inDB).isNull();
    }

}