// Add downloadFile function at the top of the file
function downloadFile(filename) {
    const link = document.createElement('a');
    link.href = filename;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Smoother scroll with easing
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Add active class to clicked link
            navLinks.forEach(navLink => navLink.classList.remove('active-link'));
            this.classList.add('active-link');
        });
    });

    // Navbar background change on scroll with smoother transition
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        navbar.style.transform = 'translateY(0)';
        
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--bg-gradient)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'var(--bg-gradient)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle with smoother animation
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav-content');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        nav.insertBefore(menuButton, nav.firstChild);
        
        menuButton.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('show');
            
            // Add animation to button
            menuButton.classList.toggle('active');
            
            // Toggle between hamburger and X icon
            if (menuButton.classList.contains('active')) {
                menuButton.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };

    // Initialize mobile menu if screen width is small
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Update mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                createMobileMenu();
            }
        } else {
            const menuButton = document.querySelector('.mobile-menu-btn');
            if (menuButton) {
                menuButton.remove();
            }
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.remove('show');
        }
    });

    // Enhanced active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Enhanced animations for elements on scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to various elements
    document.querySelectorAll('.timeline-item, .skill-category, .certification-item, .education-item, .course-box, .courses-dropdown-btn').forEach(item => {
        observer.observe(item);
    });

    // Courses dropdown functionality with smoother transitions
    const coursesBtn = document.querySelector('.courses-dropdown-btn');
    const courseGrid = document.querySelector('.course-grid');
    
    // Initially hide the courses
    courseGrid.classList.remove('show');
    
    // Set initial button text and icon
    coursesBtn.innerHTML = 'View BTM Courses <i class="fas fa-chevron-down"></i>';
    
    coursesBtn.addEventListener('click', () => {
        // Toggle grid visibility
        courseGrid.classList.toggle('show');
        
        // Update button text and icon based on visibility state
        if (courseGrid.classList.contains('show')) {
            coursesBtn.innerHTML = 'Hide BTM Courses <i class="fas fa-chevron-up"></i>';
        } else {
            coursesBtn.innerHTML = 'View BTM Courses <i class="fas fa-chevron-down"></i>';
        }
        
        // Toggle active state for button styling
        coursesBtn.classList.toggle('active');
    });

    // Timeline "See More" functionality with enhanced animations
    const seeMoreLinks = document.querySelectorAll('.see-more-link');
    
    // Store original dot positions
    const originalDotPositions = {};
    document.querySelectorAll('.timeline-dot').forEach((dot, index) => {
        originalDotPositions[index] = dot.style.top;
    });

    seeMoreLinks.forEach(link => {
        link.textContent = 'See More';
        link.innerHTML = 'See More <i class="fas fa-chevron-down"></i>';
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const details = link.nextElementSibling;
            const isExpanded = details.classList.contains('show');
            const timelineItem = link.closest('.timeline-item');
            const allTimelineItems = document.querySelectorAll('.timeline-item');
            const currentIndex = Array.from(allTimelineItems).indexOf(timelineItem);
            
            // Close all other open details
            document.querySelectorAll('.timeline-details.show').forEach(openDetail => {
                if (openDetail !== details) {
                    openDetail.classList.remove('show');
                    openDetail.previousElementSibling.classList.remove('active');
                    openDetail.previousElementSibling.innerHTML = 'See More <i class="fas fa-chevron-down"></i>';
                }
            });
            
            // Toggle the current details
            details.classList.toggle('show');
            
            // Update link text without changing color
            setTimeout(() => {
                link.innerHTML = isExpanded ? 'See More <i class="fas fa-chevron-down"></i>' : 'See Less <i class="fas fa-chevron-up"></i>';
            }, 200);

            // Update dot positions
            setTimeout(() => {
                updateDotPositions(currentIndex, !isExpanded);
            }, 50);
        });
    });

    function updateDotPositions(clickedIndex, isExpanding) {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const dots = document.querySelectorAll('.timeline-dot');
        const basePositions = [170, 545, 920, 1295]; // Base centered positions
        
        // Update all dots after the clicked item
        for (let i = clickedIndex + 1; i < dots.length; i++) {
            const dot = dots[i];
            const timelineItem = timelineItems[i];
            const timelineContent = timelineItem.querySelector('.timeline-content');
            const details = timelineItem.querySelector('.timeline-details');
            
            // Calculate total offset from expanded items above
            let totalOffset = 0;
            for (let j = 0; j < i; j++) {
                const prevDetails = timelineItems[j].querySelector('.timeline-details');
                if (prevDetails && prevDetails.classList.contains('show')) {
                    totalOffset += prevDetails.offsetHeight;
                }
            }
            
            // Set new position to maintain centering
            const newPosition = basePositions[i] + totalOffset;
            dot.style.top = `${newPosition}px`;
        }
    }

    // Skills show more functionality
    const showMoreBtns = document.querySelectorAll('.show-more-btn');
    
    showMoreBtns.forEach((btn, index) => {
        const skillList = btn.previousElementSibling;
        const skills = skillList.querySelectorAll('li');
        // Show more initial skills for Technical Skills (first category)
        const initialDisplay = index === 0 ? 9 : 6; // 9 for Technical Skills, 6 for others
        
        // Hide skills beyond initial display
        skills.forEach((skill, idx) => {
            if (idx >= initialDisplay) {
                skill.style.display = 'none';
            }
        });
        
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('data-expanded') === 'true';
            
            skills.forEach((skill, idx) => {
                if (idx >= initialDisplay) {
                    skill.style.display = isExpanded ? 'none' : 'inline-block';
                }
            });
            
            btn.innerHTML = isExpanded ? 
                'Show More <i class="fas fa-chevron-down"></i>' : 
                'Show Less <i class="fas fa-chevron-up"></i>';
            
            btn.setAttribute('data-expanded', !isExpanded);
        });
    });

    // Function to handle project show more buttons
    function initializeProjectShowMore() {
        const projectShowMoreBtns = document.querySelectorAll('.project-card .show-more-btn');

        projectShowMoreBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const details = btn.nextElementSibling;
                const isExpanded = details.classList.contains('show');
                
                // Close all other open details
                document.querySelectorAll('.project-details.show').forEach(openDetail => {
                    if (openDetail !== details) {
                        openDetail.classList.remove('show');
                        openDetail.previousElementSibling.innerHTML = 'Show More <i class="fas fa-chevron-down"></i>';
                        openDetail.previousElementSibling.setAttribute('data-expanded', 'false');
                    }
                });
                
                // Toggle current details
                details.classList.toggle('show');
                btn.innerHTML = isExpanded ? 
                    'Show More <i class="fas fa-chevron-down"></i>' : 
                    'Show Less <i class="fas fa-chevron-up"></i>';
                btn.setAttribute('data-expanded', !isExpanded);
            });
        });
    }

    // Initialize project show more functionality
    initializeProjectShowMore();

    // Form handling
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('formMessage');
    const submitButton = form.querySelector('.submit-btn');
    const spinner = submitButton.querySelector('.spinner');

    if (form) {
        // Hide spinner initially
        spinner.style.display = 'none';
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show spinner and disable button
            submitButton.disabled = true;
            spinner.style.display = 'inline-block';
            formMessage.style.display = 'none';
            
            // Get form data
            const formData = new FormData(form);
            
            // Submit form using fetch
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                // Show success message
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                form.reset();
            })
            .catch(error => {
                // Show error message
                formMessage.textContent = 'Oops! There was a problem sending your message. Please try again.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            })
            .finally(() => {
                // Reset button and spinner
                submitButton.disabled = false;
                spinner.style.display = 'none';
            });
        });
    }
}); 