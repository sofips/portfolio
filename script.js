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
