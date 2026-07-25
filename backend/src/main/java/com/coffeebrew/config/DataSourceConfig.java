package com.coffeebrew.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Configuration
@Profile("prod")
public class DataSourceConfig {

    @Value("${DATABASE_URL}")
    private String databaseUrl;

    @Bean
    public DataSource dataSource() {
        // Render provides: postgresql://user:pass@host:port/db
        // We need:        jdbc:postgresql://host:port/db with user/pass separate
        
        // Remove the protocol prefix
        String withoutProtocol = databaseUrl.replace("postgresql://", "");
        
        // Split by @ to separate credentials from host
        String[] atSplit = withoutProtocol.split("@");
        
        String username = null;
        String password = null;
        String hostAndDb;
        
        if (atSplit.length == 2) {
            // Has credentials: user:pass@host/db
            String[] creds = atSplit[0].split(":");
            username = creds[0];
            password = creds[1];
            hostAndDb = atSplit[1];
        } else {
            // No credentials in URL
            hostAndDb = atSplit[0];
        }
        
        String jdbcUrl = "jdbc:postgresql://" + hostAndDb;

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(jdbcUrl);
        config.setDriverClassName("org.postgresql.Driver");
        
        if (username != null) {
            config.setUsername(username);
        }
        if (password != null) {
            config.setPassword(password);
        }
        
        return new HikariDataSource(config);
    }
}