package moviestarz.watchlists;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface WatchlistRepo extends MongoRepository<Watchlist, String> {
    
}
