// src/main.js - Versión segura y controlada
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ main.js iniciado");

  // Carga scripts en orden seguro
  try {
    import('../js/main.js').then(() => {
      console.log("✔️ scripts.js cargado");
    });

  } catch (error) {
    console.error("❌ Error al cargar módulos:", error);
  }
});