function toggleMenu() {
    const navbar = document.getElementById("navbar");
    navbar.style.display = (navbar.style.display === "flex") ? "none" : "flex";
}

// Typing Animation with different speeds
const headingText = "Welcome to EASY WORLD";
const paraText = "Learn, Grow, and Succeed with our immersive learning experience";

let i = 0, j = 0;
const headingSpeed = 100; // heading typing speed
const paraSpeed = 30;     // paragraph typing speed

function typeHeading() {
    if (i < headingText.length) {
        document.getElementById("typing-text").innerHTML += headingText.charAt(i);
        i++;
        setTimeout(typeHeading, headingSpeed);
    }
}

function typePara() {
    if (j < paraText.length) {
        document.getElementById("typing-para").innerHTML += paraText.charAt(j);
        j++;
        setTimeout(typePara, paraSpeed);
    }
}

window.onload = function () {
    typeHeading();
    typePara();
};