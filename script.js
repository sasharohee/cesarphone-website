// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation de la navbar au scroll avec effet de classe
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Gestion des liens actifs dans la navigation
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Appeler la fonction au scroll
window.addEventListener('scroll', updateActiveNavLink);

// Initialiser l'état actif au chargement
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    
    // Effet de clic sur le logo pour retourner en haut
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Animation d'apparition des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .feature, .contact-item, .stat');
    elementsToAnimate.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
});

// Animation du compteur pour les statistiques
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target === 98 ? '%' : target === 24 ? 'h' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target === 98 ? '%' : target === 24 ? 'h' : '+');
        }
    }, 16);
}

// Observer pour les statistiques
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number) {
                statNumber.textContent = '0';
                animateCounter(statNumber, number);
                statsObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => statsObserver.observe(stat));
});

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulation d'envoi (remplacer par vraie logique)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé !';
            submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Animation de typing pour le titre principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animation du titre au chargement
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Effet parallaxe léger pour la section hero et animation du logo
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.phone-mockup');
    const logo = document.querySelector('.logo-img');
    
    if (heroImage) {
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
    
    // Animation du logo au scroll
    if (logo) {
        if (scrolled > 100) {
            logo.style.transform = 'scale(0.9)';
            logo.style.filter = 'drop-shadow(0 2px 4px rgba(26, 74, 121, 0.15))';
        } else {
            logo.style.transform = 'scale(1)';
            logo.style.filter = 'drop-shadow(0 2px 4px rgba(26, 74, 121, 0.1))';
        }
    }
});

// Animation des cartes de services au hover
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Animation des boutons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
});

// Effet de particules pour la section hero (optionnel)
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent-yellow);
            border-radius: 50%;
            opacity: 0.3;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// CSS pour l'animation des particules
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
`;
document.head.appendChild(style);

// Activer les particules
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initRepairAnimations();
    initServicesCarousel();
});

// Animations des éléments de réparation
function initRepairAnimations() {
    const tools = document.querySelectorAll('.tool');
    const parts = document.querySelectorAll('.part');
    const infoItems = document.querySelectorAll('.info-item');
    const indicators = document.querySelectorAll('.indicator');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    // Animation des indicateurs
    indicators.forEach((indicator, index) => {
        setTimeout(() => {
            indicator.style.opacity = '0';
            indicator.style.transform = 'scale(0)';
            indicator.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                indicator.style.opacity = '1';
                indicator.style.transform = 'scale(1)';
            }, 100);
        }, index * 100);
    });
    
    // Animation des outils
    tools.forEach((tool, index) => {
        setTimeout(() => {
            tool.style.opacity = '0';
            tool.style.transform = 'translateY(20px) scale(0.8)';
            tool.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                tool.style.opacity = '1';
                tool.style.transform = 'translateY(0) scale(1)';
            }, 200);
        }, 300 + (index * 150));
        
        // Effet de clic
        tool.addEventListener('click', () => {
            tool.style.transform = 'scale(0.9) rotate(-5deg)';
            setTimeout(() => {
                tool.style.transform = 'scale(1) rotate(0deg)';
            }, 150);
        });
    });
    
    // Animation des pièces
    parts.forEach((part, index) => {
        setTimeout(() => {
            part.style.opacity = '0';
            part.style.transform = 'scale(0) rotate(180deg)';
            part.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                part.style.opacity = '1';
                part.style.transform = 'scale(1) rotate(0deg)';
            }, 100);
        }, 900 + (index * 100));
    });
    
    
    // Animation des points de progression
    progressDots.forEach((dot, index) => {
        setTimeout(() => {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(0)';
            dot.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                dot.style.opacity = '1';
                dot.style.transform = 'scale(1)';
            }, 100);
        }, 1200 + (index * 100));
    });
    
    // Animation des infos
    infoItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200);
        }, 1500 + (index * 200));
    });
    
    // Effet de réparation en cours
    setInterval(() => {
        tools.forEach(tool => {
            if (Math.random() > 0.85) {
                tool.style.boxShadow = '0 0 20px var(--accent-yellow)';
                setTimeout(() => {
                    tool.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.3)';
                }, 600);
            }
        });
        
        parts.forEach(part => {
            if (Math.random() > 0.9) {
                part.style.boxShadow = '0 0 15px rgba(102, 126, 234, 0.6)';
                setTimeout(() => {
                    part.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
                }, 400);
            }
        });
        
        // Effet sur les indicateurs
        indicators.forEach(indicator => {
            if (Math.random() > 0.95) {
                indicator.style.background = 'var(--accent-yellow)';
                indicator.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    indicator.style.background = 'var(--primary-blue)';
                    indicator.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }, 2500);
}

// Gestion des erreurs et fallbacks
window.addEventListener('error', (e) => {
    console.log('Erreur JavaScript:', e.error);
});

// Performance: Lazy loading des images (si ajoutées plus tard)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}

// Préchargement des ressources critiques
document.addEventListener('DOMContentLoaded', () => {
    // Précharger les polices
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
});

// Gestion du thème sombre (optionnel pour le futur)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Charger le thème sauvegardé
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Optimisation: Debounce pour les événements de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Appliquer le debounce aux événements de scroll
const debouncedScrollHandler = debounce(() => {
    // Logique de scroll optimisée
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Carrousel de services
function initServicesCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (!carouselTrack || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    let totalSlides = 0;
    let autoSlideInterval;
    
    function getCardsPerSlide() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
    }
    
    function calculateTotalSlides() {
        const cardsPerSlide = getCardsPerSlide();
        totalSlides = Math.ceil(serviceCards.length / cardsPerSlide);
        generateDots();
        return totalSlides;
    }
    
    function generateDots() {
        const dotsContainer = document.querySelector('.carousel-dots');
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-slide', i);
            dotsContainer.appendChild(dot);
        }
        
        // Re-attacher les event listeners aux nouveaux dots
        attachDotListeners();
    }
    
    function attachDotListeners() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopAutoSlide();
                startAutoSlide();
            });
        });
    }
    
    function updateCarousel() {
        const cardsPerSlide = getCardsPerSlide();
        const slideWidth = 100 / cardsPerSlide;
        const translateX = -(currentSlide * slideWidth);
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Mettre à jour les dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Les boutons restent toujours actifs pour navigation circulaire
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        
        console.log(`Slide ${currentSlide + 1}/${totalSlides}, Cards per slide: ${cardsPerSlide}, TranslateX: ${translateX}%`);
        console.log(`Cartes visibles: ${currentSlide * cardsPerSlide + 1} à ${Math.min((currentSlide + 1) * cardsPerSlide, serviceCards.length)}`);
        
        // Afficher les noms des cartes visibles
        const startIndex = currentSlide * cardsPerSlide;
        const endIndex = Math.min(startIndex + cardsPerSlide, serviceCards.length);
        const visibleCards = Array.from(serviceCards).slice(startIndex, endIndex).map(card => card.querySelector('h3').textContent);
        console.log(`Services visibles: ${visibleCards.join(', ')}`);
        
        // Vérifier si "Dégâts des eaux" est visible
        if (visibleCards.includes('Dégâts des eaux')) {
            console.log('✅ Dégâts des eaux est visible !');
        } else {
            console.log('❌ Dégâts des eaux n\'est pas visible');
        }
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        } else {
            // Retour au début si on est à la fin
            currentSlide = 0;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        } else {
            // Aller à la fin si on est au début
            currentSlide = totalSlides - 1;
            updateCarousel();
        }
    }
    
    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            currentSlide = slideIndex;
            updateCarousel();
        }
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Les event listeners des dots sont maintenant gérés par attachDotListeners()
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });
    
    // Pause sur hover
    const carousel = document.querySelector('.services-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Gestion du redimensionnement
    window.addEventListener('resize', () => {
        const newTotalSlides = calculateTotalSlides();
        if (currentSlide >= newTotalSlides) {
            currentSlide = newTotalSlides - 1;
        }
        updateCarousel();
    });
    
    // Touch/swipe support pour mobile
    let startX = 0;
    let endX = 0;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            stopAutoSlide();
            startAutoSlide();
        }
    }
    
    // Initialisation
    console.log(`Nombre de cartes détectées: ${serviceCards.length}`);
    calculateTotalSlides();
    updateCarousel();
    startAutoSlide();
    
    // Test: Forcer l'affichage de toutes les slides
    setTimeout(() => {
        console.log('Test: Passage à la slide 2');
        currentSlide = 1;
        updateCarousel();
    }, 2000);
    
    setTimeout(() => {
        console.log('Test: Retour à la slide 1');
        currentSlide = 0;
        updateCarousel();
    }, 4000);
    
}

