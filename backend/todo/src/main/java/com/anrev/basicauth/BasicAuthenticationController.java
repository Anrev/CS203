package com.anrev.basicauth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// All this class does is perform Basic Authentication with the front end to ensure frontend login corresponds with backend user and password

@RestController
// allow cross-origin requests (i.e., from port 4200 to 8080)
@CrossOrigin(origins = "http://localhost:4200/")
// Controller - Handle HTTP Requests
public class BasicAuthenticationController {

    @GetMapping(path = "/basicauth")
    public AuthenticationBean authenticationBean() {
        return new AuthenticationBean("You are authenticated!");
    }

}
