package com.vasilevviktor03.plumtalks.repository;

import com.vasilevviktor03.plumtalks.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RoleRepository {
    private final JdbcTemplate jdbcTemplate;

    public void save(Role newRole) {
        String sql = "INSERT INTO role (authority) VALUES (?)";
        jdbcTemplate.update(sql, newRole.getAuthority());
    }

    public Optional<Role> findByAuthority(String authority) {
        String sql = "SELECT * FROM role WHERE authority = ?";

        try {
            Role role = jdbcTemplate.queryForObject(sql, (rs, rowNum) ->
                    new Role(
                            rs.getInt("roleId"),
                            rs.getString("authority")
                    )
            , authority);

            return Optional.ofNullable(role);
        }
        catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }
}
