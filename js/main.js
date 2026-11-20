
document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================
       CONFIGURATION DU MARIAGE
    ========================================= */

    const wedding = {
        names: "René Bandu & Chanceline Birindwa",
        date: "2026-12-18T08:00:00+02:00",
        location: "Lubumbashi, République démocratique du Congo",
        churchMap: "https://maps.app.goo.gl/yMhW2vNsf1u3TgMKA?g_st=aw",
        receptionMap: "https://maps.app.goo.gl/j8GMxYunL38YswAA8",
        contacts: [
            "+243993185831",
            "+243994503771"
        ]
    };

    /* =========================================
       1. ANIMATIONS AU DÉFILEMENT
    ========================================= */

    const animatedElements = document.querySelectorAll(
        ".section-header, .programme-card, .dresscode-card, " +
        ".gallery-item, .countdown-item, .invitation-card, " +
        ".reception-card, .contact-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-revealed");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        });

        animatedElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(element => {
            element.classList.add("is-revealed");
        });
    }

    /* =========================================
       2. NAVIGATION FLUIDE
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    /* =========================================
       3. BOUTON RETOUR EN HAUT
    ========================================= */

    const backToTop = document.createElement("button");

    backToTop.type = "button";
    backToTop.className = "back-to-top";
    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    backToTop.setAttribute("aria-label", "Retour en haut");

    document.body.appendChild(backToTop);

    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("is-visible", window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    /* =========================================
       4. BOUTON WHATSAPP
    ========================================= */

    const whatsappButton = document.createElement("a");

    const whatsappMessage = encodeURIComponent(
        "Bonjour, je souhaite obtenir des informations concernant le mariage de René & Chanceline du 18 décembre 2026."
    );

    whatsappButton.href =
        `https://wa.me/${wedding.contacts[0].replace(/\D/g, "")}?text=${whatsappMessage}`;

    whatsappButton.target = "_blank";
    whatsappButton.rel = "noopener noreferrer";
    whatsappButton.className = "whatsapp-floating";
    whatsappButton.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
    whatsappButton.setAttribute("aria-label", "Contacter les mariés sur WhatsApp");

    document.body.appendChild(whatsappButton);

    /* =========================================
       5. PARTAGE DE L'INVITATION
    ========================================= */

    const shareButton = document.getElementById("shareInvitation");

    if (shareButton) {
        shareButton.addEventListener("click", async () => {
            const shareData = {
                title: wedding.names,
                text: "Découvrez l'invitation au mariage de René & Chanceline, le 18 décembre 2026.",
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(window.location.href);
                    alert("Le lien de l'invitation a été copié !");
                } else {
                    window.prompt("Copiez le lien de l'invitation :", window.location.href);
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Erreur de partage :", error);
                }
            }
        });
    }

    /* =========================================
       6. AJOUTER AU CALENDRIER
    ========================================= */

    const calendarButton = document.getElementById("addToCalendar");

    if (calendarButton) {
        calendarButton.addEventListener("click", () => {
            const start = "20261218T060000Z";
            const end = "20261218T170000Z";

            const eventDetails = [
                "BEGIN:VCALENDAR",
                "VERSION:2.0",
                "PRODID:-//Invitation Rene Chanceline//FR",
                "CALSCALE:GREGORIAN",
                "BEGIN:VEVENT",
                `UID:rene-chanceline-${Date.now()}@invitation`,
                `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
                `DTSTART:${start}`,
                `DTEND:${end}`,
                "SUMMARY:Mariage de René & Chanceline",
                "LOCATION:Lubumbashi, RDC",
                "DESCRIPTION:Mariage civil, religieux et soirée festive.",
                "END:VEVENT",
                "END:VCALENDAR"
            ].join("\r\n");

            const blob = new Blob([eventDetails], {
                type: "text/calendar;charset=utf-8"
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "mariage-rene-chanceline.ics";

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(url);
        });
    }

    /* =========================================
       7. BOUTONS GOOGLE MAPS
    ========================================= */

    document.querySelectorAll("[data-map]").forEach(button => {
        button.addEventListener("click", () => {
            const destination = button.dataset.map;

            if (destination === "church") {
                window.open(wedding.churchMap, "_blank", "noopener,noreferrer");
            }

            if (destination === "reception") {
                window.open(wedding.receptionMap, "_blank", "noopener,noreferrer");
            }
        });
    });

    /* =========================================
       8. ANNEE AUTOMATIQUE DU FOOTER
    ========================================= */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* =========================================
       9. PROTECTION DES LIENS EXTERNES
    ========================================= */

    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.rel = "noopener noreferrer";
    });

    /* =========================================
       10. DETECTION DES IMAGES MANQUANTES
    ========================================= */

    document.querySelectorAll("img").forEach(image => {
        image.addEventListener("error", () => {
            console.error("Image introuvable :", image.src);
            image.classList.add("image-error");
        });
    });

    console.log("Invitation René & Chanceline : initialisation terminée.");
});
