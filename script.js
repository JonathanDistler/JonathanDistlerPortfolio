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

// Dynamic purple↔blue gradient background for hero
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let animationId = null;
    let startTime = performance.now();

    function hsl(h, s, l) {
        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    function animate(now) {
        const t = (now - startTime) / 1000; // seconds
        // Hue oscillates smoothly between purple (~270) and blue (~215)
        const hueCenter = 242;       // midpoint hue
        const hueAmplitude = 27;     // swing range
        const speed = 0.25;          // cycles per second

        const hue1 = hueCenter + hueAmplitude * Math.sin(2 * Math.PI * speed * t);
        const hue2 = hueCenter - hueAmplitude * Math.sin(2 * Math.PI * speed * t + Math.PI / 6);

        const color1 = hsl(hue1.toFixed(1), 70, 62);
        const color2 = hsl(hue2.toFixed(1), 68, 54);

        hero.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
        animationId = requestAnimationFrame(animate);
    }

    function start() {
        if (animationId == null) {
            startTime = performance.now();
            animationId = requestAnimationFrame(animate);
        }
    }

    function stop() {
        if (animationId != null) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    start();
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop(); else start();
    });
});

// Canvas sine waves oscillating background
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('heroWaves');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animationId = null;
    let startTime = performance.now();

    const waves = Array.from({ length: 6 }).map((_, i) => ({
        amplitude: 14 + i * 4,
        wavelength: 120 - i * 10,
        speed: 0.7 + i * 0.08,
        phase: Math.random() * Math.PI * 2,
        color: `rgba(255,255,255,${0.05 + i * 0.012})`
    }));

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = Math.floor(rect.width);
        height = Math.floor(rect.height);
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t) {
        ctx.clearRect(0, 0, width, height);

        // oscillate a horizontal offset to create back-and-forth motion
        const xOffset = Math.sin(t * 0.0015) * 80; // +/- 80px shift

        waves.forEach((w, idx) => {
            ctx.beginPath();
            const baseline = height * (0.25 + 0.5 * (idx / (waves.length - 1)));
            const k = (Math.PI * 2) / w.wavelength;
            const omega = w.speed * 0.004; // time factor for vertical oscillation
            
            // oscillate amplitude over time - each wave has different frequency
            const amplitudeMultiplier = 0.1 + 0.9 * Math.sin(t * 0.0008 + idx * 0.5);
            const currentAmplitude = w.amplitude * amplitudeMultiplier;

            for (let x = 0; x <= width; x += 2) {
                const y = baseline + Math.sin(k * (x + xOffset) + w.phase + t * omega) * currentAmplitude;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }

            ctx.strokeStyle = w.color;
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }

    function animate(now) {
        const t = now - startTime;
        draw(t);
        animationId = requestAnimationFrame(animate);
    }

    function start() {
        if (animationId == null) {
            startTime = performance.now();
            animationId = requestAnimationFrame(animate);
        }
    }

    function stop() {
        if (animationId != null) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    resize();
    start();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
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
            <p>This project was developed during my summer internship at ETH Zurich's Soft Robotics Laboratory (SRL). I was tasked with optimizing a soft-robotic tail for force-output and fish maneuverability, with a focus on creating an iterative design program for tail dimension optimization. Much of the research is still proprietary and under research, so images can't be shown! </p>
            
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
            { text: "Open Hyperloop PDF", url: "assets/resume/Hyperloop_FA_25.pdf", type: "primary" }
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

    ,7: {
        title: "Mechanics of Materials (MAE 3270): Torque Wrench Analysis",
        placeholder: "Mechanics of Materials",
        description: "Comprehensive Mechanics of Materials notes and worked examples from MAE 3270, covering stress, strain, beams, torsion, and failure criteria for a beam in bending.",
        tech: ["Mechanics of Materials", "ANSYS", "Matlab","Granta"],
        images: [
            { src: "images/Stress_concentration.png", caption: "Stress Concentration Analysis" },
            { src: "images/constraints.png", caption: "Boundary Conditions and Constraints" },
            { src: "images/total_strain.png", caption: "Total Strain Distribution" }
        ],
        details: `
            <h3>Overview</h3>
            <p>This PDF collects my Mechanics of Materials final project results from MAE 3270, including key derivations, formulas, and ANSYS outputs. It is intended as a concise explanation on the relationship between beam-bending theory and FEA methodology.</p>

            <h3>Topics Included</h3>
            <p>• Stress and strain (normal)<br>
            • Beam bending theory including deflection via energy method<br>
            • Fatigue<br>
            • Fracture criteria<br>
            • Material selection<br>
            • Failure criteria and safety factors</p>
        `,
        links: [
            { text: "Open Mechanics of Materials PDF", url: "assets/resume/Mechanics_of_Materials.pdf", type: "primary" }
        ]
    },

    8: {
        title: "Fluid Mechanics (MAE 3230): Fluidic Machine Dissection",
        placeholder: "Fluid Mechanics",
        description: "Comprehensive final project for MAE 3230 (Introductory Fluid Mechanics) course. This project involved dissecting a weed-eater, then describing the fluid mechanics of the machine using comprehensive vocabulary, then developing a script and making a short-video.",
        tech: ["Fluid Mechanics", "Hardware Intuition", "Video Editing"],
        images: [
            { src: "images/bernoulli_graph.png", caption: "Bernoulli's Equation Graphical Analysis" },
            { src: "images/bernoulli_eq.png", caption: "Bernoulli's Equation Derivation" }
        ],
        details: `
            <h3>Project Overview</h3>
            <p>This comprehensive final project for MAE 3230 (Introductory Fluid Mechanics) involved dissecting a weed-eater (weed-wacker) and analyzing its fluid mechanics principles. The project required describing the fluid mechanics of the machine using comprehensive vocabulary, creating a script, and producing a short video presentation.</p>
            
            <h3>Key Features</h3>
            <p>• Hardware dissection and analysis<br>
            • Fluid mechanics principles application<br>
            • Technical vocabulary and documentation<br>
            
            <h3>Technical Implementation</h3>
            <p>The project involved hands-on dissection of a weed-eater to understand its internal fluid mechanics, including how fluids (air, fuel, exhaust) flow through the system. And how the user-inputs into the system, such as higher or lower throttle map to area differences within the carburetor, and an appropriate amount of fuel being mixed into oncoming air flow. We also investigated the role of the two-stroke internal combustion engine, and provided a relevant calculation given real-world measurements from our weed-wacker. The analysis required applying course concepts to real-world machinery, including Bernoulli's equation, the hydrostatic equation, and the Venturi effect.</p>
        `,
        links: [
            { text: "View Video", url: "https://www.youtube.com/watch?v=e2QJt-J_BOo&authuser=0", type: "primary" }
        ]
    },
    9: {
        title: "System Dynamics (MAE 3260): LQR Control of Ball on a Ramp",
        placeholder: "System Dynamics",
        description: "Linear Quadratic Regulator (LQR) control system implementation for stabilizing a ball on a ramp, demonstrating advanced control theory and system dynamics.",
        tech: ["Control Systems", "LQR", "Advanced System Dynamics", "MATLAB"],
        images: [
            { src: "images/Ball_on_Beam_FBDs.png", caption: "Free Body Diagrams for Ball on Beam System" },
            { src: "images/Ball_on_Beam_Model.png", caption: "Rigid Body Dynamics Model" },
            { src: "images/ball_beam_solution.png", caption: "LQR Control Solution" }
        ],
        details: `
            <h3>Project Overview</h3>
            <p>This project implements a Linear Quadratic Regulator (LQR) control system to stabilize a ball on a ramp via an applied torque, mimicing a linear-actuator. The LQR controller is an optimal control method that minimizes a quadratic cost function, providing an elegant solution to the control problem.</p>
            
            <h3>Key Features</h3>
            <p>• LQR controller design and implementation<br>
            • System dynamics modeling<br>
            • State-space representation<br>
            • Stability analysis<br>
            • Performance optimization</p>
            
            <h3>Technical Implementation</h3>
            <p>The project involves modeling the ball-on-ramp system using state-space equations, designing an LQR controller to stabilize the system, and analyzing the closed-loop performance. The implementation demonstrates understanding of modern control theory and optimal control techniques.</p>
        `,
        links: [
            { text: "Open PDF Report", url: "assets/resume/Report_Portfolio.pdf", type: "primary" }
        ]
    }
};

// Modal functionality - use event delegation to ensure buttons work
let modal, closeBtn, imageModal, imageCloseBtn, enlargedImage, imageCaption;

document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    modal = document.getElementById('projectModal');
    closeBtn = document.querySelector('.close');
    imageModal = document.getElementById('imageModal');
    imageCloseBtn = document.querySelector('.image-close');
    enlargedImage = document.getElementById('enlargedImage');
    imageCaption = document.getElementById('imageCaption');
    
    // Use event delegation for project expand buttons (works for dynamically added buttons)
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('project-expand-btn')) {
            const projectCard = event.target.closest('.project-card');
            if (projectCard) {
                const projectId = projectCard.getAttribute('data-project');
                openProjectModal(projectId);
            }
        }
    });
    
    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }
    
    // Image modal close
    if (imageCloseBtn) {
        imageCloseBtn.addEventListener('click', closeImageModal);
    }
    
    // Close modal when clicking outside of it
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeProjectModal();
            }
        });
    }
    
    // Close image modal when clicking outside of it
    if (imageModal) {
        window.addEventListener('click', function(event) {
            if (event.target === imageModal) {
                closeImageModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (modal && modal.style.display === 'block') {
                closeProjectModal();
            }
            if (imageModal && imageModal.style.display === 'block') {
                closeImageModal();
            }
        }
    });
});

function openImageModal(imageSrc, caption) {
    if (!imageModal) {
        imageModal = document.getElementById('imageModal');
        enlargedImage = document.getElementById('enlargedImage');
        imageCaption = document.getElementById('imageCaption');
    }
    if (enlargedImage && imageCaption && imageModal) {
        enlargedImage.src = imageSrc;
        enlargedImage.alt = caption;
        imageCaption.textContent = caption;
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    if (!imageModal) {
        imageModal = document.getElementById('imageModal');
    }
    if (imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    // Ensure modal is available
    if (!modal) {
        modal = document.getElementById('projectModal');
    }
    if (!modal) return;

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
    if (!modal) {
        modal = document.getElementById('projectModal');
    }
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

console.log('Personal website loaded successfully! 🚀');





