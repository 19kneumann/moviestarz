package moviestarz.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.DisabledException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin()
public class UserController {

    @Autowired
    private UserRepo repo;

//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody Map<String, Object> payload){
        UserClass user = new UserClass();
        user.setUsername(payload.get("username").toString());
        UserClass checkIfAlreadyExists = repo.findById(user.getUsername()).orElse(null);
        if(checkIfAlreadyExists != null){ return new ResponseEntity<>(user, HttpStatus.CONFLICT);}
        user.setPassword(passwordEncoder.encode(payload.get("password").toString()));
        //user.setPassword(payload.get("password").toString());
        user.setEmail(payload.get("email").toString());
        repo.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Object> getByUsername(@PathVariable String username){
        UserClass user = repo.findById(username).orElse(null);
        if(user == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @GetMapping("")
    public List<UserClass> getAllUsers(){
        return repo.findAll();
    }

    @PatchMapping("/signIn")
    public ResponseEntity<Object> signIn(@RequestBody Map<String, Object> payload) throws Exception{
        UserClass sentOverUser = new UserClass();
        sentOverUser.setUsername(payload.get("username").toString());
        sentOverUser.setPassword(payload.get("password").toString());

        //UserDetails userDetails = userDetailsService.loadUserByUsername(sentOverUser.getUsername());

        //return new ResponseEntity<>(userDetails, HttpStatus.OK);

        UserClass dbUser = repo.findById(sentOverUser.getUsername()).orElse(null);
        //if(dbUser != null && dbUser.getPassword().equals(sentOverUser.getPassword())){
        if(dbUser != null && passwordEncoder.matches(sentOverUser.getPassword(), dbUser.getPassword())){
            return new ResponseEntity<>(dbUser.getUsername(), HttpStatus.OK);
        } else{
//            System.out.println("db Userpassword" + dbUser.getPassword());
//            System.out.println("raw password sent over" + sentOverUser.getPassword());
//            System.out.println("encoded sent over password"+passwordEncoder.encode(sentOverUser.getPassword()));
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}
