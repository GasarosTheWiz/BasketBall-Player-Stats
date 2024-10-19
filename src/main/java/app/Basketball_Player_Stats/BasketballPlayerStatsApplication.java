package app.Basketball_Player_Stats;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"app.Basketball_Player_Stats", "Repository"})
@EnableJpaRepositories("Repository")
public class BasketballPlayerStatsApplication {
	public static void main(String[] args) {
		SpringApplication.run(BasketballPlayerStatsApplication.class, args);
	}
}
