
document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("weddingMusic");
    const musicToggle = document.getElementById("musicToggle");

    if (!music || !musicToggle) {
        console.error("Lecteur audio ou bouton musique introuvable.");
        return;
    }

    let isPlaying = false;

    function updateButton() {
        musicToggle.classList.toggle("is-playing", isPlaying);
        musicToggle.setAttribute("aria-label",
            isPlaying ? "Désactiver la musique" : "Activer la musique"
        );

        musicToggle.innerHTML = isPlaying
            ? '<i class="fa-solid fa-volume-high"></i>'
            : '<i class="fa-solid fa-volume-xmark"></i>';
    }

    musicToggle.addEventListener("click", async () => {
        if (!isPlaying) {
            try {
                await music.play();
                isPlaying = true;
            } catch (error) {
                console.error("Lecture audio impossible :", error);
                isPlaying = false;
            }
        } else {
            music.pause();
            isPlaying = false;
        }

        updateButton();
    });

    music.addEventListener("ended", () => {
        isPlaying = false;
        updateButton();
    });

    updateButton();
});
