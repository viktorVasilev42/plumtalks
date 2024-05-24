package com.vasilevviktor03.plumtalks.controller;

import com.vasilevviktor03.plumtalks.model.ApplicationUser;
import com.vasilevviktor03.plumtalks.model.Message;
import com.vasilevviktor03.plumtalks.model.Profile;
import com.vasilevviktor03.plumtalks.model.dto.DisplayNameDTO;
import com.vasilevviktor03.plumtalks.model.dto.RecentChatDTO;
import com.vasilevviktor03.plumtalks.model.dto.SaveMessagesDTO;
import com.vasilevviktor03.plumtalks.service.ApplicationUserService;
import com.vasilevviktor03.plumtalks.service.MessageService;
import com.vasilevviktor03.plumtalks.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {
    private final ApplicationUserService userService;
    private final ProfileService profileService;
    private final MessageService messageService;

    @GetMapping
    public String hello(Authentication auth) {
        Profile profile = profileService.findProfileByUsername(auth.getName());
        return profile.getDisplayName();
    }

    @PostMapping("/displayName")
    public void addDisplayName(@RequestBody DisplayNameDTO body, Authentication auth) {
        ApplicationUser user = userService.findByUsername(auth.getName());
        Profile profile = new Profile(user.getId(), body.displayName());
        profileService.update(profile);
    }

    @GetMapping("/profile")
    public List<Profile> getAllProfiles(Authentication auth) {
        return profileService.findAll(auth.getName());
    }

    @GetMapping("/chatWith/{id}")
    public List<Message> getWithUser(@PathVariable int id, Authentication auth) {
        Profile currProfile = profileService.findProfileByUsername(auth.getName());
        return messageService.findChatBetween(currProfile.getUserId(), id);
    }

    @PostMapping("/chat")
    public void addMessages(@RequestBody SaveMessagesDTO body) {
        messageService.save(body.messages());
    }

    @GetMapping("/chat/recent")
    public List<RecentChatDTO> getRecentChats(Authentication auth) {
        ApplicationUser user = userService.findByUsername(auth.getName());
        return messageService.findRecentChats(user.getId());
    }
}
