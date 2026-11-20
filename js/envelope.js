
document.addEventListener("DOMContentLoaded", () => {
    const openButton = document.getElementById("openButton");
    const envelope = document.querySelector(".envelope");
    const envelopeScreen = document.getElementById("envelopeScreen");
    const mainContent = document.getElementById("mainContent");

    if (!openButton || !envelope || !envelopeScreen || !mainContent) {
        console.error("Un élément de l'enveloppe est introuvable.");
        return;
    }

    openButton.addEventListener("click", () => {
        openButton.disabled = true;

        envelope.classList.add("is-opening");

        setTimeout(() => {
            envelopeScreen.classList.add("is-closing");
            mainContent.classList.add("is-visible");

            setTimeout(() => {
                envelopeScreen.style.display = "none";
            }, 1000);

        }, 1500);
    });
});
