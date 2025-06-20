document.addEventListener('DOMContentLoaded', function() {

    // ===== FUNGSI ANIMASI KETIK YANG BISA DIGUNAKAN KEMBALI =====
    /**
     * Membuat animasi ketik pada elemen yang ditargetkan.
     * @param {HTMLElement} element - Elemen span tempat teks akan diketik.
     * @param {string[]} words - Array berisi kata-kata yang akan ditampilkan.
     */
    function createTypingAnimation(element, words) {
        if (!element) return; // Hentikan jika elemen tidak ditemukan

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 150;
        const deletingSpeed = 100;
        const delayBetweenWords = 2000;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Proses menghapus
                element.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, deletingSpeed);
                }
            } else {
                // Proses mengetik
                element.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, delayBetweenWords);
                } else {
                    setTimeout(type, typingSpeed);
                }
            }
        }
        type(); // Mulai animasi
    }

    // --- Panggil animasi untuk setiap elemen ---

    // 1. Animasi untuk Sidebar
    const sidebarTypingElement = document.querySelector('.sidebar-typing');
    const sidebarWords = ["Web Developer", "Designer", "Freelancer"];
    createTypingAnimation(sidebarTypingElement, sidebarWords);

    // 2. Animasi untuk Konten Utama (Home)
    const mainTypingElement = document.querySelector('.main-typing');
    const mainWords = ["Web Developer", "Designer", "Freelancer"];
    createTypingAnimation(mainTypingElement, mainWords);


    // ===== NAVIGASI AKTIF SAAT SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-menu a');

    function updateActiveNav() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50; // offset
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
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Panggil saat pertama kali load
});