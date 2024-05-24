package com.vasilevviktor03.plumtalks.repository;

import com.vasilevviktor03.plumtalks.model.ApplicationUser;
import com.vasilevviktor03.plumtalks.model.Profile;
import com.vasilevviktor03.plumtalks.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class ApplicationUserRepository {
    private final JdbcTemplate jdbcTemplate;
    private final ProfileRepository profileRepository;

    public void save(ApplicationUser newUser) {
        String sql = "INSERT INTO user (username, password, verificationCode, enabled) VALUES (?,?,?,?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update((connection) -> {
            PreparedStatement ps = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setString(1, newUser.getUsername());
            ps.setString(2, newUser.getPassword());
            ps.setString(3, newUser.getVerificationCode());
            ps.setBoolean(4, newUser.isEnabled());
            return ps;
        }, keyHolder);

        for (Role authority : newUser.getAuthoritiesAsSet()) {
            String roleSql = "INSERT IGNORE INTO user_role_junction (userId, roleId) VALUES (?,?)";
            jdbcTemplate.update(roleSql, keyHolder.getKey().intValue(), authority.getId());
        }

        profileRepository.save(new Profile(keyHolder.getKey().intValue(), newUser.getUsername()));
    }

    public void update(ApplicationUser user) {
        String sql = "UPDATE user SET username = ?, password = ?, verificationCode = ?, enabled = ? WHERE userId = ?";
        jdbcTemplate.update(sql, user.getUsername(), user.getPassword(), user.getVerificationCode(), user.isEnabled(), user.getId());

        for (Role authority : user.getAuthoritiesAsSet()) {
            String roleSql = "INSERT IGNORE INTO user_role_junction (userId, roleId) VALUES (?,?)";
            jdbcTemplate.update(roleSql, user.getId(), authority.getId());
        }
    }

    public Optional<ApplicationUser> findUserByUsername(String username) {
        String sql = "SELECT * FROM user" +
                " JOIN user_role_junction uj on User.userId = uj.userId JOIN role r on r.roleId = uj.roleId" +
                " WHERE username = ?";

        Set<Role> roles = new HashSet<>();
        List<ApplicationUser> allUsers = jdbcTemplate.query(sql, (rs, rowNum) -> {
            roles.add(new Role(rs.getInt("roleId"), rs.getString("authority")));
            return new ApplicationUser(
                    rs.getInt("userId"),
                    rs.getString("username"),
                    rs.getString("password"),
                    new HashSet<>(),
                    rs.getString("verificationCode"),
                    rs.getBoolean("enabled")
            );
        }, username);

        if (allUsers.isEmpty()) return Optional.empty();
        ApplicationUser user = allUsers.get(0);
        user.setAuthorities(roles);
        return Optional.of(user);
    }
}
