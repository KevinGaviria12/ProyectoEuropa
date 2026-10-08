package com.proyectoeuropa.backend.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public final class AuthDtos {
    private AuthDtos() {
    }

    public record AuthRequest(
        @NotBlank @Size(max = 50) String username,
        @NotBlank @Size(min = 6, max = 100) String password
    ) {
    }

    public record AuthResponse(String token, UserResponse user) {
    }

    public record UserResponse(Integer id, String username) {
    }

    public record ProfileResponse(
        Integer id,
        String username,
        String fullName,
        String cedula,
        String phone
    ) {
    }

    public record ProfileRequest(
        @Size(max = 120) String fullName,
        @Size(max = 30) String cedula,
        @Size(max = 30) String phone
    ) {
    }
}
