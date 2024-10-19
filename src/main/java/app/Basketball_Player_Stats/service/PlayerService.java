package app.Basketball_Player_Stats.service;



import Repository.PlayerRepository;
import app.Basketball_Player_Stats.Player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    // Μέθοδος για τη διαγραφή όλων των παικτών με το ίδιο όνομα
    public void deleteByName(String name) {
        List<Player> players = playerRepository.findByName(name); // Βρίσκουμε όλους τους παίκτες με αυτό το όνομα
        if (!players.isEmpty()) {
            playerRepository.deleteAll(players); // Διαγράφουμε όλους τους παίκτες με το συγκεκριμένο όνομα
        } else {
            throw new RuntimeException("Player with name " + name + " not found");
        }
    }

    // Μέθοδος για την αποθήκευση ενός παίκτη
    public Player savePlayer(Player player) {
        return playerRepository.save(player);
    }

    // Μέθοδος για την ανάκτηση όλων των παικτών
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }
}

