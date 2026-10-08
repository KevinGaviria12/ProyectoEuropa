package com.proyectoeuropa.backend.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsernameAndActiveTrue(String username);
    boolean existsByUsername(String username);
}
