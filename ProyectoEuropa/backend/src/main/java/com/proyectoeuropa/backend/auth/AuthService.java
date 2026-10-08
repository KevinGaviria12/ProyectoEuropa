package com.proyectoeuropa.backend.auth;

import com.proyectoeuropa.backend.user.User;
import com.proyectoeuropa.backend.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthDtos.AuthResponse login(AuthDtos.AuthRequest request) {
        String username = request.username().trim();
        User user = userRepository.findByUsernameAndActiveTrue(username)
            .orElseThrow(() -> new BadCredentialsException("Credenciales incorrectas."));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Credenciales incorrectas.");
        }

        return responseFor(user);
    }

    public AuthDtos.AuthResponse register(AuthDtos.AuthRequest request) {
        String username = request.username().trim();
        if (username.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario es obligatorio.");
        }
        if (userRepository.existsByUsername(username)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ese usuario ya existe.");
        }

        User user = userRepository.save(new User(username, passwordEncoder.encode(request.password())));
        return responseFor(user);
    }

    private AuthDtos.AuthResponse responseFor(User user) {
        return new AuthDtos.AuthResponse(
            jwtService.generateToken(user),
            new AuthDtos.UserResponse(user.getId(), user.getUsername())
        );
    }
}
