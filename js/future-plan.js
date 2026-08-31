document.addEventListener("DOMContentLoaded", () => {
    const futurePage = document.querySelector(".future-page");
    if (!futurePage) return;

    /* Scroll reveal fallback for pages where main.js is not available. */
    const revealElements = futurePage.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.12 });

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("visible"));
    }

    /* Light pointer/parallax response for the section 1 hero image. */
    const heroVisual = document.querySelector(".future-main-visual");
    if (heroVisual && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const onMove = (event) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            heroVisual.style.transform = `perspective(1200px) rotateX(${(-y * 1.8).toFixed(2)}deg) rotateY(${(x * 2.4).toFixed(2)}deg)`;
        };

        const reset = () => {
            heroVisual.style.transform = "";
        };

        heroVisual.addEventListener("pointermove", onMove);
        heroVisual.addEventListener("pointerleave", reset);
    }

    /* Pause costly visual loops when the page is backgrounded. */
    document.addEventListener("visibilitychange", () => {
        futurePage.classList.toggle("is-paused", document.hidden);
    });
});
