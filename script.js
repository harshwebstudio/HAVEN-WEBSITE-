
/* ========================================
   HAVEN WEBSITES
   MAIN JAVASCRIPT — PART 1/3
======================================== */

(function () {
    "use strict";

    /* ------------------------------------
       ELEMENTS
    ------------------------------------ */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links a");

    const contactForm = document.getElementById("contactForm");
    const formNote = document.getElementById("formNote");

    const serviceSelect = document.getElementById("service");
    const detailsField = document.getElementById("details");

    /* ------------------------------------
       MOBILE NAVIGATION
    ------------------------------------ */

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    function openMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.add("open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    }

    if (menuToggle && navMenu) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        menuToggle.addEventListener("click", function () {
            const isOpen = navMenu.classList.contains("open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        document.addEventListener("click", function (event) {
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });
    }

    /* ------------------------------------
       CLOSE MENU WHEN SCREEN RESIZES
    ------------------------------------ */

    window.addEventListener("resize", function () {
        if (window.innerWidth > 680) {
            closeMenu();
        }
    });

    /* ------------------------------------
       NAVIGATION LINKS
    ------------------------------------ */

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const targetId = link.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.setAttribute("tabindex", "-1");
                }
            }
        });
    });

    /* ========================================
       PART 2/3 CONTINUES BELOW
    ======================================== */
 
    /* ------------------------------------
       SERVICE ENQUIRY BUTTONS
    ------------------------------------ */

    const serviceButtons = document.querySelectorAll("[data-service]");

    serviceButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedService = button.getAttribute("data-service");

            if (serviceSelect && selectedService) {
                const matchingOption = Array.from(
                    serviceSelect.options
                ).find(function (option) {
                    return option.value === selectedService;
                });

                if (matchingOption) {
                    serviceSelect.value = selectedService;
                }
            }
        });
    });

    /* ------------------------------------
       PRICING PLAN BUTTONS
    ------------------------------------ */

    const planButtons = document.querySelectorAll("[data-plan]");

    planButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const planName = button.getAttribute("data-plan");

            if (detailsField && planName) {
                detailsField.value =
                    "I'm interested in the " +
                    planName +
                    " package. Please share the next steps.";
            }

            if (serviceSelect) {
                const planText = (planName || "").toLowerCase();

                if (planText.includes("e-commerce")) {
                    serviceSelect.value = "E-commerce website";
                } else {
                    serviceSelect.value = "Business website";
                }
            }
        });
    });

    /* ------------------------------------
       CONTACT FORM → WHATSAPP
    ------------------------------------ */

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            const nameField = document.getElementById("name");
            const businessField = document.getElementById("business");
            const budgetField = document.getElementById("budget");

            const customerName = nameField
                ? nameField.value.trim()
                : "";

            const businessName = businessField
                ? businessField.value.trim()
                : "";

            const selectedService = serviceSelect
                ? serviceSelect.value
                : "";

            const selectedBudget = budgetField
                ? budgetField.value
                : "";

            const projectDetails = detailsField
                ? detailsField.value.trim()
                : "";

            const message = [
                "Hello Haven Websites!",
                "",
                "I would like to enquire about website design.",
                "",
                "Name: " + customerName,
                "Business Name: " + (businessName || "Not provided"),
                "Service: " + (selectedService || "Not selected"),
                "Budget: " + (selectedBudget || "Not selected"),
                "Project Details: " + (projectDetails || "Not provided"),
                "",
                "Please contact me with the next steps."
            ].join("\n");

            const whatsappNumber = "919987475783";

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);

            if (formNote) {
                formNote.textContent =
                    "WhatsApp is opening with your enquiry. Review the message and press Send.";
            }

            window.location.href = whatsappURL;
        });
    }

    /* ========================================
       PART 3/3 CONTINUES BELOW
    ======================================== */

 
    /* ------------------------------------
       FOOTER COPYRIGHT YEAR
    ------------------------------------ */

    const footerYear = document.getElementById("footerYear");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    /* ------------------------------------
       ACCESSIBLE MENU STATE
    ------------------------------------ */

    if (menuToggle && navMenu) {
        menuToggle.setAttribute("aria-controls", navMenu.id || "navMenu");

        if (!navMenu.id) {
            navMenu.id = "navMenu";
        }
    }

    /* ------------------------------------
       END OF HAVEN WEBSITES JAVASCRIPT
    ------------------------------------ */

})();
