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
    gradient.addColorStop(0, 'rgba(233, 69, 96, 0.8)');
    gradient.addColorStop(0.5, 'rgba(83, 52, 131, 0.6)');
    gradient.addColorStop(1, 'rgba(83, 52, 131, 0.2)');
    
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
            element.textContent = text;
        }
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

// Load projects from JSON file
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        displayProjects(data.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        // Display fallback message if projects.json doesn't load
        displayFallbackMessage();
    }
}

// Display projects on the page
function displayProjects(projects) {
    const container = document.getElementById('projects-container');
    
    if (!projects || projects.length === 0) {
        displayFallbackMessage();
        return;
    }

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
}

// Create a project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title;

    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;

    card.appendChild(title);
    card.appendChild(description);

    // Add tags if they exist
    if (project.tags && project.tags.length > 0) {
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'project-tags';

        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'project-tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });

        card.appendChild(tagsContainer);
    }

    // Add link if it exists and is not empty
    if (project.link && project.link.trim()) {
        const link = document.createElement('a');
        link.className = 'project-link';
        link.href = project.link;
        link.textContent = 'View Project →';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        card.appendChild(link);
    }

    return card;
}

// Display fallback message if no projects are available
function displayFallbackMessage() {
    const container = document.getElementById('projects-container');
    container.innerHTML = `
        <div class="project-card">
            <h3 class="project-title">No projects yet</h3>
            <p class="project-description">
                Add your projects to the projects.json file to see them here!
            </p>
        </div>
    `;
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Load projects when page loads
    loadProjects();

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
});
