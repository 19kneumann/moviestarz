package moviestarz.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin()
public class ReviewController {

    @Autowired
    private ReviewRepo repo;

    @Autowired
    private LoadBalancerClient loadBalancerClient;

    @Autowired
    private RestTemplate restTemplate;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @PostMapping
    public ResponseEntity<Object> createReview(@RequestBody Map<String, Object> payload){
        Review review = new Review();
        review.setOwnerUsername(payload.get("ownerUsername").toString());
        review.setPublic(Boolean.parseBoolean(payload.get("isPublic").toString()));
        review.setMovie(payload.get("movie").toString());
        review.setImage(payload.get("image").toString());
        review.setRating(payload.get("rating").toString());
        review.setDescription(payload.get("description").toString());
        repo.save(review);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/review/{reviewId}")
    public ResponseEntity<Object> getSingleReview(@PathVariable String reviewId){
        Review review = repo.findById(reviewId).orElse(null);
        if(review != null){
            return new ResponseEntity<>(review, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{ownerUsername}")
    public List<Review> getAllReviews(@PathVariable String ownerUsername){

        ServiceInstance serviceInstance = loadBalancerClient.choose("user-service");
        String url = serviceInstance.getUri() + "/getFriends/" + ownerUsername;
        List<String> friends = restTemplate.getForObject(url, List.class);
        List<Review> reviews = repo.findAllByOwnerUsernameOrPublicIsTrue(ownerUsername, friends);
        Collections.reverse(reviews);
        return reviews;
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity<Object> updateReview(@RequestBody Map<String, Object> payload, @PathVariable String reviewId){
        Review review = repo.findById(reviewId).orElse(null);
        if(review == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        review.setOwnerUsername(payload.get("ownerUsername").toString());
        review.setPublic(Boolean.parseBoolean(payload.get("isPublic").toString()));
//        review.setMovie(payload.get("movie").toString());
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

    @PatchMapping("/addComment")
    public ResponseEntity<Object> addComment(@RequestBody Map<String, Object> payload){
        Review review = repo.findById(payload.get("reviewId").toString()).orElse(null);
        if(review != null) {
           Comment comment = new Comment();
           comment.setOwnerUsername(payload.get("ownerUsername").toString());
           comment.setComment(payload.get("comment").toString());
           review.addComment(comment);
           repo.save(review);
            return new ResponseEntity<>(comment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
