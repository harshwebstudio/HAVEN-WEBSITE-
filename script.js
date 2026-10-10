/* =========================================================
   HAVEN WEBSITES — PREMIUM JAVASCRIPT
   ========================================================= */

(() => {
  "use strict";

  /* ---------------------------------------------------------
     ELEMENTS
     --------------------------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");

  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  const serviceSelect = document.getElementById("service");
  const planSelect = document.getElementById("plan");
  const detailsField = document.getElementById("details");

  const nameField = document.getElementById("name");
  const businessField = document.getElementById("business");
  const emailField = document.getElementById("email");
  const budgetField = document.getElementById("budget");

  const footerYear = document.getElementById("footerYear");


  /* ---------------------------------------------------------
     MOBILE NAVIGATION
     --------------------------------------------------------- */

  const closeMenu = () => {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  };

  const openMenu = () => {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  };

  const toggleMenu = () => {
    if (!navMenu) return;

    if (navMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  if (menuToggle && navMenu) {
    navMenu.id = navMenu.id || "navMenu";

    menuToggle.setAttribute("aria-controls", navMenu.id);
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", toggleMenu);

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();

        const href = link.getAttribute("href");

        if (href && href.startsWith("#")) {
          const target = document.querySelector(href);

          if (target) {
            target.setAttribute("tabindex", "-1");

            setTimeout(() => {
              target.focus({ preventScroll: true });
            }, 300);
          }
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) {
        closeMenu();
      }
    });
  }


  /* ---------------------------------------------------------
     SERVICE ENQUIRY BUTTONS
     --------------------------------------------------------- */

  const serviceButtons = document.querySelectorAll("[data-service]");

  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedService = button.getAttribute("data-service");

      if (serviceSelect && selectedService) {
        const matchingOption = [...serviceSelect.options].find(
          (option) =>
            option.value.toLowerCase() === selectedService.toLowerCase()
        );

        if (matchingOption) {
          serviceSelect.value = matchingOption.value;
        } else {
          serviceSelect.value = selectedService;
        }
      }

      const contactSection = document.querySelector("#contact");

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      if (detailsField && selectedService) {
        detailsField.focus();
      }
    });
  });

/* ---------------------------------------------------------
   PRICING PLAN BUTTONS — WHATSAPP ENQUIRY
   --------------------------------------------------------- */

const planButtons = document.querySelectorAll("[data-plan]");

planButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedPlan =
      button.getAttribute("data-plan") || "Website package";

    const whatsappNumber = "919987475783";

    const message = [
      "Hello Haven Websites! 👋",
      "",
      "I'm interested in one of your website packages.",
      "",
      `Selected Package: ${selectedPlan}`,
      "",
      "Please share the details, what's included, and the next steps.",
      "",
      "Thank you!"
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
});
          


  /* ---------------------------------------------------------
     FORM SUBMISSION
     --------------------------------------------------------- */

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      /*
       * Browser validation
       */
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();

        if (formNote) {
          formNote.textContent =
            "Please complete the required fields before continuing.";
        }

        return;
      }

      /*
       * Get form values
       */
      const name = nameField?.value.trim() || "";
      const business = businessField?.value.trim() || "";
      const email = emailField?.value.trim() || "";
      const service = serviceSelect?.value.trim() || "";
      const plan = planSelect?.value.trim() || "";
      const budget = budgetField?.value.trim() || "";
      const details = detailsField?.value.trim() || "";

      /*
       * WhatsApp message
       */
      const message = [
        "Hello Haven Websites! 👋",
        "",
        "I would like to discuss a website project.",
        "",
        `Name: ${name}`,
        `Business: ${business}`,
        `Email: ${email}`,
        `Service: ${service}`,
        `Plan: ${plan}`,
        `Budget: ${budget}`,
        "",
        "Project Details:",
        details,
        "",
        "Sent from the Haven Websites website."
      ].join("\n");

      /*
       * Haven Websites WhatsApp number
       */
      const whatsappNumber = "919987475783";

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      /*
       * User feedback
       */
      if (formNote) {
        formNote.textContent =
          "WhatsApp is opening with your enquiry. Review the message and press Send.";
      }

      /*
       * Open WhatsApp
       */
      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }


  /* ---------------------------------------------------------
     FOOTER YEAR
     --------------------------------------------------------- */

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }


  /* ---------------------------------------------------------
     ACCESSIBILITY
     --------------------------------------------------------- */

  if (menuToggle && navMenu) {
    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    if (!navMenu.id) {
      navMenu.id = "navMenu";
    }

    menuToggle.setAttribute(
      "aria-controls",
      navMenu.id
    );
  }


  /* ---------------------------------------------------------
     SMOOTH INTERNAL LINKS
     --------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });


  /* ---------------------------------------------------------
     PREVENT FORM NOTE FROM STAYING HIDDEN
     --------------------------------------------------------- */

  if (formNote) {
    formNote.setAttribute("aria-live", "polite");
  }

})();
