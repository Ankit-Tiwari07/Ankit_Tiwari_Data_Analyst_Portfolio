document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-quad',
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const toggleTheme = () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    };

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        icon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', toggleTheme);

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(var(--bg-main), 0.95)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(var(--bg-main), 0.8)';
        }
    });

    // Form Submission Handling (EmailJS)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const btnIcon = submitBtn ? submitBtn.querySelector('.fas') : null;

    if (contactForm) {
        // Replace with your EmailJS Public Key
        // emailjs.init("YOUR_PUBLIC_KEY"); 

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Basic Validation
            const name = document.getElementById('user_name').value.trim();
            const email = document.getElementById('user_email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showStatus('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showStatus('Please enter a valid email address.', 'error');
                return;
            }

            // Loading State
            setLoading(true);

            try {
                // To make this work, you need to:
                // 1. Sign up at https://www.emailjs.com/
                // 2. Create an Email Service (e.g., Gmail)
                // 3. Create an Email Template
                // 4. Replace the Service ID, Template ID, and Public Key below

                /* 
                const response = await emailjs.sendForm(
                    'YOUR_SERVICE_ID', 
                    'YOUR_TEMPLATE_ID', 
                    contactForm,
                    'YOUR_PUBLIC_KEY'
                );
                */

                // Simulating successful send for now - remove this simulation once you add your IDs
                await new Promise(resolve => setTimeout(resolve, 2000));
                console.log('Form submitted successfully');

                showStatus('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('EmailJS Error:', error);
                showStatus('Oops! Something went wrong. Please try again later.', 'error');
            } finally {
                setLoading(false);
            }
        });
    }

    function showStatus(message, type) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        
        // Hide error after 5 seconds, keep success longer
        if (type === 'error') {
            setTimeout(() => {
                formStatus.className = 'form-status';
            }, 5000);
        }
    }

    function setLoading(isLoading) {
        if (!submitBtn || !btnText || !btnIcon) return;
        
        if (isLoading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnIcon.className = 'fas fa-spinner';
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane';
        }
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Typing Effect Logic
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Data Analyst", "Business Analyst", "Data Scientist"];
    const typingDelay = 150;
    const erasingDelay = 80;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start the typing effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // KPI Counter Animation (Optional Bonus)
    const kpiValues = document.querySelectorAll('.kpi-value');
    const observerOptions = {
        threshold: 0.5
    };

    const kpiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent);
                animateValue(target, 0, value, 2000);
                kpiObserver.unobserve(target);
            }
        });
    }, observerOptions);

    kpiValues.forEach(kpi => kpiObserver.observe(kpi));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            obj.textContent = current + (obj.textContent.includes('%') ? '%' : '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
