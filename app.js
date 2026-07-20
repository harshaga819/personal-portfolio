const menuIcon = document.querySelector('.menu-icon');
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.querySelectorAll('.nav-link');

const cardsContainer = document.querySelector(".cards-container");
const dots = document.querySelectorAll(".dot");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const cards = document.querySelectorAll(".card");

// Open and close navbar on clicking menu-icon and stop scroll
menuIcon.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : 'auto';
});

// close navbar on clicking on any nav-link
navLinks.forEach(navLink => {
    navLink.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});


let currentIndex = 0;
let autoSlideTimer = null;

// The sliding single-card carousel only applies below the 687px breakpoint
// (see the @media query in style.css). Above that, cards use a normal
// flex-wrap grid, so the transform must be cleared or it pushes every
// card off-screen.
const isCarouselMode = () => window.innerWidth < 687;

// function for updating present card on screen
const updateCardsContainer = () => {
    if (isCarouselMode()) {
        const offset = -currentIndex * (cards[0].offsetWidth + 20) + (window.innerWidth / 2 - cards[0].offsetWidth / 2);
        cardsContainer.style.transform = `translateX(${offset}px)`;
    } else {
        cardsContainer.style.transform = "none";
    }

    dots.forEach((dot, i) => {
        dot.classList.toggle("dot-active", i === currentIndex);
    });
};

// updating cards when clicking on any arrow

const nextSlide = () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCardsContainer();
};

const prevSlide = () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCardsContainer();
};

// auto-play only runs on small screens, and re-evaluates on resize
// instead of only checking window width once at load
const startAutoSlide = () => {
    stopAutoSlide();
    if (window.innerWidth < 687) {
        autoSlideTimer = setInterval(nextSlide, 4000);
    }
};

const stopAutoSlide = () => {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }
};

// any manual interaction pauses auto-play briefly so the carousel
// doesn't yank the user back mid-browse
const handleManualInteraction = (action) => {
    stopAutoSlide();
    action();
    startAutoSlide();
};

if (cardsContainer && cards.length) {
    rightArrow.addEventListener("click", () => handleManualInteraction(nextSlide));
    leftArrow.addEventListener("click", () => handleManualInteraction(prevSlide));

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => handleManualInteraction(() => {
            currentIndex = i;
            updateCardsContainer();
        }));
    });

    window.addEventListener("resize", () => {
        updateCardsContainer();
        startAutoSlide();
    });

    updateCardsContainer();
    startAutoSlide();
}

// Reset the contact form after submit, without relying on the broken
// inline onsubmit="clearForm" attribute (it never invoked the function)
const form = document.getElementById("contact-form");
if (form) {
    form.addEventListener("submit", () => {
        // small delay so Formspree receives the values before we clear them
        setTimeout(() => form.reset(), 100);
    });
}

// Check if the user has returned from Formspree thank you page
window.addEventListener('load', () => {
    if (window.location.search.indexOf('sent=true') !== -1) {
        window.location.reload();
    }
});

// Scroll-reveal effect for the light theme: fades/slides sections into
// view the first time they enter the viewport
const revealTargets = document.querySelectorAll(
    '.about, .skills, .projects, .education, .contact'
);
revealTargets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));
} else {
    // fallback: no IntersectionObserver support, just show everything
    revealTargets.forEach(el => el.classList.add('in-view'));
}
