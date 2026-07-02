document.addEventListener("DOMContentLoaded", () => {

    // 1. Λειτουργικότητα Μενού (Tabs)
    const tabs = document.querySelectorAll('.tab-btn');
    const groups = document.querySelectorAll('.menu-group');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Αφαίρεση του active state από όλα τα κουμπιά
            tabs.forEach(t => t.classList.remove('active'));
            // Προσθήκη του active στο κουμπί που πατήθηκε
            tab.classList.add('active');

            // Απόκρυψη όλων των κατηγοριών
            const target = tab.getAttribute('data-target');
            groups.forEach(group => {
                group.classList.remove('show');
                if (group.classList.contains(target)) {
                    group.classList.add('show');
                }
            });
        });
    });

    // 2. Εναλλαγή Γλώσσας (GR / EN)
    const langToggleBtn = document.getElementById('lang-toggle');

    langToggleBtn.addEventListener('click', () => {
        // Η κλάση 'lang-en' στο body ελέγχει μέσω CSS ποια text (el/en) θα εμφανίζονται
        document.body.classList.toggle('lang-en');

        // Αλλαγή του κειμένου στο κουμπί
        if (document.body.classList.contains('lang-en')) {
            langToggleBtn.innerHTML = '🇬🇷 GR';
        } else {
            langToggleBtn.innerHTML = '🇬🇧 EN';
        }
    });

    // 3. Εφέ Εμφάνισης με το Scroll (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Εμφανίζεται όταν το 15% του στοιχείου μπει στην οθόνη
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Προαιρετικά: Σταματάμε να το παρακολουθούμε αφού εμφανιστεί μία φορά
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 4. Ομαλό Σκρολάρισμα (Smooth Scroll) για τα links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});
// --- Carousel Logic ---
let slideIndex = 0;
let slideInterval;

function showSlides(n) {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");

    if (!slides.length) return;

    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");
}

function moveSlide(n) {
    slideIndex += n;
    showSlides(slideIndex);
    resetInterval();
}

function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
    resetInterval();
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => { moveSlide(1); }, 4000); // Αλλάζει κάθε 4 δευτερόλεπτα
}

// Εκκίνηση του Slider μόλις φορτώσει η σελίδα
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('.carousel-slide')) {
        showSlides(slideIndex);
        slideInterval = setInterval(() => { moveSlide(1); }, 4000);
    }
});