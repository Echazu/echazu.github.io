// ==========================================
// INSTITUT MEDIKA NUSANTARA - INTERACTIVE JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE MENU TOGGLE (Hamburger Menu)
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            const isOpen = mainNav.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.textContent = isOpen ? '✕' : '☰';
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
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

    // 3. APPOINTMENT FORM HANDLING
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const patientName = document.getElementById('patientName').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;

            if (patientName && service && date) {
                alert(`Terima kasih, ${patientName}! Permintaan janji temu untuk layanan ${service.toUpperCase()} pada tanggal ${date} telah berhasil dikirim.`);
                appointmentForm.reset();
            } else {
                alert('Mohon lengkapi data formulir terlebih dahulu.');
            }
        });
    }

    // 4. ANIMATION ON SCROLL (Fitur Animasi Muncul Saat Digulir)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const checkScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        animatedElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Jalankan sekali saat dimuat

});
