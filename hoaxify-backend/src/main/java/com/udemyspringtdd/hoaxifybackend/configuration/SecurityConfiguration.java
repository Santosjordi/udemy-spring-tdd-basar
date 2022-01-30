package com.udemyspringtdd.hoaxifybackend.configuration;

import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        // Removes the header "WWW-Authenticate" in the response in case of failure
        http.httpBasic().authenticationEntryPoint(new BasicAuthenticationEntryPoint());

        // Spring checks if the request was authorized before allowing the matching request to continue
        http.authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/1.0/login").authenticated()
                .and()
                .authorizeRequests().anyRequest().permitAll(); //order in which the "authorize" is written matters!
    }
}
