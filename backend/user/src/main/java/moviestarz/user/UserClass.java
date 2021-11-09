package moviestarz.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "User")
public class UserClass {
    @Id
    private String username;

    private String password;

    private String email;

    private List<String> friends = new ArrayList<>();

    private List<String> pendingRequests = new ArrayList<>();

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    public List<String> getPendingRequests() {
        return pendingRequests;
    }

    public void setPendingRequests(List<String> pendingRequests) {
        this.pendingRequests = pendingRequests;
    }

    public void addToPending(String user){
        this.pendingRequests.add(user);
    }

    public void addToFriends(String user){
        this.friends.add(user);
    }

    public void removeFromPending(String user){
        this.pendingRequests.remove(user);
    }
    public void removeFromFriends(String user){
        this.friends.remove(user);
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
