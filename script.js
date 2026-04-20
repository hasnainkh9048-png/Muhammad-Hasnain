// Dark Mode Toggle
const darkModeBtn = document.getElementById('darkModeToggleNav');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateIcon(true);
} else {
    updateIcon(false);
}

function updateIcon(isDark) {
    const icon = darkModeBtn.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

darkModeBtn.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcon(isDark);
});

// Custom Cursor (only on desktop)
if (window.innerWidth > 768) {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.transform = `translate(${posX - 3}px, ${posY - 3}px)`;
        cursorOutline.style.transform = `translate(${posX - 16}px, ${posY - 16}px)`;
    });
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = body.classList.contains('dark-mode') ? '#0f172a' : 'white';
            navLinks.style.padding = '2rem';
            navLinks.style.gap = '1rem';
            navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }
    });
}

// Smooth Scroll & Active Nav Highlight
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('portfolioContactForm');
const feedbackDiv = document.getElementById('contactFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMsg').value.trim();
        
        if (!name || !email || !message) {
            showFeedback('❌ Please fill all fields', 'error');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            showFeedback('📧 Enter a valid email address', 'error');
            return;
        }
        
        console.log('Portfolio Message:', { name, email, message, timestamp: new Date().toISOString() });
        showFeedback('✅ Message sent! I will get back to you shortly.', 'success');
        contactForm.reset();
        
        setTimeout(() => {
            feedbackDiv.style.display = 'none';
        }, 5000);
    });
}

function showFeedback(msg, type) {
    feedbackDiv.textContent = msg;
    feedbackDiv.style.display = 'block';
    feedbackDiv.style.padding = '1rem';
    feedbackDiv.style.borderRadius = '1rem';
    feedbackDiv.style.marginTop = '1rem';
    feedbackDiv.style.backgroundColor = type === 'error' ? 'rgba(220,38,38,0.2)' : 'rgba(34,197,94,0.2)';
    feedbackDiv.style.color = type === 'error' ? '#ef4444' : '#4ade80';
}

// Dynamic Year in Footer
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2025', year);
}

// Add scroll reveal effect (simple)
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .exp-item, .edu-card, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});