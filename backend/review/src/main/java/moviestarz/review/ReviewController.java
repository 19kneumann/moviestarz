package moviestarz.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ReviewController {

    @Autowired
    private ReviewRepo repo;

    @PostMapping
    public ResponseEntity<Object> createReview(@RequestBody Map<String, Object> payload){
        Review review = new Review();
        review.setOwnerUsername(payload.get("ownerUsername").toString());
        review.setPublic(Boolean.parseBoolean(payload.get("isPublic").toString()));
        review.setMovie(payload.get("movie").toString());
        review.setRating(payload.get("rating").toString());
        review.setDescription(payload.get("description").toString());
        repo.save(review);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<Object> getSingleReview(@PathVariable String reviewId){
        Review review = repo.findById(reviewId).orElse(null);
        if(review != null){
            return new ResponseEntity<>(review, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping()
    public List<Review> getAllReviews(){
        return repo.findAll();
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity<Object> updateReview(@RequestBody Map<String, Object> payload, @PathVariable String reviewId){
        Review review = repo.findById(reviewId).orElse(null);
        if(review == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        review.setOwnerUsername(payload.get("ownerUsername").toString());
        review.setPublic(Boolean.parseBoolean(payload.get("isPublic").toString()));
        review.setMovie(payload.get("movie").toString());
        review.setRating(payload.get("rating").toString());
        review.setDescription(payload.get("description").toString());
        repo.save(review);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Object> deleteReview(@PathVariable String reviewId){
        Review review = repo.findById(reviewId).orElse(null);
        if(review != null) {
            ResponseEntity result = new ResponseEntity<>(review, HttpStatus.OK);
            repo.delete(review);
            return result;
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
