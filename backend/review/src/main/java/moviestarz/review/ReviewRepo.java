package moviestarz.review;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepo extends MongoRepository<Review, String> {
    Optional<Review> findById(String reviewId);
}
