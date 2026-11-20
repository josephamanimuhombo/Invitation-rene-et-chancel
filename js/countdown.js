
document.addEventListener("DOMContentLoaded", () => {
    const weddingDate = new Date("2026-12-18T08:00:00+02:00").getTime();

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.error("Les éléments du compte à rebours sont introuvables.");
        return;
    }

    function updateCountdown() {
        const now = Date.now();
        const difference = weddingDate - now;

        if (difference <= 0) {
            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        daysElement.textContent = String(days).padStart(2, "0");
        hoursElement.textContent = String(hours).padStart(2, "0");
        minutesElement.textContent = String(minutes).padStart(2, "0");
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
