package com.vasilevviktor03.plumtalks.service;

import com.vasilevviktor03.plumtalks.model.Message;
import com.vasilevviktor03.plumtalks.model.dto.RecentChatDTO;
import com.vasilevviktor03.plumtalks.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    public List<Message> findChatBetween(int firstUserId, int secondUserId) {
        return messageRepository.findChatBetween(firstUserId, secondUserId);
    }

    public void save(List<Message> messages) {
        messageRepository.save(messages);
    }

    public List<RecentChatDTO> findRecentChats(int currUserId) {
        return messageRepository.findRecentChats(currUserId);
    }
}
