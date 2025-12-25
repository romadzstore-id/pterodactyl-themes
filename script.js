// Data untuk website
const data = {
    indonesian: {
        brandName: "Romadz Store ID",
        tagline: "Digital Services • Trusted",
        servicesTitle: "Layanan Tersedia",
        servicesSubtitle: "Kami menyediakan berbagai layanan digital berkualitas untuk kebutuhan bisnis Anda.",
        contactTitle: "Contact",
        contactSubtitle: "Hubungi kami melalui platform berikut:",
        copyright: "© 2025 Romadz Store ID",
        footerTagline: "Digital Services You Can Trust",
        services: [
            { name: "Jasa Install Pterodactyl", icon: "fas fa-server", price: "Mulai dari Rp 50.000" },
            { name: "Jasa Add Fitur & Edit Script Bot", icon: "fas fa-code", price: "Mulai dari Rp 100.000" },
            { name: "Jasa Suntik Sosmed", icon: "fas fa-chart-line", price: "Likes, Followers, Views" },
            { name: "Domain 1 Tahun", icon: "fas fa-globe", price: ".web.id, .biz.id, .my.id" },
            { name: "Panel Pterodactyl & Ressler Private", icon: "fas fa-shield-alt", price: "Hosting & Keamanan" },
            { name: "Nokos WhatsApp Fresh/Save", icon: "fab fa-whatsapp", price: "Akun WA Premium" },
            { name: "Akun Premium", icon: "fas fa-crown", price: "Netflix, Spotify, CapCut, dll." },
            { name: "Layanan Digital Lainnya", icon: "fas fa-laptop-code", price: "Custom sesuai kebutuhan" }
        ],
        contacts: [
            { name: "WhatsApp", icon: "fab fa-whatsapp", url: "https://wa.me/6283171889474", text: "+62 831-7188-9474" },
            { name: "Telegram", icon: "fab fa-telegram", url: "https://t.me/rmddz", text: "@rmddz" },
            { name: "Channel Testimoni", icon: "fas fa-comment-alt", url: "https://t.me/rmddztrust", text: "Testimoni Pelanggan" },
            { name: "Email", icon: "fas fa-envelope", url: "mailto:romadzstoreid@gmail.com", text: "romadzstoreid@gmail.com" }
        ]
    },
    english: {
        brandName: "Romadz Store ID",
        tagline: "Digital Services • Trusted",
        servicesTitle: "Available Services",
        servicesSubtitle: "We provide various quality digital services for your business needs.",
        contactTitle: "Contact",
        contactSubtitle: "Contact us through the following platforms:",
        copyright: "© 2025 Romadz Store ID",
        footerTagline: "Digital Services You Can Trust",
        services: [
            { name: "Pterodactyl Installation Service", icon: "fas fa-server", price: "Starting from Rp 50,000" },
            { name: "Feature Addition & Bot Script Editing", icon: "fas fa-code", price: "Starting from Rp 100,000" },
            { name: "Social Media Injection", icon: "fas fa-chart-line", price: "Likes, Followers, Views" },
            { name: "1 Year Domain", icon: "fas fa-globe", price: ".web.id, .biz.id, .my.id" },
            { name: "Pterodactyl Panel & Private Reseller", icon: "fas fa-shield-alt", price: "Hosting & Security" },
            { name: "WhatsApp Fresh/Save Nokos", icon: "fab fa-whatsapp", price: "Premium WA Account" },
            { name: "Premium Accounts", icon: "fas fa-crown", price: "Netflix, Spotify, CapCut, etc." },
            { name: "Other Digital Services", icon: "fas fa-laptop-code", price: "Custom according to needs" }
        ],
        contacts: [
            { name: "WhatsApp", icon: "fab fa-whatsapp", url: "https://wa.me/6283171889474", text: "+62 831-7188-9474" },
            { name: "Telegram", icon: "fab fa-telegram", url: "https://t.me/rmddz", text: "@rmddz" },
            { name: "Testimonial Channel", icon: "fas fa-comment-alt", url: "https://t.me/rmddztrust", text: "Customer Testimonials" },
            { name: "Email", icon: "fas fa-envelope", url: "mailto:romadzstoreid@gmail.com", text: "romadzstoreid@gmail.com" }
        ]
    }
};

// State untuk bahasa
let currentLang = 'indonesian';
const langBtn = document.getElementById('lang-btn');
const langFlag = document.querySelector('.lang-flag');
const langText = document.querySelector('.lang-text');

// Fungsi untuk mengubah bahasa
function toggleLanguage() {
    currentLang = currentLang === 'indonesian' ? 'english' : 'indonesian';
    updateContent();
    
    // Update tombol bahasa
    if (currentLang === 'indonesian') {
        langFlag.textContent = '🇮🇩';
        langText.textContent = 'ID';
    } else {
        langFlag.textContent = '🇬🇧';
        langText.textContent = 'EN';
    }
}

// Fungsi untuk memperbarui konten berdasarkan bahasa
function updateContent() {
    const langData = data[currentLang];
    
    // Update teks statis
    document.getElementById('brand-name').textContent = langData.brandName;
    document.getElementById('tagline').textContent = langData.tagline;
    document.getElementById('services-title').textContent = langData.servicesTitle;
    document.getElementById('services-subtitle').textContent = langData.servicesSubtitle;
    document.getElementById('contact-title').textContent = langData.contactTitle;
    document.getElementById('contact-subtitle').textContent = langData.contactSubtitle;
    document.getElementById('copyright').textContent = langData.copyright;
    document.getElementById('footer-tagline').textContent = langData.footerTagline;
    
    // Update layanan
    const servicesGrid = document.querySelector('.services-grid');
    servicesGrid.innerHTML = '';
    
    langData.services.forEach((service, index) => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.style.animationDelay = `${index * 0.1}s`;
        
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="service-name">${service.name}</h3>
            <p class="service-price">${service.price}</p>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
    
    // Update kontak
    const contactGrid = document.querySelector('.contact-grid');
    contactGrid.innerHTML = '';
    
    langData.contacts.forEach((contact, index) => {
        const contactItem = document.createElement('a');
        contactItem.className = 'contact-item';
        contactItem.href = contact.url;
        contactItem.target = '_blank';
        contactItem.style.animationDelay = `${index * 0.1 + 0.5}s`;
        
        contactItem.innerHTML = `
            <div class="contact-icon">
                <i class="${contact.icon}"></i>
            </div>
            <h3 class="service-name">${contact.name}</h3>
            <p class="contact-text">${contact.text}</p>
        `;
        
        contactGrid.appendChild(contactItem);
    });
}

// Fungsi untuk animasi scroll halus
function initSmoothScroll() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
    
    // Animasi saat scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observasi elemen yang akan dianimasikan
    document.querySelectorAll('.service-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Fungsi untuk logo floating animation
function initLogoAnimation() {
    const logo = document.getElementById('logo');
    
    // Coba load logo dari local file, jika tidak ada gunakan placeholder
    logo.onerror = function() {
        this.src = "https://via.placeholder.com/150/6d28d9/FFFFFF?text=RS";
    };
    
    // Cek jika logo.jpg ada
    fetch('logo.jpg')
        .then(response => {
            if (response.ok) {
                logo.src = 'logo.jpg';
            }
        })
        .catch(() => {
            // Tetap gunakan placeholder jika gagal
            logo.src = "https://via.placeholder.com/150/6d28d9/FFFFFF?text=RS";
        });
}

// Inisialisasi website
document.addEventListener('DOMContentLoaded', () => {
    // Setup bahasa
    langBtn.addEventListener('click', toggleLanguage);
    
    // Inisialisasi konten
    updateContent();
    
    // Inisialisasi animasi
    initSmoothScroll();
    initLogoAnimation();
    
    // Animasi untuk elemen yang sudah terlihat saat load
    const animateOnLoad = () => {
        document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
            el.style.opacity = '1';
        });
    };
    
    // Delay sedikit untuk memastikan animasi berjalan dengan baik
    setTimeout(animateOnLoad, 300);
});