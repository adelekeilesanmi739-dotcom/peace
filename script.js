function sayHello() {
    alert("Hello! Thanks for visiting my website.");
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    document.getElementById("formMessage").innerHTML =
        "Thank you! Your message has been received.";
});

function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const words = [
    "Web Developer",
    "Data Analyst",
    "Creative Designer",
    "Content Writer"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {

    const typingText = document.getElementById("typingText");

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, letterIndex + 1);

        letterIndex++;

        if (letterIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, letterIndex - 1);

        letterIndex--;

        if (letterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const response = await fetch("http://localhost:3000/contact", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email,
            message
        })
    });

    const data = await response.json();

    alert(data.message);
});

fetch("http://localhost:3000")
    .then(response => response.text())
    .then(data => {
        console.log(data);
    });
