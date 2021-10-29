package moviestarz.watchlists;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WatchlistRepo extends MongoRepository<Watchlist, String> {
    public List<Watchlist> findAllByOwnerUsername(String username);
}
