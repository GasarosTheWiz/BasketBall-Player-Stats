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

    
    public void deleteByName(String name) {
        List<Player> players = playerRepository.findByName(name); 
        if (!players.isEmpty()) {
            playerRepository.deleteAll(players); 
        } else {
            throw new RuntimeException("Player with name " + name + " not found");
        }
    }

    
    public Player savePlayer(Player player) {
        return playerRepository.save(player);
    }

    
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }
}

