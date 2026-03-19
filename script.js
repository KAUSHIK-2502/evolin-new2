document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function updateCountdown() {
        // Set event date: March 26, 2026 (you can change this)
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

        // Update meters based on countdown (simulate power consumption)
        const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
        const maxSeconds = 90 * 86400; // 90 days max
        
        const voltagePercent = Math.min(100, (totalSeconds / maxSeconds) * 100);
        const currentPercent = Math.min(100, ((totalSeconds % 100) / 100) * 100);
        const powerPercent = (voltagePercent + currentPercent) / 2;
        const freqPercent = Math.abs(Math.sin(totalSeconds / 1000) * 100);

        document.getElementById('voltageFill').style.width = voltagePercent + '%';
        document.getElementById('currentFill').style.width = currentPercent + '%';
        document.getElementById('powerFill').style.width = powerPercent + '%';
        document.getElementById('freqFill').style.width = freqPercent + '%';

        // Update meter values
        document.getElementById('voltageMeter').textContent = Math.floor(400 + (voltagePercent / 100) * 40) + 'V';
        document.getElementById('currentMeter').textContent = Math.floor(20 + (currentPercent / 100) * 20) + 'A';
        document.getElementById('powerMeter').textContent = (powerPercent / 100 * 15).toFixed(1) + 'kW';
        document.getElementById('freqMeter').textContent = (49 + (freqPercent / 100)).toFixed(1) + 'Hz';
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Modal functionality
    const modal = document.getElementById('registrationModal');
    const registerBtn = document.getElementById('registerBtn');
    const closeBtn = document.querySelector('.close');
    const registrationForm = document.getElementById('registrationForm');
    const formMessage = document.getElementById('formMessage');

    registerBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        clearFormMessage();
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            clearFormMessage();
        }
    });

    function clearFormMessage() {
        formMessage.innerHTML = '';
        formMessage.className = 'form-message';
        formMessage.style.display = 'none';
    }

    function showMessage(message, type) {
        formMessage.innerHTML = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }

    // Form validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^\d{10}$/.test(phone.replace(/\D/g, ''));
    }

    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const college = document.getElementById('college').value.trim();
        const registeringFor = document.getElementById('registeringFor').value;

        if (!name || !email || !phone || !college || !registeringFor) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        if (!isValidPhone(phone)) {
            showMessage('Please enter a valid 10-digit phone number', 'error');
            return;
        }

        // Get selected events
        const selectedEvents = [];
        document.querySelectorAll('.checkbox-grid input:checked').forEach(cb => {
            selectedEvents.push(cb.value);
        });

        // Calculate amount
        let amount = 0;
        if (registeringFor === 'workshop') amount = 250;
        else if (registeringFor === 'events') amount = 200;
        else if (registeringFor === 'both') amount = 450;

        // Registration data
        const registrationData = {
            name: name,
            email: email,
            phone: phone,
            college: college,
            type: registeringFor,
            events: selectedEvents,
            amount: amount,
            timestamp: new Date().toLocaleString()
        };

        console.log('EVOLIX Registration:', registrationData);

        showMessage(
            `⚡ REGISTRATION POWERED ON! Thank you ${name} for registering. Total: ₹${amount}. Payment at venue.`, 
            'success'
        );

        registrationForm.reset();

        // Close modal after 3 seconds
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            clearFormMessage();
        }, 3000);
    });

    // Animate meters randomly
    setInterval(() => {
        const randomJump = Math.random() * 10;
        document.querySelectorAll('.meter-fill').forEach(meter => {
            const currentWidth = parseFloat(meter.style.width) || 50;
            const newWidth = Math.min(100, Math.max(20, currentWidth + (Math.random() - 0.5) * 10));
            meter.style.width = newWidth + '%';
        });
    }, 2000);

    // Create floating particles
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '1';

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.5)`;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.borderRadius = '50%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            particlesContainer.appendChild(particle);
        }

        document.body.appendChild(particlesContainer);
    }

    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    createParticles();

    // Add click effect to power button
    const powerButton = document.querySelector('.power-button');
    if (powerButton) {
        powerButton.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }

    // Add hover effect to control knob
    const knob = document.querySelector('.knob');
    if (knob) {
        knob.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(45deg)';
        });
        knob.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg)';
        });
    }
});
