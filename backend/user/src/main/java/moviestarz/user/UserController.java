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

import javax.ws.rs.Path;
import java.util.ArrayList;
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

    @PatchMapping("/updateUser")
    public ResponseEntity<Object> change(@RequestBody Map<String, Object> payload) throws Exception {
        String username = payload.get("ownerUsername").toString();
        String oldPassword = payload.get("oldPassword").toString();
        String newPassword = payload.get("newPassword").toString();
        String email = payload.get("email").toString();
        UserClass user = repo.findById(username).orElse(null);
        if(user == null || !passwordEncoder.matches(oldPassword, user.getPassword())){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if(newPassword != ""){
            user.setPassword(passwordEncoder.encode(newPassword));
        }
        if(email != ""){
            user.setEmail(email);
        }
        repo.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
        @PatchMapping("/addFriend")
    public ResponseEntity<Object> sendFriendRequest(@RequestBody Map<String, Object> payload){
        String ownerUsername = payload.get("ownerUsername").toString();
        String friendUsername = payload.get("friendUsername").toString();

        UserClass owner = repo.findById(ownerUsername).orElse(null);
        UserClass friend = repo.findById(friendUsername).orElse(null);

        if(owner == null || friend == null){
            return new ResponseEntity<>("Hmm, there seems to be nobody by that name. Please Try again",HttpStatus.NOT_ACCEPTABLE);
        }
        if(friend.getPendingRequests().contains(owner.getUsername())){
            return new ResponseEntity<>("Woah! Looks like you already sent them a request. Slow down a little",HttpStatus.NOT_ACCEPTABLE);
        }
        if(owner.getUsername().equals(friend.getUsername())){
            return new ResponseEntity<>("You gotta add other people that aren't you!",HttpStatus.NOT_ACCEPTABLE);
        }
        if(owner.getFriends().contains(friend.getUsername())){
            return new ResponseEntity<>("You guys are already friends!!",HttpStatus.NOT_ACCEPTABLE);
        }

        friend.addToPending(owner.getUsername());
        repo.save(friend);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/friendResponse")
    public ResponseEntity<Object> respondToFriendRequest(@RequestBody Map<String, Object> payload){
        String response = payload.get("response").toString();
        String ownerUsername = payload.get("ownerUsername").toString();
        String friendUsername = payload.get("friendUsername").toString();

        UserClass owner = repo.findById(ownerUsername).orElse(null);
        UserClass friend = repo.findById(friendUsername).orElse(null);

        if(owner == null || friend == null || !friend.getPendingRequests().contains(owner.getUsername())){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(response.equals("accepted")){
            owner.addToFriends(friend.getUsername());
            friend.addToFriends(owner.getUsername());
        }
        friend.removeFromPending(owner.getUsername());
        owner.removeFromPending(friend.getUsername());
        repo.save(owner);
        repo.save(friend);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/removeFriend")
    public ResponseEntity<Object> removeFriend(@RequestBody Map<String, Object> payload){
        String ownerUsername = payload.get("ownerUsername").toString();
        String friendUsername = payload.get("friendUsername").toString();

        UserClass owner = repo.findById(ownerUsername).orElse(null);
        UserClass friend = repo.findById(friendUsername).orElse(null);

        if(owner == null || friend == null || !friend.getFriends().contains(owner.getUsername())){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        owner.removeFromFriends(friend.getUsername());
        friend.removeFromFriends(owner.getUsername());

        repo.save(owner);
        repo.save(friend);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getFriends/{owner}")
    public List<String> getFriends(@PathVariable String owner){
        UserClass user = repo.findById(owner).orElse(null);
        if(user == null){
            return new ArrayList<>();
        }
        return user.getFriends();
    }

    @GetMapping("/getPending/{owner}")
    public List<String> getPending(@PathVariable String owner){
        UserClass user = repo.findById(owner).orElse(null);
        if(user == null){
            return new ArrayList<>();
        }
        return user.getPendingRequests();
    }

}
