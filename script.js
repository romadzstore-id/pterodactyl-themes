// Data Layanan dengan Detail Lengkap
const servicesData = [
    {
        id: 1,
        title: "Jasa Install Pterodactyl",
        description: "Instalasi panel Pterodactyl dengan konfigurasi optimal untuk manajemen server game & aplikasi. Panel yang ringan, aman, dan mudah digunakan.",
        icon: "fas fa-database",
        category: "server",
        categoryText: "Server & Hosting",
        features: [
            "Instalasi Pterodactyl Panel versi terbaru",
            "Konfigurasi optimal untuk performa maksimal",
            "Setup SSL gratis (Let's Encrypt)",
            "Backup otomatis harian",
            "Dukungan teknis 24/7",
            "Garansi instalasi 30 hari"
        ],
        pricing: [
            { name: "Basic Install", price: "Rp 150.000", note: "Panel standar" },
            { name: "Pro Install", price: "Rp 250.000", note: "Optimasi + SSL", popular: true },
            { name: "Custom Install", price: "Rp 400.000", note: "Custom theme & plugin" },
            { name: "Migrasi Panel", price: "Rp 100.000", note: "Dari panel lain" }
        ]
    },
    {
        id: 2,
        title: "Pengeditan Script Bot",
        description: "Customisasi bot Telegram, Discord, WhatsApp dengan fitur sesuai kebutuhan bisnis Anda. Bot otomatis untuk meningkatkan efisiensi.",
        icon: "fas fa-robot",
        category: "digital",
        categoryText: "Digital Automation",
        features: [
            "Bot WhatsApp multi-device",
            "Bot Telegram dengan dashboard",
            "Integrasi payment gateway",
            "Auto responder & broadcast",
            "Database management",
            "Custom command sesuai kebutuhan"
        ],
        pricing: [
            { name: "Basic Bot", price: "Rp 200.000", note: "Fitur dasar" },
            { name: "Business Bot", price: "Rp 500.000", note: "Payment & database", popular: true },
            { name: "Enterprise Bot", price: "Rp 1.000.000", note: "Full customization" },
            { name: "Perbaikan Bot", price: "Rp 100.000", note: "Bug fixing" }
        ]
    },
    {
        id: 3,
        title: "Suntik Sosial Media",
        description: "Tambah followers, likes, views Instagram, TikTok, YouTube dengan aman dan berkualitas. Meningkatkan engagement akun media sosial Anda.",
        icon: "fas fa-users",
        category: "social",
        categoryText: "Social Media",
        features: [
            "Followers Instagram real & aktif",
            "Likes & views TikTok organik",
            "Subscriber YouTube berkualitas",
            "Safe & no password required",
            "Drop protection guarantee",
            "Instant delivery 24/7"
        ],
        pricing: [
            { name: "Instagram 1K", price: "Rp 80.000", note: "Followers aktif" },
            { name: "TikTok 10K", price: "Rp 150.000", note: "Views organik", popular: true },
            { name: "YouTube 1K", price: "Rp 300.000", note: "Subscriber" },
            { name: "Package Bundling", price: "Rp 500.000", note: "All platform" }
        ]
    },
    {
        id: 4,
        title: "Domain 1 Tahun",
        description: "Registrasi domain .web.id, .biz.id, .my.id dengan harga terjangkau dan support teknis. Domain berkualitas untuk identitas digital Anda.",
        icon: "fas fa-globe",
        category: "digital",
        categoryText: "Digital Identity",
        features: [
            "Domain .web.id, .biz.id, .my.id",
            "Free DNS management",
            "Private registration available",
            "Auto-renewal reminder",
            "Email forwarding setup",
            "Support transfer domain"
        ],
        pricing: [
            { name: ".web.id", price: "Rp 120.000/tahun", note: "Personal use" },
            { name: ".biz.id", price: "Rp 150.000/tahun", note: "Business use", popular: true },
            { name: ".my.id", price: "Rp 100.000/tahun", note: "Identity use" },
            { name: "Bundle 3 Tahun", price: "Rp 300.000", note: "Save 20%" }
        ]
    },
    {
        id: 5,
        title: "Panel Pterodactyl & Reseller",
        description: "Panel Pterodactyl siap pakai dengan akses reseller untuk memulai bisnis hosting. Platform lengkap untuk usaha hosting Anda.",
        icon: "fas fa-tachometer-alt",
        category: "server",
        categoryText: "Server & Hosting",
        features: [
            "Pterodactyl Panel ready-to-use",
            "Reseller system included",
            "Custom branding available",
            "Invoice system otomatis",
            "Client management dashboard",
            "Support & maintenance"
        ],
        pricing: [
            { name: "Basic Panel", price: "Rp 500.000", note: "Single server" },
            { name: "Reseller Panel", price: "Rp 1.000.000", note: "Multi-client", popular: true },
            { name: "Enterprise Panel", price: "Rp 2.500.000", note: "Full customization" },
            { name: "Monthly Support", price: "Rp 100.000/bulan", note: "Technical support" }
        ]
    },
    {
        id: 6,
        title: "Nokos WhatsApp Fresh",
        description: "Akun WhatsApp aman dan fresh untuk keperluan bisnis, marketing, atau komunikasi. Siap pakai dengan garansi keamanan.",
        icon: "fab fa-whatsapp",
        category: "social",
        categoryText: "Social Media",
        features: [
            "WhatsApp multi-device ready",
            "Fresh number & clean history",
            "No ban guarantee 30 days",
            "Backup & restore support",
            "Bulk messaging capable",
            "24/7 account support"
        ],
        pricing: [
            { name: "Single Account", price: "Rp 50.000", note: "1 number" },
            { name: "5 Accounts Pack", price: "Rp 200.000", note: "Save 20%", popular: true },
            { name: "Business Bundle", price: "Rp 500.000", note: "10 accounts + tools" },
            { name: "Tool Only", price: "Rp 100.000", note: "Auto-reply tools" }
        ]
    },
    {
        id: 7,
        title: "Akun Premium",
        description: "Netflix, Spotify, CapCut, Canva Pro, dan berbagai akun premium lainnya dengan garansi. Nikmati konten premium dengan harga terjangkau.",
        icon: "fas fa-crown",
        category: "general",
        categoryText: "Premium Accounts",
        features: [
            "Netflix UHD 4K (shared)",
            "Spotify Premium Family",
            "Canva Pro lifetime",
            "CapCut Pro features",
            "Garansi replacement 30 hari",
            "Instant delivery after payment"
        ],
        pricing: [
            { name: "Netflix 1 Month", price: "Rp 25.000", note: "4K UHD" },
            { name: "Spotify 6 Months", price: "Rp 50.000", note: "Family plan", popular: true },
            { name: "Canva Pro Lifetime", price: "Rp 150.000", note: "Lifetime access" },
            { name: "Bundle All", price: "Rp 200.000", note: "Save 30%" }
        ]
    },
    {
        id: 8,
        title: "Layanan Lainnya",
        description: "Jasa pembuatan website, VPS hosting, SSL, dan solusi digital lainnya sesuai permintaan. Konsultasi gratis untuk kebutuhan digital Anda.",
        icon: "fas fa-plus-circle",
        category: "general",
        categoryText: "Custom Services",
        features: [
            "Website development",
            "VPS setup & configuration",
            "SSL certificates installation",
            "Digital consultation",
            "Tech support & maintenance",
            "Custom solutions"
        ],
        pricing: [
            { name: "Consultation", price: "Rp 50.000", note: "30 minutes" },
            { name: "Basic Website", price: "Rp 1.000.000", note: "5 pages", popular: true },
            { name: "VPS Setup", price: "Rp 300.000", note: "Basic setup" },
            { name: "Custom Project", price: "Custom", note: "Contact for quote" }
        ]
    }
];

// Data Kontak
const contactData = [
    {
        platform: "WhatsApp",
        icon: "fab fa-whatsapp",
        link: "https://wa.me/6283171889474",
        text: "Respon Cepat 24/7",
        class: "whatsapp"
    },
    {
        platform: "Telegram",
        icon: "fab fa-telegram",
        link: "https://t.me/rmddz",
        text: "@rmddz",
        class: "telegram"
    },
    {
        platform: "Channel Testimoni",
        icon: "fas fa-star",
        link: "https://t.me/rmddztrust",
        text: "Ulasan Pelanggan",
        class: "channel"
    },
    {
        platform: "Email",
        icon: "fas fa-envelope",
        link: "mailto:romadzstoreid@gmail.com",
        text: "romadzstoreid@gmail.com",
        class: "email"
    }
];

// DOM Elements
const servicesGrid = document.querySelector('.services-grid');
const contactGrid = document.querySelector('.contact-grid');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const detailIcon = document.getElementById('detailIcon');
const detailTitle = document.getElementById('detailTitle');
const detailCategory = document.getElementById('detailCategory');
const detailDescription = document.getElementById('detailDescription');
const detailFeatures = document.getElementById('detailFeatures');
const pricingTable = document.getElementById('pricingTable');

// Format Rupiah
function formatRupiah(priceString) {
    // Jika sudah mengandung "Rp", return as is
    if (priceString.includes('Rp')) return priceString;
    
    // Jika angka, format dengan Rp
    const price = parseInt(priceString.replace(/\D/g, ''));
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Render Kartu Layanan
function renderServiceCards() {
    servicesGrid.innerHTML = '';
    
    servicesData.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.dataset.id = service.id;
        
        // Tentukan warna kategori
        let priceColor = '#00ff88'; // Default hijau
        let priceIcon = 'fas fa-tag';
        
        if (service.category === 'server') {
            priceColor = '#00ccff'; // Biru
            priceIcon = 'fas fa-server';
        } else if (service.category === 'social') {
            priceColor = '#ff4d8d'; // Pink
            priceIcon = 'fas fa-users';
        } else if (service.category === 'digital') {
            priceColor = '#ffaa00'; // Kuning
            priceIcon = 'fas fa-code';
        }
        
        // Harga terendah untuk tampilan
        const lowestPrice = service.pricing.reduce((min, p) => {
            const priceNum = parseInt(p.price.replace(/\D/g, ''));
            return priceNum < min ? priceNum : min;
        }, Infinity);
        
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <span class="service-category ${service.category}">${service.categoryText}</span>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-desc">${service.description}</p>
            <div class="service-price" style="color: ${priceColor}">
                <i class="${priceIcon}"></i>
                Mulai ${formatRupiah(lowestPrice.toString())}
            </div>
            <button class="btn btn-detail detail-btn" data-id="${service.id}">
                <i class="fas fa-info-circle"></i> Detail & Harga
            </button>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
    
    // Tambahkan event listener untuk tombol detail
    document.querySelectorAll('.detail-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceId = parseInt(this.dataset.id);
            openServiceDetail(serviceId);
        });
    });
}

// Render Kontak
function renderContactButtons() {
    contactGrid.innerHTML = '';
    
    contactData.forEach(contact => {
        const contactBtn = document.createElement('a');
        contactBtn.href = contact.link;
        contactBtn.target = '_blank';
        contactBtn.className = `contact-btn ${contact.class}`;
        
        contactBtn.innerHTML = `
            <div class="contact-icon">
                <i class="${contact.icon}"></i>
            </div>
            <div class="contact-text">${contact.platform}</div>
            <div class="contact-subtext">${contact.text}</div>
        `;
        
        contactGrid.appendChild(contactBtn);
    });
}

// Buka Modal Detail Layanan
function openServiceDetail(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) return;
    
    // Isi data ke modal
    detailIcon.innerHTML = `<i class="${service.icon}"></i>`;
    detailTitle.textContent = service.title;
    detailCategory.textContent = service.categoryText;
    detailCategory.className = `detail-category ${service.category}`;
    detailDescription.textContent = service.description;
    
    // Isi fitur
    detailFeatures.innerHTML = '';
    service.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check"></i> ${feature}`;
        detailFeatures.appendChild(li);
    });
    
    // Isi harga dengan pewarnaan
    pricingTable.innerHTML = '';
    service.pricing.forEach(item => {
        const priceItem = document.createElement('div');
        priceItem.className = `pricing-item ${item.popular ? 'pricing-popular' : ''}`;
        
        priceItem.innerHTML = `
            <div class="pricing-name">${item.name}</div>
            <div class="pricing-price">${formatRupiah(item.price)}</div>
            <div class="pricing-note">${item.note}</div>
        `;
        
        pricingTable.appendChild(priceItem);
    });
    
    // Tampilkan modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Tutup Modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    // Render komponen
    renderServiceCards();
    renderContactButtons();
    
    // Animasi awal
    const tagline = document.querySelector('.tagline');
    tagline.style.opacity = '0';
    tagline.style.animation = 'text-reveal 1s ease-out forwards 0.5s';
    
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        btn.style.animation = `fade-up 0.8s ease-out forwards ${0.8 + index * 0.2}s`;
    });
    
    // Observer untuk animasi scroll
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.section-hidden').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Hover effect untuk kartu layanan (desktop)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) {
                const cardRect = this.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Animasi untuk icon di kartu layanan
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                const animations = ['pulse', 'rotate'];
                const randomAnim = animations[Math.floor(Math.random() * animations.length)];
                
                if (randomAnim === 'rotate') {
                    icon.style.animation = 'rotate 2s linear infinite';
                } else {
                    icon.style.animation = 'pulse 1s infinite alternate';
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            icon.style.animation = '';
        });
    });
    
    // Event listener untuk modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal dengan Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Efek ripple untuk tombol
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Smooth scroll untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle resize untuk optimasi mobile/desktop
    window.addEventListener('resize', function() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (window.innerWidth <= 768) {
            serviceCards.forEach(card => {
                card.style.transform = '';
            });
        }
    });
    
    // Background particle effect
    createParticles();
});

// Fungsi untuk membuat partikel background
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    document.body.appendChild(particleContainer);
    
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particleContainer.appendChild(particle);
    }
}