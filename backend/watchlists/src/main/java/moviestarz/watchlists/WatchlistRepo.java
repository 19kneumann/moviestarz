package moviestarz.watchlists;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface WatchlistRepo extends MongoRepository<Watchlist, String> {
//    , { adminUsers:{$regex:/?0/} }, { viewerUsers: {$regex: /?0} }
    @Query("{$or: [{ 'ownerUsername' : ?0 }, {'isPublic' : true}, {adminUsers: ?0}, {viewerUsers: ?0}  ]}")
    public List<Watchlist> findAllByOwnerUsername(String username);
}
