// home section changing word
const words = ["Frontend-oriented Fullstack Developer", "Frontend Specialist", "Fullstack Developer", "Software Development", "Tailwind Fan", "Creative Coder", "Next.js Lover"];
let index = 0;
const wordSpan = document.getElementById("changing-word");
function changeWord() {
    index = (index + 1) % words.length;
    wordSpan.style.animation = "none";
    void wordSpan.offsetWidth;
    wordSpan.style.animation = "slideUp 2s ease forwards";

    wordSpan.textContent = words[index];
}
setInterval(changeWord, 3000);

// hamburger menu for mobile
document.querySelector('.hamburger-icon').addEventListener('click', function () {
    document.querySelector('.hamburger-menu').classList.add("hamburger-menu-visible");
});
document.querySelector('.x-button').addEventListener('click', function () {
    document.querySelector('.hamburger-menu').classList.remove("hamburger-menu-visible");
});

// animate sections
const sections = document.querySelectorAll('.animate-section');
const translateLeftSection = document.querySelectorAll('.animate-section-translateLeft');
const translateRightSection = document.querySelectorAll('.animate-section-translateRight');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.4
});

sections.forEach(section => {
    observer.observe(section);
});
translateLeftSection.forEach(section => {
    observer.observe(section);
});
translateRightSection.forEach(section => {
    observer.observe(section);
});