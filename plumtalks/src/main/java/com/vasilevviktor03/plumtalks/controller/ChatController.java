package com.vasilevviktor03.plumtalks.controller;

import com.vasilevviktor03.plumtalks.model.Message;
import com.vasilevviktor03.plumtalks.model.dto.TypingDTO;
import com.vasilevviktor03.plumtalks.service.MessageService;
import com.vasilevviktor03.plumtalks.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageService messageService;

    @MessageMapping("/message")
    public Message recieveMessage(@Payload Message message) {
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(message.getReceiverId()), "/private", message);
        messageService.save(List.of(message));
        return message;
    }

    @MessageMapping("/typing")
    public TypingDTO receiveTyping(@Payload TypingDTO payload) {
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(payload.receiverId()), "/typing", payload);
        return payload;
    }
}
