/* Mueve aquí el contenido de tu main.js */
console.log('Main JS loaded');

// ===== NAVEGACIÓN MOBILE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// ===== NAVEGACIÓN STICKY =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = 'none';
    }
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMACIONES AL SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Para animaciones específicas
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.animationDelay = (entries.indexOf(entry) * 0.1) + 's';
            }
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ===== CONTADOR ESTADÍSTICAS (opcional) =====
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });
}

// Iniciar contadores cuando sean visibles
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            counterObserver.unobserve(entry.target);
        }
    });
});

// ===== FORMULARIO DE CONTACTO =====
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validación básica
            const name = contactForm.querySelector('input[name="name"]');
            const email = contactForm.querySelector('input[name="email"]');
            const message = contactForm.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            // Reset errores
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));
            
            // Validar nombre
            if (!name.value.trim()) {
                showError(name, 'Por favor ingresa tu nombre');
                isValid = false;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                showError(email, 'Por favor ingresa un email válido');
                isValid = false;
            }
            
            // Validar mensaje
            if (!message.value.trim() || message.value.length < 10) {
                showError(message, 'El mensaje debe tener al menos 10 caracteres');
                isValid = false;
            }
            
            if (isValid) {
                // Simular envío
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                // Aquí iría la llamada AJAX real
                setTimeout(() => {
                    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    function showError(input, message) {
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e53e3e';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }
});

// ===== GALERÍA DE PROYECTOS =====
function initProjectGallery() {
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(image => {
        image.addEventListener('click', () => {
            const src = image.querySelector('img').src;
            const alt = image.querySelector('img').alt;
            
            // Crear lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${src}" alt="${alt}">
                    <div class="lightbox-caption">${alt}</div>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Cerrar lightbox
            lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
}

// ===== PRELOADER (opcional) =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 500);
    }
    
    // Inicializar galería si existe
    if (document.querySelector('.projects-grid')) {
        initProjectGallery();
    }
});

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gold-primary);
    color: var(--primary-dark);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: var(--shadow-lg);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
`;

document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
        backToTopButton.style.transform = 'translateY(0)';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
        backToTopButton.style.transform = 'translateY(20px)';
    }
});