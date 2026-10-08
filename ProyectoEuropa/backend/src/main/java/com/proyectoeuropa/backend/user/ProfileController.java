package com.proyectoeuropa.backend.user;

import com.proyectoeuropa.backend.auth.AuthDtos;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final UserRepository userRepository;

    public ProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public AuthDtos.ProfileResponse getProfile(Authentication authentication) {
        return toResponse(findUser(authentication));
    }

    @PutMapping
    public AuthDtos.ProfileResponse updateProfile(
        Authentication authentication,
        @Valid @RequestBody AuthDtos.ProfileRequest request
    ) {
        User user = findUser(authentication);
        user.updateProfile(clean(request.fullName()), clean(request.cedula()), clean(request.phone()));
        return toResponse(userRepository.save(user));
    }

    private User findUser(Authentication authentication) {
        try {
            Integer id = Integer.valueOf(authentication.getName());
            return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado."));
        } catch (NumberFormatException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token inválido.");
        }
    }

    private AuthDtos.ProfileResponse toResponse(User user) {
        return new AuthDtos.ProfileResponse(
            user.getId(), user.getUsername(), user.getFullName(), user.getCedula(), user.getPhone()
        );
    }

    private String clean(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
