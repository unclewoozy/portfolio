document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navbar Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');

        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            icon.classList.replace('fa-sun', 'fa-moon');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- Drag and Drop functionality & Slideshow ---
    const projectImages = {
        "1": [
            "MVIS/1.jpg",
            "MVIS/2.jpg",
            "MVIS/3.jpg",
            "MVIS/4.jpg",
            "MVIS/5.jpg",
            "MVIS/6.jpg",
            "MVIS/7.jpg",
            "MVIS/8.jpg"
        ],
        "2": [
            "MEMO/1.jpg",
            "MEMO/2.jpg",
            "MEMO/3.jpg",
            "MEMO/4.jpg"
        ],
        "3": [
            "CAPSTONE/Screenshot 2026-06-13 185847.png",
            "CAPSTONE/Screenshot 2026-06-13 185853.png",
            "CAPSTONE/Screenshot 2026-06-13 185858.png",
            "CAPSTONE/Screenshot 2026-06-13 185911.png",
            "CAPSTONE/Screenshot 2026-06-13 185924.png",
            "CAPSTONE/Screenshot 2026-06-13 185936.png",
            "CAPSTONE/Screenshot 2026-06-13 185950.png",
            "CAPSTONE/Screenshot 2026-06-13 185957.png",
            "CAPSTONE/Screenshot 2026-06-13 190003.png",
            "CAPSTONE/Screenshot 2026-06-13 190020.png",
            "CAPSTONE/Screenshot 2026-06-13 190026.png",
            "CAPSTONE/Screenshot 2026-06-13 190032.png",
            "CAPSTONE/Screenshot 2026-06-13 190040.png"
        ],
        "4": [
            "KIOSK/Screenshot 2026-06-13 032327.png",
            "KIOSK/Screenshot 2026-06-13 032336.png",
            "KIOSK/Screenshot 2026-06-13 032344.png",
            "KIOSK/Screenshot 2026-06-13 032354.png",
            "KIOSK/Screenshot 2026-06-13 032400.png",
            "KIOSK/Screenshot 2026-06-13 032409.png",
            "KIOSK/Screenshot 2026-06-13 032415.png"
        ],
        "5": [
            "CHATBOT/Screenshot 2026-06-13 211454.png",
            "CHATBOT/Screenshot 2026-06-13 211520.png",
            "CHATBOT/Screenshot 2026-06-13 211603.png"
        ]
    };

    function setupDragAndDrop(dropZoneSelector) {
        const dropZones = document.querySelectorAll(dropZoneSelector);

        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('dragover');
            });

            zone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                zone.classList.remove('dragover');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('dragover');

                const projectId = zone.getAttribute('data-project');
                if (projectId && !projectImages[projectId]) {
                    projectImages[projectId] = [];
                }

                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    const files = Array.from(e.dataTransfer.files);
                    let firstImageRendered = false;

                    files.forEach(file => {
                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            
                            reader.onload = (event) => {
                                const src = event.target.result;
                                if (projectId) {
                                    projectImages[projectId].push(src);
                                }

                                if (!firstImageRendered) {
                                    let img = zone.querySelector('img');
                                    if (!img) {
                                        img = document.createElement('img');
                                        zone.appendChild(img);
                                    }
                                    if (projectId && projectImages[projectId].length > 0) {
                                        img.src = projectImages[projectId][0];
                                    } else {
                                        img.src = src;
                                    }
                                    
                                    const text = zone.querySelector('p');
                                    if(text) text.style.display = 'none';
                                    firstImageRendered = true;
                                }
                            };
                            
                            reader.readAsDataURL(file);
                        }
                    });
                }
            });
        });
    }

    // Setup for profile picture
    setupDragAndDrop('#profile-drop-zone');
    
    // Setup for project images
    setupDragAndDrop('.project-img-drop');

    // --- Slideshow Modal Logic ---
    const modal = document.getElementById('slideshow-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');

    let currentProjectId = null;
    let currentSlideIndex = 0;

    // Open modal on click
    document.querySelectorAll('.project-img-drop').forEach(zone => {
        zone.addEventListener('click', (e) => {
            const projectId = zone.getAttribute('data-project');
            // Only open if there are images
            if (projectId && projectImages[projectId] && projectImages[projectId].length > 0) {
                currentProjectId = projectId;
                currentSlideIndex = 0;
                showSlide(currentSlideIndex);
                modal.style.display = 'block';
            }
        });
    });

    function showSlide(index) {
        if (!currentProjectId || !projectImages[currentProjectId]) return;
        const images = projectImages[currentProjectId];
        if (index >= images.length) currentSlideIndex = 0;
        if (index < 0) currentSlideIndex = images.length - 1;
        modalImg.src = projectImages[currentProjectId][currentSlideIndex];
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlideIndex--;
            showSlide(currentSlideIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlideIndex++;
            showSlide(currentSlideIndex);
        });
    }

    // Close modal when clicking outside image
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

});
