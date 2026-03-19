document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function updateCountdown() {
        const eventDate = new Date('March 26, 2026 09:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Modal functionality
    const modal = document.getElementById('registrationModal');
    const navRegisterBtn = document.getElementById('navRegisterBtn');
    const heroRegisterBtn = document.getElementById('heroRegisterBtn');
    const closeBtn = document.querySelector('.close');
    const registrationForm = document.getElementById('registrationForm');
    const formMessage = document.getElementById('formMessage');

    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        formMessage.style.display = 'none';
        registrationForm.reset();
    }

    navRegisterBtn.addEventListener('click', openModal);
    heroRegisterBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Form validation
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^\d{10}$/.test(phone.replace(/\D/g, ''));
    }

    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const college = document.getElementById('college').value.trim();
        const registerType = document.getElementById('registerType').value;

        // Validation
        if (!name || !email || !phone || !college || !registerType) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        if (!validatePhone(phone)) {
            showMessage('Please enter a valid 10-digit phone number', 'error');
            return;
        }

        // Calculate amount
        let amount = 0;
        if (registerType === 'workshop') amount = 250;
        else if (registerType === 'events') amount = 200;
        else if (registerType === 'both') amount = 450;

        // Success message
        showMessage(`Registration successful! Total amount: ₹${amount}. Payment at venue.`, 'success');
        registrationForm.reset();

        // Close modal after 2 seconds
        setTimeout(closeModal, 2000);
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'white';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'white';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
});
