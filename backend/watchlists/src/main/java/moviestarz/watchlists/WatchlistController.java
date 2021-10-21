package moviestarz.watchlists;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin()
public class WatchlistController {

    @Autowired
    WatchlistRepo repo;

    @PostMapping
    public ResponseEntity<Object> createWatchlist(@RequestBody Map<String, String> payload){
        Watchlist watchlist = new Watchlist();
        watchlist.setWatchlistTitle(payload.get(("title")));
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

    @PatchMapping("/{watchlistId}")
    public ResponseEntity<Object> addUser(@RequestBody Map<String, String> payload, @PathVariable String watchlistId){
        Watchlist watchlist = repo.findById(watchlistId).orElse(null);
        if(watchlist == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        watchlist.setWatchlistTitle(payload.get(("title")));
        watchlist.setPublic(Boolean.parseBoolean(payload.get("isPublic").toString()));
        watchlist.setOwnerUsername(payload.get("ownerUsername"));
        watchlist.setMovies(Collections.singletonList(payload.get("movies")));
        watchlist.setAdminUsers(Collections.singletonList(payload.get("adminUsers")));
        watchlist.setViewerUsers(Collections.singletonList(payload.get("viewerUsers")));
        repo.save(watchlist);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
