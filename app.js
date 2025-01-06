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

// function for updating present card on screen 
const updateCardsContainer = () => {
    const offset = -currentIndex * (cards[0].offsetWidth + 20) + (window.innerWidth / 2 - cards[0].offsetWidth / 2);
    cardsContainer.style.transform = `translateX(${offset}px)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
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

rightArrow.addEventListener("click", nextSlide);

leftArrow.addEventListener("click", prevSlide);

// updating dots acc. to cards
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        currentIndex = i;
        updateCardsContainer();
    });
});

// checking screen width
let w = window.innerWidth;

// scrolling cards infinite time only if screen size is less then 687 px
if(w<687){
    setInterval(nextSlide, 4000);
}

// Reseting the form fields

let form = document.getElementById("contact-form");
let submit =document.querySelectorAll(".form-button");

function clearForm() {
    form.reset();
}

submit.addEventListener('click', clearForm);

        // Check if the user has returned from Formspree thank you page
        window.onload = function () {
            // This will refresh the page only when the page is loaded after the form submission
            if (window.location.search.indexOf('sent=true') !== -1) {
                // Refresh the page to clear form data
                window.location.reload();
            }
        };