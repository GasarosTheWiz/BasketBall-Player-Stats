package app.Basketball_Player_Stats.controller;

import app.Basketball_Player_Stats.Player;
import Repository.PlayerRepository;
import app.Basketball_Player_Stats.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // setting CORS
@RestController
@RequestMapping("/players")
public class PlayerController {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlayerService playerService;

    // save player with calculating points
    @PostMapping("/save")
    public ResponseEntity<Player> savePlayer(@RequestBody Player player) {

        player.calculatePoints();

        // saving player in database
        Player savedPlayer = playerRepository.save(player);
        return ResponseEntity.ok(savedPlayer); // return saved player
    }

    // get all players
    @GetMapping("/all")
    public List<Player> getAllPlayers() {
        List<Player> players = playerRepository.findAll();
        for (Player player : players) {
            player.calculatePoints(); // calculate points if it is neccesary
        }
        return players;
    }

    @DeleteMapping("/deleteByName/{name}")
    public ResponseEntity<String> deletePlayerByName(@PathVariable String name) {
        try {
            playerService.deleteByName(name); // call to delete
            return ResponseEntity.ok("All entries for player deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting player: " + e.getMessage());
        }
    }



}
