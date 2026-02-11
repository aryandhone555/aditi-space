document.addEventListener("DOMContentLoaded", () => {

    const greetingEl = document.getElementById("greeting");
    const clockEl = document.getElementById("clock");
    const lottiePlayer = document.getElementById("timeLottie");
    const quoteEl = document.getElementById("quote");

    const banner = document.querySelector(".top-banner");
    const mainContent = document.querySelector(".main-content");

    /* ---------------- TIME + GREETING ---------------- */

    function updateTime() {
        const now = new Date();
        const hour24 = now.getHours();
        let hours = hour24 % 12 || 12;
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const ampm = hour24 >= 12 ? "PM" : "AM";

        clockEl.innerText = `${hours}:${minutes} ${ampm}`;

        let greetingText = "";
        let lottieSrc = SUN_LOTTIE;

        /* 🌅 DAY */
        if (hour24 >= 5 && hour24 < 18) {
            greetingText =
                hour24 < 12
                    ? "Good Morning Aditi ☀️"
                    : "Good Afternoon Aditi 🌼";

            lottieSrc = SUN_LOTTIE;

            banner.style.backgroundImage =
                "url('/static/images/day.jpg')";

            mainContent.style.background =
                "linear-gradient(180deg, #ff78c4, #ffb3dc)";
        }
        /* 🌙 NIGHT */
        else {
            greetingText = "Good Evening Aditi 🌙";
            lottieSrc = MOON_LOTTIE;

            banner.style.backgroundImage =
                "url('/static/images/night.jpg')";

            mainContent.style.background =
                "linear-gradient(180deg, #2b1055, #7597de)";
        }

        greetingEl.innerText = greetingText;

        /* ✅ Correct Lottie loading */
        if (lottiePlayer.getAttribute("src") !== lottieSrc) {
            lottiePlayer.setAttribute("src", lottieSrc);
        }
    }

    updateTime();
    setInterval(updateTime, 1000);

    /* ---------------- QUOTE OF THE DAY ---------------- */

    async function loadQuote() {
        try {
            const res = await fetch("https://zenquotes.io/api/today");
            const data = await res.json();

            quoteEl.innerText =
                `"${data[0].q}" — ${data[0].a}`;
        } catch (err) {
            quoteEl.innerText =
                "You are someone's favourite place 💗";
        }
    }

    loadQuote();
});

/* ---------------- LOADER ---------------- */

window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) loader.style.opacity = "0";

        setTimeout(() => {
            if (loader) loader.style.display = "none";
        }, 400);
    }, 1400);
});
