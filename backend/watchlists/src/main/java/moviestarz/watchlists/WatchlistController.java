package moviestarz.watchlists;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.List;
import java.util.Map;

@RestController
public class WatchlistController {

    @Autowired
    WatchlistRepo repo;

    @PostMapping
    public ResponseEntity<Object> createWatchlist(@RequestBody Map<String, String> payload){
        Watchlist watchlist = new Watchlist();
        watchlist.setPublic(Boolean.parseBoolean(payload.get("isPublic").toString()));
        watchlist.setOwnerUsername(payload.get("ownerUsername"));
        repo.save(watchlist);
        return new ResponseEntity<>(watchlist, HttpStatus.OK);
    }

    @GetMapping
    public List<Watchlist> getAllWatchlists(){
        return repo.findAll();
    }

    @GetMapping("/{watchListId}")
    public ResponseEntity<Object> getSingle(@PathVariable String watchListId){
        Watchlist watchlist = repo.findById(watchListId).orElse(null);
        if(watchlist!= null){
            return new ResponseEntity<>(watchlist, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("/addUser")
    public ResponseEntity<Object> addUser(@RequestBody Map<String, String> payload){
        Watchlist watchlist = repo.findById(payload.get("watchlistId").toString()).orElse(null);
        if(watchlist == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        //TODO FINISH

        return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
    }
}
