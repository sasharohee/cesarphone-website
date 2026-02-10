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

// Animation d'apparition des éléments au scroll avec effet stagger
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            
            // Animation stagger pour les cartes de services
            if (entry.target.classList.contains('service-card')) {
                const cards = document.querySelectorAll('.service-card');
                const index = Array.from(cards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
            
            // Animation stagger pour les features
            if (entry.target.classList.contains('feature')) {
                const features = document.querySelectorAll('.feature');
                const index = Array.from(features).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150);
            }
            
            // Animation stagger pour les contact items
            if (entry.target.classList.contains('contact-item')) {
                const items = document.querySelectorAll('.contact-item');
                const index = Array.from(items).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .feature, .contact-item, .stat, .section-header, .location-content, .center-card, .footer, .repair-info');
    elementsToAnimate.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
    
    // Animation des sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('loading');
        observer.observe(section);
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

// Configuration EmailJS
const EMAILJS_CONFIG = {
    serviceId: 'service_x2rloaf',
    templateId: 'template_dsz8cw1',
    publicKey: 'OE2JV_06PnF8-QQM4'
};

// Initialiser EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// Gestion du formulaire de contact avec EmailJS
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validation des champs requis
        if (!data.name || !data.email || !data.service) {
            showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }
        
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Veuillez entrer une adresse email valide.', 'error');
            return;
        }
        
        // Changer l'état du bouton
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #6c757d 0%, #495057 100%)';
        
        try {
            // Préparer les paramètres pour EmailJS
            const templateParams = {
                from_name: data.name,
                from_email: data.email,
                phone: data.phone || 'Non renseigné',
                service: getServiceName(data.service),
                message: data.message || 'Aucun message supplémentaire',
                to_email: 'Cesarphone23@gmail.com',
                date: new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };
            
            // Envoyer l'email via EmailJS
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );
            
            if (response.status === 200) {
                // Message de confirmation détaillé pour le client
                const confirmationMessage = `
                    ✅ Message envoyé avec succès !
                    
                    Merci ${data.name}, nous avons bien reçu votre demande de réparation pour : ${getServiceName(data.service)}
                    
                    📞 Nous vous contacterons dans les 24h au ${data.phone || data.email}
                    
                    📍 Rendez-vous à notre atelier à Maison-Feyne
                    🕒 Lundi et Samedi : 14h30 - 18h
                    
                    À bientôt chez Cesar'Phone !
                `;
                
                showMessage(confirmationMessage, 'success');
                contactForm.reset();
                
                // Optionnel : Scroll vers le message de confirmation
                setTimeout(() => {
                    const messageElement = document.querySelector('.form-message');
                    if (messageElement) {
                        messageElement.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                }, 100);
                
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
            
        } catch (error) {
            console.error('Erreur EmailJS:', error);
            showMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement.', 'error');
        } finally {
            // Restaurer le bouton
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }
    });
}

// Fonction pour obtenir le nom du service
function getServiceName(serviceValue) {
    const services = {
        'ecran': 'Écran cassé',
        'batterie': 'Batterie défaillante',
        'audio': 'Problème audio',
        'camera': 'Caméra défectueuse',
        'charge': 'Port de charge',
        'eau': 'Dégâts des eaux',
        'autre': 'Autre problème'
    };
    return services[serviceValue] || serviceValue;
}

// Fonction pour afficher les messages
function showMessage(message, type = 'info') {
    // Supprimer les messages existants
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Créer le nouveau message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    
    // Gérer les messages multi-lignes
    if (message.includes('\n') || message.includes('  ')) {
        // Convertir les retours à la ligne en <br> et nettoyer les espaces
        const formattedMessage = message
            .trim()
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('<br>');
        messageDiv.innerHTML = formattedMessage;
    } else {
        messageDiv.textContent = message;
    }
    
    // Styles pour le message
    messageDiv.style.cssText = `
        padding: 20px;
        margin: 20px 0;
        border-radius: 12px;
        font-weight: 500;
        text-align: center;
        transition: all 0.3s ease;
        line-height: 1.6;
        font-size: 16px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        ${type === 'success' ? 
            'background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white;' :
            type === 'error' ?
            'background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white;' :
            'background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); color: white;'
        }
    `;
    
    // Insérer le message après le formulaire
    const form = document.querySelector('.contact-form form');
    form.appendChild(messageDiv);
    
    // Animation d'apparition
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(-20px) scale(0.95)';
    
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0) scale(1)';
    }, 100);
    
    // Supprimer le message après 8 secondes pour les messages de succès (plus longs)
    const timeoutDuration = type === 'success' ? 8000 : 5000;
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-20px) scale(0.95)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }
    }, timeoutDuration);
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

// Détection mobile
const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Effet parallaxe optimisé pour mobile
function handleScroll() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.phone-mockup');
    const logo = document.querySelector('.logo-img');
    const heroContent = document.querySelector('.hero-content');
    const locationIcon = document.querySelector('.location-icon');
    
    // Parallaxe réduite sur mobile
    if (heroImage) {
        if (isMobile) {
            // Animation très réduite sur mobile
            const rate = scrolled * -0.05;
            heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
        } else {
            const rate = scrolled * -0.2;
            heroImage.style.transform = `translate3d(0, ${rate}px, 0) rotate(${scrolled * 0.01}deg)`;
        }
    }
    
    // Animation du contenu hero (désactivée sur mobile)
    if (heroContent && !isMobile) {
        const rate = scrolled * 0.1;
        heroContent.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
    
    // Animation du logo au scroll (simplifiée sur mobile)
    if (logo) {
        if (scrolled > 100) {
            if (isMobile) {
                logo.style.transform = 'scale(0.95)';
            } else {
                logo.style.transform = 'scale(0.9) rotate(5deg)';
                logo.style.filter = 'drop-shadow(0 2px 4px rgba(26, 74, 121, 0.15))';
            }
        } else {
            logo.style.transform = 'scale(1)';
            if (!isMobile) {
                logo.style.filter = 'drop-shadow(0 2px 4px rgba(26, 74, 121, 0.1))';
            }
        }
    }
    
    // Animation de l'icône de localisation (désactivée sur mobile)
    if (locationIcon && !isMobile) {
        const rate = scrolled * 0.05;
        locationIcon.style.transform = `translate3d(0, ${rate}px, 0) rotate(${scrolled * 0.02}deg)`;
    }
    
    // Animation des sections au scroll (simplifiée sur mobile)
    if (!isMobile) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                section.style.opacity = '1';
                section.style.transform = 'translate3d(0, 0, 0)';
            }
        });
    }
}

// Debounce optimisé pour mobile
const scrollDelay = isMobile ? 50 : 10;
let scrollTimeout;

window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, scrollDelay);
});

// Animation des cartes de services au hover avec effets avancés (optimisées pour mobile)
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        
        // Désactiver les effets hover sur mobile
        if (!isMobile) {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translate3d(0, -10px, 0) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(26, 74, 121, 0.2)';
                
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.boxShadow = '0 0 20px rgba(26, 74, 121, 0.4)';
                }
                
                if (title) {
                    title.style.color = 'var(--primary-blue)';
                    title.style.transform = 'translate3d(0, -2px, 0)';
                }
                
                if (description) {
                    description.style.transform = 'translate3d(0, -1px, 0)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translate3d(0, 0, 0) scale(1)';
                card.style.boxShadow = '';
                
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.boxShadow = '';
                }
                
                if (title) {
                    title.style.color = '';
                    title.style.transform = 'translate3d(0, 0, 0)';
                }
                
                if (description) {
                    description.style.transform = 'translate3d(0, 0, 0)';
                }
            });
        }
        
        // Effet de clic simplifié sur mobile
        card.addEventListener('click', () => {
            if (isMobile) {
                // Animation simple sur mobile
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
            } else {
                card.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    card.style.animation = '';
                }, 500);
            }
        });
    });
});

// Animation des boutons avec effets avancés (optimisées pour mobile)
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        // Désactiver les effets hover sur mobile
        if (!isMobile) {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translate3d(0, -3px, 0) scale(1.05)';
                btn.style.boxShadow = '0 10px 25px rgba(26, 74, 121, 0.3)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
                btn.style.boxShadow = '';
            });
        }
        
        btn.addEventListener('click', () => {
            if (isMobile) {
                // Animation simple sur mobile
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);
            } else {
                btn.style.animation = 'pulse 0.3s ease-in-out';
                setTimeout(() => {
                    btn.style.animation = '';
                }, 300);
            }
        });
    });
    
    // Animation des liens de navigation (désactivée sur mobile)
    if (!isMobile) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translate3d(0, -2px, 0) scale(1.05)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translate3d(0, 0, 0) scale(1)';
            });
        });
    }
    
    // Animation des icônes de contact (désactivée sur mobile)
    if (!isMobile) {
        const contactIcons = document.querySelectorAll('.contact-icon, .feature-icon, .service-icon');
        contactIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.boxShadow = '0 0 20px rgba(26, 74, 121, 0.4)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = '';
            });
        });
    }
});

// Effet de particules pour la section hero (désactivé sur mobile)
function createParticles() {
    // Désactiver les particules sur mobile pour améliorer les performances
    if (isMobile) {
        return;
    }
    
    const hero = document.querySelector('.hero');
    const particleCount = 15; // Réduit de 20 à 15
    
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
            will-change: transform;
            transform: translateZ(0);
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


// Activer les animations
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initRepairAnimations();
});

// Animations des éléments de réparation (optimisées pour mobile)
function initRepairAnimations() {
    const tools = document.querySelectorAll('.tool');
    const parts = document.querySelectorAll('.part');
    const infoItems = document.querySelectorAll('.info-item');
    const indicators = document.querySelectorAll('.indicator');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    // Désactiver les animations complexes sur mobile
    if (isMobile) {
        // Animation simple et statique sur mobile
        tools.forEach((tool, index) => {
            tool.style.opacity = '1';
            tool.style.transform = 'translate3d(0, 0, 0)';
        });
        
        parts.forEach((part, index) => {
            part.style.opacity = '1';
            part.style.transform = 'translate3d(0, 0, 0)';
        });
        
        indicators.forEach((indicator, index) => {
            indicator.style.opacity = '1';
            indicator.style.transform = 'translate3d(0, 0, 0)';
        });
        
        progressDots.forEach((dot, index) => {
            dot.style.opacity = '1';
            dot.style.transform = 'translate3d(0, 0, 0)';
        });
        
        infoItems.forEach((item, index) => {
            item.style.opacity = '1';
            item.style.transform = 'translate3d(0, 0, 0)';
        });
        
        return; // Sortir de la fonction sur mobile
    }
    
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
    
    // Animation des infos avec disparition
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
    
    // Animation de disparition et réapparition des infos
    function cycleInfoItems() {
        // Disparition après 5 secondes
        setTimeout(() => {
            infoItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px) scale(0.8)';
                    item.style.transition = 'all 0.8s ease';
                }, index * 100);
            });
            
            // Réapparition après 3 secondes de disparition
            setTimeout(() => {
                infoItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                        item.style.transition = 'all 0.6s ease';
                    }, index * 100);
                });
            }, 3000);
        }, 5000);
    }
    
    // Démarrer le cycle
    cycleInfoItems();
    
    // Répéter le cycle toutes les 12 secondes
    setInterval(cycleInfoItems, 12000);
    
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

// Optimisation: Debounce pour les événements de scroll (optimisé pour mobile)
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

// Appliquer le debounce aux événements de scroll avec délai adaptatif
const scrollDebounceDelay = isMobile ? 100 : 16; // 60fps sur desktop, ~10fps sur mobile
const debouncedScrollHandler = debounce(() => {
    // Logique de scroll optimisée
}, scrollDebounceDelay);

// Utiliser requestAnimationFrame pour une meilleure performance
let ticking = false;
function optimizedScrollHandler() {
    if (!ticking) {
        requestAnimationFrame(() => {
            debouncedScrollHandler();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Les services sont maintenant affichés en grille statique, plus besoin de carrousel

// Mise à jour automatique de l'année dans le copyright
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    
    // Chercher tous les éléments contenant le copyright dans le footer
    const copyrightElements = document.querySelectorAll('.footer-bottom p, footer p');
    copyrightElements.forEach(element => {
        const text = element.textContent || element.innerText;
        // Vérifier si l'élément contient le copyright avec "Cesar'Phone"
        if (text.includes('Cesar\'Phone') || text.includes('©')) {
            // Remplacer l'année (4 chiffres) par l'année actuelle
            // Utiliser \b pour s'assurer qu'on remplace uniquement une année complète
            const updatedText = text.replace(/\b\d{4}\b/, currentYear);
            if (updatedText !== text) {
                element.textContent = updatedText;
            }
        }
    });
});
