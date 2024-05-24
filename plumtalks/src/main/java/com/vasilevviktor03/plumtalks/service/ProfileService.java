package com.vasilevviktor03.plumtalks.service;

import com.vasilevviktor03.plumtalks.model.Profile;
import com.vasilevviktor03.plumtalks.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;

    public void save(Profile newProfile) {
        profileRepository.save(newProfile);
    }

    public void update(Profile profile) {
        profileRepository.update(profile);
    }

    public List<Profile> findAll(String currUsername) {
        return profileRepository.findAll(currUsername);
    }

    public Profile findProfileByUsername(String username) {
        return profileRepository.findProfileByUsername(username).orElseThrow(NoSuchElementException::new);
    }
}
