// Dark mode functionality
function initDarkMode() {
    const darkModeToggle = document.createElement('div');
    darkModeToggle.innerHTML = `
        <div id="dark-mode-toggle" class="position-fixed" style="top: 20px; right: 20px; cursor: pointer; z-index: 1000;">
            <i class="fas fa-moon"></i>
        </div>
    `;
    document.body.appendChild(darkModeToggle);

    const toggle = document.getElementById('dark-mode-toggle');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = toggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
}

// Skill bars animation
function initSkillBars() {
    const skills = document.querySelectorAll('.skill-bar');
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.progress-bar');
                const percentage = bar.getAttribute('data-percentage');
                bar.style.width = percentage + '%';
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5
    });

    skills.forEach(skill => observer.observe(skill));
}

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.createElement('div');
    scrollBtn.innerHTML = `
        <div id="scroll-to-top" class="position-fixed" style="bottom: 20px; right: 20px; cursor: pointer; display: none; z-index: 1000;">
            <i class="fas fa-arrow-up"></i>
        </div>
    `;
    document.body.appendChild(scrollBtn);

    const btn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project cards hover effect
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initSkillBars();
    initScrollToTop();
    initProjectCards();
});
