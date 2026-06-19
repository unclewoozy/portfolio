document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Navbar Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 75,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Hero Typing Animation ---
    const typingTarget = document.querySelector('.typing-target');
    if (typingTarget) {
        const rawText = typingTarget.getAttribute('data-text') || typingTarget.textContent || '';
        const decoder = document.createElement('textarea');
        decoder.innerHTML = rawText;
        const finalText = decoder.value;

        typingTarget.textContent = '';
        let charIndex = 0;

        function typeStep() {
            if (charIndex <= finalText.length) {
                typingTarget.textContent = finalText.slice(0, charIndex);
                charIndex++;
                setTimeout(typeStep, 42);
            } else {
                setTimeout(() => {
                    charIndex = 0;
                    typingTarget.textContent = '';
                    typeStep();
                }, 1400);
            }
        }

        typeStep();
    }

    // --- Generic Draggable Window Function ---
    const mobileDragQuery = window.matchMedia('(max-width: 820px)');
    
    function makeDraggable(draggableEl) {
        if (!draggableEl) return;
        
        let isDragging = false;
        let pointerId = null;
        let isDetached = false;
        let placeholder = null;
        let maxX = 0;
        let maxY = 0;
        let baseLeft = 0;
        let baseTop = 0;
        let startPointerX = 0;
        let startPointerPageY = 0;
        let targetLeft = 0;
        let targetTop = 0;
        let nextTranslateX = 0;
        let nextTranslateY = 0;
        let rafPaintId = null;

        const images = draggableEl.querySelectorAll('img');
        images.forEach(img => img.draggable = false);

        function isDragEnabled() {
            return !mobileDragQuery.matches;
        }

        function syncDragModeByViewport() {
            if (isDragEnabled()) {
                draggableEl.style.touchAction = 'none';
                return;
            }

            draggableEl.style.touchAction = 'auto';

            if (!isDragging) return;

            const rect = draggableEl.getBoundingClientRect();
            if (rafPaintId !== null) {
                cancelAnimationFrame(rafPaintId);
                rafPaintId = null;
            }

            draggableEl.style.left = `${rect.left}px`;
            draggableEl.style.top = `${rect.top + window.scrollY}px`;
            draggableEl.style.transform = 'none';
            draggableEl.classList.remove('dragging');
            draggableEl.style.willChange = 'auto';

            if (pointerId !== null) {
                try {
                    draggableEl.releasePointerCapture(pointerId);
                } catch (err) {}
            }

            isDragging = false;
            pointerId = null;
        }

        syncDragModeByViewport();
        if (typeof mobileDragQuery.addEventListener === 'function') {
            mobileDragQuery.addEventListener('change', syncDragModeByViewport);
        } else if (typeof mobileDragQuery.addListener === 'function') {
            mobileDragQuery.addListener(syncDragModeByViewport);
        }

        function clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        }

        function recalcDragBounds() {
            const width = draggableEl.offsetWidth;
            const height = draggableEl.offsetHeight;
            const doc = document.documentElement;
            const pageWidth = Math.max(doc.scrollWidth, window.innerWidth);
            const pageHeight = Math.max(doc.scrollHeight, window.innerHeight);

            maxX = Math.max(0, pageWidth - width);
            maxY = Math.max(0, pageHeight - height);
        }

        function queuePaint() {
            if (rafPaintId !== null) return;

            rafPaintId = requestAnimationFrame(() => {
                draggableEl.style.transform = `translate3d(${nextTranslateX}px, ${nextTranslateY}px, 0)`;
                rafPaintId = null;
            });
        }

        function detachToFloating(rect) {
            if (isDetached) return;

            placeholder = document.createElement('div');
            placeholder.style.width = `${rect.width}px`;
            placeholder.style.height = `${rect.height}px`;
            placeholder.style.maxWidth = '100%';
            
            // Replicate classes for grid or flex sizing if needed, but simple block is usually fine
            draggableEl.parentElement.insertBefore(placeholder, draggableEl);

            document.body.appendChild(draggableEl);
            draggableEl.classList.add('is-floating');
            draggableEl.style.position = 'absolute';
            draggableEl.style.margin = '0';
            draggableEl.style.left = `${rect.left}px`;
            draggableEl.style.top = `${rect.top + window.scrollY}px`;
            draggableEl.style.width = `${rect.width}px`;
            draggableEl.style.height = `${rect.height}px`;
            draggableEl.style.transform = 'none';
            draggableEl.style.zIndex = '1000'; // Bring to front

            isDetached = true;
        }

        function moveWindow(clientX, clientY) {
            const pointerPageY = clientY + window.scrollY;
            targetLeft = clamp(baseLeft + (clientX - startPointerX), 0, maxX);
            targetTop = clamp(baseTop + (pointerPageY - startPointerPageY), 0, maxY);

            nextTranslateX = targetLeft - baseLeft;
            nextTranslateY = targetTop - baseTop;
            queuePaint();
        }

        draggableEl.addEventListener('pointerdown', (e) => {
            if (!isDragEnabled()) return;
            if (e.button !== 0) return;
            
            // Ignore if clicking on interactive elements
            if (e.target.closest('a, button, input, textarea, select, [role="button"], .ide-dot, .close-modal, .controls, .nav-links')) {
                return;
            }

            let rect = draggableEl.getBoundingClientRect();
            if (!isDetached) {
                detachToFloating(rect);
                rect = draggableEl.getBoundingClientRect();
            }

            // Bring to top among other floating cards
            document.querySelectorAll('.is-floating').forEach(el => el.style.zIndex = '1000');
            draggableEl.style.zIndex = '1001';

            recalcDragBounds();

            baseLeft = parseFloat(draggableEl.style.left || '0');
            baseTop = parseFloat(draggableEl.style.top || '0');
            startPointerX = e.clientX;
            startPointerPageY = e.clientY + window.scrollY;
            targetLeft = baseLeft;
            targetTop = baseTop;
            nextTranslateX = 0;
            nextTranslateY = 0;

            isDragging = true;
            pointerId = e.pointerId;
            draggableEl.classList.add('dragging');
            draggableEl.style.willChange = 'transform';
            draggableEl.setPointerCapture(pointerId);

            moveWindow(e.clientX, e.clientY);
            e.preventDefault();
        });

        draggableEl.addEventListener('pointermove', (e) => {
            if (!isDragging || e.pointerId !== pointerId) return;
            moveWindow(e.clientX, e.clientY);
        });

        const stopDragging = (e) => {
            if (!isDragging || e.pointerId !== pointerId) return;
            isDragging = false;

            if (rafPaintId !== null) {
                cancelAnimationFrame(rafPaintId);
                rafPaintId = null;
            }

            draggableEl.style.left = `${targetLeft}px`;
            draggableEl.style.top = `${targetTop}px`;
            draggableEl.style.transform = 'none';
            draggableEl.classList.remove('dragging');
            draggableEl.style.willChange = 'auto';
            draggableEl.releasePointerCapture(pointerId);
            pointerId = null;
        };

        draggableEl.addEventListener('pointerup', stopDragging);
        draggableEl.addEventListener('pointercancel', stopDragging);

        window.addEventListener('resize', () => {
            if (!isDetached) return;
            if (isDragging) return;

            const currentLeft = parseFloat(draggableEl.style.left || '0');
            const currentTop = parseFloat(draggableEl.style.top || '0');
            recalcDragBounds();

            draggableEl.style.left = `${clamp(currentLeft, 0, maxX)}px`;
            draggableEl.style.top = `${clamp(currentTop, 0, maxY)}px`;
        });
    }

    // Apply draggable to all "div boxes"
    const draggableSelectors = [
        '.hero-image-placeholder',
        '.glass-card',
        '.project-card',
        '.service-card',
        '.resume-card',
        '.certification-card',
        '.stat-card',
        '.about-text'
    ];
    
    document.querySelectorAll(draggableSelectors.join(', ')).forEach(el => {
        makeDraggable(el);
    });

    // --- Cursor Glow + Spotlight variables ---
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cyber-cursor-glow';
    document.body.appendChild(cursorGlow);

    let glowX = window.innerWidth / 2;
    let glowY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
        glowX = e.clientX;
        glowY = e.clientY;
        document.body.style.setProperty('--mx', `${glowX}px`);
        document.body.style.setProperty('--my', `${glowY}px`);
    });

    function animateCursorGlow() {
        const currentX = parseFloat(cursorGlow.dataset.x || glowX);
        const currentY = parseFloat(cursorGlow.dataset.y || glowY);

        const nextX = currentX + (glowX - currentX) * 0.2;
        const nextY = currentY + (glowY - currentY) * 0.2;

        cursorGlow.style.left = `${nextX}px`;
        cursorGlow.style.top = `${nextY}px`;
        cursorGlow.dataset.x = String(nextX);
        cursorGlow.dataset.y = String(nextY);

        requestAnimationFrame(animateCursorGlow);
    }
    animateCursorGlow();

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
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

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- Scroll Progress + Navbar State + Header Glow Tracking ---
    const progress = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');
    const ideHeaderBar = document.querySelector('.ide-header-bar');
    const idePath = document.querySelector('.ide-path');

    function updateScrollUI() {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressWidth = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        if (progress) progress.style.width = `${progressWidth}%`;
        if (navbar) navbar.classList.toggle('scrolled', scrollTop > 20);
    }

    window.addEventListener('scroll', updateScrollUI);
    updateScrollUI();

    if (ideHeaderBar) {
        ideHeaderBar.addEventListener('mousemove', (e) => {
            const rect = ideHeaderBar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            ideHeaderBar.style.setProperty('--header-glow-x', `${x}px`);
        });

        ideHeaderBar.addEventListener('mouseleave', () => {
            ideHeaderBar.style.setProperty('--header-glow-x', '50%');
        });
    }

    if (idePath) {
        idePath.addEventListener('click', () => {
            idePath.classList.add('copied');
            setTimeout(() => idePath.classList.remove('copied'), 550);
        });
    }

    // --- Reveal on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Active Nav Highlight ---
    const navAnchors = document.querySelectorAll('.nav-links a[href]');

    function normalizePagePath(path) {
        const cleanPath = (path || '').split('?')[0].split('#')[0].trim().toLowerCase();
        if (!cleanPath || cleanPath === '/' || cleanPath.endsWith('/')) return 'index.html';
        return cleanPath.split('/').pop() || 'index.html';
    }

    function setActiveNavByPage() {
        const currentPage = normalizePagePath(window.location.pathname);

        navAnchors.forEach(link => {
            link.classList.remove('active-nav');
            const href = link.getAttribute('href') || '';
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

            const targetPage = normalizePagePath(href);
            if (targetPage === currentPage) {
                link.classList.add('active-nav');
            }
        });
    }

    setActiveNavByPage();

    // --- Heading Scramble ---
    const sectionHeadings = document.querySelectorAll('.section-title h2');
    function scrambleHeading(el) {
        const originalText = el.dataset.originalText || el.textContent;
        el.dataset.originalText = originalText;

        const chars = '01<>/{}[]$#@!*+=-';
        let frame = 0;
        const totalFrames = 18;

        const interval = setInterval(() => {
            const progress = frame / totalFrames;
            const revealCount = Math.floor(originalText.length * progress);

            const scrambled = originalText
                .split('')
                .map((ch, i) => (i < revealCount || ch === ' ') ? ch : chars[Math.floor(Math.random() * chars.length)])
                .join('');

            el.textContent = scrambled;
            frame++;

            if (frame > totalFrames) {
                clearInterval(interval);
                el.textContent = originalText;
            }
        }, 34);
    }

    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.scrambled) {
                scrambleHeading(entry.target);
                entry.target.dataset.scrambled = 'true';
            }
        });
    }, { threshold: 0.5 });

    sectionHeadings.forEach(h => headingObserver.observe(h));

    // --- Magnetic Buttons ---
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.12}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

// Tilt effect removed - all cards now share the same hover behavior

    // --- Code Rain Canvas ---
    const rainCanvas = document.getElementById('code-rain');
    if (rainCanvas) {
        const ctx = rainCanvas.getContext('2d');
        let width = rainCanvas.width = window.innerWidth;
        let height = rainCanvas.height = window.innerHeight;
        const chars = '01{}[]()<>$#@!=+-/\\';
        const fontSize = 14;
        const columns = Math.floor(width / fontSize);
        const drops = Array(columns).fill(1);

        function resizeRain() {
            width = rainCanvas.width = window.innerWidth;
            height = rainCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeRain);

        function drawRain() {
            const isLight = document.body.classList.contains('light-mode');
            ctx.fillStyle = isLight ? 'rgba(245,247,252,0.08)' : 'rgba(12,16,23,0.08)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = isLight ? 'rgba(22,163,74,0.35)' : 'rgba(103,232,168,0.35)';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            requestAnimationFrame(drawRain);
        }
        drawRain();
    }

    // --- Drag and Drop functionality & Slideshow ---
    const projectImages = {
        "1": ["projects/MVIS/1.jpg","projects/MVIS/2.jpg","projects/MVIS/3.jpg","projects/MVIS/4.jpg","projects/MVIS/5.jpg","projects/MVIS/6.jpg","projects/MVIS/7.jpg","projects/MVIS/8.jpg"],
        "2": ["projects/MEMO/1.jpg","projects/MEMO/2.jpg","projects/MEMO/3.jpg","projects/MEMO/4.jpg"],
        "3": [
            "projects/CAPSTONE/Screenshot_2026-06-13_185847.png","projects/CAPSTONE/Screenshot_2026-06-13_185853.png","projects/CAPSTONE/Screenshot_2026-06-13_185858.png",
            "projects/CAPSTONE/Screenshot_2026-06-13_185911.png","projects/CAPSTONE/Screenshot_2026-06-13_185924.png","projects/CAPSTONE/Screenshot_2026-06-13_185936.png",
            "projects/CAPSTONE/Screenshot_2026-06-13_185950.png","projects/CAPSTONE/Screenshot_2026-06-13_185957.png","projects/CAPSTONE/Screenshot_2026-06-13_190003.png",
            "projects/CAPSTONE/Screenshot_2026-06-13_190020.png","projects/CAPSTONE/Screenshot_2026-06-13_190026.png","projects/CAPSTONE/Screenshot_2026-06-13_190032.png",
            "projects/CAPSTONE/Screenshot_2026-06-13_190040.png"
        ],
        "4": [
            "projects/KIOSK/Screenshot_2026-06-13_032327.png","projects/KIOSK/Screenshot_2026-06-13_032336.png","projects/KIOSK/Screenshot_2026-06-13_032344.png",
            "projects/KIOSK/Screenshot_2026-06-13_032354.png","projects/KIOSK/Screenshot_2026-06-13_032400.png","projects/KIOSK/Screenshot_2026-06-13_032409.png",
            "projects/KIOSK/Screenshot_2026-06-13_032415.png"
        ],
        "5": ["projects/CHATBOT/Screenshot_2026-06-13_211454.png","projects/CHATBOT/Screenshot_2026-06-13_211520.png","projects/CHATBOT/Screenshot_2026-06-13_211603.png"]
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
                if (projectId && !projectImages[projectId]) projectImages[projectId] = [];

                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    const files = Array.from(e.dataTransfer.files);
                    let firstImageRendered = false;

                    files.forEach(file => {
                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();

                            reader.onload = (event) => {
                                const src = event.target.result;
                                if (projectId) projectImages[projectId].push(src);

                                if (!firstImageRendered) {
                                    let img = zone.querySelector('img');
                                    if (!img) {
                                        img = document.createElement('img');
                                        zone.appendChild(img);
                                    }
                                    img.src = projectId && projectImages[projectId].length > 0 ? projectImages[projectId][0] : src;

                                    const text = zone.querySelector('p');
                                    if (text) text.style.display = 'none';
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

    setupDragAndDrop('#profile-drop-zone');
    setupDragAndDrop('.project-img-drop');

    // --- Slideshow Modal Logic ---
    const modal = document.getElementById('slideshow-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    const modalTitle = document.getElementById('project-modal-title');
    const modalDate = document.getElementById('project-modal-date');
    const modalCopy = document.getElementById('project-modal-copy');
    const modalThumbs = document.getElementById('project-thumbs');

    let currentProjectId = null;
    let currentSlideIndex = 0;

    function renderProjectThumbs(projectId) {
        if (!modalThumbs) return;

        modalThumbs.innerHTML = '';
        const images = projectImages[projectId] || [];

        images.forEach((src, index) => {
            const thumb = document.createElement('button');
            thumb.type = 'button';
            thumb.className = `project-thumb${index === currentSlideIndex ? ' active' : ''}`;
            thumb.setAttribute('aria-label', `Open screenshot ${index + 1}`);

            const img = document.createElement('img');
            img.src = src;
            img.alt = `Project screenshot ${index + 1}`;
            thumb.appendChild(img);

            thumb.addEventListener('click', () => {
                currentSlideIndex = index;
                showSlide(currentSlideIndex);
            });

            modalThumbs.appendChild(thumb);
        });
    }

    function renderProjectDetails(projectId) {
        const card = document.querySelector(`.project-card[data-project="${projectId}"]`);
        if (!card) return;

        const title = card.querySelector('h3');
        const date = card.querySelector('.date');
        const paragraphs = card.querySelectorAll('.project-copy p');

        if (modalTitle) modalTitle.textContent = title ? title.textContent.trim() : '';
        if (modalDate) modalDate.innerHTML = date ? date.innerHTML : '';

        if (modalCopy) {
            modalCopy.innerHTML = '';
            paragraphs.forEach(paragraph => {
                const copyLine = document.createElement('p');
                copyLine.textContent = paragraph.textContent.trim();
                modalCopy.appendChild(copyLine);
            });
        }
    }

    function openProjectModal(projectId) {
        if (!modal || !projectId || !projectImages[projectId] || projectImages[projectId].length === 0) return;

        currentProjectId = projectId;
        currentSlideIndex = 0;
        renderProjectDetails(projectId);
        renderProjectThumbs(projectId);
        showSlide(currentSlideIndex);
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
    }

    function closeProjectModal() {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    function showSlide(index) {
        if (!currentProjectId || !projectImages[currentProjectId]) return;

        const images = projectImages[currentProjectId];
        if (index >= images.length) currentSlideIndex = 0;
        if (index < 0) currentSlideIndex = images.length - 1;

        modalImg.style.opacity = 0;
        setTimeout(() => {
            modalImg.src = images[currentSlideIndex];
            modalImg.style.opacity = 1;

            if (modalThumbs) {
                modalThumbs.querySelectorAll('.project-thumb').forEach((thumb, thumbIndex) => {
                    thumb.classList.toggle('active', thumbIndex === currentSlideIndex);
                });
            }
        }, 120);
    }

    document.querySelectorAll('.project-img-drop').forEach(zone => {
        zone.addEventListener('click', () => {
            const projectId = zone.getAttribute('data-project');
            openProjectModal(projectId);
        });

        zone.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectId = zone.getAttribute('data-project');
                openProjectModal(projectId);
            }
        });
    });

    document.querySelectorAll('.project-detail-trigger').forEach(button => {
        button.addEventListener('click', () => {
            openProjectModal(button.getAttribute('data-project'));
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => { closeProjectModal(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { currentSlideIndex--; showSlide(currentSlideIndex); });
    if (nextBtn) nextBtn.addEventListener('click', () => { currentSlideIndex++; showSlide(currentSlideIndex); });

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });

    window.addEventListener('keydown', (e) => {
        if (!modal || modal.style.display !== 'block') return;
        if (e.key === 'ArrowRight') { currentSlideIndex++; showSlide(currentSlideIndex); }
        else if (e.key === 'ArrowLeft') { currentSlideIndex--; showSlide(currentSlideIndex); }
        else if (e.key === 'Escape') { closeProjectModal(); }
    });

    // --- Resume Modal Functionality ---
    const downloadResumeBtn = document.getElementById('download-resume');
    const viewResumeBtn = document.getElementById('view-resume');
    const resumeModal = document.getElementById('resume-modal');
    const resumeModalClose = document.querySelector('.resume-modal-close');
    const resumeViewer = document.getElementById('resume-viewer');
    const resumeLoading = document.getElementById('resume-loading');
    const resumeError = document.getElementById('resume-error');
    const resumeMeta = document.getElementById('resume-meta');

    function setResumeUIState({ loading = false, hasError = false }) {
        if (resumeLoading) resumeLoading.style.display = loading ? 'block' : 'none';
        if (resumeError) resumeError.style.display = hasError ? 'block' : 'none';
    }

    function updateResumeMeta(text) {
        if (resumeMeta) resumeMeta.textContent = text;
    }

    function getPdfjsRuntime() {
        const runtime = window.pdfjsLib;
        if (!runtime) throw new Error('pdf.js runtime not loaded');

        if (!runtime.GlobalWorkerOptions.workerSrc) {
            runtime.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
        }

        return runtime;
    }

    function showResumeErrorDetail(detail) {
        if (!resumeError) return;

        let detailNode = resumeError.querySelector('.resume-error-detail');
        if (!detailNode) {
            detailNode = document.createElement('p');
            detailNode.className = 'resume-error-detail';
            resumeError.appendChild(detailNode);
        }

        detailNode.textContent = detail;
    }

    async function fetchResumeInfo() {
        const response = await fetch('/api/resume/info');
        if (!response.ok) throw new Error('Failed to load resume info');
        return await response.json();
    }

    async function fetchResumeArrayBuffer() {
        const response = await fetch('/api/resume/file', { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to fetch resume file');
        return await response.arrayBuffer();
    }

    async function downloadResumeThroughApi() {
        try {
            const response = await fetch('/api/resume/download');
            if (!response.ok) throw new Error('Failed to download resume');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Sigmund_Godfrey_Resume.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        } catch (error) {
            console.error('Download error:', error);
            window.location.href = '/api/resume/download';
        }
    }

    async function renderResumePreview(info, pdfData) {
        if (!resumeViewer) return;

        const runtime = getPdfjsRuntime();
        const binaryPdf = new Uint8Array(pdfData);
        let pdfDoc;

        try {
            const loadingTask = runtime.getDocument({ data: binaryPdf });
            pdfDoc = await loadingTask.promise;
        } catch (workerErr) {
            const fallbackTask = runtime.getDocument({
                data: binaryPdf,
                disableWorker: true,
            });
            pdfDoc = await fallbackTask.promise;
        }

        resumeViewer.innerHTML = `
            <div class="resume-preview-block" id="resume-pages-block">
                <div class="resume-preview-head">SESSION // FILE_RENDER</div>
                <div class="resume-pages" id="resume-pages"></div>
            </div>
        `;

        const pagesRoot = document.getElementById('resume-pages');
        if (!pagesRoot) return;

        const isMobileViewport = window.matchMedia('(max-width: 820px)').matches;
        const containerWidth = Math.max(isMobileViewport ? 260 : 320, resumeViewer.clientWidth - (isMobileViewport ? 18 : 64));
        const renderTargetWidth = isMobileViewport ? containerWidth * 2.35 : containerWidth;
        const maxRenderDpr = isMobileViewport ? 1.05 : 2;
        const dpr = Math.min(window.devicePixelRatio || 1, maxRenderDpr);

        for (let pageIndex = 1; pageIndex <= pdfDoc.numPages; pageIndex++) {
            const page = await pdfDoc.getPage(pageIndex);
            const baseViewport = page.getViewport({ scale: 1 });
            const fitScale = renderTargetWidth / baseViewport.width;
            const cssScale = isMobileViewport
                ? Math.max(1.1, Math.min(2.2, fitScale))
                : Math.min(2.4, fitScale);
            const cssViewport = page.getViewport({ scale: cssScale });

            const pageWrap = document.createElement('div');
            pageWrap.className = 'resume-page-card';

            const label = document.createElement('div');
            label.className = 'resume-page-label';
            label.textContent = `PAGE ${pageIndex}`;
            pageWrap.appendChild(label);

            const canvas = document.createElement('canvas');
            canvas.className = 'resume-page-canvas';
            canvas.width = Math.floor(cssViewport.width * dpr);
            canvas.height = Math.floor(cssViewport.height * dpr);
            canvas.style.width = `${cssViewport.width}px`;
            canvas.style.height = `${cssViewport.height}px`;

            const context = canvas.getContext('2d');
            if (!context) continue;

            await page.render({
                canvasContext: context,
                viewport: cssViewport,
                transform: [dpr, 0, 0, dpr, 0, 0],
            }).promise;

            // Yield between page renders to keep mobile UI responsive.
            await new Promise(resolve => requestAnimationFrame(resolve));

            pageWrap.appendChild(canvas);
            pagesRoot.appendChild(pageWrap);
        }
    }

    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', downloadResumeThroughApi);
    }

    if (viewResumeBtn) {
        viewResumeBtn.addEventListener('click', async () => {
            if (!resumeModal) return;

            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            if (resumeViewer) {
                resumeViewer.innerHTML = '';
                setResumeUIState({ loading: true, hasError: false });
                updateResumeMeta('Booting preview runtime...');
                showResumeErrorDetail('');

                try {
                    const [info, pdfData] = await Promise.all([fetchResumeInfo(), fetchResumeArrayBuffer()]);
                    await renderResumePreview(info, pdfData);

                    if (info && typeof info.total_pages !== 'undefined') {
                        const mobileHint = window.matchMedia('(max-width: 820px)').matches ? ' | SWIPE LEFT/RIGHT TO READ' : '';
                        updateResumeMeta(`FILE READY | PAGES ${info.total_pages} | SIZE ${info.size_mb} MB | MODE STUDIO${mobileHint}`);
                    } else {
                        updateResumeMeta('FILE READY | MODE STUDIO');
                    }

                    setResumeUIState({ loading: false, hasError: false });
                } catch (error) {
                    console.error('View error:', error);
                    const message = error && error.message ? error.message : 'Unknown render error';
                    updateResumeMeta('RENDER FAILED | Runtime error');
                    showResumeErrorDetail(`DETAIL: ${message}`);
                    setResumeUIState({ loading: false, hasError: true });
                }
            }
        });
    }

    if (resumeModalClose) {
        resumeModalClose.addEventListener('click', () => {
            if (resumeModal) resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // --- Contact Form Submission (Vercel + Resend endpoint) ---
    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-form-status');
    const contactSubmit = document.getElementById('contact-submit');
    const contactSuccessToast = document.getElementById('contact-success-toast');
    let contactToastTimer = null;

    function setContactStatus(message, type = '') {
        if (!contactStatus) return;
        contactStatus.textContent = message;
        contactStatus.classList.remove('success', 'error');
        if (type) contactStatus.classList.add(type);
    }

    function showContactSuccessToast() {
        if (!contactSuccessToast) return;

        contactSuccessToast.classList.remove('show');
        contactSuccessToast.setAttribute('aria-hidden', 'false');

        // Restart animation consistently on repeated sends.
        requestAnimationFrame(() => {
            contactSuccessToast.classList.add('show');
        });

        if (contactToastTimer) {
            clearTimeout(contactToastTimer);
        }

        contactToastTimer = setTimeout(() => {
            contactSuccessToast.setAttribute('aria-hidden', 'true');
            contactSuccessToast.classList.remove('show');
        }, 3300);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const payload = {
                name: (formData.get('name') || '').toString().trim(),
                email: (formData.get('email') || '').toString().trim(),
                subject: (formData.get('subject') || '').toString().trim(),
                message: (formData.get('message') || '').toString().trim(),
                website: (formData.get('website') || '').toString().trim(),
            };

            if (!payload.name || !payload.email || !payload.subject || !payload.message) {
                setContactStatus('Please complete all required fields before sending.', 'error');
                return;
            }

            if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
                setContactStatus('Please enter a valid email address.', 'error');
                return;
            }

            if (contactSubmit) {
                contactSubmit.disabled = true;
                contactSubmit.textContent = 'Sending...';
            }
            setContactStatus('Sending your message...');

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const result = await response.json().catch(() => ({}));

                if (!response.ok) {
                    const message = result.error || 'Unable to send message right now. Please try again later.';
                    throw new Error(message);
                }

                contactForm.reset();
                setContactStatus('Message sent successfully. Thank you for reaching out.', 'success');
                showContactSuccessToast();
            } catch (error) {
                setContactStatus(error.message || 'Failed to send message.', 'error');
            } finally {
                if (contactSubmit) {
                    contactSubmit.disabled = false;
                    contactSubmit.textContent = 'Send Message';
                }
            }
        });
    }
});
