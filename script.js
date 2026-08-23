// Ripple Grid Animation
const canvas = document.getElementById('ripple-grid');
const ctx = canvas.getContext('2d');

let mouseX = 0.5;
let mouseY = 0.5;
let targetMouseX = 0.5;
let targetMouseY = 0.5;
let mouseInfluence = 0;
let time = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawRippleGrid() {
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Smooth mouse position
    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;
    
    time += 0.016; // ~60fps
    
    const gridSize = 50;
    const lineWidth = 2;
    
    // Set up gradient for glow effect
    const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
    );
    gradient.addColorStop(0, 'rgba(255, 47, 110, 0.8)');
    gradient.addColorStop(0.5, 'rgba(124, 77, 255, 0.6)');
    gradient.addColorStop(1, 'rgba(124, 77, 255, 0.2)');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;
    
    // Draw vertical lines
    for (let x = 0; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 5) {
            const centerX = width / 2;
            const centerY = height / 2;
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy) / 300;
            
            // Wave effect from center (reduced intensity)
            const wave = Math.sin(Math.PI * (time - dist)) * 5;
            
            // Mouse interaction (reduced intensity)
            let mouseWave = 0;
            if (mouseInfluence > 0) {
                const mouseDx = x - mouseX * width;
                const mouseDy = y - mouseY * height;
                const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
                const mouseRadius = 200;
                
                if (mouseDist < mouseRadius) {
                    const influence = mouseInfluence * (1 - mouseDist / mouseRadius);
                    mouseWave = Math.sin(time * 3 - mouseDist / 30) * 8 * influence;
                }
            }
            
            const offsetX = wave + mouseWave;
            
            if (y === 0) {
                ctx.moveTo(x + offsetX, y);
            } else {
                ctx.lineTo(x + offsetX, y);
            }
        }
        ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y < height + gridSize; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 5) {
            const centerX = width / 2;
            const centerY = height / 2;
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy) / 300;
            
            // Wave effect from center (reduced intensity)
            const wave = Math.sin(Math.PI * (time - dist)) * 5;
            
            // Mouse interaction (reduced intensity)
            let mouseWave = 0;
            if (mouseInfluence > 0) {
                const mouseDx = x - mouseX * width;
                const mouseDy = y - mouseY * height;
                const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
                const mouseRadius = 200;
                
                if (mouseDist < mouseRadius) {
                    const influence = mouseInfluence * (1 - mouseDist / mouseRadius);
                    mouseWave = Math.sin(time * 3 - mouseDist / 30) * 8 * influence;
                }
            }
            
            const offsetY = wave + mouseWave;
            
            if (x === 0) {
                ctx.moveTo(x, y + offsetY);
            } else {
                ctx.lineTo(x, y + offsetY);
            }
        }
        ctx.stroke();
    }
    
    requestAnimationFrame(drawRippleGrid);
}

// Mouse interaction
document.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX / window.innerWidth;
    targetMouseY = e.clientY / window.innerHeight;
    mouseInfluence = 1;
});

document.addEventListener('mouseleave', () => {
    mouseInfluence = 0;
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawRippleGrid();

// Language Switcher
let currentLang = 'es';

function switchLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // Update all elements with data-es and data-en attributes
    document.querySelectorAll('[data-es][data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.innerHTML = text;
        }
    });

    // Update href for elements with data-href-es / data-href-en
    document.querySelectorAll('[data-href-es][data-href-en]').forEach(element => {
        const href = element.getAttribute(`data-href-${lang}`);
        if (href) element.href = href;
    });

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

// Language button listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

// Load saved language preference
const savedLang = localStorage.getItem('preferredLanguage');
if (savedLang) {
    switchLanguage(savedLang);
}

// Collapsible sections for project detail pages
function initCollapsibleSections() {
    const content = document.querySelector('.project-content');
    if (!content || content.dataset.collapsibleDone) return;
    content.dataset.collapsibleDone = 'true';

    // Snapshot children before any DOM manipulation
    const children = Array.from(content.children);
    let currentWrapper = null;

    for (const child of children) {
        if (child.tagName === 'H2') {
            const wrapper = document.createElement('div');
            wrapper.className = 'project-section-body';
            child.insertAdjacentElement('afterend', wrapper);
            currentWrapper = wrapper;

            child.classList.add('project-section-header');
            child.addEventListener('click', () => {
                child.classList.toggle('collapsed');
                wrapper.classList.toggle('collapsed');
            });
        } else if (currentWrapper) {
            currentWrapper.appendChild(child);
        }
    }
}

// Collapsible main sections for index page
function initCollapsibleMainSections() {
    const titles = document.querySelectorAll('.section > .section-title');
    titles.forEach(title => {
        if (!title.nextElementSibling) return;

        // Wrap ALL siblings after the title (not just the first one) so
        // sections with more than one content block — e.g. About's bio +
        // stats strip — collapse together instead of leaving later blocks
        // stranded when the first one hides.
        const wrapper = document.createElement('div');
        wrapper.className = 'section-content-body';
        title.insertAdjacentElement('afterend', wrapper);
        while (wrapper.nextElementSibling) {
            wrapper.appendChild(wrapper.nextElementSibling);
        }

        title.classList.add('section-header-collapsible');
        title.addEventListener('click', () => {
            title.classList.toggle('section-title-collapsed');
            wrapper.classList.toggle('section-content-collapsed');
        });
    });
}

// Script is at end of body — DOM is ready, call directly
initCollapsibleSections();
initCollapsibleMainSections();

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation
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

    initScrollReveal();
});

// Scroll-reveal: fades/slides content in as it enters the viewport.
// The `.reveal` class (hidden state) is added here, at runtime, rather than
// living in the HTML/CSS by default — so if this script fails to run for
// any reason, every page still renders fully visible instead of stuck at
// opacity: 0. See the `.reveal` rules in style.css.
function initScrollReveal() {
    // .project-detail is excluded deliberately: on detail pages it's a single
    // section wrapping the entire page's content, thousands of pixels tall.
    // The observer's 12% area threshold effectively never fires for
    // something that large, which left whole pages stuck invisible.
    const targets = document.querySelectorAll(
        '.section:not(.project-detail), .entry, .talk'
    );
    if (!targets.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
        // No observer support, or the user asked for reduced motion:
        // leave everything in its normal, fully visible state.
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    targets.forEach((el, i) => {
        el.classList.add('reveal');
        // Gentle stagger within each cluster of cards, capped so long grids
        // don't end up with a multi-second reveal tail.
        el.style.transitionDelay = `${Math.min(i % 6, 5) * 0.08}s`;
        observer.observe(el);
    });
}
