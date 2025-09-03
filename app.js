// Casa de Carnes Zanatta - Interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Intersection Observer for animations
    initScrollAnimations();
    
    // Mobile menu functionality
    initMobileMenu();
    
    // Floating elements animation enhancement
    initFloatingElements();
    
    // Hero animation
    initHeroAnimation();
    
    // Header scroll effects
    initHeaderScroll();
    
    // Product cards hover effects
    initProductCards();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const heroCta = document.querySelector('.hero-cta .btn');
    const footerLinks = document.querySelectorAll('.footer-nav a');
    
    // Handle navigation clicks for header nav
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active link
            updateActiveNavLink(this);
        });
    });
    
    // Handle footer navigation clicks
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Handle hero CTA button click
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('data-target') || 'carnes';
            scrollToSection(targetId);
        });
    }
    
    // Handle scroll to update active navigation
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function scrollToSection(targetId) {
    const headerHeight = 70; // Fixed header height
    let targetElement = null;
    let targetPosition = 0;
    
    if (targetId === 'inicio') {
        // Scroll to top for inicio
        targetPosition = 0;
    } else {
        // Find the target element
        targetElement = document.getElementById(targetId);
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            targetPosition = rect.top + scrollTop - headerHeight - 20;
        }
    }
    
    // Ensure we don't scroll past the document
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    targetPosition = Math.min(Math.max(targetPosition, 0), maxScroll);
    
    // Smooth scroll to position
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function updateActiveNavOnScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = 70;
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    let activeSection = 'inicio';
    
    // Check if we're at the very top
    if (window.scrollY < 200) {
        activeSection = 'inicio';
    } else {
        // Define sections in order
        const sections = ['carnes', 'legumes', 'frutas', 'bebidas', 'localizacao'];
        
        // Find the current active section
        for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i]);
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + window.scrollY;
                
                if (scrollPosition >= elementTop - 150) {
                    activeSection = sections[i];
                    break;
                }
            }
        }
    }
    
    // Update active navigation link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.product-card, .address-card');
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(element);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mobileMenuBtn && navMenu) {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Enhanced floating elements animation
function initFloatingElements() {
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    // Add random animation delays and speeds
    floatingShapes.forEach((shape, index) => {
        const randomDelay = Math.random() * 20;
        const randomDuration = 18 + Math.random() * 8;
        
        shape.style.animationDelay = `-${randomDelay}s`;
        shape.style.animationDuration = `${randomDuration}s`;
    });
    
    // Parallax effect for floating elements
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateFloatingElements();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function updateFloatingElements() {
    const scrolled = window.pageYOffset;
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    floatingShapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.03);
        const yPos = -(scrolled * speed);
        
        // Apply parallax transform while preserving animation
        shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
}

// Product card hover effects
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.style.transform.includes('scale')) {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth reveal animation for hero section
function initHeroAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroTitle && heroSubtitle && heroCta) {
        // Set initial styles
        const heroElements = [heroTitle, heroSubtitle, heroCta];
        heroElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        
        // Animate elements in sequence
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
        
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
        
        setTimeout(() => {
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 900);
    }
}

// Add scroll-based header background opacity
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const opacity = Math.min((scrolled / 100) + 0.85, 0.98);
            
            if (scrolled > 50) {
                header.style.background = `rgba(255, 255, 253, ${opacity})`;
                header.style.backdropFilter = 'blur(15px)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
            } else {
                header.style.background = 'rgba(255, 255, 253, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Add keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Alt + number keys for quick navigation
        if (e.altKey) {
            switch(e.code) {
                case 'Digit1':
                    e.preventDefault();
                    scrollToSection('inicio');
                    break;
                case 'Digit2':
                    e.preventDefault();
                    scrollToSection('carnes');
                    break;
                case 'Digit3':
                    e.preventDefault();
                    scrollToSection('legumes');
                    break;
                case 'Digit4':
                    e.preventDefault();
                    scrollToSection('frutas');
                    break;
                case 'Digit5':
                    e.preventDefault();
                    scrollToSection('bebidas');
                    break;
                case 'Digit6':
                    e.preventDefault();
                    scrollToSection('localizacao');
                    break;
            }
        }
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    initKeyboardNavigation();
});