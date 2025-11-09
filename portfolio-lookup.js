// ==================== PORTFOLIO LOOKUP SYSTEM ====================
// Individual work lookup functionality for portfolio pages

// Project data for each team member
const portfolioProjects = {
    wezeso: [
        {
            id: 1,
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
            tags: ["UI Design", "UX Research", "Prototyping", "E-commerce", "Figma"],
            technologies: ["Figma", "Adobe XD", "Principle", "UserTesting"],
            thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "#"
        },
        {
            id: 2,
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
            tags: ["Branding", "Logo Design", "Visual Identity", "Illustrator", "Brand Strategy"],
            technologies: ["Adobe Illustrator", "Photoshop", "InDesign"],
            thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "#"
        },
        {
            id: 3,
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
            tags: ["Mobile Design", "UX Design", "Fitness", "Gamification", "Figma"],
            technologies: ["Figma", "ProtoPie", "After Effects"],
            thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "#"
        },
        {
            id: 4,
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
            tags: ["Rebranding", "Visual Identity", "Restaurant", "Print Design", "Marketing"],
            technologies: ["Adobe Creative Suite", "Print Design"],
            thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "#"
        },
        {
            id: 5,
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
            tags: ["Web Design", "Dashboard", "Data Visualization", "Finance", "Figma"],
            technologies: ["Figma", "Chart.js", "D3.js"],
            thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "#"
        },
        {
            id: 6,
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
            tags: ["Branding", "Packaging", "Print Design", "Logo", "Sustainability"],
            technologies: ["Adobe Illustrator", "Photoshop", "InDesign"],
            thumbnail: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "#"
        },
        {
            id: 7,
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
            tags: ["UX Design", "Education", "Web Design", "User Research", "Figma"],
            technologies: ["Figma", "Miro", "UserTesting"],
            thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "#"
        },
        {
            id: 8,
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
            tags: ["Fashion", "Branding", "Sustainability", "Visual Identity", "Marketing"],
            technologies: ["Adobe Creative Suite"],
            thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "#"
        },
        {
            id: 9,
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
            tags: ["Healthcare", "Mobile Design", "Accessibility", "UX Design", "Redesign"],
            technologies: ["Figma", "Accessibility Tools"],
            thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "#"
        }
    ],
    alikhan: [
        {
            id: 1,
            title: "REST API Service",
            category: "Backend Development",
            year: "2024",
            duration: "3 months",
            description: "Scalable RESTful API service built with Django and PostgreSQL. Handles authentication, data processing, and real-time notifications for a mobile application.",
            challenge: "Building a robust API that can handle high traffic, maintain data consistency, and provide real-time updates to mobile clients.",
            solution: "Implemented Django REST Framework with optimized database queries, Redis caching, and WebSocket support for real-time features. Added comprehensive error handling and logging.",
            results: [
                "Handles 10,000+ requests per minute",
                "99.9% uptime",
                "Average response time under 200ms"
            ],
            tags: ["Python", "Django", "REST API", "PostgreSQL", "Redis"],
            technologies: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
            thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/alikhan/api-service"
        },
        {
            id: 2,
            title: "Authentication System",
            category: "Security",
            year: "2024",
            duration: "2 months",
            description: "Secure authentication system with JWT tokens, OAuth2, and multi-factor authentication. Supports multiple authentication methods and role-based access control.",
            challenge: "Creating a secure authentication system that supports multiple auth methods, maintains session security, and scales with user growth.",
            solution: "Implemented JWT-based authentication with refresh tokens, OAuth2 integration for social login, and TOTP-based MFA. Added comprehensive security measures and rate limiting.",
            results: [
                "Zero security breaches",
                "Support for 100K+ users",
                "99.99% authentication success rate"
            ],
            tags: ["JWT", "OAuth2", "Security", "Authentication", "MFA"],
            technologies: ["Node.js", "JWT", "OAuth2", "Redis"],
            thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/alikhan/auth-system"
        },
        {
            id: 3,
            title: "Database Optimization",
            category: "Database",
            year: "2023",
            duration: "2 months",
            description: "Performance optimization of a large-scale PostgreSQL database with millions of records. Improved query performance and reduced database load.",
            challenge: "Optimizing database queries for a system with millions of records while maintaining data integrity and minimizing downtime.",
            solution: "Analyzed slow queries, added proper indexes, implemented database partitioning, and optimized connection pooling. Added query caching and monitoring.",
            results: [
                "80% reduction in query time",
                "50% reduction in database load",
                "Improved overall system performance"
            ],
            tags: ["PostgreSQL", "Database", "Optimization", "Performance", "SQL"],
            technologies: ["PostgreSQL", "pgAdmin", "Redis"],
            thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/alikhan/db-optimization"
        },
        {
            id: 4,
            title: "Microservices Architecture",
            category: "System Architecture",
            year: "2024",
            duration: "4 months",
            description: "Designed and implemented a microservices architecture for a large-scale e-commerce platform. Separated services for better scalability and maintainability.",
            challenge: "Breaking down a monolithic application into microservices while maintaining service communication, data consistency, and deployment pipeline.",
            solution: "Implemented service-oriented architecture with API Gateway, service discovery, and message queue. Used Docker and Kubernetes for containerization and orchestration.",
            results: [
                "Improved scalability and maintainability",
                "Independent service deployment",
                "Better fault isolation"
            ],
            tags: ["Microservices", "Docker", "Kubernetes", "Architecture", "API Gateway"],
            technologies: ["Docker", "Kubernetes", "Node.js", "RabbitMQ"],
            thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/alikhan/microservices"
        },
        {
            id: 5,
            title: "Real-time Chat System",
            category: "Backend Development",
            year: "2024",
            duration: "2 months",
            description: "Real-time chat system with WebSocket support, message persistence, and file sharing. Supports group chats and private messaging.",
            challenge: "Building a real-time communication system that can handle thousands of concurrent connections and maintain message delivery guarantees.",
            solution: "Implemented WebSocket server with Socket.io, message queue for persistence, and Redis for pub/sub. Added file upload handling and message encryption.",
            results: [
                "Supports 5,000+ concurrent connections",
                "Real-time message delivery",
                "99.9% message delivery rate"
            ],
            tags: ["WebSocket", "Real-time", "Socket.io", "Node.js", "Redis"],
            technologies: ["Node.js", "Socket.io", "Redis", "MongoDB"],
            thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/alikhan/chat-system"
        }
    ],
    amirkhan: [
        {
            id: 1,
            title: "Portfolio Website",
            category: "Frontend Development",
            year: "2024",
            duration: "1 month",
            description: "Modern, responsive portfolio website built with React and Tailwind CSS. Features smooth animations, dark mode, and optimized performance.",
            challenge: "Creating a visually appealing portfolio that showcases work effectively while maintaining fast load times and responsive design.",
            solution: "Built with React for component reusability, Tailwind CSS for rapid styling, and optimized images and code splitting for performance.",
            results: [
                "100% Lighthouse performance score",
                "Fully responsive design",
                "Smooth animations and transitions"
            ],
            tags: ["React", "Tailwind CSS", "Responsive", "Animation", "Performance"],
            technologies: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
            thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/amirkhan/portfolio"
        },
        {
            id: 2,
            title: "Movie Database App",
            category: "Frontend Development",
            year: "2024",
            duration: "2 months",
            description: "Interactive movie database application with search, filtering, and favorites. Built with Vue.js and integrated with The Movie Database API.",
            challenge: "Creating an intuitive interface for browsing and discovering movies with smooth animations and efficient data loading.",
            solution: "Implemented Vue.js with Vuex for state management, lazy loading for images, and debounced search. Added caching for better performance.",
            results: [
                "Fast search and filtering",
                "Smooth user experience",
                "50K+ movies in database"
            ],
            tags: ["Vue.js", "API Integration", "State Management", "Search", "Filtering"],
            technologies: ["Vue.js", "Vuex", "Axios", "Tailwind CSS"],
            thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/amirkhan/movie-app"
        },
        {
            id: 3,
            title: "Weather Dashboard",
            category: "Frontend Development",
            year: "2023",
            duration: "1 month",
            description: "Beautiful weather dashboard with real-time data, forecasts, and interactive maps. Built with vanilla JavaScript and weather APIs.",
            challenge: "Creating an engaging weather dashboard that presents complex data in an understandable and visually appealing way.",
            solution: "Used Chart.js for data visualization, Leaflet for maps, and modern CSS for styling. Implemented caching for API calls.",
            results: [
                "Real-time weather updates",
                "Beautiful data visualization",
                "Accurate forecasts"
            ],
            tags: ["JavaScript", "API", "Charts", "Maps", "Dashboard"],
            technologies: ["JavaScript", "Chart.js", "Leaflet", "OpenWeather API"],
            thumbnail: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/amirkhan/weather-dashboard"
        },
        {
            id: 4,
            title: "E-commerce Frontend",
            category: "Frontend Development",
            year: "2024",
            duration: "3 months",
            description: "Complete e-commerce frontend with product browsing, cart management, and checkout. Built with React and Redux for state management.",
            challenge: "Creating a seamless shopping experience with complex state management, cart functionality, and smooth user interactions.",
            solution: "Implemented React with Redux for state management, React Router for navigation, and optimized performance with code splitting and lazy loading.",
            results: [
                "Smooth shopping experience",
                "Fast page loads",
                "Intuitive user interface"
            ],
            tags: ["React", "Redux", "E-commerce", "State Management", "Shopping Cart"],
            technologies: ["React", "Redux", "React Router", "Styled Components"],
            thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/amirkhan/ecommerce-frontend"
        },
        {
            id: 5,
            title: "Music Player Interface",
            category: "Frontend Development",
            year: "2023",
            duration: "1 month",
            description: "Modern music player interface with playlist management, audio controls, and visualizations. Built with HTML5, CSS3, and JavaScript.",
            challenge: "Creating a beautiful and functional music player with smooth animations and responsive design.",
            solution: "Used HTML5 Audio API, CSS animations for visual effects, and JavaScript for playlist management and controls.",
            results: [
                "Beautiful interface",
                "Smooth animations",
                "Full playlist support"
            ],
            tags: ["HTML5", "CSS3", "JavaScript", "Audio", "Animation"],
            technologies: ["HTML5", "CSS3", "JavaScript", "Web Audio API"],
            thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/amirkhan/music-player"
        },
        {
            id: 6,
            title: "Task Management App",
            category: "Frontend Development",
            year: "2024",
            duration: "2 months",
            description: "Task management application with drag-and-drop, filtering, and collaboration features. Built with React and TypeScript.",
            challenge: "Creating an intuitive task management interface with complex interactions like drag-and-drop and real-time updates.",
            solution: "Implemented React with TypeScript for type safety, React DnD for drag-and-drop, and optimized rendering for performance.",
            results: [
                "Intuitive drag-and-drop",
                "Real-time collaboration",
                "Smooth user experience"
            ],
            tags: ["React", "TypeScript", "Drag-and-Drop", "Task Management", "Collaboration"],
            technologies: ["React", "TypeScript", "React DnD", "Tailwind CSS"],
            thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/amirkhan/task-manager"
        }
    ],
    sardor: [
        {
            id: 1,
            title: "E-commerce Platform",
            category: "Full-Stack Development",
            year: "2024",
            duration: "4 months",
            description: "Complete e-commerce platform with user authentication, product management, shopping cart, and payment integration. Built with React and Node.js.",
            challenge: "Building a full-stack e-commerce platform that handles user management, product catalog, orders, and payments securely.",
            solution: "Implemented React frontend with Node.js/Express backend, MongoDB for database, and Stripe for payments. Added authentication, admin panel, and order management.",
            results: [
                "Successfully launched platform",
                "Handles 1,000+ products",
                "Secure payment processing"
            ],
            tags: ["React", "Node.js", "MongoDB", "E-commerce", "Stripe"],
            technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
            thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/sardor/ecommerce-platform"
        },
        {
            id: 2,
            title: "Task Management System",
            category: "Full-Stack Development",
            year: "2024",
            duration: "3 months",
            description: "Collaborative task management system with real-time updates, team collaboration, and project tracking. Built with React and Node.js.",
            challenge: "Creating a real-time collaboration system with user management, task assignments, and project tracking.",
            solution: "Implemented React frontend with Socket.io for real-time updates, Node.js backend with REST API, and PostgreSQL for data persistence.",
            results: [
                "Real-time collaboration",
                "Team management features",
                "Project tracking and analytics"
            ],
            tags: ["React", "Node.js", "Socket.io", "PostgreSQL", "Real-time"],
            technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Express"],
            thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/sardor/task-manager"
        },
        {
            id: 3,
            title: "Social Media Dashboard",
            category: "Full-Stack Development",
            year: "2024",
            duration: "3 months",
            description: "Social media management dashboard with analytics, scheduling, and multi-platform support. Built with React and Python.",
            challenge: "Creating a dashboard that integrates with multiple social media platforms and provides comprehensive analytics.",
            solution: "Implemented React frontend with Python/Flask backend, integrated with multiple social media APIs, and added data visualization with Chart.js.",
            results: [
                "Multi-platform support",
                "Comprehensive analytics",
                "Scheduling and automation"
            ],
            tags: ["React", "Python", "Flask", "Analytics", "Social Media"],
            technologies: ["React", "Python", "Flask", "PostgreSQL", "Chart.js"],
            thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/sardor/social-dashboard"
        },
        {
            id: 4,
            title: "Learning Management System",
            category: "Full-Stack Development",
            year: "2023",
            duration: "5 months",
            description: "Complete learning management system with course creation, student enrollment, and progress tracking. Built with MERN stack.",
            challenge: "Building a comprehensive LMS with course management, student progress tracking, and assessment features.",
            solution: "Implemented MERN stack (MongoDB, Express, React, Node.js) with file uploads, video streaming, and progress tracking.",
            results: [
                "Course management system",
                "Student progress tracking",
                "Assessment and grading"
            ],
            tags: ["MERN", "LMS", "Education", "MongoDB", "React"],
            technologies: ["MongoDB", "Express", "React", "Node.js", "Mongoose"],
            thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/sardor/lms"
        },
        {
            id: 5,
            title: "Real Estate Platform",
            category: "Full-Stack Development",
            year: "2024",
            duration: "4 months",
            description: "Real estate listing platform with property search, filtering, and agent management. Built with Next.js and Node.js.",
            challenge: "Creating a platform that handles property listings, search, filtering, and agent management efficiently.",
            solution: "Implemented Next.js for server-side rendering, Node.js backend with REST API, and PostgreSQL for property data. Added advanced search and filtering.",
            results: [
                "Fast property search",
                "Advanced filtering",
                "Agent management system"
            ],
            tags: ["Next.js", "Node.js", "PostgreSQL", "Real Estate", "Search"],
            technologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis"],
            thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
                "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop"
            ],
            link: "#",
            github: "https://github.com/sardor/real-estate"
        }
    ]
};

// Get current team member from page
function getCurrentTeamMember() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'wezeso.html';
    
    if (filename.includes('wezeso')) return 'wezeso';
    if (filename.includes('alikhan')) return 'alikhan';
    if (filename.includes('amirkhan')) return 'amirkhan';
    if (filename.includes('sardor')) return 'sardor';
    
    return 'wezeso'; // default
}

// Get projects for current team member
function getProjects() {
    const member = getCurrentTeamMember();
    return portfolioProjects[member] || [];
}

// Search projects
function searchProjects(query) {
    const projects = getProjects();
    const lowerQuery = query.toLowerCase();
    
    return projects.filter(project => 
        project.title.toLowerCase().includes(lowerQuery) ||
        project.category.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        project.technologies.some(tech => tech.toLowerCase().includes(lowerQuery))
    );
}

// Filter projects by category
function filterProjectsByCategory(category) {
    const projects = getProjects();
    if (!category || category === 'all') return projects;
    return projects.filter(project => project.category === category);
}

// Get project by ID
function getProjectById(id) {
    const projects = getProjects();
    return projects.find(project => project.id === parseInt(id));
}

// Get all categories
function getCategories() {
    const projects = getProjects();
    const categories = new Set(projects.map(project => project.category));
    return Array.from(categories);
}

// Load images for portfolio items
function loadPortfolioImages() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const projects = getProjects();
    
    portfolioItems.forEach(item => {
        const projectId = item.getAttribute('data-id');
        const project = projects.find(p => p.id === parseInt(projectId));
        
        if (project && project.thumbnail) {
            const imageContainer = item.querySelector('.portfolio-image');
            const placeholderImage = item.querySelector('.placeholder-image');
            
            if (imageContainer && placeholderImage) {
                // Add loading class
                imageContainer.classList.add('loading');
                
                // Create img element
                const img = document.createElement('img');
                img.src = project.thumbnail;
                img.alt = project.title;
                img.className = 'portfolio-thumbnail';
                img.loading = 'lazy';
                
                // Handle image load
                img.onload = () => {
                    imageContainer.classList.remove('loading');
                    placeholderImage.style.display = 'none';
                    img.style.opacity = '0';
                    img.style.display = 'block';
                    setTimeout(() => {
                        img.style.transition = 'opacity 0.5s ease';
                        img.style.opacity = '1';
                    }, 10);
                };
                
                img.onerror = () => {
                    // If image fails to load, keep placeholder visible
                    imageContainer.classList.remove('loading');
                    placeholderImage.style.display = 'flex';
                };
                
                // Insert image into container
                imageContainer.appendChild(img);
            }
        }
    });
}

// Initialize portfolio lookup
function initPortfolioLookup() {
    const modal = document.getElementById('portfolioModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!modal || !modalBody) {
        console.warn('Portfolio modal not found');
        return;
    }

    // Load images for portfolio items
    loadPortfolioImages();

    // Open modal when clicking portfolio item
    portfolioItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-id');
            if (projectId) {
                openProjectModal(projectId);
            }
        });
    });

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeProjectModal();
        });
    }

    const modalOverlay = modal.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProjectModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
    
    // Prevent modal content clicks from closing modal
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Open project modal
function openProjectModal(projectId) {
    const modal = document.getElementById('portfolioModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    const project = getProjectById(projectId);
    if (!project) {
        console.warn('Project not found:', projectId);
        return;
    }

    // Build images section if images exist
    const imagesSection = project.images && project.images.length > 0 ? `
        <div class="case-section">
            <h3><i class="fas fa-images"></i> Project Images</h3>
            <div class="project-images-grid">
                ${project.images.map(img => `
                    <div class="project-image-wrapper">
                        <img src="${img}" alt="${project.title}" class="project-image" loading="lazy">
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Build thumbnail hero image if exists
    const heroImage = project.thumbnail ? `
        <div class="case-hero-image">
            <img src="${project.thumbnail}" alt="${project.title}" class="hero-img" loading="lazy">
        </div>
    ` : '';

    const modalContent = `
        <div class="case-study">
            ${heroImage}
            <div class="case-header">
                <div class="case-badge">${project.category}</div>
                <h2 class="case-title">${project.title}</h2>
                <div class="case-meta">
                    <span><i class="fas fa-calendar"></i> ${project.year}</span>
                    <span><i class="fas fa-clock"></i> ${project.duration}</span>
                    ${project.github !== '#' ? `<span><i class="fab fa-github"></i> <a href="${project.github}" target="_blank">View Code</a></span>` : ''}
                    ${project.link !== '#' ? `<span><i class="fas fa-external-link-alt"></i> <a href="${project.link}" target="_blank">Live Demo</a></span>` : ''}
                </div>
                <p class="case-description">${project.description}</p>
            </div>

            <div class="case-section">
                <h3><i class="fas fa-exclamation-circle"></i> The Challenge</h3>
                <p>${project.challenge}</p>
            </div>

            <div class="case-section">
                <h3><i class="fas fa-lightbulb"></i> The Solution</h3>
                <p>${project.solution}</p>
            </div>

            <div class="case-section">
                <h3><i class="fas fa-trophy"></i> Results</h3>
                <ul class="results-list">
                    ${project.results.map(result => `<li><i class="fas fa-check-circle"></i> ${result}</li>`).join('')}
                </ul>
            </div>

            ${imagesSection}

            <div class="case-section">
                <h3><i class="fas fa-tags"></i> Tags</h3>
                <div class="case-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>

            <div class="case-section">
                <h3><i class="fas fa-code"></i> Technologies Used</h3>
                <div class="technologies-list">
                    ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    modalBody.innerHTML = modalContent;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
    const modal = document.getElementById('portfolioModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioLookup);
} else {
    initPortfolioLookup();
}

// Export functions for use in other scripts
window.portfolioLookup = {
    getProjects,
    searchProjects,
    filterProjectsByCategory,
    getProjectById,
    getCategories,
    openProjectModal,
    closeProjectModal
};

