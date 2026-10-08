CREATE DATABASE IF NOT EXISTS proyecto_europa
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE proyecto_europa;

CREATE USER IF NOT EXISTS 'proyecto_app'@'localhost'
  IDENTIFIED BY 'ProyectoEuropa2026!';

ALTER USER 'proyecto_app'@'localhost'
  IDENTIFIED BY 'ProyectoEuropa2026!';

CREATE USER IF NOT EXISTS 'proyecto_app'@'127.0.0.1'
  IDENTIFIED BY 'ProyectoEuropa2026!';

ALTER USER 'proyecto_app'@'127.0.0.1'
  IDENTIFIED BY 'ProyectoEuropa2026!';

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_username (username)
);

GRANT SELECT ON proyecto_europa.users TO 'proyecto_app'@'localhost';
GRANT SELECT ON proyecto_europa.users TO 'proyecto_app'@'127.0.0.1';

-- Usuario inicial: admin / Admin123!
INSERT INTO users (username, password_hash)
VALUES (
  'admin',
  '$2b$10$RKpHYO4zdf/bSufHAhcplOrwHoJ7ZPeFk0CWNAGuEZ9aQBSkevzlC'
)
ON DUPLICATE KEY UPDATE
  password_hash = VALUES(password_hash),
  active = TRUE;
