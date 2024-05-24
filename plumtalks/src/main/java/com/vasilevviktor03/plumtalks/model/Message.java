package com.vasilevviktor03.plumtalks.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class Message {
    private long messageId;
    private int senderId;
    private int receiverId;
    private String content;
    private Timestamp timestamp;
}
