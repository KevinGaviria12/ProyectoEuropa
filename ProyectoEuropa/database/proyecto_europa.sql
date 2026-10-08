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

-- Ejecuta este archivo con root o con un usuario administrador de MySQL.
-- No elimina datos existentes; puede ejecutarse sobre una instalación anterior.

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  full_name VARCHAR(120) NULL,
  cedula VARCHAR(30) NULL,
  phone VARCHAR(30) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_username (username)
);

-- Completa instalaciones antiguas que todavía no tengan los campos del perfil.
-- Se usa information_schema porque MySQL no admite
-- "ADD COLUMN IF NOT EXISTS" en todas sus versiones.
SET @add_full_name = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE users ADD COLUMN full_name VARCHAR(120) NULL',
    'SELECT 1'
  )
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'users'
    AND column_name = 'full_name'
);
PREPARE stmt FROM @add_full_name;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @add_cedula = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE users ADD COLUMN cedula VARCHAR(30) NULL',
    'SELECT 1'
  )
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'users'
    AND column_name = 'cedula'
);
PREPARE stmt FROM @add_cedula;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @add_phone = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE users ADD COLUMN phone VARCHAR(30) NULL',
    'SELECT 1'
  )
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'users'
    AND column_name = 'phone'
);
PREPARE stmt FROM @add_phone;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

GRANT SELECT, INSERT, UPDATE ON proyecto_europa.users TO 'proyecto_app'@'localhost';
GRANT SELECT, INSERT, UPDATE ON proyecto_europa.users TO 'proyecto_app'@'127.0.0.1';

FLUSH PRIVILEGES;

-- Usuario inicial: admin / Admin123!
INSERT INTO users (username, password_hash)
VALUES (
  'admin',
  '$2b$10$RKpHYO4zdf/bSufHAhcplOrwHoJ7ZPeFk0CWNAGuEZ9aQBSkevzlC'
)
ON DUPLICATE KEY UPDATE
  password_hash = VALUES(password_hash),
  active = TRUE;

-- Verificación final.
DESCRIBE users;
SELECT id, username, active, full_name, cedula, phone
FROM users
WHERE username = 'admin';
