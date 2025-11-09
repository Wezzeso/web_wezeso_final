// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ==================== CREATIVE TITLE EFFECTS ====================
// Add particle effect on title hover
const portfolioText = document.querySelector('.portfolio-text');
if (portfolioText) {
    portfolioText.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    portfolioText.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 8px var(--shadow)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==================== CARD ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe repo cards for animation
document.querySelectorAll('.repo-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// ==================== PROFILE PICTURE HOVER EFFECTS ====================
document.querySelectorAll('.profile-picture').forEach(pic => {
    pic.addEventListener('mouseenter', function() {
        // Add a subtle pulse animation
        this.style.animation = 'pulse 0.5s ease';
    });
    
    pic.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Add pulse animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);


// ==================== REPO CARD HOVER EFFECT ====================
document.querySelectorAll('.repo-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add glowing effect to profile picture
        const profilePic = this.querySelector('.profile-picture');
        if (profilePic) {
            profilePic.style.boxShadow = '0 0 30px rgba(9, 105, 218, 0.6)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const profilePic = this.querySelector('.profile-picture');
        if (profilePic) {
            profilePic.style.boxShadow = '';
        }
    });
});

// ==================== TYPING EFFECT FOR DESCRIPTIONS ====================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Apply typing effect to repo descriptions on first view
let typingApplied = false;
const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !typingApplied) {
            const descriptions = document.querySelectorAll('.repo-description');
            descriptions.forEach((desc, index) => {
                const originalText = desc.textContent;
                setTimeout(() => {
                    // typeWriter(desc, originalText, 20);
                }, index * 500);
            });
            typingApplied = true;
        }
    });
}, { threshold: 0.5 });

const teamSection = document.querySelector('.hub-team');
if (teamSection) {
    typingObserver.observe(teamSection);
}

// ==================== LOADER ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== EASTER EGG: Konami Code ====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg: Make all profile pictures spin
        document.querySelectorAll('.profile-picture').forEach(pic => {
            pic.style.animation = 'spin 1s ease-in-out';
        });
        
        // Add spin animation
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
        
        // Show message
        alert('🎉 Konami Code activated! You found the easter egg!');
    }
});

// ==================== SMOOTH PROFILE PICTURE REVEAL ====================
document.querySelectorAll('.profile-picture').forEach((pic, index) => {
    setTimeout(() => {
        pic.style.opacity = '0';
        pic.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            pic.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            pic.style.opacity = '1';
            pic.style.transform = 'scale(1)';
        }, 100);
    }, index * 200);
});

// ==================== SEARCH FUNCTIONALITY ====================
const searchToggle = document.getElementById('searchToggle');
const searchPanel = document.getElementById('searchPanel');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Sample project data (can be loaded from API later)
let allProjects = [];

// Load projects on page load
async function loadProjects() {
    try {
        // Try to fetch from API
        const response = await fetch('http://localhost:3000/api/projects');
        if (response.ok) {
            allProjects = await response.json();
        }
    } catch (error) {
        // If API not available, use sample data
        allProjects = [
            {
                id: 1,
                title: "Modern E-commerce Platform",
                category: "UI/UX Design",
                description: "A comprehensive redesign of an e-commerce platform focused on improving user experience and conversion rates.",
                tags: ["UI Design", "UX Research", "Prototyping", "E-commerce", "Figma"],
                member_name: "Wezeso"
            },
            {
                id: 2,
                title: "Tech Startup Branding",
                category: "Brand Identity",
                description: "Complete brand identity design for an innovative tech startup in the AI space.",
                tags: ["Branding", "Logo Design", "Visual Identity", "Illustrator", "Brand Strategy"],
                member_name: "Wezeso"
            },
            {
                id: 3,
                title: "E-commerce Platform",
                category: "Full-Stack Web App",
                description: "Building scalable web applications with modern technologies.",
                tags: ["JavaScript", "React", "Node.js", "MongoDB"],
                member_name: "Sardor"
            },
            {
                id: 4,
                title: "REST API Service",
                category: "Backend",
                description: "Designing and implementing robust backend systems and APIs.",
                tags: ["Python", "Django", "PostgreSQL", "REST API"],
                member_name: "Alikhan"
            },
            {
                id: 5,
                title: "Portfolio Website",
                category: "Frontend",
                description: "Crafting beautiful and responsive user interfaces with modern frameworks.",
                tags: ["React", "TypeScript", "CSS", "Tailwind"],
                member_name: "Amirkhan"
            }
        ];
    }
}

// Open search panel
if (searchToggle) {
    searchToggle.addEventListener('click', () => {
        searchPanel.classList.add('active');
        searchInput.focus();
    });
}

// Close search panel
if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
}

// Close on overlay click
if (searchPanel) {
    searchPanel.addEventListener('click', (e) => {
        if (e.target === searchPanel) {
            closeSearch();
        }
    });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchPanel.classList.contains('active')) {
        closeSearch();
    }
});

function closeSearch() {
    searchPanel.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '<p class="search-hint">Start typing to search projects...</p>';
}

// Search functionality
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        
        if (query.length === 0) {
            searchResults.innerHTML = '<p class="search-hint">Start typing to search projects...</p>';
            return;
        }
        
        if (query.length < 2) {
            return;
        }
        
        const results = allProjects.filter(project => {
            const matchTitle = project.title.toLowerCase().includes(query);
            const matchCategory = project.category?.toLowerCase().includes(query);
            const matchDescription = project.description?.toLowerCase().includes(query);
            const matchTags = project.tags?.some(tag => tag.toLowerCase().includes(query));
            const matchMember = project.member_name?.toLowerCase().includes(query);
            
            return matchTitle || matchCategory || matchDescription || matchTags || matchMember;
        });
        
        displaySearchResults(results, query);
    });
}

function displaySearchResults(results, query) {
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <p>No projects found for "${query}"</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Try searching with different keywords</p>
            </div>
        `;
        return;
    }
    
    searchResults.innerHTML = results.map(project => `
        <div class="search-result-item" onclick="viewProject(${project.id})">
            <div class="search-result-title">
                <i class="fas fa-folder"></i>
                ${highlightText(project.title, query)}
            </div>
            <div class="search-result-meta">
                ${project.category} ${project.member_name ? `• by ${project.member_name}` : ''}
            </div>
            <div class="search-result-description">
                ${highlightText(project.description || '', query)}
            </div>
            ${project.tags && project.tags.length > 0 ? `
                <div class="search-result-tags">
                    ${project.tags.slice(0, 4).map(tag => `<span class="search-tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

function highlightText(text, query) {
    if (!text) return '';
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background-color: var(--accent-primary); color: #fff; padding: 0 0.25rem; border-radius: 2px;">$1</mark>');
}

function viewProject(projectId) {
    // Close search
    closeSearch();
    
    // Find the project card and scroll to it
    const projectCard = document.querySelector(`.portfolio-item[data-id="${projectId}"]`);
    if (projectCard) {
        projectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        projectCard.click();
    } else {
        alert('Project details coming soon!');
    }
}

// Load projects when page loads
loadProjects();

// ==================== PROFILE PICTURE LOADER ====================
// Profile picture URLs for each team member
const profilePictures = {
    wezeso: "https://sheftour.kz/wp-content/uploads/2025/11/profile-picture.webp",
    sardor: "https://sheftour.kz/wp-content/uploads/2025/11/sardor-pfp.webp",
    alikhan: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
    amirkhan: "https://sheftour.kz/wp-content/uploads/2025/11/amir-pfp.webp"
};

// Load profile pictures for index.html (team cards)
function loadProfilePictures() {
    document.querySelectorAll('.profile-picture').forEach(pic => {
        const profile = pic.closest('[data-profile]')?.getAttribute('data-profile');
        const img = pic.querySelector('.profile-img');
        
        if (profile && profilePictures[profile] && img) {
            // Set image source
            img.src = profilePictures[profile];
            img.alt = profile.charAt(0).toUpperCase() + profile.slice(1);
            
            // Handle image load
            img.onload = () => {
                img.classList.remove('hidden');
                // Hide the ::before pseudo-element (initials) by adding a class
                pic.classList.add('has-image');
                pic.style.backgroundImage = `url(${profilePictures[profile]})`;
                pic.style.backgroundSize = 'cover';
                pic.style.backgroundPosition = 'center';
            };
            
            img.onerror = () => {
                // If image fails, keep the initials visible
                console.warn(`Failed to load profile picture for ${profile}`);
            };
        }
    });
}

// Load hero profile pictures for portfolio pages
function loadHeroProfilePictures() {
    document.querySelectorAll('.hero-profile-picture').forEach(pic => {
        const profile = pic.getAttribute('data-profile');
        const img = pic.querySelector('.hero-profile-img');
        const initials = pic.querySelector('.profile-initials');
        
        if (profile && profilePictures[profile] && img) {
            // Set image source
            img.src = profilePictures[profile];
            img.alt = profile.charAt(0).toUpperCase() + profile.slice(1);
            
            // Handle image load
            img.onload = () => {
                img.style.display = 'block';
                img.style.opacity = '0';
                setTimeout(() => {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                }, 10);
                if (initials) {
                    initials.style.display = 'none';
                }
            };
            
            img.onerror = () => {
                // If image fails, keep the initials visible
                console.warn(`Failed to load profile picture for ${profile}`);
                if (initials) {
                    initials.style.display = 'flex';
                }
            };
        }
    });
}

// Load profile pictures when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadProfilePictures();
        loadHeroProfilePictures();
    });
} else {
    loadProfilePictures();
    loadHeroProfilePictures();
}