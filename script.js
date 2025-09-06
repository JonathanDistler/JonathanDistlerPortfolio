// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(102, 126, 234, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        navbar.style.backdropFilter = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class styles to CSS
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #e0e7ff !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Add hover effects to project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click effects to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 9999;
    transition: width 0.3s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add smooth reveal animation for elements
const revealElements = document.querySelectorAll('.cv-item, .class-item, .skill-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateX(-30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// Project data for modal
const projectData = {
    1: {
        title: "Soft Fish Tail",
        placeholder: "Soft Fish Tail",
        description: "Soft robotic fish tail optimization project for ETH Zurich SRL, featuring computer vision analysis, MuJoCo simulation, and experimental validation.",
        tech: ["Python", "MATLAB", "C++", "MuJoCo", "Computer Vision"],
        images: [
            { src: "images/test_setup.png", caption: "Experimental Test Setup" },
            { src: "images/cv_output.png", caption: "Example CV-Output" },
            { src: "images/force_output.png", caption: "Thrust Components" },
            { src: "images/dynamic_deriv.png", caption: "Dynamical Derivation for Tail Angle" }
        ],
        videos: [
            { src: "images/Fish_Force_Test_8_30.mp4", caption: "Force Test Video" }
        ],
        details: `
            <h3>Project Overview</h3>
            <p>This project was developed during my summer internship at ETH Zurich's Soft Robotics Laboratory (SRL). I was tasked with optimizing a soft-robotic tail for force-output and fish maneuverability, with a focus on creating an iterative design program for tail dimension optimization.</p>
            
            <h3>Key Features</h3>
            <p>• Computer vision analysis for tail curvature measurement<br>
            • MuJoCo simulation with Nelder-Mead optimization<br>
            • Experimental validation within 10% accuracy<br>
            • Iterative design program for tail dimensions<br>
            • Material property analysis and selection<br>
            • Force-output optimization algorithms<br>
            • Real-time data collection and analysis</p>
            
            <h3>Technical Implementation</h3>
            <p>The project combines Python for data analysis and computer vision, MATLAB for simulation and optimization algorithms, and C++ for hardware control. The MuJoCo physics engine provides accurate simulation of the soft robotic tail dynamics, while computer vision tracks real-world performance.</p>
            
            <h3>Research Impact</h3>
            <p>This work contributes to the field of soft robotics by providing a systematic approach to optimizing soft robotic fish tails. The novel actuation method (based on scotch-yoke principles) along with the iterative design program helps researchers select optimal tail configurations based on user-specific radius-of-curvature requirements.</p>
            
            <h3>Experimental Setup</h3>
            <p>The test setup image shows the actual experimental configuration used for validating the soft robotic tail performance, including the computer vision system and data collection equipment.</p>
        `,
        links: [
            { text: "GitHub Repository", url: "https://github.com/JonathanDistler/SoftFishTail", type: "primary" }
        ]
    },
    2: {
        title: "Game of Life Simulation",
        placeholder: "Game of Life",
        description: "Interactive cellular automaton simulation with custom rule sets, featuring multiple generation tracking and Conway's Game of Life implementation.",
        tech: ["HTML", "JavaScript", "CSS", "Algorithms"],
        images: [
            { src: "images/example_output_1.png", caption: "Example Output of One Stage" },
            { src: "images/board_entropy.png", caption: "Positional Entropy Across the Board" }
        ],
        details: `
            <h3>Project Overview</h3>
            <p>This project creates a Game of Life simulation with a different rule set than Conway's Game of Life, using hard thresholds for alive and dead states instead of the traditional rules. The simulation features multiple generation tracking and interactive controls.</p>
            
            <h3>Key Features</h3>
            <p>• Custom rule sets for cellular automaton behavior<br>
            • Multiple generation tracking and visualization<br>
            • Interactive grid manipulation<br>
            • Conway's Game of Life implementation<br>
            • Entropy Display<br>
            • Pattern saving and loading<br>
            • Performance optimization for large grids</p>
            
            <h3>Technical Implementation</h3>
            <p>Built entirely with HTML, CSS, and JavaScript, the simulation uses efficient algorithms for grid updates and rendering. The custom rule system allows for experimentation with different cellular automaton behaviors beyond Conway's original rules.</p>
            
            <h3>Algorithm Innovation</h3>
            <p>The project implements hard thresholds for cell states rather than the traditional neighbor-counting rules, creating unique patterns and behaviors that differ from standard Game of Life simulations. This approach allows for more predictable and controllable cellular evolution.</p>
        `,
        links: [
            { text: "GitHub Repository", url: "https://github.com/JonathanDistler/GameofLifeSim", type: "primary" },
            { text: "Play Simulation", url: "checkerboard.html", type: "embed" }
        ]
    },
    3: {
        title: "Original Design Prototype",
        placeholder: "Design Prototype",
        description: "Innovative design prototype showcasing creative engineering solutions and novel approaches to complex technical challenges.",
        tech: ["CAD Design", "Prototyping", "DFX", "Testing Protocols"],
        images: [
            { src: "images/Chair_sketch.png", caption: "Initial Sketches" },
            { src: "images/CAD_Chair_render.png", caption: "CAD Render" },
            { src: "images/Chair_full.png", caption: "Complete Prototype" }
        ],
        details: `
            <h3>Project Overview</h3>
            <p>As a part of MAE 2250, this original design prototype represents a creative engineering solution to a market-defined problem of user's lacking gym and that negatively affecting their mental health. The project showcases innovative thinking, problem-solving skills, and the ability to translate user needs and constraints into tangible prototypes.</p>
            
            <h3>Key Features</h3>
            <p>• Original concept development and ideation<br>
            • CAD modeling and design optimization<br>
            • Prototype fabrication and testing<br>
            • Performance analysis and iteration<br>
            • Documentation of design process<br>
            • Innovation in engineering approach<br>
            • Static Analysis (Euler's Beam Buckling Equation)<br>
            • Practical application focus</p>
            
            <h3>Technical Implementation</h3>
            <p>The project follows a systematic design process from initial concept through final prototype. This includes research, ideation, CAD modeling, material selection, fabrication, testing, and iterative improvement based on results.</p>
            
            <h3>Innovation Impact</h3>
            <p>This prototype demonstrates creative problem-solving and innovative engineering thinking. The design addresses real-world challenges with novel approaches, showcasing the ability to think outside conventional solutions and create practical, effective designs.</p>
            
            <h3>Design Process</h3>
            <p>The CAD chair render shows the final design iteration, while additional images (Chair_full.png and Chair_sketch.png) demonstrate the complete prototype and initial design sketches, illustrating the progression from concept to final product. Along the way there were many other problems that were solved, including market research, market evaluation, and a cost analysis.</p>
        `,
        links: [
            { text: "View Details", url: "#", type: "primary" }
        ]
    }

    ,4: {
        title: "Adversary GPS Setup",
        placeholder: "Aerospace Adversary GPS Setup",
        description: "Experimental testing setup as a part of the Cornell Aerospace Adversary Lab. Involved the implementation of a GPS-localization system to accurately measure (and filter) positional data of a drone",
        tech: ["CAD Design", "Prototyping", "DFX", "Testing Protocols"],
        images: [
            { src: "images/gps_submap.png", caption: "GPS Setup" },
            { src: "images/example_positional_readout.png", caption: "Example Positional Data" }
        ],
        details: `
            <h3>Project Overview</h3>
            <p>This GPS setup involved the use of the Marvelmind system. The system needed to be configured to maximize the space between the stationary beacons (at a minimum of 3m), while avoiding the constraints of the laboratory including poor line-of-sight, sharp corners, and general clutter, all of which would invalidate the experimental results. </p>
            
            <h3>Key Features</h3>
            <p>
            • Room Modeling<br>
            • Realistic CAD Portrayls<br>
            • 3D-Printing<br>
            • Acoustic Principles</p>

            <h3>Innovation Impact</h3>
            <p>This GPS setup represents a very unique system in which research can be conducted at a very small-scale without losing the accuracy of larger setups. This provdides a baseline for decentralized research centers. </p>
            
            <h3>Design Process</h3>
            <p>The project follows a physics-based approach from start to finish. It required reading posted literature by the Marvelmind team to understand the acoustics of the setup, then it required developing a physics intutition to accurately position the beacons. Then, it required real-time serial communication and data-analysis in Python (as well as a basic tolerancing filter) to display the results. </p>
        
        `,
        links: [
            { text: "GitHub Repository", url: "https://github.com/JonathanDistler/MarvelmindModularization", type: "primary" }
        ]
    }

    ,5: {
        title: "Hyperloop Project",
        placeholder: "Hyperloop Project Team",
        description: "Cornell Project Team developing novel techniques and technologies to be implemented within the Hyperloop framework, such as battery-pack enclosures, wire-harnesses, and micro-controller holders",
        tech: ["CAD Design", "Prototyping", "DFX", "Testing Protocols"],
        images: [
            { src: "images/microcontroller_holder.png", caption: "Micro-Controller Holders" },
            { src: "images/hyperloop_pod.png", caption: "Hyperloop Carbon-Fiber Aeroshell" },
            { src: "images/wire_harnesses.png", caption: "Snap-Fit Wire Harnesses" },
            { src: "images/battery_pack_fea.png", caption: "Battery Pack Enclosure FEA" },
            { src: "images/battery_pack_top.png", caption: "Top View of Battery Pack Enclosure" },
            { src: "images/battery_pack_front.png", caption: "Front View of Battery Pack Enclosure" }
        ],
        details: `
            <h3>Project Overview</h3>
            <p>This project represents a more hand-on approach to the engineering methodology. This project is multi-faceted with derivations influencing the design of the battery pack enclosure, machining brackets and other supports for the hyperloop pod, and helping to create a carbon-fiber aeroshell. </p>
            
            <h3>Key Features</h3>
            <p>• Statics Derivations<br>
            • CAD<br>
            • Technical Writing<br>
            • FEA<br>
            • Documentation of design process<br>
            • Machining and 3D Printing<br>
            • Carbon-Fiber Usage</p>
            
            <h3>Design Process</h3>
            <p>The project follows a rigorous mathematics based process through and through. For the battery pack enclosure, multiple designs were thought of, analogous statics setups were created, and FEA was implemented as a check on the stress and strain of the acrylic. For the micro-controller holders and wire-harnesses, precise CAD techniques were used to match the contours of the pod and provide precise tolerancing for the parts. </p>
            
            <h3>Innovation Impact</h3>
            <p>This project hopes to build on previously developed work on "mag-lev" locomotion to develop more energy efficient and faster transport. It also provides an R&D opportunity to develop new technologies in interdisciplinary fields. </p>
            
            <h3>Design Process</h3>
            <p>The design process was multi-faceted with individual work, team work, and biweekly meetings in which improvements were shared and options were considered to optimize the performance of the structures.</p>
        `,
        links: [
            { text: "View Details", url: "#", type: "primary" }
        ]
    }

    ,6: {
        title: "Household CAD",
        placeholder: "Household CAD Practice",
        description: "Development of a 1:1 CAD to real-world model of a Seiko Arabic Dial Watch",
        tech: ["CAD Design", "Prototyping", "DFX", "Testing Protocols"],
        images: [
            { src: "images/watch_sketch.png", caption: "Seiko Watch Sketch" },
            { src: "images/watch_render_1.png", caption: "Seiko Watch Render Top-View" },
            { src: "images/watch_render_2.png", caption: "Seiko Watch Render Orthographic-View" }
        ],
        details: `
            <h3>Project Overview</h3>
            <p>The Household CAD Practice was an assignment as a part of MAE 2250, in which I was tasked with creating a 1:1 CAD to real-world model of a household item, in this case my Seiko watch. The parts are constrained so that all dynamical parts move in the CAD model. </p>
            
            <h3>Key Features</h3>
            <p>• CAD<br>
            • Rigorous Measurements<br>
            • CAD Best Practices</p>
            
            <h3>Design Process</h3>
            <p>The project followed a systematic design process, in which I sketched out the watch, measured all of the distances between the respective parts, made notes of constraints and DoFs, then CADed the model. </p>
            
            <h3>Innovation Impact</h3>
            <p>This prototype demonstrates a 1:1 CAD to real-world setup. This is important in developing accurate representations of systems that build on one another, where small tolerance issues result in catastrophic mismatches and design failures.</p>
            
        `,
        links: [
            { text: "View Details", url: "#", type: "primary" }
        ]
    }
};

// Modal functionality
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const projectExpandBtns = document.querySelectorAll('.project-expand-btn');

// Image enlargement modal
const imageModal = document.getElementById('imageModal');
const imageCloseBtn = document.querySelector('.image-close');
const enlargedImage = document.getElementById('enlargedImage');
const imageCaption = document.getElementById('imageCaption');

// Open modal when project expand button is clicked
projectExpandBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const projectCard = this.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

// Close modal when X is clicked
closeBtn.addEventListener('click', closeProjectModal);

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeProjectModal();
    }
    if (event.key === 'Escape' && imageModal.style.display === 'block') {
        closeImageModal();
    }
});

// Image enlargement functionality
imageCloseBtn.addEventListener('click', closeImageModal);

// Close image modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === imageModal) {
        closeImageModal();
    }
});

function openImageModal(imageSrc, caption) {
    enlargedImage.src = imageSrc;
    enlargedImage.alt = caption;
    imageCaption.textContent = caption;
    imageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Populate modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalPlaceholder').textContent = project.placeholder;
    document.getElementById('modalDescription').textContent = project.description;

    // Populate tech tags
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    project.tech.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techContainer.appendChild(tag);
    });

    // Populate detailed content
    document.getElementById('modalDetails').innerHTML = project.details;

    // Populate image cards
    const imageCardsContainer = document.getElementById('modalImageCards');
    imageCardsContainer.innerHTML = '';

    // Add images
    if (project.images && project.images.length > 0) {
        project.images.forEach(image => {
            const imageCard = document.createElement('div');
            imageCard.className = 'modal-image-card';
            imageCard.innerHTML = `
                <img src="${image.src}" alt="${image.caption}" onerror="this.style.display='none';">
                <div class="modal-image-card-caption">${image.caption}</div>
            `;
            imageCard.addEventListener('click', () => openImageModal(image.src, image.caption));
            imageCardsContainer.appendChild(imageCard);
        });
    }

    // Add videos
    if (project.videos && project.videos.length > 0) {
        project.videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'modal-video-card';
            videoCard.innerHTML = `
                <video class="modal-video" controls>
                    <source src="${video.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="modal-video-caption">${video.caption}</div>
            `;
            imageCardsContainer.appendChild(videoCard);
        });
    }

    // Populate links and embeds
    const linksContainer = document.getElementById('modalLinks');
    linksContainer.innerHTML = '';
    project.links.forEach(link => {
        if (link.type === "embed") {
            // Embed HTML content (e.g., Game of Life) in an iframe
            const iframe = document.createElement('iframe');
            iframe.src = link.url;
            iframe.width = "100%";
            iframe.height = "600px"; // adjust as needed
            iframe.style.border = "none";
            iframe.style.marginTop = "1rem";
            linksContainer.appendChild(iframe);
        } else {
            // Regular link
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = `btn ${link.type === 'primary' ? 'btn-primary' : 'btn-secondary'}`;
            linkElement.textContent = link.text;
            linkElement.target = '_blank';
            linksContainer.appendChild(linkElement);
        }
    });

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}


function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

console.log('Personal website loaded successfully! 🚀');


