// main.js - Qontakto | CRM Landing Page Optimizado

document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // 🎯 ANIMACIONES DE ENTRADA POR SCROLL
  // ================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-in, .fade-in-up").forEach(el => {
    observer.observe(el);
  });


  // ================================
  // 🌀 EFECTO PARALLAX SUAVE CON SCROLL
  // ================================
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        document.querySelectorAll(".parallax").forEach(el => {
          const speed = parseFloat(el.getAttribute("data-speed")) || 0.5;
          const offset = window.pageYOffset * speed;
          el.style.backgroundPositionY = `${-offset}px`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  // Debug visual del parallax (opcional)
  window.toggleParallaxDebug = () => {
    document.querySelectorAll(".parallax").forEach(el => {
      el.style.outline = el.style.outline ? "" : "2px dashed red";
    });
  };


  // ================================
  // ✨ RESALTAR TARJETAS AL HACER HOVER
  // ================================
  document.querySelectorAll(".col-md-4").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("shadow-lg", "bg-light");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("shadow-lg", "bg-light");
    });
  });


  // ================================
  // 📚 ACORDEÓN INTERACTIVO (FAQ)
  // ================================
  document.querySelectorAll(".accordion-button").forEach(button => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      // Cierra todos los acordeones
      document.querySelectorAll(".accordion-button").forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
        btn.classList.add("collapsed");
      });

      // Solo abre el seleccionado
      if (!isExpanded) {
        button.setAttribute("aria-expanded", "true");
        button.classList.remove("collapsed");
      }
    });
  });


  // ================================
  // 📝 VALIDACIÓN Y ENVÍO DEL FORMULARIO
  // ================================
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = form.querySelector("#nombre");
      const email = form.querySelector("#email");
      const mensaje = form.querySelector("#mensaje");
      let errores = [];

      // Limpiar errores anteriores
      document.querySelectorAll(".error-msg").forEach(el => el.remove());
      form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));

      const successMsg = form.querySelector(".success-msg");
      if (successMsg) successMsg.remove();

      // Validaciones
      if (!nombre.value.trim() || nombre.value.trim().length < 3) {
        errores.push({ field: nombre, message: "El nombre debe tener al menos 3 caracteres." });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        errores.push({ field: email, message: "Ingresa un correo electrónico válido." });
      }

      if (!mensaje.value.trim() || mensaje.value.trim().length < 10) {
        errores.push({ field: mensaje, message: "El mensaje debe tener al menos 10 caracteres." });
      }

      // Mostrar errores si existen
      if (errores.length > 0) {
        errores.forEach(error => {
          const errorMsg = document.createElement("div");
          errorMsg.className = "error-msg text-danger small mt-1 fade-in";
          errorMsg.textContent = error.message;
          error.field.classList.add("is-invalid");
          error.field.parentNode.appendChild(errorMsg);
        });
        return;
      }

      // Mostrar éxito y resetear formulario
      const success = document.createElement("div");
      success.className = "success-msg alert alert-success mt-3 fade-in";
      success.textContent = "✅ Mensaje enviado correctamente. Nos pondremos en contacto.";
      form.appendChild(success);
      form.reset();
    });
  }


  // ================================
  // 🍪 MODAL DE COOKIES
  // ================================
  const modal = document.getElementById("cookie-modal");
  const acceptBtn = document.getElementById("accept-cookies");

  if (modal && acceptBtn) {
    if (!localStorage.getItem("cookies_aceptadas")) {
      modal.classList.add("show");

      setTimeout(() => {
        if (modal.classList.contains("show")) {
          modal.classList.remove("show");
        }
      }, 10000); // Ocultar después de 10 segundos
    }

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookies_aceptadas", "true");
      modal.classList.remove("show");
      cargarAnalytics(); // Cargar Analytics solo si acepta cookies
    });
  }

  function cargarAnalytics() {
    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-MJQBRLE59Y ";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag("js", new Date());
    gtag("config", "G-MJQBRLE59Y");
  }


  // ================================
  // 📱 CERRAR MENÚ MÓVIL AL HACER CLIC EN UN LINK
  // ================================
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.getElementById("mainNavbar");

  if (navLinks && navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          new bootstrap.Collapse(navbarCollapse).toggle();
        }
      });
    });
  }


  // ================================
  // 💡 REEMPLAZAR IMÁGENES POR .webp SI EL NAVEGADOR LO SOPORTA
  // ================================
  soportaWebP().then(esCompatible => {
    if (esCompatible) {
      document.querySelectorAll("img[data-webp]").forEach(img => {
        img.src = img.dataset.webp;
      });
    }
  });

  function soportaWebP() {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img.width > 0 && img.height > 0);
      img.onerror = () => resolve(false);
      img.src = "data:image/webp;base64,UklGRhIAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSAIAAAARAAEAAQAAAFQAAABwAAQAAwAA";
    });
  }
});