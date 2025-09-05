// Fruteira Zanatta - Interactive functionality

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
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active link
            updateActiveNavLink(this);
        });
    });
    
    // Handle hero CTA button click
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('carnes');
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
// Função para adicionar imagens de promoções dinamicamente - ATUALIZADA
function adicionarPromocoes(imagensPaths) {
    const promotionsGrid = document.getElementById('promotions-grid');

    // Limpar o conteúdo atual
    promotionsGrid.innerHTML = '';

    // Adicionar cada imagem de promoção
    imagensPaths.forEach((imagePath, index) => {
        const promotionDiv = document.createElement('div');
        promotionDiv.className = 'promotion-image fade-in';
        promotionDiv.style.transitionDelay = `${index * 0.2}s`;

        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `Promoção ${index + 1}`;
        img.loading = 'lazy';

        promotionDiv.appendChild(img);
        promotionsGrid.appendChild(promotionDiv);
    });

    // Re-inicializar as animações de scroll para os novos elementos
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar os novos elementos de promoção
    document.querySelectorAll('.promotion-image').forEach(element => {
        observer.observe(element);
    });
}

// Carregar automaticamente as novas promoções quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Novas imagens das promoções da Fruteira Zanatta
    const promocoesAtuais = [
        '1000231560.jpeg',
        '1000231559.jpeg', 
        '1000231558.jpeg',
        '1000231556.jpeg'
    ];

    // Carregar as promoções automaticamente
    setTimeout(() => {
        adicionarPromocoes(promocoesAtuais);
    }, 1000); // Pequeno delay para garantir que a página carregou
});

// Função para atualizar promoções (para uso futuro)
function atualizarPromocoes(novasImagens) {
    adicionarPromocoes(novasImagens);
}


function scrollToSection(targetId) {
    const headerHeight = document.querySelector('.header').offsetHeight || 80;
    let targetElement = null;
    let targetPosition = 0;
    
    if (targetId === 'inicio') {
        // Scroll to top for inicio
        targetPosition = 0;
    } else if (targetId === 'carnes' || targetId === 'legumes' || targetId === 'frutas') {
        // For product sections, scroll to the specific product card
        targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetPosition = targetElement.offsetTop - headerHeight - 60;
        }
    } else if (targetId === 'localizacao') {
        // For location, scroll to the location section
        targetElement = document.getElementById('localizacao');
        if (targetElement) {
            targetPosition = targetElement.offsetTop - headerHeight - 20;
        }
    }
    
    // Ensure we don't scroll past the document
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetPosition = Math.min(targetPosition, maxScroll);
    targetPosition = Math.max(targetPosition, 0);
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveNavOnScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight || 80;
    const scrollPosition = window.scrollY + headerHeight + 50;
    
    let activeSection = 'inicio';
    
    // Check if we're at the very top
    if (window.scrollY < 100) {
        activeSection = 'inicio';
    } else {
        // Check each section based on scroll position
        const carnesElement = document.getElementById('carnes');
        const legumesElement = document.getElementById('legumes');
        const frutasElement = document.getElementById('frutas');
        const localizacaoElement = document.getElementById('localizacao');
        
        if (localizacaoElement) {
            const localizacaoTop = localizacaoElement.offsetTop;
            if (scrollPosition >= localizacaoTop - 100) {
                activeSection = 'localizacao';
            } else if (frutasElement) {
                const frutasTop = frutasElement.offsetTop;
                if (scrollPosition >= frutasTop - 100) {
                    activeSection = 'frutas';
                } else if (legumesElement) {
                    const legumesTop = legumesElement.offsetTop;
                    if (scrollPosition >= legumesTop - 100) {
                        activeSection = 'legumes';
                    } else if (carnesElement) {
                        const carnesTop = carnesElement.offsetTop;
                        if (scrollPosition >= carnesTop - 100) {
                            activeSection = 'carnes';
                        }
                    }
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
        element.style.transitionDelay = `${index * 0.2}s`;
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
        const randomDuration = 15 + Math.random() * 10;
        
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
        const speed = 0.2 + (index * 0.05);
        const yPos = -(scrolled * speed);
        const currentTransform = shape.style.transform || '';
        
        // Preserve the original animation transform and add parallax
        if (!currentTransform.includes('translate3d')) {
            shape.style.transform += ` translate3d(0, ${yPos}px, 0)`;
        }
    });
}

// Product card hover effects
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
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
            const opacity = Math.min((scrolled / 100) + 0.8, 0.98);
            
            if (scrolled > 50) {
                header.style.background = `rgba(255, 255, 253, ${opacity})`;
                header.style.backdropFilter = 'blur(15px)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            } else {
                header.style.background = 'rgba(255, 255, 253, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Debug function to log element positions (can be removed in production)
function debugElementPositions() {
    console.log('=== Element Positions Debug ===');
    const elements = ['carnes', 'legumes', 'frutas', 'localizacao'];
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`${id}: offsetTop = ${element.offsetTop}`);
        } else {
            console.log(`${id}: Element not found`);
        }
    });
    console.log(`Window scrollY: ${window.scrollY}`);
    console.log(`Header height: ${document.querySelector('.header').offsetHeight}`);
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
