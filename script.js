// Aplikasi utama Sapura Cloud
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi
    initializeApp();
    
    // Event Listeners
    setupEventListeners();
    
    // Load pricing data
    loadPricingData();
    
    // Setup navigation
    setupNavigation();
});

// Variabel global
let currentPackage = null;
let paymentInterval = null;
let countdownInterval = null;
let currentTransaction = null;

// Inisialisasi aplikasi
function initializeApp() {
    console.log(`${CONFIG.APP_NAME} initialized`);
    
    // Setup password generator
    setupPasswordGenerator();
    
    // Setup payment methods
    setupPaymentMethods();
    
    // Check for saved data
    checkSavedData();
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }
    
    // Check payment button
    const checkPaymentBtn = document.getElementById('check-payment');
    if (checkPaymentBtn) {
        checkPaymentBtn.addEventListener('click', checkPaymentStatus);
    }
    
    // Download data button
    const downloadBtn = document.getElementById('download-data');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCredentials);
    }
    
    // Close modal on outside click
    const modal = document.getElementById('qris-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Setup navigation
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Load pricing data
function loadPricingData() {
    const pricingData = [
        {
            name: "1GB RAM",
            cpu: "40% CPU",
            ram: "1GB",
            price: 3000,
            popular: false,
            features: [
                "1GB RAM Dedicated",
                "40% CPU Allocation",
                "10GB NVMe Storage",
                "Priority Support"
            ]
        },
        {
            name: "2GB RAM",
            cpu: "80% CPU",
            ram: "2GB",
            price: 6000,
            popular: true,
            features: [
                "2GB RAM Dedicated",
                "80% CPU Allocation",
                "20GB NVMe Storage",
                "Priority Support",
                "Backup Weekly"
            ]
        },
        {
            name: "3GB RAM",
            cpu: "100% CPU",
            ram: "3GB",
            price: 9000,
            popular: false,
            features: [
                "3GB RAM Dedicated",
                "100% CPU Allocation",
                "30GB NVMe Storage",
                "Priority Support",
                "Backup Weekly"
            ]
        },
        {
            name: "4GB RAM",
            cpu: "110% CPU",
            ram: "4GB",
            price: 12000,
            popular: false,
            features: [
                "4GB RAM Dedicated",
                "110% CPU Allocation",
                "40GB NVMe Storage",
                "24/7 Support",
                "Backup Daily",
                "DDoS Protection"
            ]
        },
        {
            name: "5GB RAM",
            cpu: "120% CPU",
            ram: "5GB",
            price: 15000,
            popular: false,
            features: [
                "5GB RAM Dedicated",
                "120% CPU Allocation",
                "50GB NVMe Storage",
                "24/7 Support",
                "Backup Daily",
                "DDoS Protection",
                "Free Migration"
            ]
        }
    ];
    
    const pricingGrid = document.getElementById('pricing-grid');
    if (!pricingGrid) return;
    
    pricingGrid.innerHTML = '';
    
    pricingData.forEach(package => {
        const card = createPricingCard(package);
        pricingGrid.appendChild(card);
    });
}

// Create pricing card
function createPricingCard(package) {
    const card = document.createElement('div');
    card.className = `pricing-card ${package.popular ? 'popular' : ''}`;
    
    if (package.popular) {
        card.innerHTML += `<div class="popular-badge">POPULAR</div>`;
    }
    
    card.innerHTML += `
        <div class="pricing-header">
            <h3>${package.name}</h3>
            <p class="cpu-spec">${package.cpu}</p>
            <div class="price">${CONFIG.CURRENCY}${package.price.toLocaleString('id-ID')}</div>
        </div>
        <ul class="pricing-features">
            ${package.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
        </ul>
        <button class="btn btn-primary" onclick="selectPackage('${package.name}', ${package.price})">
            <i class="fas fa-shopping-cart"></i> Pilih Paket
        </button>
    `;
    
    return card;
}

// Select package
function selectPackage(name, price) {
    currentPackage = { name, price };
    
    // Update UI
    document.getElementById('package-name').textContent = name;
    document.getElementById('package-price').textContent = `${CONFIG.CURRENCY}${price.toLocaleString('id-ID')}`;
    
    // Scroll to order form
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
    
    // Show notification
    showNotification(`Paket ${name} dipilih`, 'success');
}

// Setup password generator
function setupPasswordGenerator() {
    const generateBtn = document.querySelector('.btn-generate');
    const passwordField = document.getElementById('password');
    
    if (generateBtn && passwordField) {
        // Generate initial password if empty
        if (!passwordField.value) {
            passwordField.value = generateStrongPassword();
        }
    }
}

// Generate strong password
function generateStrongPassword() {
    const length = CONFIG.DEFAULT_PASSWORD_LENGTH;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    
    // Ensure at least one of each type
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
    password += "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26));
    password += "0123456789".charAt(Math.floor(Math.random() * 10));
    password += "!@#$%^&*".charAt(Math.floor(Math.random() * 8));
    
    // Fill the rest
    for (let i = 4; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Setup payment methods
function setupPaymentMethods() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
        });
    });
}

// Handle order submission
async function handleOrderSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    // Get form data
    const formData = getFormData();
    
    // Show loading state
    const submitBtn = document.getElementById('submit-order');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Memproses...';
    submitBtn.disabled = true;
    
    try {
        // Create transaction
        const transaction = await createTransaction(formData);
        
        if (transaction && transaction.status) {
            // Show payment modal
            showPaymentModal(transaction.data);
            
            // Start payment check
            startPaymentCheck(transaction.data.id);
        } else {
            showNotification(transaction?.message || 'Gagal membuat transaksi', 'error');
        }
    } catch (error) {
        console.error('Transaction error:', error);
        showNotification('Terjadi kesalahan saat memproses transaksi', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Validate form
function validateForm() {
    const username = document.getElementById('username').value.trim();
    const packageSelected = currentPackage;
    
    if (!username) {
        showNotification('Username harus diisi', 'error');
        return false;
    }
    
    if (!packageSelected) {
        showNotification('Pilih paket terlebih dahulu', 'error');
        return false;
    }
    
    if (username.length < 3) {
        showNotification('Username minimal 3 karakter', 'error');
        return false;
    }
    
    return true;
}

// Get form data
function getFormData() {
    const username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();
    
    // Generate password if empty
    if (!password) {
        password = generateStrongPassword();
        document.getElementById('password').value = password;
    }
    
    return {
        username,
        password,
        package: currentPackage,
        paymentMethod: document.querySelector('.payment-option.active').dataset.method,
        reff_id: 'REF' + Date.now() + Math.random().toString(36).substr(2, 6)
    };
}

// Create transaction (API call)
async function createTransaction(formData) {
    if (CONFIG.USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockResponse = JSON.parse(JSON.stringify(CONFIG.MOCK_RESPONSES.success));
        mockResponse.data.target = formData.username;
        mockResponse.data.price = formData.package.price.toString();
        mockResponse.data.reff_id = formData.reff_id;
        
        // Determine product code based on package
        let code = 'PLN1GB';
        if (formData.package.name.includes('2GB')) code = 'PLN2GB';
        else if (formData.package.name.includes('3GB')) code = 'PLN3GB';
        else if (formData.package.name.includes('4GB')) code = 'PLN4GB';
        else if (formData.package.name.includes('5GB')) code = 'PLN5GB';
        else if (formData.package.name.includes('Reseller')) code = 'PLNRSL';
        
        mockResponse.data.code = code;
        mockResponse.data.layanan = `Panel ${formData.package.name}`;
        
        // Store transaction data
        currentTransaction = {
            ...mockResponse.data,
            credentials: {
                username: formData.username,
                password: formData.password
            }
        };
        
        return mockResponse;
    }
    
    // Real API implementation
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/transaksi/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                api_key: CONFIG.API_KEY,
                code: CONFIG.PRODUCT_CODES[formData.package.code] || 'PLN1GB',
                reff_id: formData.reff_id,
                target: formData.username,
                limit_price: formData.package.price
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Store transaction data
        if (data.status) {
            currentTransaction = {
                ...data.data,
                credentials: {
                    username: formData.username,
                    password: formData.password
                }
            };
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Show payment modal
function showPaymentModal(transaction) {
    // Update modal content
    document.getElementById('payment-amount').textContent = 
        `${CONFIG.CURRENCY}${parseInt(transaction.price).toLocaleString('id-ID')}`;
    document.getElementById('transaction-id').textContent = transaction.id;
    document.getElementById('detail-package').textContent = transaction.layanan;
    document.getElementById('detail-username').textContent = transaction.target;
    
    // Generate QRIS
    generateQRIS(transaction);
    
    // Start countdown
    startCountdown();
    
    // Show modal
    document.getElementById('qris-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Generate QRIS
function generateQRIS(transaction) {
    const qrisContainer = document.getElementById('qris-placeholder');
    
    // Clear previous QR
    qrisContainer.innerHTML = '';
    
    // In production, use real QRIS generation
    // This is a mock implementation
    
    // Create canvas for QR code
    const canvas = document.createElement('canvas');
    canvas.id = 'qris-canvas';
    canvas.width = 250;
    canvas.height = 250;
    qrisContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Draw mock QR pattern
    drawMockQR(ctx, canvas.width, canvas.height, transaction.id);
    
    // Add payment info below QR
    const info = document.createElement('div');
    info.className = 'qris-info';
    info.innerHTML = `
        <p><strong>QRIS - ${CONFIG.APP_NAME}</strong></p>
        <p>ID: ${transaction.id}</p>
        <p>${CONFIG.CURRENCY}${parseInt(transaction.price).toLocaleString('id-ID')}</p>
    `;
    qrisContainer.appendChild(info);
}

// Draw mock QR (for demo purposes)
function drawMockQR(ctx, width, height, text) {
    // Background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    // QR pattern
    const cellSize = 10;
    const data = text + Date.now();
    
    // Draw alignment patterns
    ctx.fillStyle = '#000';
    
    // Three big squares
    [10, width - 40, 10, height - 40].forEach((x, i) => {
        const y = i < 2 ? 10 : height - 40;
        ctx.fillRect(x, y, 30, 30);
        ctx.fillStyle = '#fff';
        ctx.fillRect(x + 5, y + 5, 20, 20);
        ctx.fillStyle = '#000';
    });
    
    // Random dots pattern
    ctx.fillStyle = '#000';
    for (let i = 0; i < 200; i++) {
        const x = Math.floor(Math.random() * (width - 20)) + 10;
        const y = Math.floor(Math.random() * (height - 20)) + 10;
        
        // Avoid alignment patterns
        if (
            (x >= 10 && x <= 40 && y >= 10 && y <= 40) ||
            (x >= width - 40 && x <= width - 10 && y >= 10 && y <= 40) ||
            (x >= 10 && x <= 40 && y >= height - 40 && y <= height - 10)
        ) continue;
        
        ctx.fillRect(x, y, 4, 4);
    }
    
    // Add text
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SCAN QRIS DI SINI', width / 2, height - 10);
}

// Start countdown
function startCountdown() {
    let timeLeft = CONFIG.PAYMENT_TIMEOUT;
    const countdownElement = document.getElementById('countdown');
    
    // Clear existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    countdownInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        countdownElement.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update color based on time
        if (timeLeft < 60) {
            countdownElement.style.color = '#f72585';
        } else if (timeLeft < 120) {
            countdownElement.style.color = '#f8961e';
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            showNotification('Waktu pembayaran telah habis', 'warning');
        }
        
        timeLeft--;
    }, 1000);
}

// Start payment check
function startPaymentCheck(transactionId) {
    // Clear existing interval
    if (paymentInterval) {
        clearInterval(paymentInterval);
    }
    
    // Check immediately
    checkPaymentStatus();
    
    // Then check every interval
    paymentInterval = setInterval(checkPaymentStatus, CONFIG.CHECK_INTERVAL);
}

// Check payment status
async function checkPaymentStatus() {
    if (!currentTransaction) return;
    
    try {
        const status = await getPaymentStatus(currentTransaction.id);
        
        if (status === 'paid') {
            // Payment successful
            clearInterval(paymentInterval);
            clearInterval(countdownInterval);
            
            // Update UI
            document.getElementById('detail-status').textContent = 'Berhasil';
            document.getElementById('detail-status').className = 'status-success';
            
            // Show download button
            document.getElementById('download-data').style.display = 'inline-flex';
            
            // Hide check button
            document.getElementById('check-payment').style.display = 'none';
            
            // Generate credentials
            generateCredentials();
            
            showNotification('Pembayaran berhasil! Data panel siap diunduh.', 'success');
        } else if (status === 'expired') {
            clearInterval(paymentInterval);
            clearInterval(countdownInterval);
            showNotification('Pembayaran telah kedaluwarsa', 'error');
        }
    } catch (error) {
        console.error('Error checking payment:', error);
    }
}

// Get payment status (API call)
async function getPaymentStatus(transactionId) {
    if (CONFIG.USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock: 70% chance of success after checking
        if (Math.random() > 0.3) {
            const mockResponse = JSON.parse(JSON.stringify(CONFIG.MOCK_RESPONSES.paid));
            mockResponse.data.credentials.username = currentTransaction.credentials.username;
            mockResponse.data.credentials.password = currentTransaction.credentials.password;
            
            // Store final transaction data
            currentTransaction = {
                ...currentTransaction,
                status: 'paid',
                sn: mockResponse.data.sn,
                credentials: mockResponse.data.credentials
            };
            
            return 'paid';
        }
        
        return 'pending';
    }
    
    // Real API implementation
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/transaksi/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                api_key: CONFIG.API_KEY,
                id: transactionId
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status && data.data) {
            return data.data.status;
        }
        
        return 'pending';
    } catch (error) {
        console.error('API Error:', error);
        return 'error';
    }
}

// Generate credentials
function generateCredentials() {
    if (!currentTransaction || !currentTransaction.sn) return;
    
    // In real implementation, this would come from API
    const credentials = {
        panel_url: "https://panel.sapuracloud.id",
        username: currentTransaction.credentials.username,
        password: currentTransaction.credentials.password,
        server_ip: "103.145.151.122",
        port: "2022",
        expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        serial_number: currentTransaction.sn,
        support_url: "https://wa.me/6281234567890"
    };
    
    // Store for download
    currentTransaction.fullCredentials = credentials;
}

// Download credentials
function downloadCredentials() {
    if (!currentTransaction || !currentTransaction.fullCredentials) {
        showNotification('Data belum tersedia', 'error');
        return;
    }
    
    const credentials = currentTransaction.fullCredentials;
    
    // Create data string
    const data = `
╔══════════════════════════════════════╗
║         SAPURA CLOUD PANEL           ║
╚══════════════════════════════════════╝

📦 PAKET: ${currentTransaction.layanan}
🆔 ID TRANSAKSI: ${currentTransaction.id}
🔢 SERIAL NUMBER: ${credentials.serial_number}

🔐 LOGIN PANEL:
🌐 URL: ${credentials.panel_url}
👤 USERNAME: ${credentials.username}
🔑 PASSWORD: ${credentials.password}

⚙️ SERVER DETAILS:
🖥️ SERVER IP: ${credentials.server_ip}
🚪 PORT: ${credentials.port}

📅 MASA AKTIF:
⏳ EXPIRY DATE: ${credentials.expiry_date}

📞 SUPPORT:
💬 WHATSAPP: ${credentials.support_url}
📧 EMAIL: support@sapuracloud.id

⚠️ PENTING:
• Simpan data ini dengan aman
• Jangan bagikan credentials ke siapapun
• Hubungi CS untuk bantuan

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
© ${new Date().getFullYear()} ${CONFIG.APP_NAME}
    `.trim();
    
    // Create download link
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sapuracloud-panel-${credentials.username}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show copy button
    showCopyButton(data);
}

// Show copy button
function showCopyButton(data) {
    const modalFooter = document.querySelector('.modal-footer');
    
    // Remove existing copy button if any
    const existingBtn = document.getElementById('copy-credentials');
    if (existingBtn) existingBtn.remove();
    
    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.id = 'copy-credentials';
    copyBtn.className = 'btn btn-success';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Salin Data';
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(data).then(() => {
            showNotification('Data berhasil disalin ke clipboard!', 'success');
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Salin Data';
            }, 2000);
        });
    });
    
    modalFooter.insertBefore(copyBtn, modalFooter.firstChild);
}

// Close modal
function closeModal() {
    document.getElementById('qris-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear intervals
    if (paymentInterval) {
        clearInterval(paymentInterval);
        paymentInterval = null;
    }
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

// Reset form
function resetForm() {
    document.getElementById('order-form').reset();
    currentPackage = null;
    document.getElementById('package-name').textContent = 'Belum ada paket dipilih';
    document.getElementById('package-price').textContent = 'Rp0';
    showNotification('Form telah direset', 'info');
}

// Show notification
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icons[type] || icons.info}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after timeout
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, CONFIG.NOTIFICATION_TIMEOUT);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.style.animation = 'slideInRight 0.3s ease reverse forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Check for saved data
function checkSavedData() {
    // Check localStorage for saved transactions
    const saved = localStorage.getItem('sapuracloud_last_transaction');
    if (saved) {
        try {
            const transaction = JSON.parse(saved);
            if (transaction.status === 'paid') {
                // Show notification about saved data
                setTimeout(() => {
                    showNotification(
                        `Anda memiliki data panel tersimpan untuk ${transaction.credentials.username}`,
                        'info'
                    );
                }, 3000);
            }
        } catch (e) {
            console.error('Error parsing saved data:', e);
        }
    }
}

// Save transaction to localStorage
function saveTransaction(transaction) {
    if (transaction && transaction.status === 'paid') {
        localStorage.setItem(
            'sapuracloud_last_transaction',
            JSON.stringify(transaction)
        );
    }
}

// Ekspor fungsi untuk penggunaan global
window.selectPackage = selectPackage;
window.generatePassword = function() {
    document.getElementById('password').value = generateStrongPassword();
    showNotification('Password baru telah digenerate', 'success');
};
window.resetForm = resetForm;
window.closeModal = closeModal;