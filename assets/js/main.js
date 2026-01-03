    document.addEventListener('DOMContentLoaded', () => {
        console.log('main.js loaded and DOMContentLoaded event fired.');



    
        // Load Core Skills into 3D Carousel
        const hardcodedSkills = {
            "skills": [
                "XSS\nSQLi\nCSRF",
                "File Upload\nLFI / RFI\nCmd Injection",
                "Auth Bypass\nIDOR\nBiz Logic",
                "SSRF\nPost-Exploit\nCVE",
                "Recon\nExploit\nReporting",
                "Linux\nWindows\nNetworking",
                "Bug Bounty\nCTF\nVuln Research",
                "Port Scan\nService Enum\nTraffic Analysis",
                "Python\nBash\nAutomation",
                "Recon\nScanning\nEnumeration"
            ]
        };

        const carouselContainer = document.getElementById('core-skills-carousel-container');
        if (carouselContainer) {
            // Flatten skills into a single array
            const allSkills = Object.values(hardcodedSkills).flat();
            const quantity = allSkills.length;

            // Create carousel structure
            const wrapper = document.createElement('div');
            wrapper.className = 'wrapper';

            const inner = document.createElement('div');
            inner.className = 'inner';
            inner.style.setProperty('--quantity', quantity);

            // Create and append cards
            allSkills.forEach((skill, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.setProperty('--index', index);

                const img = document.createElement('div');
                img.className = 'img';

                const label = document.createElement('div');
                label.className = 'label';
                label.innerHTML = skill.replace(/\\n/g, '<br>'); // Set the skill name as the text for the label, handling newlines

                card.appendChild(img);
                card.appendChild(label); // Add the new label div
                inner.appendChild(card);
            });

            wrapper.appendChild(inner);
            carouselContainer.appendChild(wrapper);
        }

        // Load Tools (Hardcoded for GitHub Pages)
        const hardcodedTools = [
            "Burp Suite", "Nmap", "Wireshark", "Metasploit", "John the Ripper",
            "Netcat", "OpenVAS", "Hydra", "Kali Linux", "Python", "Linux", "WordPress"
        ];

        const toolsContainer = document.getElementById('tools-container');
        if (toolsContainer) {
            toolsContainer.innerHTML = ''; // Clear existing content
            const toolMap = {
                'Burp Suite': 'Burp Suite',
                'Nmap': 'Nmap',
                'Wireshark': 'Wireshark',
                'Metasploit': 'Meta Sploit',
                'John the Ripper': 'John the Ripper',
                'Netcat': 'Netcat',
                'OpenVAS': 'OpenVAS',
                'Hydra': 'Hydra',
                'Kali Linux': 'KALI LINUX',
                'Python': 'PYTHON',
                'Linux': 'LINUX',
                'WordPress': 'WordPress'
            };
            
            const quantity = hardcodedTools.length; // Get quantity of tools

            // Create carousel structure
            const wrapper = document.createElement('div');
            wrapper.className = 'wrapper';

            const inner = document.createElement('div');
            inner.className = 'inner';
            inner.style.setProperty('--quantity', quantity);

            hardcodedTools.forEach((toolName, index) => { // Add index
                const toolCard = document.createElement('div');
                toolCard.classList.add('tool-card');
                toolCard.style.setProperty('--index', index); // Set index

                const logo = document.createElement('img');
                const imageFileName = toolMap[toolName]; // Use toolMap
                
                logo.src = `assets/images/tools/Tools/${imageFileName}.png`;
                logo.alt = toolName;
                
                // Add error handling for images not found
                logo.onerror = function() {
                    this.style.display = 'none'; // Hide image if not found
                    console.error(`Image not found for ${toolName}: ${this.src}`);
                };

                const name = document.createElement('p');
                name.textContent = toolName;

                toolCard.appendChild(logo);
                toolCard.appendChild(name);
                inner.appendChild(toolCard); // Append to inner
            });
            wrapper.appendChild(inner);
            toolsContainer.appendChild(wrapper); // Append wrapper to toolsContainer
        }
        // Stats count-up animation
        const statsContainer = document.querySelector('.cyber-stats-line');
        const counters = document.querySelectorAll('.cyber-stat-value');
        
        const startCountUp = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                let duration = 4000; // Default duration

                // Set specific duration based on the target value
                if (target === 1) {
                    duration = 1000; // 1 second
                } else if (target === 10) {
                    duration = 3000; // 3 seconds
                } else if (target === 300) {
                    duration = 5500; // 5.5 seconds
                }

                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const currentValue = Math.floor(progress * target);
                    
                    // Add suffix during the animation itself
                    counter.innerText = currentValue + suffix;

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };

                // Reset text to 0 with suffix before starting
                counter.innerText = '0' + suffix;
                window.requestAnimationFrame(step);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start the animation when the element is in view
                    startCountUp();
                } else {
                    // Reset the counters to 0 when the element is out of view
                    counters.forEach(counter => {
                        counter.innerText = '0';
                    });
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

        if (statsContainer) {
            observer.observe(statsContainer);
        }

    // ==========================================
    //  NEW HEADER & NAVIGATION LOGIC
    // ==========================================
    
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const desktopNavLinks = document.querySelectorAll('.nav-link'); 
    const sections = document.querySelectorAll('section');

    // 1. Mobile Menu Toggle
    function toggleMobileMenu() {
        if (!hamburgerBtn || !mobileMenuOverlay) return;
        
        const isActive = mobileMenuOverlay.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            // Open Menu
            mobileMenuOverlay.style.display = 'flex';
            // Force reflow or small delay for transition
            setTimeout(() => {
                hamburgerBtn.classList.add('active');
                mobileMenuOverlay.classList.add('active');
                // document.body.style.overflow = 'hidden'; // Removed to allow scrolling
            }, 10);
        }
    }

    function closeMobileMenu() {
        if (!hamburgerBtn || !mobileMenuOverlay) return;
        
        hamburgerBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        // document.body.style.overflow = ''; // Removed to allow scrolling
        
        // Wait for transition to finish before hiding display
        setTimeout(() => {
            if (!mobileMenuOverlay.classList.contains('active')) {
                mobileMenuOverlay.style.display = 'none';
            }
        }, 400); // Matches transition duration
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling
            toggleMobileMenu();
        });
    }

    // Close when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close when clicking outside the box (document listener)
    document.addEventListener('click', (e) => {
        // Only run if menu is active
        if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            const menuBox = mobileMenuOverlay.querySelector('.mobile-menu-box');
            
            // If the click is NOT inside the menu box AND NOT on the hamburger button
            if (menuBox && !menuBox.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    // 2. Scroll Spy (Highlight Active Link)
    function highlightActiveSection() {
        let scrollY = window.scrollY;
        
        // Offset for fixed header
        const offset = 120; 

        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollY + offset >= sectionTop && scrollY + offset < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Edge case: Top of page -> Home
        if (scrollY < 50) {
            currentSectionId = 'home';
        }

        // Update Desktop Links
        desktopNavLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Update Mobile Links
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Run on scroll
    window.addEventListener('scroll', highlightActiveSection);
    // Run initially
    highlightActiveSection();

});
