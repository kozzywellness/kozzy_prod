console.log("Page loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".info-card");

    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
            card.style.transition = "transform 0.3s ease";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });

    const images = document.querySelectorAll('.col-md-6 img');
    let currentIndex = 0;

    if (images.length === 0) {
        console.error('No images found! Check the selector.');
        return;
    }

    function changeImage() {
        images[currentIndex].classList.remove('visible');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('visible');
    }

    setInterval(changeImage, 2000);
    images[currentIndex].classList.add('visible');
});
