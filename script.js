document.addEventListener('DOMContentLoaded', () => {

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
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                formStatus.innerHTML = "¡Gracias por tu mensaje! Te responderé pronto.";
                formStatus.className = 'status-success';
                form.reset();
            } else {
                const errorData = await response.json();
                if (Object.hasOwn(errorData, 'errors')) {
                    formStatus.innerHTML = `Hubo un error: ${errorData["errors"].map(error => error["message"]).join(", ")}`;
                } else {
                    formStatus.innerHTML = "Oops! Hubo un problema al enviar tu formulario.";
                }
                formStatus.className = 'status-error';
            }
        } catch (error) {
            formStatus.innerHTML = "Oops! Hubo un problema de red al enviar tu formulario.";
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

        // El botón solo activa la interacción
        interactionButton.addEventListener('click', () => {
            if (isInteractionActive) return;
            isInteractionActive = true;
            document.body.classList.add('interaction-active');
            
            // ====== CAMBIO 1: El texto ya no cambia aquí ======
            // No cambiamos el texto del botón, se queda como está.
        });

        // La capa superpuesta detiene la interacción
        interactionOverlay.addEventListener('click', () => {
            if (!isInteractionActive) return;
            isInteractionActive = false;
            document.body.classList.remove('interaction-active');
            
            // ====== CAMBIO 2: Tampoco cambia el texto aquí ======
            // Al desactivar, el botón vuelve a aparecer con su texto original.
        });

        // El resto de la lógica sigue igual...
        
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
    }
});