package moviestarz.review;

import java.util.ArrayList;
import java.util.List;

public class Comment {

    private String ownerUsername;
    private String comment;
    private List<String> childrenComments = new ArrayList<>();

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public List<String> getChildrenComments() {
        return childrenComments;
    }

    public void setChildrenComments(List<String> childrenComments) {
        this.childrenComments = childrenComments;
    }
}
