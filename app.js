// Fruteira Zanatta - Interactive functionality

document.addEventListener('DOMContentLoaded', function () {

  initNavigation();

  initScrollAnimations();

  initMobileMenu();

  initFloatingElements();

  initHeroAnimation();

  initHeaderScroll();

  initProductCards();

  initKeyboardNavigation();

});

// Navigation functionality

function initNavigation() {

  const navLinks = document.querySelectorAll('.nav-link');

  const heroCta = document.querySelector('.hero-cta .btn');

  // Handle navigation clicks

  navLinks.forEach(link => {

    link.addEventListener('click', function (e) {

      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);

      scrollToSection(targetId);

      updateActiveNavLink(this);

    });

  });

  // Handle hero CTA button click

  if (heroCta) {

    heroCta.addEventListener('click', function (e) {

      e.preventDefault();

      scrollToSection('carnes');

    });

  }

  // Handle scroll to update active navigation

  let ticking = false;

  window.addEventListener('scroll', function () {

    if (!ticking) {

      requestAnimationFrame(function () {

        updateActiveNavOnScroll();

        ticking = false;

      });

      ticking = true;

    }

  });

  // Scroll smoothly to section

  function scrollToSection(targetId) {

    const headerHeight = document.querySelector('.header').offsetHeight || 80;

    let targetElement = null;

    let targetPosition = 0;

    if (targetId === 'inicio') {

      targetPosition = 0;

    } else if (['carnes', 'legumes', 'frutas'].includes(targetId)) {

      targetElement = document.getElementById(targetId);

      if (targetElement) {

        targetPosition = targetElement.offsetTop - headerHeight - 60;

      }

    } else if (targetId === 'localizacao') {

      targetElement = document.getElementById('localizacao');

      if (targetElement) {

        targetPosition = targetElement.offsetTop - headerHeight - 20;

      }

    }

    // Ensure scroll within document bounds

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    targetPosition = Math.min(targetPosition, maxScroll);

    targetPosition = Math.max(targetPosition, 0);

    window.scrollTo({

      top: targetPosition,

      behavior: 'smooth',

    });

  }

  // Update active navigation link by element

  function updateActiveNavLink(activeLink) {

    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => link.classList.remove('active'));

    activeLink.classList.add('active');

  }

  // Update active navigation link based on scroll position

  function updateActiveNavOnScroll() {

    const navLinks = document.querySelectorAll('.nav-link');

    const headerHeight = document.querySelector('.header').offsetHeight || 80;

    const scrollPosition = window.scrollY + headerHeight + 50;

    let activeSection = 'inicio';

    if (window.scrollY < 100) {

      activeSection = 'inicio';

    } else {

      const carnesElement = document.getElementById('carnes');

      const legumesElement = document.getElementById('legumes');

      const frutasElement = document.getElementById('frutas');

      const localizacaoElement = document.getElementById('localizacao');

      if (localizacaoElement && scrollPosition >= localizacaoElement.offsetTop - 100) {

        activeSection = 'localizacao';

      } else if (frutasElement && scrollPosition >= frutasElement.offsetTop - 100) {

        activeSection = 'frutas';

      } else if (legumesElement && scrollPosition >= legumesElement.offsetTop - 100) {

        activeSection = 'legumes';

      } else if (carnesElement && scrollPosition >= carnesElement.offsetTop - 100) {

        activeSection = 'carnes';

      }

    }

    navLinks.forEach(link => {

      link.classList.remove('active');

      if (link.getAttribute('href') === `#${activeSection}`) {

        link.classList.add('active');

      }

    });

  }

}

// Function to add promotional images dynamically

function adicionarPromocoes(imagensPaths) {

  const promotionsGrid = document.getElementById('promotions-grid');

  if (!promotionsGrid) return;

  // Clear current content

  promotionsGrid.innerHTML = '';

  imagensPaths.forEach((imagePath, index) => {

    const promotionDiv = document.createElement('div');

    promotionDiv.className = 'promotion-image fade-in';

    promotionDiv.style.transitionDelay = `${index * 0.2}s`;

    const img = document.createElement('img');

    img.src = imagePath; // Imagens na mesma pasta - apenas o nome do arquivo

    img.alt = `Promoção ${index + 1}`;

    img.loading = 'lazy';

    promotionDiv.appendChild(img);

    promotionsGrid.appendChild(promotionDiv);

  });

  // Initialize Intersection Observer for new promotion images

  const observer = new IntersectionObserver(

    function (entries) {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

        }

      });

    },

    {

      threshold: 0.1,

      rootMargin: '0px 0px -50px 0px',

    }

  );

  document.querySelectorAll('.promotion-image').forEach(element => {

    observer.observe(element);

  });

}

// Load promotions on DOMContentLoaded with a delay to ensure loading

document.addEventListener('DOMContentLoaded', function () {

  const promocoesAtuais = [

    '1000231560.jpeg',

    '1000231559.jpeg',

    '1000231558.jpeg',

    '1000231556.jpeg',

  ];

  setTimeout(() => {

    adicionarPromocoes(promocoesAtuais);

  }, 1000);

});

// Function to update promotional images dynamically (for future use)

function atualizarPromocoes(novasImagens) {

  adicionarPromocoes(novasImagens);

}

// Intersection Observer for scroll animations

function initScrollAnimations() {

  const observerOptions = {

    threshold: 0.1,

    rootMargin: '0px 0px -50px 0px',

  };

  const observer = new IntersectionObserver(function (entries) {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('visible');

      }

    });

  }, observerOptions);

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

    mobileMenuBtn.addEventListener('click', function (e) {

      e.preventDefault();

      this.classList.toggle('active');

      navMenu.classList.toggle('active');

    });

  }

  // Close mobile menu when clicking on nav links

  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {

    link.addEventListener('click', function () {

      if (mobileMenuBtn && navMenu) {

        mobileMenuBtn.classList.remove('active');

        navMenu.classList.remove('active');

      }

    });

  });

  // Close mobile menu when clicking outside

  document.addEventListener('click', function (e) {

    if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {

      mobileMenuBtn.classList.remove('active');

      navMenu.classList.remove('active');

    }

  });

}

// Enhanced floating elements animation with parallax effect

function initFloatingElements() {

  const floatingShapes = document.querySelectorAll('.floating-shape');

  // Add random animation delays and speeds

  floatingShapes.forEach((shape, index) => {

    const randomDelay = Math.random() * 20;

    const randomDuration = 15 + Math.random() * 10;

    shape.style.animationDelay = `-${randomDelay}s`;

    shape.style.animationDuration = `${randomDuration}s`;

  });

  // Parallax effect for floating elements on scroll

  let ticking = false;

  window.addEventListener('scroll', function () {

    if (!ticking) {

      requestAnimationFrame(function () {

        updateFloatingElements();

        ticking = false;

      });

      ticking = true;

    }

  });

  function updateFloatingElements() {

    const scrolled = window.pageYOffset;

    floatingShapes.forEach((shape, index) => {

      const speed = 0.2 + index * 0.05;

      const yPos = -(scrolled * speed);

      const currentTransform = shape.style.transform || '';

      if (!currentTransform.includes('translate3d')) {

        shape.style.transform += ` translate3d(0, ${yPos}px, 0)`;

      }

    });

  }

}

// Product card hover effects

function initProductCards() {

  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {

    card.addEventListener('mouseenter', function () {

      this.style.transform = 'translateY(-12px) scale(1.02)';

    });

    card.addEventListener('mouseleave', function () {

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

    const heroElements = [heroTitle, heroSubtitle, heroCta];

    heroElements.forEach(element => {

      element.style.opacity = '0';

      element.style.transform = 'translateY(30px)';

      element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

    });

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

    window.addEventListener('scroll', function () {

      const scrolled = window.pageYOffset;

      const opacity = Math.min(scrolled / 100 + 0.8, 0.98);

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

// Debug function to log element positions (optional)

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

// Keyboard navigation shortcuts (Alt + number keys)

function initKeyboardNavigation() {

  document.addEventListener('keydown', function (e) {

    if (e.altKey) {

      switch (e.code) {

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

        default:

          break;

      }

    }

  });

    }
