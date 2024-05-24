package com.vasilevviktor03.plumtalks.model.dto;

import java.sql.Timestamp;

public record RecentChatDTO(
        long messageId,
        int senderId,
        int receiverId,
        String content,
        Timestamp timestamp,
        int otherUserId,
        String displayName
) {
}
