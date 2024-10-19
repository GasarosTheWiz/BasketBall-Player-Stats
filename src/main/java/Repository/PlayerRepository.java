package Repository;


import app.Basketball_Player_Stats.Player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    @Transactional
        // adds safety in deleting
    void deleteByName(String name);

    List<Player> findByName(String name);
}

