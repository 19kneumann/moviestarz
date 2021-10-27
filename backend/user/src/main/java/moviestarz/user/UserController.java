package moviestarz.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin()
public class UserController {

    @Autowired
    private UserRepo repo;


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public void createUser(@RequestBody Map<String, Object> payload){
        UserClass user = new UserClass();
        user.setUsername(payload.get("username").toString());
        user.setPassword(passwordEncoder.encode(payload.get("password").toString()));
        user.setEmail(payload.get("email").toString());
        repo.save(user);
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
        authenticate(sentOverUser.getUsername(), sentOverUser.getPassword());

        UserDetails userDetails = userDetailsService
                .loadUserByUsername(sentOverUser.getUsername());

        String token = jwtTokenUtil.generateToken(userDetails);

        return new ResponseEntity<>(token, HttpStatus.OK);

//        UserClass dbUser = repo.findById(sentOverUser.getUsername()).orElse(null);
//        if(dbUser != null && dbUser.getPassword().equals(sentOverUser.getPassword())){
//            return new ResponseEntity<>(dbUser.getUsername(), HttpStatus.OK);
//        } else{
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }

    }

    void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
