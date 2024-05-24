package com.vasilevviktor03.plumtalks.repository;

import com.vasilevviktor03.plumtalks.model.Profile;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ProfileRepository {
    private final JdbcTemplate jdbcTemplate;

    public void save(Profile newProfile) {
        String sql = "INSERT INTO profile (userId, displayName) VALUES (?,?)";
        jdbcTemplate.update(sql, newProfile.getUserId(), newProfile.getDisplayName());
    }

    public void update(Profile profile) {
        String sql = "UPDATE profile SET displayName = ? WHERE userId = ?";
        jdbcTemplate.update(sql, profile.getDisplayName(), profile.getUserId());
    }

    public List<Profile> findAll(String currUsername) {
        String sql = "SELECT * FROM profile p " +
                "JOIN user u ON p.userId = u.userId " +
                "WHERE u.username != ?";
        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new Profile(
                    rs.getInt("userId"),
                    rs.getString("displayName")
            ),
        currUsername);
    }

    public Optional<Profile> findProfileByUsername(String username) {
        String sql = "SELECT * FROM user u" +
                " JOIN profile p ON u.userId = p.userId" +
                " WHERE username = ?";
        Profile profile = jdbcTemplate.queryForObject(
                sql,
                (rs, rowNum) -> new Profile(rs.getInt("userId"), rs.getString("displayName")),
                username
        );

        return Optional.ofNullable(profile);
    }
}
