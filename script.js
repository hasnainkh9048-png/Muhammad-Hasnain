document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (cursorDot && cursorOutline) {
            window.addEventListener('mousemove', (e) => {
                cursorDot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
                cursorOutline.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
            });
        }
    }

    // Mobile menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('nav ul');
    
    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('show');
        });
    }

    // Close menu on link click
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navList) navList.classList.remove('show');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target && this.getAttribute('href') !== '#') {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact form
    const contactForm = document.getElementById('demo-contact-form');
    const feedback = document.getElementById('formFeedback');
    
    if (contactForm && feedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('input, textarea');
            let allFilled = true;
            inputs.forEach(inp => {
                if (inp.value.trim() === '') allFilled = false;
            });
            if (!allFilled) {
                feedback.textContent = '⚠️ error: all fields required';
                feedback.style.color = '#ff3860';
                return;
            }
            feedback.textContent = '✔ message sent! Will reply soon.';
            feedback.style.color = '#00e6a0';
            contactForm.reset();
            setTimeout(() => { feedback.textContent = ''; }, 4000);
        });
    }
});
