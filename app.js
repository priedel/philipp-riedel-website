// Professional homepage JavaScript functionality for Philipp Riedel - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initTestimonialsCarousel();
    initSystemsVisualization();
    initSkillsRadar();
    initContactForm();
    initNewsletterSignup();
    initVideoPlaceholders();
    initMobileNavigation();
});

// Preloader functionality
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    // Ensure preloader is visible initially
    preloader.style.display = 'flex';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                // Start typing animation after preloader
                startTypingAnimation();
            }, 500);
        }, 800);
    });
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Mobile navigation toggle
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Typing animation for hero section - Fixed
let typingStarted = false;

function initTypingAnimation() {
    // Just prepare the animation, don't start it yet
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        typedTextElement.textContent = '';
    }
}

function startTypingAnimation() {
    if (typingStarted) return;
    typingStarted = true;
    
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;
    
    const texts = [
        'Systems Strategist',
        'Risk Manager', 
        'Innovation Catalyst',
        'Team Leader',
        'Problem Solver',
        'Systems Thinker'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start typing immediately
    typeText();
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.framework-card, .service-card, .portfolio-item, .article-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Testimonials carousel functionality - Fixed
function initTestimonialsCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    let autoSlideInterval;
    
    if (slides.length === 0 || dots.length === 0) return;
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (slides[index]) slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Initialize first slide
    showSlide(0);
    
    // Start auto-advance carousel
    startAutoSlide();
    
    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
}

// Systems thinking visualization
function initSystemsVisualization() {
    const nodes = document.querySelectorAll('.system-node');
    const center = document.querySelector('.system-center');
    const connections = document.querySelectorAll('.connection');
    
    if (!center || nodes.length === 0) return;
    
    // Position connections
    function updateConnections() {
        const centerX = center.offsetLeft + center.offsetWidth / 2;
        const centerY = center.offsetTop + center.offsetHeight / 2;
        
        nodes.forEach((node, index) => {
            const nodeX = node.offsetLeft + node.offsetWidth / 2;
            const nodeY = node.offsetTop + node.offsetHeight / 2;
            
            if (connections[index]) {
                connections[index].setAttribute('x1', centerX);
                connections[index].setAttribute('y1', centerY);
                connections[index].setAttribute('x2', nodeX);
                connections[index].setAttribute('y2', nodeY);
            }
        });
    }
    
    // Hover effects
    nodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            if (connections[index]) {
                connections[index].style.opacity = '1';
                connections[index].style.strokeWidth = '3';
            }
        });
        
        node.addEventListener('mouseleave', function() {
            if (connections[index]) {
                connections[index].style.opacity = '0.6';
                connections[index].style.strokeWidth = '2';
            }
        });
    });
    
    // Initialize connections
    setTimeout(updateConnections, 100);
    window.addEventListener('resize', updateConnections);
}

// Skills radar chart
function initSkillsRadar() {
    const canvas = document.getElementById('skillsRadar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    const skills = [
        { name: 'Systems Engineering', level: 0.95 },
        { name: 'Risk Management', level: 0.9 },
        { name: 'Innovation Strategy', level: 0.85 },
        { name: 'Team Leadership', level: 0.8 },
        { name: 'Laboratory Automation', level: 0.95 }
    ];
    
    function drawRadar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid circles
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
        // Draw skill lines and labels
        const angleStep = (2 * Math.PI) / skills.length;
        
        skills.forEach((skill, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Draw grid lines
            ctx.strokeStyle = '#e0e0e0';
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Draw skill labels
            ctx.fillStyle = '#333';
            ctx.font = '12px Open Sans';
            ctx.textAlign = 'center';
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            ctx.fillText(skill.name, labelX, labelY);
        });
        
        // Draw skill levels
        ctx.fillStyle = 'rgba(40, 167, 233, 0.3)';
        ctx.strokeStyle = '#28a7e9';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        skills.forEach((skill, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const x = centerX + Math.cos(angle) * (radius * skill.level);
            const y = centerY + Math.sin(angle) * (radius * skill.level);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw skill points
        skills.forEach((skill, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const x = centerX + Math.cos(angle) * (radius * skill.level);
            const y = centerY + Math.sin(angle) * (radius * skill.level);
            
            ctx.fillStyle = '#28a7e9';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
    
    drawRadar();
    
    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // Highlight corresponding skill on radar
            drawRadar();
            
            if (skills[index]) {
                const skill = skills[index];
                const angleStep = (2 * Math.PI) / skills.length;
                const angle = angleStep * index - Math.PI / 2;
                const x = centerX + Math.cos(angle) * (radius * skill.level);
                const y = centerY + Math.sin(angle) * (radius * skill.level);
                
                ctx.fillStyle = '#ff6b6b';
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, 2 * Math.PI);
                ctx.fill();
            }
        });
        
        item.addEventListener('mouseleave', function() {
            drawRadar();
        });
    });
}

// Contact form functionality - Enhanced
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const budget = formData.get('budget');
        const message = formData.get('message');
        
        // Clear previous error messages
        clearErrorMessages(this);
        
        // Basic validation
        let hasErrors = false;
        
        if (!name || name.trim().length < 2) {
            showFieldError(this.querySelector('#name'), 'Name must be at least 2 characters long.');
            hasErrors = true;
        }
        
        if (!email || !isValidEmail(email)) {
            showFieldError(this.querySelector('#email'), 'Please enter a valid email address.');
            hasErrors = true;
        }
        
        if (!message || message.trim().length < 10) {
            showFieldError(this.querySelector('#message'), 'Message must be at least 10 characters long.');
            hasErrors = true;
        }
        
        if (hasErrors) {
            showNotification('Please correct the errors in the form.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you within 24 hours.', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Newsletter signup functionality - Enhanced
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            emailInput.focus();
            return;
        }
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Joining...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Welcome to the generalist community! Check your email for confirmation.', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Video placeholder interactions
function initVideoPlaceholders() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            // Simulate video play
            const icon = this.querySelector('i');
            const text = this.querySelector('span');
            
            if (!icon || !text) return;
            
            const originalIcon = icon.className;
            const originalText = text.textContent;
            
            icon.className = 'fas fa-pause-circle';
            text.textContent = 'Video Playing...';
            
            // Add playing state
            this.style.background = 'rgba(40, 167, 233, 0.3)';
            
            // Reset after 3 seconds (simulated)
            setTimeout(() => {
                icon.className = originalIcon;
                text.textContent = originalText;
                this.style.background = '';
            }, 3000);
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#dc3545';
}

function clearErrorMessages(form) {
    const errorMessages = form.querySelectorAll('.field-error');
    errorMessages.forEach(error => error.remove());
    
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        min-width: 300px;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}