// ===== NAVIGATION MOBILE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu au clic sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== INTERSECTION OBSERVER =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.timeline-item, .skill-category, .project-card, .contact-method').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== LIEN ACTIF DANS LA NAVIGATION =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.style.color = 'var(--primary)';
            link.style.background = 'rgba(99, 102, 241, 0.1)';
        } else {
            link.style.color = '';
            link.style.background = '';
        }
    });
});

// ===== FORMULAIRE DE CONTACT =====
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalContent = btn.innerHTML;
    
    // Animation d'envoi
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// ===== ANIMATION AU SCROLL POUR LA TIMELINE =====
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';
    timelineObserver.observe(item);
});

// ===== ANIMATION DES CARTES PROJET =====
const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
    projectObserver.observe(card);
});

// ===== EFFET DE TYPING POUR LE CODE =====
const codeElement = document.querySelector('.window-content code');
if (codeElement) {
    const originalHTML = codeElement.innerHTML;
    
    // Animation subtile au scroll
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.parentElement.parentElement.style.transform = 'translateY(0)';
                entry.target.parentElement.parentElement.style.opacity = '1';
            }
        });
    }, { threshold: 0.3 });
    
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
        codeWindow.style.transform = 'translateY(20px)';
        codeWindow.style.opacity = '0.8';
        codeWindow.style.transition = 'all 0.6s ease';
        codeObserver.observe(codeWindow);
    }
}

// ===== EFFET PARALLAX SUBTIL =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si on est sur mobile pour désactiver certains effets
    const isMobile = window.matchMedia('(max-width: 968px)').matches;
    
    if (isMobile) {
        // Désactiver l'effet parallaxe sur mobile
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach(orb => {
            orb.style.transform = 'none';
        });
    }
});

// ===== EFFET DE SURVOL POUR LES TAGS DE COMPÉTENCES =====
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.3)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.boxShadow = 'none';
    });
});
