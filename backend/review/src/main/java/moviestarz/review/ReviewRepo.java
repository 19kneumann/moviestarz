package moviestarz.review;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepo extends MongoRepository<Review, String> {
    Optional<Review> findById(String reviewId);
    @Query("{$or: [{ 'ownerUsername' : ?0 }, {'isPublic' : true}, { ownerUsername: { $in: ?1 } } ]} {$orderby:{ _id : -1 }}")
    List<Review> findAllByOwnerUsernameOrPublicIsTrue(String username, List<String> friends);
}
