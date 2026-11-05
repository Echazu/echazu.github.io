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

    // 3. LOGIC APPOINTMENT FORM KE WHATSAPP
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const patientName = document.getElementById('patientName').value.trim();
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value.trim();

            if (patientName && service && date) {
                const whatsappNumber = "6289673320727"; 
                const text = `Halo Institut Medika Nusantara,\n\nSaya ingin mengajukan permohonan Janji Temu:\n\n` +
                             `• *Nama Pasien*: ${patientName}\n` +
                             `• *Layanan*: Poli ${service.toUpperCase()}\n` +
                             `• *Tanggal Rencana*: ${date}\n` +
                             `• *Catatan*: ${message ? message : '-'}\n\n` +
                             `Mohon konfirmasinya. Terima kasih.`;

                window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
                appointmentForm.reset();
            }
        });
    }

    // 4. LOAD DYNAMIC DATA DARI ADMIN (BERITA, DOKTER, KONTAK)
    loadDynamicContent();

    function loadDynamicContent() {
        // A. LOAD DOKTER DARI ADMIN
        const docContainer = document.querySelector('.doctor-placeholder');
        const doctorData = JSON.parse(localStorage.getItem('imn_doctor_data') || '[]');

        if (docContainer && doctorData.length > 0) {
            let docHTML = `<div class="services-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); text-align: left;">`;
            doctorData.forEach(doc => {
                docHTML += `
                    <div class="service-card" style="box-shadow: var(--shadow-sm);">
                        <div class="service-icon">👨‍⚕️</div>
                        <h3>${doc.name}</h3>
                        <p style="color: var(--blue-accent); font-weight:700; margin-bottom:4px;">${doc.spec}</p>
                        <small style="color: var(--text-light);">${doc.sched}</small>
                    </div>
                `;
            });
            docHTML += `</div>`;
            docContainer.innerHTML = docHTML;
            docContainer.style.background = 'transparent';
            docContainer.style.border = 'none';
        }

        // B. LOAD KONTAK DARI ADMIN
        const cntData = JSON.parse(localStorage.getItem('imn_contact_data') || '{}');
        if (cntData.address) {
            const items = document.querySelectorAll('.contact-item p');
            if (items.length >= 4) {
                items[0].textContent = cntData.address;
                items[1].textContent = cntData.phone;
                items[2].textContent = cntData.email;
                items[3].textContent = cntData.hours;
            }
        }
    }

    // 5. ANIMASI SCROLL REVEAL ELEGANT
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(reveal => {
            if (reveal.getBoundingClientRect().top < windowHeight - 100) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
