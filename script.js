document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor (only on devices that support hover)
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

    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('nav ul');
    
    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('show');
        });
    }

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList && navList.classList.contains('show')) {
                navList.classList.remove('show');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handler
    const contactForm = document.getElementById('demo-contact-form');
    const feedback = document.getElementById('formFeedback');
    
    if (contactForm && feedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = contactForm.querySelectorAll('input, textarea');
            let allFilled = true;
            
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    allFilled = false;
                }
            });
            
            if (!allFilled) {
                feedback.textContent = '⚠️ error: all fields required';
                feedback.style.color = '#ff3860';
                return;
            }
            
            feedback.textContent = '✔ message sent! Hasnain will reply soon.';
            feedback.style.color = '#00e6a0';
            contactForm.reset();
            
            setTimeout(() => {
                feedback.textContent = '';
            }, 4000);
        });
    }

    // Dynamic footer year - FIXED VERSION
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    } else {
        // Fallback: if span doesn't exist, create it
        const footerPara = document.querySelector('footer p');
        if (footerPara) {
            const existingText = footerPara.innerHTML;
            const currentYear = new Date().getFullYear();
            footerPara.innerHTML = `<span class="footer-prompt">$</span> Muhammad Hasnain © ${currentYear} | Web Developer & AI/Data Science Student`;
        }
    }
});
