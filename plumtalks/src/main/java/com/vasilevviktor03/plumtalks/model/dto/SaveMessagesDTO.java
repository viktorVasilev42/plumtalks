package com.vasilevviktor03.plumtalks.model.dto;

import com.vasilevviktor03.plumtalks.model.Message;

import java.util.List;

public record SaveMessagesDTO(List<Message> messages) {
}
