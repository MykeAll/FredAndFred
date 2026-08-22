document.addEventListener(
    "DOMContentLoaded",
    () => {

        const header =
            document.getElementById(
                "site-header"
            );

        const menuToggle =
            document.querySelector(
                ".menu-toggle"
            );

        const siteNav =
            document.getElementById(
                "site-nav"
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
           MOBILE MENU
        ==================================================== */

        function openMenu() {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation"
            );

            siteNav.classList.add(
                "open"
            );

            document.body.classList.add(
                "menu-open"
            );

        }


        function closeMenu() {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

            siteNav.classList.remove(
                "open"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }


        if (
            menuToggle &&
            siteNav
        ) {

            menuToggle.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();


                    const isOpen =
                        menuToggle.getAttribute(
                            "aria-expanded"
                        ) === "true";


                    isOpen
                        ? closeMenu()
                        : openMenu();

                }
            );


            siteNav
                .querySelectorAll("a")
                .forEach(
                    link => {

                        link.addEventListener(
                            "click",
                            closeMenu
                        );

                    }
                );

        }


        /* ====================================================
           CLICK OUTSIDE
        ==================================================== */

        document.addEventListener(
            "click",
            event => {

                if (
                    !siteNav ||
                    !menuToggle
                ) {
                    return;
                }


                if (
                    siteNav.classList.contains(
                        "open"
                    ) &&
                    !siteNav.contains(
                        event.target
                    ) &&
                    !menuToggle.contains(
                        event.target
                    )
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
            event => {

                if (
                    event.key === "Escape"
                ) {

                    closeMenu();

                }

            }
        );


        /* ====================================================
           RESIZE
        ==================================================== */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 850
                ) {

                    closeMenu();

                }

            }
        );


        /* ====================================================
           SCROLL REVEAL
        ==================================================== */

        const reveals =
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
                            entry => {

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


            reveals.forEach(
                element => {

                    observer.observe(
                        element
                    );

                }
            );

        } else {

            reveals.forEach(
                element => {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }

    }
);