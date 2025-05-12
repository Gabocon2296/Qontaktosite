// main-b-2wwwxp.js
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".fade-in, .fade-in-up").forEach((el) => {
        observer.observe(el);
    });

    let isScrolling = false;
    window.addEventListener("scroll", () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                document.querySelectorAll(".parallax").forEach((el) => {
                    const speed = parseFloat(el.getAttribute("data-speed")) || 0.5;
                    const offset = window.pageYOffset * speed;
                    el.style.backgroundPositionY = -offset + "px";
                });
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    window.toggleParallaxDebug = () => {
        document.querySelectorAll(".parallax").forEach((el) => {
            el.style.outline = el.style.outline ? "" : "2px dashed red";
        });
    };

    // Hover effects for .col-md-4
    document.querySelectorAll(".col-md-4").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            el.classList.add("shadow-lg", "bg-light");
        });
        el.addEventListener("mouseleave", () => {
            el.classList.remove("shadow-lg", "bg-light");
        });
    });

    // Accordion toggle for .accordion-button
    document.querySelectorAll(".accordion-button").forEach((el) => {
        el.addEventListener("click", () => {
            const isExpanded = el.getAttribute("aria-expanded") === "true";
            document.querySelectorAll(".accordion-button").forEach((btn) => {
                btn.setAttribute("aria-expanded", "false");
                btn.classList.add("collapsed");
            });
            if (!isExpanded) {
                el.setAttribute("aria-expanded", "true");
                el.classList.remove("collapsed");
            }
        });
    });

    // Form validation
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = form.querySelector("#nombre");
            const email = form.querySelector("#email");
            const message = form.querySelector("#mensaje");
            let errors = [];

            document.querySelectorAll(".error-msg").forEach((el) => el.remove());
            form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));

            const successMsg = form.querySelector(".success-msg");
            if (successMsg) successMsg.remove();

            if (!name.value.trim() || name.value.trim().length < 3) {
                errors.push({ field: name, message: "El nombre debe tener al menos 3 caracteres." });
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                errors.push({ field: email, message: "Ingresa un correo electrónico válido." });
            }

            if (!message.value.trim() || message.value.trim().length < 10) {
                errors.push({ field: message, message: "El mensaje debe tener al menos 10 caracteres." });
            }

            if (errors.length > 0) {
                errors.forEach((error) => {
                    const errorMsg = document.createElement("div");
                    errorMsg.className = "error-msg text-danger small mt-1 fade-in";
                    errorMsg.textContent = error.message;
                    error.field.classList.add("is-invalid");
                    error.field.parentNode.appendChild(errorMsg);
                });
                return;
            }

            const successDiv = document.createElement("div");
            successDiv.className = "success-msg alert alert-success mt-3 fade-in";
            successDiv.textContent = "✅ Mensaje enviado correctamente. Nos pondremos en contacto.";
            form.appendChild(successDiv);
            form.reset();
        });
    }

    // Cookie modal
    const cookieModal = document.getElementById("cookie-modal");
    const acceptCookies = document.getElementById("accept-cookies");
    if (cookieModal && acceptCookies) {
        if (!localStorage.getItem("cookies_aceptadas")) {
            cookieModal.classList.add("show");
            setTimeout(() => {
                if (cookieModal.classList.contains("show")) {
                    cookieModal.classList.remove("show");
                }
            }, 10000);
        }
        acceptCookies.addEventListener("click", () => {
            localStorage.setItem("cookies_aceptadas", "true");
            cookieModal.classList.remove("show");
            const script = document.createElement("script");
            script.setAttribute("async", "");
            script.src = "https://www.googletagmanager.com/gtag/js?id=G-MJQBRLE59Y";
            document.head.appendChild(script);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ "js": new Date() });
            window.dataLayer.push({ "config": "G-MJQBRLE59Y" });
        });
    }

    // Navbar collapse
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const mainNavbar = document.getElementById("mainNavbar");
    if (navLinks && mainNavbar) {
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (mainNavbar.classList.contains("show")) {
                    new bootstrap.Collapse(mainNavbar).toggle();
                }
            });
        });
    }

    // WebP support for images
    new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img.width > 0 && img.height > 0);
        img.onerror = () => resolve(false);
        img.src = "data:image/webp;base64,UklGRhIAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSAIAAAARAAEAAQAAAFQAAABwAAQAAwAA";
    }).then((isWebpSupported) => {
        if (isWebpSupported) {
            document.querySelectorAll("img[data-webp]").forEach((el) => {
                el.src = el.dataset.webp;
            });
        }
    });
});
document.addEventListener("mouseout", function (e) {
  if (e.clientY < 50 && !localStorage.getItem("exitIntentShown")) {
    localStorage.setItem("exitIntentShown", "true");
    const modal = document.getElementById("exit-intent-modal");
    modal && modal.classList.add("show");
  }
});
setTimeout(() => {
  const wp = document.getElementById("whatsapp-button");
  wp && (wp.style.display = "block");
}, 20000);