// ==========================================
// INSTITUT MEDIKA NUSANTARA - INTERACTIVE JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE MENU TOGGLE
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

    // 3. APPOINTMENT FORM TERHUBUNG LANGSUNG KE WHATSAPP
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah reload halaman
            
            const patientName = document.getElementById('patientName').value.trim();
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value.trim();

            if (patientName && service && date) {
                // Nomor WhatsApp Tujuan (+62 896-7332-0727)
                const whatsappNumber = "6289673320727"; 

                // Format Teks Pesan Otomatis
                const text = `Halo Institut Medika Nusantara,\n\nSaya ingin mengajukan permohonan Janji Temu dengan detail berikut:\n\n` +
                             `• *Nama Pasien*: ${patientName}\n` +
                             `• *Layanan*: Poli ${service.toUpperCase()}\n` +
                             `• *Tanggal Rencana*: ${date}\n` +
                             `• *Catatan*: ${message ? message : '-'}\n\n` +
                             `Mohon konfirmasinya. Terima kasih.`;

                // Encode pesan agar format karakter (spasi, enter, symbol) tidak rusak
                const encodedText = encodeURIComponent(text);

                // Buat tautan WA langsung
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

                // Langsung alihkan / buka aplikasi WhatsApp
                window.location.href = whatsappURL;
                
                // Reset form setelah dikirim
                appointmentForm.reset();
            } else {
                alert('Mohon lengkapi data nama, layanan, dan tanggal terlebih dahulu.');
            }
        });
    }

    // 4. ANIMASI SCROLL REVEAL ELEGANT
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 100;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial load

});
