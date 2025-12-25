// Inisialisasi Lucide Icons
lucide.createIcons();

// Smooth Scroll Reveal Effect
const revealElements = document.querySelectorAll('.reveal');

const scrollReveal = () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            el.classList.add('active');
        }
    });
};

// Jalankan saat scroll
window.addEventListener('scroll', scrollReveal);

// Jalankan sekali saat load untuk cek elemen yang sudah di viewport
window.addEventListener('load', () => {
    scrollReveal();
    document.querySelector('#hero').classList.add('fade-in');
});

// Penundaan munculnya card layanan satu per satu (Stagger effect)
const cards = document.querySelectorAll('.service-card');
cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});