/* =========================================================
   HAVEN WEBSITE — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const loader = document.querySelector(".page-loader");

    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.classList.add("hide");

                setTimeout(() => {
                    loader.style.display = "none";
                }, 500);

            }, 500);
        });
    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });


        /* Close menu after clicking a link */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });
    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbar = document.querySelector(".navbar");

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }

});
/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.querySelector(".navbar");

if (navbar) {

    const updateNavbar = () => {

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();
}


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(
    ".nav-menu a[href^='#']"
);

if (sections.length && navigationLinks.length) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navigationLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },
        {
            threshold: 0.35,
            rootMargin: "-80px 0px -35% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElements = document.querySelectorAll(
    "#currentYear, .current-year"
);

yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
});


/* =========================================================
   BUTTON PRESS EFFECT
========================================================= */

const buttons = document.querySelectorAll(
    ".btn, .pricing-btn, .cta-btn"
);

buttons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.add("clicked");

        setTimeout(() => {
            button.classList.remove("clicked");
        }, 180);

    });

});


/* =========================================================
   IMAGE LAZY LOADING
========================================================= */

const images = document.querySelectorAll("img");

images.forEach(image => {

    if (!image.hasAttribute("loading")) {
        image.setAttribute("loading", "lazy");
    }

});


/* =========================================================
   EXTERNAL LINKS
========================================================= */

const externalLinks = document.querySelectorAll(
    'a[href^="http"]'
);

externalLinks.forEach(link => {

    if (!link.href.includes(
        window.location.hostname
    )) {

        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");

    }

});


/* =========================================================
   PREVENT DOUBLE TAP ZOOM ON BUTTONS
========================================================= */

document.querySelectorAll("button").forEach(button => {

    button.addEventListener(
        "touchend",
        () => {
            button.blur();
        },
        {
            passive: true
        }
    );

});


/* =========================================================
   CONSOLE BRAND MESSAGE
========================================================= */

console.log(
    "%c HAVEN WEBSITE ",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "Modern websites for modern businesses."
);
