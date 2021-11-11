package moviestarz.watchlists;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.*;

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

    @GetMapping("/{ownerUsername}")
    public List<Watchlist> getAllWatchlists(@PathVariable String ownerUsername){
        return repo.findAllByOwnerUsername(ownerUsername);
    }

    @GetMapping("/watchlist/{watchListId}")
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
        watchlist.setMovies(new ArrayList<>());
        watchlist.setAdminUsers(new ArrayList<>());
        watchlist.setViewerUsers(new ArrayList<>());

        for(String movie : payload.get("movies").split(",")){
            watchlist.addMovie(movie);
        }
//        watchlist.setAdminUsers(Arrays.asList(payload.get("adminUsers")));
        for(String admin : payload.get("adminUsers").split(",")){
            watchlist.addAdmin(admin);
        }
        for(String viewers : payload.get("viewerUsers").split(",")){
            watchlist.addUser(viewers);
        }
        repo.save(watchlist);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PatchMapping("/{watchlistId}/{movieId}")
    public ResponseEntity<Object> addMovie(@RequestBody Map<String, String> payload, @PathVariable String watchlistId, @PathVariable String movieId) {
        Watchlist watchlist = repo.findById(watchlistId).orElse(null);
        if(watchlist == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        List<String> movies = watchlist.getMovies();
        movies.add(movieId);
        watchlist.setMovies(movies);
        repo.save(watchlist);
        return new ResponseEntity<>(watchlist, HttpStatus.OK);
    }
}
