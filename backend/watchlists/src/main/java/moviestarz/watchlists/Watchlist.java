package moviestarz.watchlists;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "Watchlist")
public class Watchlist {
    @Id
    private String watchlistId;
    private String watchlistTitle;
    private List<String> movies = new ArrayList<>();
    private String ownerUsername ;
    private List<String> adminUsers = new ArrayList<>();
    private List<String> viewerUsers = new ArrayList<>();
    private boolean isPublic;

    public String getWatchlistId() {
        return watchlistId;
    }

    public void setWatchlistId(String watchlistId) {
        this.watchlistId = watchlistId;
    }

    public String getWatchlistTitle() {
        return watchlistTitle;
    }

    public void setWatchlistTitle(String watchlistTitle) {
        this.watchlistTitle = watchlistTitle;
    }

    public List<String> getMovies() {
        return movies;
    }

    public void setMovies(List<String> movies) {
        this.movies = movies;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public List<String> getAdminUsers() {
        return adminUsers;
    }

    public void setAdminUsers(List<String> adminUsers) {
        this.adminUsers = adminUsers;
    }

    public List<String> getViewerUsers() {
        return viewerUsers;
    }

    public void setViewerUsers(List<String> viewerUsers) {
        this.viewerUsers = viewerUsers;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

}
