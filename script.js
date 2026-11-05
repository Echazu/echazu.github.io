// ==========================================
// INSTITUT MEDIKA NUSANTARA - SCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            const isOpen = mainNav.classList.contains('open');
            menuToggle.textContent = isOpen ? '✕' : '☰';
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                menuToggle.textContent = '☰';
            });
        });
    }

    // 2. DARK MODE TOGGLE
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('imn_theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            themeToggle.textContent = isDarkMode ? '☀' : '☾';
            localStorage.setItem('imn_theme', isDarkMode ? 'dark' : 'light');
        });
    }

    // 3. APPOINTMENT FORM
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const patientName = document.getElementById('patientName').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;

            if (patientName && service && date) {
                alert(`Terima kasih, ${patientName}! Permintaan janji temu untuk ${service.toUpperCase()} pada tanggal ${date} telah berhasil dikirim.`);
                appointmentForm.reset();
            } else {
                alert('Mohon lengkapi formulir terlebih dahulu.');
            }
        });
    }

    // 4. ANIMASI MUNCUL SAAT SCROLL (Fade-in)
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

});
