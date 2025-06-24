// Professional homepage JavaScript functionality for Philipp Riedel - Enhanced Version
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initTestimonialsCarousel();
    initSystemsVisualization();
    initContactForm();
    initNewsletterSignup();
    initVideoPlaceholders();
    initMobileNavigation();
    // Initialize multiple spider charts with the new generic framework
    initializeSpiderCharts();
});

// Preloader functionality
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
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

// Enhanced navigation functionality with smooth scrolling
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling for navigation links with proper offset
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Adjust offset for fixed header
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
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

// Enhanced testimonials carousel with 10-second auto-advance
function initTestimonialsCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    let carouselInterval;

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

    function startCarouselTimer() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
        // Set to 5 seconds as requested
        carouselInterval = setInterval(nextSlide, 5000);
    }

    function stopCarouselTimer() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
    }

    // Add click event listeners to dots for manual navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopCarouselTimer();
            showSlide(index);
            // Restart the timer when manually changing slides
            startCarouselTimer();
        });
    });

    // Initialize first slide
    showSlide(0);
    
    // Start auto-advance carousel
    startCarouselTimer();

    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopCarouselTimer);
        carousel.addEventListener('mouseleave', startCarouselTimer);
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

// Generic Spider Chart Class
function initializeSpiderCharts() {
    // Soft Skills Chart
    new SpiderChart({
        svgId: 'softSkillsChart',
        sectionId: 'soft-skills',
        skills: [
            { name: 'Systems Thinking', value: 95 },
            { name: 'Collaborative Leadership', value: 90 },
            { name: 'Adaptability & Learning', value: 88 },
            { name: 'Critical Problem-Solving', value: 92 },
            { name: 'Stakeholder Management', value: 89 },
            { name: 'Risk Awareness & Mitigation', value: 94 },
            { name: 'Creative Innovation', value: 86 }
        ]
    });
    
    // Add more spider charts as needed
    // Hard Skills Chart, Tools Chart, etc.
}


class SpiderChart {
    constructor(config) {
        this.svgId = config.svgId;
        this.skills = config.skills;
        this.sectionId = config.sectionId;
        this.center = { x: 250, y: 250 };
        this.maxRadius = 180;
        this.levels = 5;
        
        this.init();
    }
    
    init() {
        const svg = document.getElementById(this.svgId);
        if (!svg) {
            console.error(`Spider chart SVG element ${this.svgId} not found`);
            return;
        }
        
        // Clear existing content
        svg.innerHTML = '';
        
        // Draw chart elements
        this.drawGridCircles(svg);
        this.drawAxisLines(svg);
        this.drawDataArea(svg);
        this.drawDataPoints(svg);
        this.drawAxisLabels(svg);
        
        // Setup interactions
        this.setupInteractions();
    }
    
    drawGridCircles(svg) {
        const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gridGroup.setAttribute('class', 'grid-circles');
        
        for (let i = 1; i <= this.levels; i++) {
            const radius = (this.maxRadius / this.levels) * i;
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', this.center.x);
            circle.setAttribute('cy', this.center.y);
            circle.setAttribute('r', radius);
            circle.setAttribute('class', 'spider-grid-circle');
            gridGroup.appendChild(circle);
        }
        
        svg.appendChild(gridGroup);
    }
    
    drawAxisLines(svg) {
        const axisGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        axisGroup.setAttribute('class', 'axis-lines');
        
        for (let i = 0; i < this.skills.length; i++) {
            const angle = (i * 2 * Math.PI) / this.skills.length - Math.PI / 2;
            const x2 = this.center.x + Math.cos(angle) * this.maxRadius;
            const y2 = this.center.y + Math.sin(angle) * this.maxRadius;
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', this.center.x);
            line.setAttribute('y1', this.center.y);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('class', 'spider-axis-line');
            axisGroup.appendChild(line);
        }
        
        svg.appendChild(axisGroup);
    }
    
    drawDataArea(svg) {
        const dataGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        dataGroup.setAttribute('class', 'data-areas');
        
        const points = [];
        this.skills.forEach((skill, i) => {
            const angle = (i * 2 * Math.PI) / this.skills.length - Math.PI / 2;
            const value = skill.value / 100;
            const radius = this.maxRadius * value;
            const x = this.center.x + Math.cos(angle) * radius;
            const y = this.center.y + Math.sin(angle) * radius;
            points.push(`${x},${y}`);
        });
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', points.join(' '));
        polygon.setAttribute('class', 'spider-data-area');
        dataGroup.appendChild(polygon);
        
        svg.appendChild(dataGroup);
    }
    
    drawDataPoints(svg) {
        const pointsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        pointsGroup.setAttribute('class', 'data-points');
        
        this.skills.forEach((skill, i) => {
            const angle = (i * 2 * Math.PI) / this.skills.length - Math.PI / 2;
            const value = skill.value / 100;
            const radius = this.maxRadius * value;
            const x = this.center.x + Math.cos(angle) * radius;
            const y = this.center.y + Math.sin(angle) * radius;
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', 6);
            circle.setAttribute('class', 'spider-data-point');
            circle.setAttribute('data-skill', i);
            circle.setAttribute('data-chart', this.sectionId);
            
            const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            title.textContent = `${skill.name}: ${skill.value}%`;
            circle.appendChild(title);
            
            pointsGroup.appendChild(circle);
        });
        
        svg.appendChild(pointsGroup);
    }
    
    drawAxisLabels(svg) {
        const labelsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        labelsGroup.setAttribute('class', 'axis-labels');
        
        this.skills.forEach((skill, i) => {
            const angle = (i * 2 * Math.PI) / this.skills.length - Math.PI / 2;
            const labelRadius = this.maxRadius + 30;
            const x = this.center.x + Math.cos(angle) * labelRadius;
            const y = this.center.y + Math.sin(angle) * labelRadius;
            
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', y);
            text.setAttribute('class', 'spider-axis-label');
            text.setAttribute('data-skill', i);
            text.setAttribute('data-chart', this.sectionId);
            text.textContent = skill.name;
            
            if (x > this.center.x + 10) {
                text.setAttribute('text-anchor', 'start');
            } else if (x < this.center.x - 10) {
                text.setAttribute('text-anchor', 'end');
            }
            
            labelsGroup.appendChild(text);
        });
        
        svg.appendChild(labelsGroup);
    }
    
    setupInteractions() {
        const section = document.getElementById(this.sectionId);
        if (!section) return;
        
        const legendItems = section.querySelectorAll('.spider-legend-item');
        const dataPoints = section.querySelectorAll('.spider-data-point');
        const axisLabels = section.querySelectorAll('.spider-axis-label');
        
        // Legend interactions
        legendItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => this.highlightSkill(index));
            item.addEventListener('mouseleave', () => this.resetHighlight());
            item.addEventListener('click', () => {
                this.activateSkill(index);
                this.showSkillDetail(index);
            });
        });
        
        // Data point interactions - Fixed to prevent jumping
        dataPoints.forEach((point, index) => {
            point.addEventListener('mouseenter', () => this.highlightSkill(index));
            point.addEventListener('mouseleave', () => this.resetHighlight());
            point.addEventListener('click', () => {
                this.activateSkill(index);
                this.showSkillDetail(index);
            });
        });
        
        // Axis label interactions
        axisLabels.forEach((label, index) => {
            label.addEventListener('mouseenter', () => this.highlightSkill(index));
            label.addEventListener('mouseleave', () => this.resetHighlight());
            label.addEventListener('click', () => {
                this.activateSkill(index);
                this.showSkillDetail(index);
            });
        });
    }
    
    highlightSkill(index) {
        this.resetHighlight();
        
        const section = document.getElementById(this.sectionId);
        const legendItem = section.querySelector(`.spider-legend-item[data-skill="${index}"]`);
        const dataPoint = section.querySelector(`.spider-data-point[data-skill="${index}"]`);
        const axisLabel = section.querySelector(`.spider-axis-label[data-skill="${index}"]`);
        
        if (legendItem) legendItem.classList.add('active');
        if (dataPoint) dataPoint.classList.add('highlighted');
        if (axisLabel) {
            axisLabel.style.fill = '#28a7e9';
            axisLabel.style.fontSize = '14px';
        }
    }
    
    resetHighlight() {
        const section = document.getElementById(this.sectionId);
        
        section.querySelectorAll('.spider-legend-item').forEach(item => {
            if (!item.classList.contains('permanent-active')) {
                item.classList.remove('active');
            }
        });
        
        section.querySelectorAll('.spider-data-point').forEach(point => {
            if (!point.classList.contains('permanent-active')) {
                point.classList.remove('highlighted');
            }
        });
        
        section.querySelectorAll('.spider-axis-label').forEach(label => {
            if (!label.classList.contains('permanent-active')) {
                label.style.fill = '';
                label.style.fontSize = '';
            }
        });
    }
    
    activateSkill(index) {
        const section = document.getElementById(this.sectionId);
        
        // Remove all permanent active states in this section
        section.querySelectorAll('.spider-legend-item, .spider-data-point, .spider-axis-label').forEach(el => {
            el.classList.remove('permanent-active', 'active', 'highlighted');
            if (el.tagName === 'text') {
                el.style.fill = '';
                el.style.fontSize = '';
            }
        });
        
        // Set new permanent active state
        const legendItem = section.querySelector(`.spider-legend-item[data-skill="${index}"]`);
        const dataPoint = section.querySelector(`.spider-data-point[data-skill="${index}"]`);
        const axisLabel = section.querySelector(`.spider-axis-label[data-skill="${index}"]`);
        
        if (legendItem) {
            legendItem.classList.add('permanent-active', 'active');
        }
        if (dataPoint) {
            dataPoint.classList.add('permanent-active', 'active');
        }
        if (axisLabel) {
            axisLabel.classList.add('permanent-active');
            axisLabel.style.fill = '#ff6b6b';
            axisLabel.style.fontSize = '14px';
        }
    }
    
    showSkillDetail(index) {
        const section = document.getElementById(this.sectionId);
        
        section.querySelectorAll('.spider-detail').forEach(detail => {
            detail.classList.remove('active');
        });
        
        const targetDetail = section.querySelector(`.spider-detail[data-skill="${index}"]`);
        if (targetDetail) {
            targetDetail.classList.add('active');
        }
    }
}

// Initialize Multiple Spider Charts
document.addEventListener('DOMContentLoaded', function() {
    // Soft Skills Chart
    new SpiderChart({
        svgId: 'softSkillsChart',
        sectionId: 'soft-skills',
        skills: [
            { name: 'Systems Thinking', value: 95 },
            { name: 'Collaborative Leadership', value: 90 },
            { name: 'Adaptability & Learning', value: 88 },
            { name: 'Critical Problem-Solving', value: 92 },
            { name: 'Stakeholder Management', value: 89 },
            { name: 'Risk Awareness & Mitigation', value: 94 },
            { name: 'Creative Innovation', value: 86 }
        ]
    });
    
    // Hard Skills Chart
    new SpiderChart({
        svgId: 'hardSkillsChart',
        sectionId: 'hard-skills',
        skills: [
            { name: 'Software Engineering', value: 90 },
            { name: 'Data Analysis', value: 85 },
            { name: 'System Architecture', value: 88 },
            { name: 'Project Management', value: 82 },
            { name: 'Quality Assurance', value: 87 },
            { name: 'Documentation', value: 89 }
        ]
    });
    
    // Tools & Technologies Chart
    new SpiderChart({
        svgId: 'toolsChart',
        sectionId: 'tools-tech',
        skills: [
            { name: 'MATLAB/Simulink', value: 95 },
            { name: 'Python', value: 88 },
            { name: 'SQL/Databases', value: 85 },
            { name: 'CAD Software', value: 82 },
            { name: 'Git/Version Control', value: 90 },
            { name: 'Cloud Platforms', value: 78 }
        ]
    });
});


// Enhanced contact form functionality
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
            showNotification('Thank you for your message! I\'ll get back to you within 48 hours.', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Enhanced newsletter signup functionality
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
    if (!field) return;
    
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
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        font-family: var(--font-family-base);
    `;

    // Type-specific colors
    const colors = {
        success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724' },
        error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' },
        info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460' },
        warning: { bg: '#fff3cd', border: '#ffeaa7', text: '#856404' }
    };

    const colorScheme = colors[type] || colors.info;
    notification.style.backgroundColor = colorScheme.bg;
    notification.style.borderLeft = `4px solid ${colorScheme.border}`;
    notification.style.color = colorScheme.text;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS for notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification__close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        color: inherit;
        opacity: 0.7;
    }
    
    .notification__close:hover {
        opacity: 1;
    }
`;

document.head.appendChild(notificationStyles);
