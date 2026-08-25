/* ============================================================
   FRED & FRED AGRO ENGINEERS
   GLOBAL JAVASCRIPT
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* ====================================================
           ELEMENTS
        ==================================================== */

        const header =
            document.getElementById("siteHeader");

        const toggle =
            document.getElementById("menuToggle");

        const nav =
            document.getElementById("siteNav");

        const backTop =
            document.getElementById("backTop");


        /* ====================================================
           HEADER SCROLL
        ==================================================== */

        function updateHeader() {

            if (!header) {
                return;
            }

            header.classList.toggle(
                "scrolled",
                window.scrollY > 18
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

            nav.classList.add("open");

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

            nav.classList.remove("open");

            document.body.classList.remove(
                "menu-open"
            );

        }


        /* ====================================================
           HAMBURGER
        ==================================================== */

        if (toggle && nav) {

            toggle.addEventListener(
                "click",
                (event) => {

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
           NAV LINKS
        ==================================================== */

        if (nav) {

            nav.querySelectorAll(
                ".nav-link"
            ).forEach(
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
           CURRENT PAGE
        ==================================================== */

        const currentPage =
            window.location.pathname
                .split("/")
                .pop() ||
            "index.html";


        if (nav) {

            nav.querySelectorAll(
                ".nav-link"
            ).forEach(
                (link) => {

                    const href =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        href === currentPage
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        /* ====================================================
           CLICK OUTSIDE
        ==================================================== */

        document.addEventListener(
            "click",
            (event) => {

                if (!nav || !toggle) {
                    return;
                }

                const menuOpen =
                    nav.classList.contains(
                        "open"
                    );

                if (
                    menuOpen &&
                    !nav.contains(event.target) &&
                    !toggle.contains(event.target)
                ) {

                    closeMenu();

                }

            }
        );


        /* ====================================================
           ESCAPE
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
           DESKTOP RESIZE
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
           REVEAL ANIMATION
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
                        threshold: 0.12
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

                    window.scrollTo(
                        {
                            top: 0,
                            behavior: "smooth"
                        }
                    );

                }
            );

        }


    }
);