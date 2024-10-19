package app.Basketball_Player_Stats;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int twoPScored;
    private int twoPShot;
    private int threePScored;
    private int threePShot;
    private int ftScored;
    private int ftShot;

    private int points;

    public Player() {}

    public Player(String name, int twoPScored, int twoPShot, int threePScored, int threePShot, int ftScored, int ftShot) {
        this.name = name;
        this.twoPScored = twoPScored;
        this.twoPShot = twoPShot;
        this.threePScored = threePScored;
        this.threePShot = threePShot;
        this.ftScored = ftScored;
        this.ftShot = ftShot;

    }
    public void calculatePoints(){
        this.points = (twoPScored * 2) + (threePScored * 3) + (ftScored * 1);

    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
