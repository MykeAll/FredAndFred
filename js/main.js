/* ============================================================
   FRED & FRED AGRO ENGINEERS
   GLOBAL JAVASCRIPT
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       ELEMENTS
    ======================================================== */

    const header =
        document.getElementById("siteHeader");

    const toggle =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("siteNav");

    const backTop =
        document.getElementById("backTop");


    /* ========================================================
       HEADER SCROLL EFFECT
    ======================================================== */

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


    /* ========================================================
       MOBILE MENU
    ======================================================== */

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


    /* ========================================================
       HAMBURGER
    ======================================================== */

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


        nav
            .querySelectorAll(".nav-link")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });
    }


    /* ========================================================
       CLICK OUTSIDE
    ======================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (!nav || !toggle) {
                return;
            }

            const menuIsOpen =
                nav.classList.contains("open");

            if (
                menuIsOpen &&
                !nav.contains(event.target) &&
                !toggle.contains(event.target)
            ) {

                closeMenu();

            }
        }
    );


    /* ========================================================
       ESCAPE
    ======================================================== */

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


    /* ========================================================
       CLOSE MOBILE MENU ON DESKTOP
    ======================================================== */

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


    /* ========================================================
       CURRENT PAGE
    ======================================================== */

    if (nav) {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop() ||
            "index.html";


        nav
            .querySelectorAll(".nav-link")
            .forEach((link) => {

                const href =
                    link.getAttribute("href");


                if (
                    href === currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

    }


    /* ========================================================
       SCROLL REVEAL
    ======================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (
                    entries,
                    observer
                ) => {

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

                revealObserver.observe(
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


    /* ========================================================
       BACK TO TOP
    ======================================================== */

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
       ========================================================
       VALUE CHAIN ORBIT
       ========================================================
    ======================================================== */

    const diagram =
        document.getElementById(
            "valueChainDiagram"
        );

    const orbitArrow =
        document.getElementById(
            "orbitArrow"
        );

    const valueNodes =
        diagram
            ? [
                ...diagram.querySelectorAll(
                    ".value-node"
                )
            ]
            : [];


    if (
        diagram &&
        orbitArrow &&
        valueNodes.length
    ) {

        /* ====================================================
           CONFIG
        ==================================================== */

        const orbitDuration =
            15000;

        let currentAngle = 0;

        let lastTimestamp =
            performance.now();

        let animationFrame = null;

        let orbitPaused = false;


        /* ====================================================
           NORMALIZE ANGLE
        ==================================================== */

        function normalizeAngle(
            angle
        ) {

            return (
                (
                    angle % 360
                ) + 360
            ) % 360;

        }


        /* ====================================================
           ANGLE DISTANCE
        ==================================================== */

        function angleDifference(
            first,
            second
        ) {

            const difference =
                Math.abs(
                    normalizeAngle(first) -
                    normalizeAngle(second)
                );

            return Math.min(
                difference,
                360 - difference
            );

        }


        /* ====================================================
           POSITION ORBIT ARROW
        ==================================================== */

        function updateOrbit(
            timestamp
        ) {

            const delta =
                timestamp -
                lastTimestamp;

            lastTimestamp =
                timestamp;


            /* ------------------------------------------------
               ROTATE ONLY WHEN NOT PAUSED
            ------------------------------------------------ */

            if (!orbitPaused) {

                currentAngle +=
                    (
                        360 /
                        orbitDuration
                    ) *
                    delta;

                currentAngle =
                    normalizeAngle(
                        currentAngle
                    );

            }


            /* ------------------------------------------------
               DIAGRAM CENTER
            ------------------------------------------------ */

            const diagramRect =
                diagram.getBoundingClientRect();

            const centerX =
                diagram.offsetWidth /
                2;

            const centerY =
                diagram.offsetHeight /
                2;


            /* ------------------------------------------------
               GET ROTATING RING
            ------------------------------------------------ */

            const ring =
                diagram.querySelector(
                    ".value-rotating-ring"
                );


            if (!ring) {

                return;

            }


            const ringRect =
                ring.getBoundingClientRect();


            /*
               Use the ring's actual rendered
               size. This keeps the arrow
               responsive.
            */

            const radius =
                Math.min(
                    ringRect.width,
                    ringRect.height
                ) / 2;


            const radians =
                (
                    currentAngle -
                    90
                ) *
                Math.PI /
                180;


            const arrowX =
                centerX +
                radius *
                Math.cos(
                    radians
                );


            const arrowY =
                centerY +
                radius *
                Math.sin(
                    radians
                );


            /* ------------------------------------------------
               POSITION ARROW
            ------------------------------------------------ */

            orbitArrow.style.left =
                `${arrowX - 20}px`;

            orbitArrow.style.top =
                `${arrowY - 20}px`;


            orbitArrow.style.transform =
                `rotate(${currentAngle + 90}deg)`;


            /* ------------------------------------------------
               FIND CLOSEST NODE
            ------------------------------------------------ */

            let closestNode =
                null;

            let closestDistance =
                Infinity;


            valueNodes.forEach(
                (node) => {

                    const nodeAngle =
                        Number(
                            node.dataset.angle
                        );


                    const distance =
                        angleDifference(
                            currentAngle,
                            nodeAngle
                        );


                    if (
                        distance <
                        closestDistance
                    ) {

                        closestDistance =
                            distance;

                        closestNode =
                            node;

                    }

                }
            );


            /* ------------------------------------------------
               RESET ALL NODES
            ------------------------------------------------ */

            valueNodes.forEach(
                (node) => {

                    node.classList.remove(
                        "active"
                    );

                }
            );


            orbitArrow.classList.remove(
                "active"
            );


            /* ------------------------------------------------
               ACTIVE NODE
            ------------------------------------------------ */

            if (
                closestNode &&
                closestDistance <= 17
            ) {

                closestNode.classList.add(
                    "active"
                );

                orbitArrow.classList.add(
                    "active"
                );

            }


            /* ------------------------------------------------
               NEXT FRAME
            ------------------------------------------------ */

            animationFrame =
                requestAnimationFrame(
                    updateOrbit
                );

        }


        /* ====================================================
           HOVER PAUSE
        ==================================================== */

        valueNodes.forEach(
            (node) => {

                node.addEventListener(
                    "mouseenter",
                    () => {

                        orbitPaused =
                            true;

                    }
                );


                node.addEventListener(
                    "mouseleave",
                    () => {

                        orbitPaused =
                            false;

                        /*
                           Reset timestamp so the
                           next frame doesn't jump.
                        */

                        lastTimestamp =
                            performance.now();

                    }
                );

            }
        );


        /* ====================================================
           TOUCH SUPPORT
        ==================================================== */

        valueNodes.forEach(
            (node) => {

                node.addEventListener(
                    "touchstart",
                    () => {

                        orbitPaused =
                            true;

                    },
                    {
                        passive: true
                    }
                );

                node.addEventListener(
                    "touchend",
                    () => {

                        orbitPaused =
                            false;

                        lastTimestamp =
                            performance.now();

                    },
                    {
                        passive: true
                    }
                );

            }
        );


        /* ====================================================
           START ORBIT
        ==================================================== */

        animationFrame =
            requestAnimationFrame(
                updateOrbit
            );


        /* ====================================================
           CLEANUP
        ==================================================== */

        window.addEventListener(
            "beforeunload",
            () => {

                if (animationFrame) {

                    cancelAnimationFrame(
                        animationFrame
                    );

                }

            }
        );

    }

});