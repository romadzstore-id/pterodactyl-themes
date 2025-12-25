-- Database structure for Sapura Cloud
CREATE DATABASE IF NOT EXISTS sapuracloud CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE sapuracloud;

-- Transactions table
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    reff_id VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    package VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    sn VARCHAR(100),
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Users table (for admin panel)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('admin', 'staff') DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password_hash, full_name, role) VALUES
('admin@sapuracloud.id', '$2y$10$YourHashedPasswordHere', 'Administrator', 'admin');

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, description) VALUES
('api_key', 'yourapikeyxxxxxxxxxxx', 'Atlantic Pedia API Key'),
('api_url', 'https://atlantich2h.com', 'API Base URL'),
('webhook_secret', 'your_webhook_secret_here', 'Webhook Signature Secret'),
('company_name', 'Sapura Cloud', 'Nama Perusahaan'),
('contact_whatsapp', '+6281234567890', 'Nomor WhatsApp CS'),
('contact_email', 'support@sapuracloud.id', 'Email Support');