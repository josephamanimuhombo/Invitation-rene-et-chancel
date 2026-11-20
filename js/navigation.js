
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (!menuToggle || !mainNav) {
        console.error("Menu de navigation introuvable.");
        return;
    }

    function closeMenu() {
        mainNav.classList.remove("is-open");
        menuToggle.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("is-open");

        menuToggle.classList.toggle("is-active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (
            mainNav.classList.contains("is-open") &&
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });
});
