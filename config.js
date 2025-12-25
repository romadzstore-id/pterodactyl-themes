// Konfigurasi API dan Aplikasi
const CONFIG = {
    // API Configuration
    API_BASE_URL: 'https://atlantich2h.com',
    API_KEY: 'hjIHv3G0O6wFSkMkiCVJ6REJ6Uy1DWd091X0W8GEpzCTCRDyU4tronGdzxB3KKNK3hAgi0Orwp53WVoA4hDEZLbsV5U1dDbI6jjA', // Ganti dengan API key Anda
    
    // Product Codes (sesuaikan dengan kode produk Atlantic Pedia)
    PRODUCT_CODES: {
        '1gb': 'PLN1GB',
        '2gb': 'PLN2GB', 
        '3gb': 'PLN3GB',
        '4gb': 'PLN4GB',
        '5gb': 'PLN5GB',
        'reseller': 'PLNRSL'
    },
    
    // Application Settings
    APP_NAME: 'Sapura Cloud',
    CURRENCY: 'Rp',
    
    // Payment Settings
    PAYMENT_TIMEOUT: 300, // 5 menit dalam detik
    CHECK_INTERVAL: 10000, // 10 detik
    
    // Default Settings
    DEFAULT_PASSWORD_LENGTH: 12,
    
    // Notification Settings
    NOTIFICATION_TIMEOUT: 5000,
    
    // Mock Data for Development (hapus di production)
    USE_MOCK_DATA: false,
    MOCK_RESPONSES: {
        success: {
            status: true,
            message: "Transaksi diproses",
            data: {
                id: "TRX" + Date.now(),
                reff_id: "REF" + Math.random().toString(36).substr(2, 9),
                layanan: "Panel Pterodactyl",
                code: "PLN1GB",
                target: "",
                price: "3000",
                sn: null,
                status: "pending",
                created_at: new Date().toISOString().replace('T', ' ').substr(0, 19)
            },
            code: 202
        },
        paid: {
            status: true,
            message: "Pembayaran berhasil",
            data: {
                status: "paid",
                sn: "PANEL" + Math.random().toString(36).substr(2, 8).toUpperCase(),
                credentials: {
                    username: "",
                    password: "",
                    panel_url: "https://panel.sapuracloud.id",
                    expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                }
            }
        }
    }
};

// Ekspor konfigurasi untuk penggunaan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
