document.addEventListener('DOMContentLoaded', () => {

    // --- SISTEMA DE TRADUCCIÓN ---
    const translations = {
        es: {
            "Proyectos": "Proyectos",
            "Sobre mí": "Sobre mí",
            "Contacto": "Contacto",
            "Ingeniero en Multimedia": "Ingeniero en Multimedia",
            "Portafolio de Proyectos": "Portafolio de Proyectos",
            "Sobre Mí": "Sobre Mí",
            "Hablemos": "Hablemos",
            "Nombre": "Nombre",
            "Email": "Email",
            "Mensaje": "Mensaje",
            "Enviar Mensaje": "Enviar Mensaje",
            "Interactuar": "Interactuar"
        },
        en: {
            "Proyectos": "Projects",
            "Sobre mí": "About Me",
            "Contacto": "Contact",
            "Ingeniero en Multimedia": "Multimedia Engineer",
            "Portafolio de Proyectos": "Project Portfolio",
            "Sobre Mí": "About Me",
            "Hablemos": "Let's Talk",
            "Nombre": "Name",
            "Email": "Email",
            "Mensaje": "Message",
            "Enviar Mensaje": "Send Message",
            "Interactuar": "Interact"
        }
    };

    // Función para cambiar idioma
    function changeLanguage(lang) {
        document.body.dataset.language = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        // Actualizar todos los elementos con atributos data-es y data-en
        document.querySelectorAll('[data-es][data-en]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // Actualizar usando textContent (sin HTML)
                element.textContent = text;
            }
        });

        // Actualizar placeholders del formulario
        const namePlaceholder = lang === 'es' ? 'Tu nombre' : 'Your name';
        const emailPlaceholder = lang === 'es' ? 'tu@email.com' : 'your@email.com';
        const messagePlaceholder = lang === 'es' ? 'Escribe tu mensaje...' : 'Write your message...';
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        if (nameInput) nameInput.placeholder = namePlaceholder;
        if (emailInput) emailInput.placeholder = emailPlaceholder;
        if (messageInput) messageInput.placeholder = messagePlaceholder;

        // Actualizar botón de idioma
        const langBtn = document.getElementById('lang-btn');
        if (langBtn) {
            if (lang === 'es') {
                langBtn.dataset.currentLang = 'es';
                langBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg><span class="lang-text">ES</span>';
            } else {
                langBtn.dataset.currentLang = 'en';
                langBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg><span class="lang-text">EN</span>';
            }
        }
    }

    // Cargar idioma guardado o usar inglés por defecto
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(savedLanguage);

    // Evento del botón de traducción
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const currentLang = document.body.dataset.language;
            const newLang = currentLang === 'es' ? 'en' : 'es';
            changeLanguage(newLang);
        });
    }

    // --- LÓGICA PARA EL HEADER DINÁMICO (DISPARADOR AJUSTADO) ---
    const header = document.querySelector('.main-header');
    // Ahora, nuestro elemento de referencia es el contenedor del título del inicio
    const heroTitle = document.querySelector('.hero-title-container');

    const handleHeaderScroll = () => {
        // Si el título no existe, no hacemos nada
        if (!heroTitle) return;

        // Obtenemos la posición del borde INFERIOR del título
        const titleBottom = heroTitle.getBoundingClientRect().bottom;
        // Obtenemos la altura del header
        const headerHeight = header.offsetHeight;

        // Si el borde inferior del título ha subido y está por encima del borde inferior del header...
        if (titleBottom <= headerHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Llamamos a la función al cargar y al hacer scroll
    handleHeaderScroll(); 
    window.addEventListener('scroll', handleHeaderScroll);

    // --- 1. ANIMACIÓN "FADE-IN" AL HACER SCROLL ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // --- 2. NAVEGACIÓN ACTIVA AL HACER SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    const activateNavOnScroll = () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= (section.offsetTop - section.clientHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href')?.substring(1) === current) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', activateNavOnScroll);

    // --- 3. INICIALIZACIÓN DE CARRUSELES (SPLIDE.JS) ---
    
   const initSplide = (selector, options) => {
        const element = document.querySelector(selector);
        if (element && typeof Splide !== 'undefined') {
            new Splide(element, options).mount();
        }
    };

    // Renders
    initSplide('#renders-carrusel', { type: 'loop', perPage: 1, autoplay: true, interval: 4000 });

    // Documentos (Cómic, Brochure, Menú)
    const docOptions = {
        type: 'slide', perPage: 2, perMove: 2, gap: '10px', pagination: false, focus: 0,
        breakpoints: { 820: { perPage: 1, perMove: 1, pagination: true, focus: 'center' } }
    };
    initSplide('#comic-splide', docOptions);
    initSplide('#brochure-splide', docOptions);
    initSplide('#menu-splide', docOptions);
    
    // --- 4. LÓGICA DEL FORMULARIO DE CONTACTO ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const currentLang = document.body.dataset.language;
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                const successMsg = currentLang === 'en' 
                    ? "Thank you for your message! I'll respond soon." 
                    : "¡Gracias por tu mensaje! Te responderé pronto.";
                formStatus.innerHTML = successMsg;
                formStatus.className = 'status-success';
                form.reset();
            } else {
                const errorData = await response.json();
                if (Object.hasOwn(errorData, 'errors')) {
                    const errorMsg = currentLang === 'en'
                        ? `Error: ${errorData["errors"].map(error => error["message"]).join(", ")}`
                        : `Hubo un error: ${errorData["errors"].map(error => error["message"]).join(", ")}`;
                    formStatus.innerHTML = errorMsg;
                } else {
                    const genericError = currentLang === 'en'
                        ? "Oops! There was a problem sending your form."
                        : "Oops! Hubo un problema al enviar tu formulario.";
                    formStatus.innerHTML = genericError;
                }
                formStatus.className = 'status-error';
            }
        } catch (error) {
            const networkError = currentLang === 'en'
                ? "Oops! There was a network issue sending your form."
                : "Oops! Hubo un problema de red al enviar tu formulario.";
            formStatus.innerHTML = networkError;
            formStatus.className = 'status-error';
        }
    }

    if (form) {
        form.addEventListener("submit", handleSubmit);
    }

    const video = document.getElementById('metahuman-video');
    const interactionButton = document.getElementById('toggle-interaction-btn');
    const interactionOverlay = document.getElementById('interaction-overlay');

    if (video && interactionButton && interactionOverlay) {
        let isInteractionActive = false;
        let targetTime = 0;
        const neutralTime = 0;
        const smoothingFactor = 0.1;
        let isTouchDevice = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // El botón solo activa la interacción
        interactionButton.addEventListener('click', () => {
            if (isInteractionActive) return;
            isInteractionActive = true;
            document.body.classList.add('interaction-active');
            
            // Cambiar texto del botón según idioma
            const currentLang = document.body.dataset.language;
            const buttonText = currentLang === 'en' ? 'Close' : 'Cerrar';
            interactionButton.querySelector('span').textContent = buttonText;
        });

        // La capa superpuesta detiene la interacción
        interactionOverlay.addEventListener('click', () => {
            if (!isInteractionActive) return;
            isInteractionActive = false;
            document.body.classList.remove('interaction-active');
            
            // Restaurar texto del botón original
            const currentLang = document.body.dataset.language;
            const buttonText = currentLang === 'en' ? 'Interact' : 'Interactuar';
            interactionButton.querySelector('span').textContent = buttonText;
        });

        // MOUSE MOVEMENT para escritorio
        interactionOverlay.addEventListener('mousemove', (event) => {
            if (isInteractionActive) {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const mouseX = event.clientX - centerX;
                const mouseY = event.clientY - centerY;
                
                let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
                if (angle < 0) angle += 360;
                
                let normalizedAngle = angle + 90;
                if (normalizedAngle > 360) normalizedAngle -= 360;
                
                targetTime = (normalizedAngle / 360) * video.duration;
            }
        });

        // TOUCH MOVEMENT para móviles
        interactionOverlay.addEventListener('touchmove', (event) => {
            if (isInteractionActive) {
                event.preventDefault(); // Prevenir scroll
                const touch = event.touches[0];
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const touchX = touch.clientX - centerX;
                const touchY = touch.clientY - centerY;
                
                let angle = Math.atan2(touchY, touchX) * (180 / Math.PI);
                if (angle < 0) angle += 360;
                
                let normalizedAngle = angle + 90;
                if (normalizedAngle > 360) normalizedAngle -= 360;
                
                targetTime = (normalizedAngle / 360) * video.duration;
            }
        }, { passive: false });

        function animationLoop() {
            let currentTarget = isInteractionActive ? targetTime : neutralTime;
            const duration = video.duration;
            
            if (!duration) {
                requestAnimationFrame(animationLoop);
                return;
            }

            const diff = currentTarget - video.currentTime;
            let shortestDiff;

            if (Math.abs(diff) > duration / 2) {
                shortestDiff = (diff > 0) ? diff - duration : diff + duration;
            } else {
                shortestDiff = diff;
            }

            if (Math.abs(shortestDiff) > 0.001) {
                const newPosition = video.currentTime + shortestDiff * smoothingFactor;
                video.currentTime = ((newPosition % duration) + duration) % duration;
            }

            requestAnimationFrame(animationLoop);
        }

        video.addEventListener('loadedmetadata', () => {
            if (!video.duration || isNaN(video.duration)) return;
            video.pause();
            video.currentTime = neutralTime;
            targetTime = neutralTime;
            animationLoop();
        });

        // Para iOS, intentar reproducir el video (algunos navegadores lo requieren)
        video.addEventListener('click', (e) => {
            e.preventDefault();
            if (video.paused) {
                video.play().catch(() => {
                    console.log('Video autoplay no permitido');
                });
            }
        });
    }
});
