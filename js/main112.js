/* ============================================================
   FRED & FRED AGRO ENGINEERS
   HOMEPAGE JAVASCRIPT
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const siteHeader =
        document.getElementById("siteHeader");

    const menuToggle =
        document.getElementById("menuToggle");

    const siteNav =
        document.getElementById("siteNav");

    const backTop =
        document.getElementById("backTop");


    /* ========================================================
       MOBILE HAMBURGER
    ========================================================= */

    if (menuToggle && siteNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    menuToggle.classList.contains("active");

                if (isOpen) {

                    menuToggle.classList.remove("active");

                    siteNav.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation"
                    );

                } else {

                    menuToggle.classList.add("active");

                    siteNav.classList.add("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Close navigation"
                    );

                }

            }
        );


        /* ====================================================
           CLOSE MENU AFTER CLICKING A LINK
        ==================================================== */

        const navLinks =
            siteNav.querySelectorAll(".nav-link");

        navLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    menuToggle.classList.remove(
                        "active"
                    );

                    siteNav.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation"
                    );

                }
            );

        });

    }


    /* ========================================================
       NAVBAR SHRINK / SCROLL EFFECT
    ========================================================= */

    const handleHeaderScroll = () => {

        if (!siteHeader) {
            return;
        }

        if (window.scrollY > 30) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    };

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );


    handleHeaderScroll();


    /* ========================================================
       REVEAL ON SCROLL
    ========================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(element);

        }
    );


    /* ========================================================
       BACK TO TOP
    ========================================================= */

    if (backTop) {

        backTop.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* ========================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ========================================================= */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !siteNav ||
                !menuToggle
            ) {
                return;
            }


            const clickedInsideNav =
                siteNav.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);


            if (
                !clickedInsideNav &&
                !clickedToggle &&
                siteNav.classList.contains("open")
            ) {

                siteNav.classList.remove(
                    "open"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            }

        }
    );


    /* ========================================================
       ESC KEY CLOSE
    ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                siteNav &&
                siteNav.classList.contains("open")
            ) {

                siteNav.classList.remove(
                    "open"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                menuToggle.focus();

            }

        }
    );

});