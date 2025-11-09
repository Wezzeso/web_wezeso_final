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
