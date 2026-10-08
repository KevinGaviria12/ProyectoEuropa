package com.proyectoeuropa.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ProyectoEuropaApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProyectoEuropaApplication.class, args);
    }

    @RestController
    static class HealthController {
        @GetMapping("/api/health")
        public HealthResponse health() {
            return new HealthResponse(true);
        }

        record HealthResponse(boolean ok) {
        }
    }
}
