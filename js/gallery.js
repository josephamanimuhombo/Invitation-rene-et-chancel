
document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");

    if (!gallery) {
        console.error("La section galerie est introuvable.");
        return;
    }

    const images = gallery.querySelectorAll("img");

    if (!images.length) {
        console.warn("Aucune photo trouvée dans la galerie.");
        return;
    }

    // Création de la fenêtre d'agrandissement
    const lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";
    lightbox.setAttribute("aria-hidden", "true");

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Fermer">&times;</button>
        <button class="lightbox-prev" aria-label="Photo précédente">&#10094;</button>
        <img class="lightbox-image" src="" alt="Photo des mariés">
        <button class="lightbox-next" aria-label="Photo suivante">&#10095;</button>
        <p class="lightbox-counter"></p>
    `;

    document.body.appendChild(lightbox);

    const largeImage = lightbox.querySelector(".lightbox-image");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const prevButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");
    const counter = lightbox.querySelector(".lightbox-counter");

    const photoList = Array.from(images);
    let currentIndex = 0;

    function showImage(index) {
        currentIndex = (index + photoList.length) % photoList.length;

        const selectedImage = photoList[currentIndex];

        largeImage.src = selectedImage.src;
        largeImage.alt = selectedImage.alt || "Photo des mariés";
        counter.textContent = `${currentIndex + 1} / ${photoList.length}`;
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add("is-active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("is-active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    images.forEach((image, index) => {
        image.style.cursor = "zoom-in";

        image.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    prevButton.addEventListener("click", () => {
        showImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("is-active")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") showImage(currentIndex + 1);
        if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    });
});
