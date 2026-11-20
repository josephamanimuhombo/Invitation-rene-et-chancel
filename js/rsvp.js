
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rsvpForm");
    const feedback = document.getElementById("formFeedback");
    const submitButton = document.getElementById("rsvpSubmit");

    if (!form || !feedback || !submitButton) {
        console.error("Le formulaire RSVP ou ses éléments sont introuvables.");
        return;
    }

    // Adresse de déploiement Google Apps Script
    const scriptURL = "https://script.google.com/macros/s/AKfycbw2TSaJDUdEenOnMw3ipxdtaZf_kjkoM6bbbI9Ic8h43zzo_S6br_juBy8la3srwiRHEg/exec";

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nom = form.querySelector('[name="nom"]').value.trim();
        const telephone = form.querySelector('[name="telephone"]').value.trim();
        const personnes = Number(form.querySelector('[name="personnes"]').value);
        const statut = form.querySelector('[name="statut"]').value;
        const message = form.querySelector('[name="message"]').value.trim();

        if (!nom || !telephone || !statut || !Number.isInteger(personnes) || personnes < 1 || personnes > 20) {
            feedback.textContent = "Veuillez vérifier les informations obligatoires.";
            feedback.className = "form-feedback error";
            return;
        }

        const formData = new URLSearchParams();
        formData.append("nom", nom);
        formData.append("telephone", telephone);
        formData.append("personnes", personnes);
        formData.append("statut", statut);
        formData.append("message", message);

        submitButton.disabled = true;
        submitButton.textContent = "ENVOI EN COURS...";
        feedback.textContent = "";

        try {
            await fetch(scriptURL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                body: formData.toString()
            });

            feedback.textContent =
                "Votre demande a été transmise. Merci pour votre réponse !";
            feedback.className = "form-feedback success";

            form.reset();

        } catch (error) {
            console.error("Erreur lors de l'envoi RSVP :", error);

            feedback.textContent =
                "Impossible de transmettre votre réponse. Veuillez réessayer.";
            feedback.className = "form-feedback error";

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "CONFIRMER MA PRÉSENCE";
        }
    });
});
