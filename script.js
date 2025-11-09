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

// ==================== MOBILE MENU ====================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

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

// ==================== PORTFOLIO DATA ====================
const portfolioData = {
    1: {
        title: "Modern E-commerce Platform",
        category: "UI/UX Design",
        year: "2024",
        duration: "3 months",
        description: "A comprehensive redesign of an e-commerce platform focused on improving user experience and conversion rates. The project involved extensive user research, wireframing, prototyping, and user testing.",
        challenge: "The existing platform had a high bounce rate and low conversion rate. Users found the checkout process confusing and the product discovery difficult.",
        solution: "Created a streamlined user journey with improved navigation, simplified checkout process, and enhanced product filtering. Implemented a modern, clean design that highlights products and builds trust.",
        results: [
            "35% increase in conversion rate",
            "50% reduction in cart abandonment",
            "Improved user satisfaction score by 40%"
        ],
        tags: ["UI Design", "UX Research", "Prototyping", "E-commerce", "Figma"]
    },
    2: {
        title: "Tech Startup Branding",
        category: "Brand Identity",
        year: "2024",
        duration: "2 months",
        description: "Complete brand identity design for an innovative tech startup in the AI space. The project encompassed logo design, color palette, typography, and brand guidelines.",
        challenge: "The startup needed a strong, memorable brand identity that would stand out in the competitive tech industry and appeal to both investors and customers.",
        solution: "Developed a modern, sophisticated brand identity that combines technological precision with human warmth. Created a versatile logo system that works across all touchpoints.",
        results: [
            "Successfully launched brand to positive reception",
            "Secured seed funding round",
            "Featured in major tech publications"
        ],
        tags: ["Branding", "Logo Design", "Visual Identity", "Illustrator", "Brand Strategy"]
    },
    3: {
        title: "Fitness Tracking App",
        category: "Mobile UI/UX",
        year: "2024",
        duration: "4 months",
        description: "Design of a comprehensive fitness tracking mobile application with workout planning, nutrition tracking, and social features. Focus on motivation and user engagement.",
        challenge: "Creating an app that keeps users motivated and engaged over time while handling complex data visualization and diverse user needs.",
        solution: "Designed an intuitive interface with gamification elements, clear progress visualization, and social features to build community. Simplified complex data into digestible insights.",
        results: [
            "100K+ downloads in first 3 months",
            "4.8 star rating on app stores",
            "65% daily active user rate"
        ],
        tags: ["Mobile Design", "UX Design", "Fitness", "Gamification", "Figma"]
    },
    4: {
        title: "Restaurant Rebranding",
        category: "Brand Strategy",
        year: "2023",
        duration: "2 months",
        description: "Complete rebranding project for a local restaurant chain looking to modernize their image and attract a younger demographic while maintaining their heritage.",
        challenge: "Balancing tradition with modernity, and creating a brand that appeals to new audiences without alienating existing loyal customers.",
        solution: "Created a refreshed brand identity that honors the restaurant's history while feeling contemporary. Developed a cohesive visual system across all touchpoints.",
        results: [
            "30% increase in foot traffic",
            "45% growth in social media engagement",
            "Successfully opened 2 new locations"
        ],
        tags: ["Rebranding", "Visual Identity", "Restaurant", "Print Design", "Marketing"]
    },
    5: {
        title: "Financial Dashboard",
        category: "Web Application",
        year: "2024",
        duration: "3 months",
        description: "Design of a sophisticated financial dashboard for wealth management, featuring complex data visualization, portfolio tracking, and real-time market data.",
        challenge: "Presenting complex financial data in an accessible way while maintaining professional credibility and ensuring data security awareness.",
        solution: "Created a clean, professional interface with intuitive data visualization. Implemented a hierarchical information architecture that lets users drill down into details as needed.",
        results: [
            "Reduced time to complete key tasks by 40%",
            "Improved user comprehension of financial data",
            "Positive feedback from wealth advisors"
        ],
        tags: ["Web Design", "Dashboard", "Data Visualization", "Finance", "Figma"]
    },
    6: {
        title: "Coffee Shop Brand",
        category: "Visual Identity",
        year: "2023",
        duration: "6 weeks",
        description: "Full visual identity design for an artisanal coffee shop, including logo, packaging, signage, and marketing materials. Emphasis on craft and sustainability.",
        challenge: "Standing out in a saturated market while communicating quality, sustainability, and the artisanal nature of the product.",
        solution: "Developed an earthy, handcrafted brand identity that emphasizes sustainability and quality. Created a flexible system that works across packaging, signage, and digital.",
        results: [
            "Successful launch with strong brand recognition",
            "Featured in local design publications",
            "Customer survey: 90% positive brand perception"
        ],
        tags: ["Branding", "Packaging", "Print Design", "Logo", "Sustainability"]
    },
    7: {
        title: "Educational Platform",
        category: "UX/UI Design",
        year: "2024",
        duration: "5 months",
        description: "Design of an online learning platform for K-12 education, featuring course management, interactive lessons, and progress tracking for students, teachers, and parents.",
        challenge: "Creating an interface that works for three distinct user groups (students, teachers, parents) with different needs and technical proficiency levels.",
        solution: "Designed a modular system with role-based interfaces. Made learning engaging for students, administrative tasks simple for teachers, and progress transparent for parents.",
        results: [
            "Adopted by 50+ schools",
            "92% teacher satisfaction rate",
            "Improved student engagement metrics"
        ],
        tags: ["UX Design", "Education", "Web Design", "User Research", "Figma"]
    },
    8: {
        title: "Fashion Brand Identity",
        category: "Branding",
        year: "2023",
        duration: "2 months",
        description: "Brand identity design for a sustainable fashion brand targeting millennials and Gen Z. Focus on environmental consciousness and modern aesthetics.",
        challenge: "Creating a premium brand identity that communicates sustainability without appearing preachy or compromising on style.",
        solution: "Developed an elegant, minimalist brand identity with natural color palette and clean typography. Created a visual language that feels both luxurious and authentic.",
        results: [
            "Successful brand launch",
            "Strong social media presence (50K+ followers)",
            "Featured in fashion magazines"
        ],
        tags: ["Fashion", "Branding", "Sustainability", "Visual Identity", "Marketing"]
    },
    9: {
        title: "Healthcare App Redesign",
        category: "Mobile UX",
        year: "2024",
        duration: "4 months",
        description: "Complete redesign of a healthcare appointment and records management app, focusing on accessibility, ease of use, and patient empowerment.",
        challenge: "Making healthcare management simple and stress-free for users of all ages and technical abilities, while maintaining HIPAA compliance and data security.",
        solution: "Redesigned the entire user flow with emphasis on clarity and accessibility. Implemented large touch targets, clear typography, and intuitive navigation.",
        results: [
            "40% reduction in support tickets",
            "Improved accessibility score to AAA standard",
            "95% user satisfaction rate"
        ],
        tags: ["Healthcare", "Mobile Design", "Accessibility", "UX Design", "Redesign"]
    }
};

// ==================== PORTFOLIO MODAL ====================
const modal = document.getElementById('portfolioModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Open modal when clicking portfolio item
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const projectId = item.getAttribute('data-id');
        openModal(projectId);
    });
});

// Close modal
modalClose.addEventListener('click', closeModal);
modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function openModal(projectId) {
    const project = portfolioData[projectId];
    if (!project) return;

    const modalContent = `
        <div class="case-study">
            <div class="case-header">
                <h2 class="case-title">${project.title}</h2>
                <div class="case-meta">
                    <span><i class="fas fa-tag"></i> ${project.category}</span>
                    <span><i class="fas fa-calendar"></i> ${project.year}</span>
                    <span><i class="fas fa-clock"></i> ${project.duration}</span>
                </div>
                <p class="case-description">${project.description}</p>
            </div>

            <div class="case-section">
                <h3>The Challenge</h3>
                <p>${project.challenge}</p>
            </div>

            <div class="case-section">
                <h3>The Solution</h3>
                <p>${project.solution}</p>
            </div>

            <div class="case-section">
                <h3>Results</h3>
                <ul style="color: var(--text-secondary); line-height: 1.8; margin-left: 1.5rem;">
                    ${project.results.map(result => `<li>${result}</li>`).join('')}
                </ul>
            </div>

            <div class="case-section">
                <h3>Tags</h3>
                <div class="case-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    modalBody.innerHTML = modalContent;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.portfolio-item, .skill-category, .timeline-item, .stat-item').forEach(el => {
    observer.observe(el);
});

// ==================== ACTIVE NAVIGATION ====================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ==================== LOADER ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
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
    // Use portfolio items from the page
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    allProjects = Array.from(portfolioItems).map((item, index) => {
        const title = item.querySelector('.portfolio-title')?.textContent || `Project ${index + 1}`;
        const category = item.querySelector('.portfolio-category')?.textContent || '';
        const description = item.querySelector('.modal-description')?.textContent || '';
        const tagsElements = item.querySelectorAll('.tag');
        const tags = Array.from(tagsElements).map(tag => tag.textContent);
        
        return {
            id: index + 1,
            title,
            category,
            description,
            tags,
            element: item
        };
    });
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
    searchPanel?.classList.remove('active');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '<p class="search-hint">Start typing to search projects...</p>';
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
            
            return matchTitle || matchCategory || matchDescription || matchTags;
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
                ${project.category}
            </div>
            <div class="search-result-description">
                ${highlightText(project.description ? project.description.substring(0, 150) : '', query)}${project.description && project.description.length > 150 ? '...' : ''}
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
    
    // Find the project element
    const project = allProjects.find(p => p.id === projectId);
    if (project && project.element) {
        project.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            project.element.click();
        }, 500);
    }
}

// Load projects when page loads
if (searchPanel) {
    loadProjects();
}

