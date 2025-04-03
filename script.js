document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav-content');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        nav.insertBefore(menuButton, nav.firstChild);
        
        menuButton.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('show');
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

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
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

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        observer.observe(item);
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        observer.observe(category);
    });

    // Observe certification items
    document.querySelectorAll('.certification-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        observer.observe(item);
    });

    // Navigation menu button functionality
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.classList.add('menu-button');
    
    const nav = document.querySelector('.nav-links');
    nav.insertBefore(menuButton, nav.firstChild);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Courses dropdown functionality
    const coursesBtn = document.querySelector('.courses-dropdown-btn');
    const coursesContent = document.querySelector('.courses-dropdown-content');
    
    // Initially hide the courses content
    coursesContent.style.display = 'none';
    coursesContent.style.opacity = '0';
    coursesContent.style.transform = 'translateY(-10px)';
    
    // Set initial button text
    coursesBtn.textContent = 'View BTM Courses';
    
    coursesBtn.addEventListener('click', () => {
        const isHidden = coursesContent.style.display === 'none';
        
        if (isHidden) {
            coursesContent.style.display = 'block';
            coursesBtn.classList.add('active');
            // Use setTimeout to ensure the transition happens after display is set to block
            setTimeout(() => {
                coursesContent.style.opacity = '1';
                coursesContent.style.transform = 'translateY(0)';
            }, 10);
        } else {
            coursesContent.style.opacity = '0';
            coursesContent.style.transform = 'translateY(-10px)';
            coursesBtn.classList.remove('active');
            // Wait for transition to complete before hiding
            setTimeout(() => {
                coursesContent.style.display = 'none';
            }, 300);
        }
    });
}); 