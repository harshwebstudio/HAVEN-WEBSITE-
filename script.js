
// ==========================================
// HAVEN WEBSITES — JAVASCRIPT PART 1/3
// Mobile Navigation & Basic Interactions
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // 1. MOBILE NAVIGATION

    const menuToggle = document.querySelector(
        ".menu-toggle, #menuToggle"
    );

    const navMenu = document.querySelector(
        ".nav-menu, #navMenu"
    );

    function closeMobileMenu() {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && navMenu) {

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close menu after selecting a navigation link
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        // Close menu with Escape key
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });

        // Close menu when clicking outside it
        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMobileMenu();
            }
        });

        // Close mobile menu when switching to desktop layout
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

    }


    // 2. SMOOTH SCROLL FOR SECTION LINKS

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetSection = document.querySelector(targetId);

            if (!targetSection) return;

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });
        });

    });


    // 3. UPDATE COPYRIGHT YEAR

    const yearElements = document.querySelectorAll(
        "#current-year, .current-year"
    );

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });


    // 4. PREVENT EMPTY PLACEHOLDER LINKS

    document.querySelectorAll('a[href="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const hasSectionTarget = link.closest(
                ".nav-menu, nav"
            );

            if (!hasSectionTarget) {
                event.preventDefault();
            }
        });
    });

});

/* ==========================================
   JAVASCRIPT — PART 2
   ANIMATIONS & INTERACTIONS
========================================== */

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(
  ".reveal, .fade-in, .animate-on-scroll"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// Navbar Scroll Effect
const navbar = document.querySelector(
  ".navbar, header, nav"
);

function updateNavbar() {
  if (!navbar) return;

  navbar.classList.toggle(
    "scrolled",
    window.scrollY > 40
  );
}

window.addEventListener("scroll", updateNavbar, {
  passive: true
});

updateNavbar();


// Back to Top Button
const backToTop = document.querySelector(
  "#backToTop, .back-to-top"
);

if (backToTop) {
  function updateBackToTop() {
    backToTop.classList.toggle(
      "show",
      window.scrollY > 350
    );
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  updateBackToTop();
}


// FAQ Accordion
const faqItems = document.querySelectorAll(
  ".faq-item"
);

faqItems.forEach((item) => {
  const question = item.querySelector(
    ".faq-question, .faq-header, button"
  );

  const answer = item.querySelector(
    ".faq-answer, .faq-content"
  );

  if (!question || !answer) return;

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("active");

      const otherAnswer = otherItem.querySelector(
        ".faq-answer, .faq-content"
      );

      const otherQuestion = otherItem.querySelector(
        ".faq-question, .faq-header, button"
      );

      if (otherAnswer) {
        otherAnswer.style.maxHeight = null;
      }

      if (otherQuestion) {
        otherQuestion.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    });

    if (!isOpen) {
      item.classList.add("active");

      answer.style.maxHeight =
        answer.scrollHeight + "px";

      question.setAttribute(
        "aria-expanded",
        "true"
      );
    }
  });
});


// Current Year
document.querySelectorAll("[data-current-year]").forEach(
  (element) => {
    element.textContent = new Date().getFullYear();
  }
);


// Button Click Protection
document.querySelectorAll(
  'a[href="#"], a[href=""]'
).forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});


// Console Message
console.log(
  "%c Website JavaScript Loaded Successfully!",
  "color: #00d9ff; font-size: 14px; font-weight: bold;"
  /* ==========================================
   JAVASCRIPT — PART 3
   FINAL INTERACTIONS & PERFORMANCE
========================================== */

// Contact Form Validation
const contactForm = document.querySelector(
  "#contactForm, .contact-form"
);

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    const inputs = this.querySelectorAll(
      'input[required], textarea[required], select[required]'
    );

    let isValid = true;

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        input.reportValidity();
        isValid = false;
      }
    });

    if (!isValid) {
      event.preventDefault();
    }
  });
}


// Mobile Menu Accessibility
const menuToggle = document.querySelector(
  "#menuToggle, .menu-toggle, .hamburger"
);

const navMenu = document.querySelector(
  "#navMenu, .nav-menu, .nav-links"
);

if (menuToggle && navMenu) {
  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}


// Lazy Loading for Images
document.querySelectorAll("img").forEach((img) => {
  if (!img.hasAttribute("loading")) {
    img.setAttribute("loading", "lazy");
  }

  if (!img.hasAttribute("decoding")) {
    img.setAttribute("decoding", "async");
  }
});


// External Links Security
document.querySelectorAll('a[target="_blank"]').forEach(
  (link) => {
    link.setAttribute("rel", "noopener noreferrer");
  }
);


// Disable Unwanted Horizontal Overflow
document.documentElement.style.overflowX = "clip";


// Reduce Animations for Accessibility
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

function applyMotionPreference() {
  if (reducedMotion.matches) {
    document.documentElement.classList.add(
      "reduce-motion"
    );
  } else {
    document.documentElement.classList.remove(
      "reduce-motion"
    );
  }
}

applyMotionPreference();

if (reducedMotion.addEventListener) {
  reducedMotion.addEventListener(
    "change",
    applyMotionPreference
  );
}


// Final Initialization
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-loaded");

  console.log("All JavaScript parts initialized.");
});
);
