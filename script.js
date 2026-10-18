/**
 * Goroi Portfolio - Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------------
    // 1. Dynamic Typewriter Effect for Hero
    // ---------------------------------------------------------------
    const typedTextEl = document.getElementById('typed-text');
    const roles = [
        'Pre-Medical Student.',
        'Dedicated NEET Aspirant.',
        'Biology & Science Enthusiast.',
        'Disciplined Daily Learner.',
        'Future Healthcare Professional.'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typedTextEl) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 110;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of word
            isDeleting = true;
            typingSpeed = 1800;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // ---------------------------------------------------------------
    // 2. Dark / Light Theme Toggle
    // ---------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved preference or fallback to dark
    const savedTheme = localStorage.getItem('goroi_portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('goroi_portfolio_theme', newTheme);
        });
    }

    // ---------------------------------------------------------------
    // 3. Header Scroll Effect & Active Navigation Link Tracking
    // ---------------------------------------------------------------
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        // Sticky Header styling
        if (window.scrollY > 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        // Active link tracking based on scroll position
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ---------------------------------------------------------------
    // 4. Mobile Menu Toggle
    // ---------------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ---------------------------------------------------------------
    // 5. Project Category Filtering
    // ---------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state on buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ---------------------------------------------------------------
    // 6. Stats Counter Animation
    // ---------------------------------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            if (isNaN(target)) return;

            let count = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const timer = setInterval(() => {
                count += step;
                if (count >= target) {
                    count = target;
                    clearInterval(timer);
                    // Retain suffix like + or %
                    const suffix = target === 100 ? '%' : '+';
                    stat.textContent = `${target}${suffix}`;
                } else {
                    const suffix = target === 100 ? '%' : '+';
                    stat.textContent = `${count}${suffix}`;
                }
            }, 30);
        });
    }

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsBar);
    } else {
        animateStats();
    }

    // ---------------------------------------------------------------
    // 7. Interactive Contact Form with Validation
    // ---------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const feedbackBox = document.getElementById('form-feedback');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function clearErrors() {
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        if (feedbackBox) {
            feedbackBox.className = 'form-feedback';
            feedbackBox.style.display = 'none';
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            let isValid = true;

            // Name check
            if (!nameInput.value.trim()) {
                document.getElementById('name-error').textContent = 'Please enter your name.';
                isValid = false;
            }

            // Email check
            if (!emailInput.value.trim()) {
                document.getElementById('email-error').textContent = 'Please enter your email address.';
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Message check
            if (!messageInput.value.trim()) {
                document.getElementById('message-error').textContent = 'Please enter a message.';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                document.getElementById('message-error').textContent = 'Message should be at least 10 characters.';
                isValid = false;
            }

            if (!isValid) return;

            // Submit Simulation
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;

                if (feedbackBox) {
                    feedbackBox.className = 'form-feedback success';
                    feedbackBox.textContent = '✨ Message sent successfully! Thank you for reaching out, I will get back to you soon.';
                    feedbackBox.style.display = 'block';
                }

                contactForm.reset();

                // Auto hide message after 6 seconds
                setTimeout(() => {
                    if (feedbackBox) feedbackBox.style.display = 'none';
                }, 6000);
            }, 1200);
        });
    }

    // ---------------------------------------------------------------
    // 8. Auto Update Current Year in Footer
    // ---------------------------------------------------------------
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
