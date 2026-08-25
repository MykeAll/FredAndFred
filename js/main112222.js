/* ============================================================
   FRED & FRED AGRO ENGINEERS
   MAIN JAVASCRIPT
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* ====================================================
           ELEMENTS
        ==================================================== */

        const header =
            document.getElementById(
                "siteHeader"
            );

        const toggle =
            document.getElementById(
                "menuToggle"
            );

        const nav =
            document.getElementById(
                "siteNav"
            );

        const backTop =
            document.getElementById(
                "backTop"
            );


        /* ====================================================
           NAVBAR SCROLL EFFECT
        ==================================================== */

        function updateHeader() {

            if (!header) {
                return;
            }

            header.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );

        }


        updateHeader();


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );


        /* ====================================================
           OPEN MENU
        ==================================================== */

        function openMenu() {

            if (!toggle || !nav) {
                return;
            }

            toggle.setAttribute(
                "aria-expanded",
                "true"
            );

            toggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            nav.classList.add(
                "open"
            );

            document.body.classList.add(
                "menu-open"
            );

        }


        /* ====================================================
           CLOSE MENU
        ==================================================== */

        function closeMenu() {

            if (!toggle || !nav) {
                return;
            }

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            toggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            nav.classList.remove(
                "open"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }


        /* ====================================================
           HAMBURGER CLICK
        ==================================================== */

        if (
            toggle &&
            nav
        ) {

            toggle.addEventListener(
                "click",
                (event) => {

                    /*
                       Prevent the document-level
                       click handler from interfering.
                    */

                    event.stopPropagation();


                    const isOpen =
                        toggle.getAttribute(
                            "aria-expanded"
                        ) === "true";


                    if (isOpen) {

                        closeMenu();

                    } else {

                        openMenu();

                    }

                }
            );

        }


        /* ====================================================
           NAVIGATION LINK CLICK
        ==================================================== */

        if (nav) {

            nav
                .querySelectorAll(
                    ".nav-link"
                )
                .forEach(
                    (link) => {

                        link.addEventListener(
                            "click",
                            () => {

                                closeMenu();

                            }
                        );

                    }
                );

        }


        /* ====================================================
           CLICK OUTSIDE
        ==================================================== */

        document.addEventListener(
            "click",
            (event) => {

                if (
                    !nav ||
                    !toggle
                ) {

                    return;

                }


                const menuIsOpen =
                    nav.classList.contains(
                        "open"
                    );


                if (!menuIsOpen) {

                    return;

                }


                const clickedInsideNav =
                    nav.contains(
                        event.target
                    );


                const clickedToggle =
                    toggle.contains(
                        event.target
                    );


                if (
                    !clickedInsideNav &&
                    !clickedToggle
                ) {

                    closeMenu();

                }

            }
        );


        /* ====================================================
           ESCAPE KEY
        ==================================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape"
                ) {

                    closeMenu();

                }

            }
        );


        /* ====================================================
           CLOSE WHEN RETURNING TO DESKTOP
        ==================================================== */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 820
                ) {

                    closeMenu();

                }

            }
        );


        /* ====================================================
           ACTIVE CURRENT PAGE
        ==================================================== */

        if (nav) {

            const currentPage =
                window.location.pathname
                    .split("/")
                    .pop() ||
                "index.html";


            nav
                .querySelectorAll(
                    ".nav-link"
                )
                .forEach(
                    (link) => {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            href ===
                            currentPage
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }
                );

        }


        /* ====================================================
           SCROLL REVEAL
        ==================================================== */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            const observer =
                new IntersectionObserver(
                    (
                        entries,
                        observerInstance
                    ) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "visible"
                                    );


                                    observerInstance.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold:
                            0.12
                    }
                );


            revealElements.forEach(
                (element) => {

                    observer.observe(
                        element
                    );

                }
            );

        } else {

            revealElements.forEach(
                (element) => {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }


        /* ====================================================
           BACK TO TOP
        ==================================================== */

        if (backTop) {

            backTop.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();


                    window.scrollTo({

                        top:
                            0,

                        behavior:
                            "smooth"

                    });

                }
            );

        }

    }
);