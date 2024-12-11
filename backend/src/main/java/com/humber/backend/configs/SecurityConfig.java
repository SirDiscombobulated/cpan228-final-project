package com.humber.backend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

private final UserDetailsService userDetailsService;

public SecurityConfig(UserDetailsService userDetailsService) {
    this.userDetailsService = userDetailsService;
}
    //Security filter chain - rules for the application
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/store/home/**","/login","register/**").permitAll()
                        .requestMatchers("/store/index/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/store/ADMIN/**").hasRole("ADMIN")
                        .anyRequest().authenticated()//Any other request must be authenticated
                )
                .formLogin(httpSecurityFormLoginConfigurer -> {
                    httpSecurityFormLoginConfigurer.loginPage("/login").permitAll();
                        }
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
 //                       .logoutSuccessUrl("/restaurant/home")
                        .permitAll());

        return http.build();
    }


    @Bean
    public AuthenticationProvider authenticationProvider() {
          DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
          provider.setUserDetailsService(userDetailsService);
          provider.setPasswordEncoder(passwordEncoder());
    return provider;
    }




    @Bean
    public WebSecurityCustomizer ignoreResources(){
        return (webSecurity) -> webSecurity
                .ignoring()
                .requestMatchers("/css/**", "/h2-console/**");
    }
    //password encoder
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
