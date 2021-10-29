package moviestarz.review;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Document(collection = "Review")
public class Review {

    @Id
    private String reviewId;
    private boolean isPublic;
    private String movie;
    private String rating;
    private String ownerUsername;
    private String description;
    private List<Comment> comments = new ArrayList<>();


    public String generateId(){
        String values = "0123456789";
        String returnString = "";
        Random r = new Random();
        for(int i = 0; i < 9; i++){
            int random = r.nextInt((9 - 1) + 1) + 1;
            returnString += values.charAt(random);
        }
        return returnString;
    }

    public String getMovie() {
        return movie;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public String getReviewId() {
        return reviewId;
    }

    public void setReviewId(String reviewId) {
        this.reviewId = reviewId;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }
}
