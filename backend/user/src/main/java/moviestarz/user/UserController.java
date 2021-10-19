package moviestarz.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin()
public class UserController {

    @Autowired
    private UserRepo repo;

    @PostMapping
    public void createUser(@RequestBody Map<String, Object> payload){
        User user = new User();
        user.setUsername(payload.get("username").toString());
        user.setPassword(payload.get("password").toString());
        user.setEmail(payload.get("email").toString());
        repo.save(user);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Object> getByUsername(@PathVariable String username){
        User user = repo.findById(username).orElse(null);
        if(user == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @GetMapping("")
    public List<User> getAllUsers(){
        return repo.findAll();
    }

    @PatchMapping("/signIn")
    public ResponseEntity<Object> signIn(@RequestBody Map<String, Object> payload){
        User sentOverUser = new User();
        sentOverUser.setUsername(payload.get("username").toString());
        sentOverUser.setPassword(payload.get("password").toString());
        User dbUser = repo.findById(sentOverUser.getUsername()).orElse(null);
        if(dbUser != null && dbUser.getPassword().equals(sentOverUser.getPassword())){
            return new ResponseEntity<>(dbUser.getUsername(), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}
