document.addEventListener('DOMContentLoaded', function() {

    // ===== FUNGSI ANIMASI KETIK =====
    function createTypingAnimation(element, words) {
        if (!element || words.length === 0) return;
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const type = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                element.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, 100);
                }
            } else {
                element.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, 2000);
                } else {
                    setTimeout(type, 150);
                }
            }
        };
        type();
    }

    const typingWords = ["Web Developer", "Designer", "Freelancer"];
    createTypingAnimation(document.querySelector('.sidebar-typing'), typingWords);
    createTypingAnimation(document.querySelector('.main-typing'), typingWords);

    // ===== NAVIGASI AKTIF SAAT SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-menu a');
    const updateActiveNav = () => {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ===== MENU TOGGLE MOBILE =====
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                }
            });
        });
        document.addEventListener('click', (event) => {
            if (sidebar.classList.contains('open') && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                 sidebar.classList.remove('open');
            }
        });
    }
});
