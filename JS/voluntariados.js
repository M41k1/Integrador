document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#crear-evento form");
    const eventosSection = document.querySelector("#eventos");
  
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
  
        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;
        const ubicacion = document.getElementById("ubicacion").value.trim();
        const mapa = document.getElementById("mapa").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
  
        // Validación básica
        if (!nombre || !fecha || !hora || !ubicacion || !mapa || !descripcion) {
          alert("Por favor llena todos los campos.");
          return;
        }
  
        // Crear nuevo evento
        const nuevoEvento = document.createElement("article");
        nuevoEvento.innerHTML = `
          <h3>${nombre}</h3>
          <p><strong>Fecha:</strong> ${fecha}</p>
          <p><strong>Hora:</strong> ${hora}</p>
          <p><strong>Ubicación:</strong> ${ubicacion}</p>
          <p><strong>Descripción:</strong> ${descripcion}</p>
          <button class="inscribirse">Inscribirse</button>
          <button class="ver-ubicacion">Ver Ubicación</button>
        `;
  
        eventosSection.appendChild(nuevoEvento);
  
        // Botón "Ver Ubicación"
        const verUbicacionButton = nuevoEvento.querySelector(".ver-ubicacion");
        verUbicacionButton.addEventListener("click", function () {
          window.open(mapa, "_blank");
        });
  
        // Botón "Inscribirse"
        const inscribirseButton = nuevoEvento.querySelector(".inscribirse");
        let yaInscrito = false;
  
        inscribirseButton.addEventListener("click", function () {
          if (!yaInscrito) {
            alert("✅ ¡Te has inscrito al evento!");
            yaInscrito = true;
            inscribirseButton.textContent = "Ya inscrito";
            inscribirseButton.disabled = true;
          } else {
            alert("⚠️ Usted ya está inscrito.");
          }
        });
  
        // Limpiar formulario
        form.reset();
      });
    }
  });
  