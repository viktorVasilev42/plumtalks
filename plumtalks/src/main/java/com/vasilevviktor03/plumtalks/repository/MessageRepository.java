package com.vasilevviktor03.plumtalks.repository;

import com.vasilevviktor03.plumtalks.model.Message;
import com.vasilevviktor03.plumtalks.model.dto.RecentChatDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MessageRepository {
    private final JdbcTemplate jdbcTemplate;

    public List<Message> findChatBetween(int firstUserId, int secondUserId) {
        String sql = "SELECT * FROM message m " +
                "JOIN profile sender ON m.senderId = sender.userId " +
                "JOIN profile receiver ON m.receiverId = receiver.userId " +
                "WHERE (m.senderId = ? AND m.receiverId = ?) " +
                "OR (m.senderId = ? AND m.receiverId = ?) " +
                "ORDER BY m.timestamp DESC";

        return jdbcTemplate.query(sql, (rs, rowNum) ->
            new Message(
                    rs.getLong("messageId"),
                    rs.getInt("senderId"),
                    rs.getInt("receiverId"),
                    rs.getString("content"),
                    rs.getTimestamp("timestamp")
            ),
            firstUserId, secondUserId, secondUserId, firstUserId
        );
    }

    public void save(List<Message> messages) {
        for (Message msg : messages) {
            String sql = "INSERT INTO message (senderId, receiverId, content, Timestamp) " +
                    "VALUES (?, ?, ?, ?)";

            jdbcTemplate.update(sql,
                    msg.getSenderId(),
                    msg.getReceiverId(),
                    msg.getContent(),
                    msg.getTimestamp()
            );
        }
    }

    public List<RecentChatDTO> findRecentChats(int currUserId) {
        String sql =
                "SELECT " +
                    "CASE " +
                        "WHEN senderId = ? THEN receiverId ELSE senderId " +
                    "END AS otherUserId, " +
                    "MAX(m1.timestamp) AS lastMessageTime " +
                "FROM message m1 " +
                "WHERE senderId = ? OR receiverId = ? " +
                "GROUP BY otherUserId " +
                "ORDER BY lastMessageTime DESC " +
                "LIMIT 5";

        List<Integer> recentChatsUserIds = jdbcTemplate.query(sql, (rs, rowNum) ->
                rs.getInt("otherUserId")
        , currUserId, currUserId, currUserId);

        List<RecentChatDTO> result = new ArrayList<>();
        for (int recentUserId : recentChatsUserIds) {
            String currSql = """
                    SELECT messageId, senderId, receiverId, content, timestamp, userId as otherUserId, displayName
                    FROM message m
                    	JOIN profile p
                    	ON IF(m.senderId = ?, m.receiverId = p.userId, m.senderId = p.userId)
                    WHERE
                    	(m.senderId = ? AND m.receiverId = ?)
                    	OR (m.senderId = ? AND m.receiverId = ?)
                    ORDER BY m.timestamp DESC
                    LIMIT 1
            """;
            RecentChatDTO newRecentChat = jdbcTemplate.queryForObject(currSql, (rs, rowNum) ->
                new RecentChatDTO(
                        rs.getLong("messageId"),
                        rs.getInt("senderId"),
                        rs.getInt("receiverId"),
                        rs.getString("content"),
                        rs.getTimestamp("timestamp"),
                        rs.getInt("otherUserId"),
                        rs.getString("displayName")
                )
            , currUserId, currUserId, recentUserId, recentUserId, currUserId);

            result.add(newRecentChat);
        }

        return result;
    }
}
