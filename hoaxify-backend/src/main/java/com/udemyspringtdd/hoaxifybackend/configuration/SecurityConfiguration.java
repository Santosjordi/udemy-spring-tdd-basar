package com.udemyspringtdd.hoaxifybackend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    AuthUserService authUserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        // Removes the header "WWW-Authenticate" in the response in case of failure
        http.httpBasic().authenticationEntryPoint(new BasicAuthenticationEntryPoint());

        // Spring checks if the request was authorized before allowing the matching request to continue
        http.authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/1.0/login").authenticated()
                .antMatchers(HttpMethod.PUT, "/api/1.0/users/{id:[0-9]+}").authenticated()
                .and()
                .authorizeRequests().anyRequest().permitAll(); //order in which the "authorize" is written matters!

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); //does not use session object
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authUserService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
