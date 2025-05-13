document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("graficoReciclaje").getContext("2d");

  // Datos de ejemplo actuales (esta semana)
  const labels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const dataKilos = [2, 3, 5, 4, 6, 7, 10];

  const totalKilos = dataKilos.reduce((a, b) => a + b, 0);

  const datosReciclaje = {
    labels: labels,
    datasets: [{
      label: 'Kilos reciclados',
      data: dataKilos,
      fill: true,
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      borderColor: '#4caf50',
      pointBackgroundColor: '#388e3c',
      tension: 0.3
    }]
  };

  const opciones = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#2e7d32"
        }
      },
      title: {
        display: true,
        text: 'Progreso Semanal de Reciclaje',
        color: "#2e7d32",
        font: {
          size: 20
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Kilos"
        }
      }
    }
  };

  const miGrafico = new Chart(ctx, {
    type: 'line',
    data: datosReciclaje,
    options: opciones
  });

  const resumen = document.getElementById("resumenReciclaje");
  resumen.textContent = `🌱 Esta semana reciclaste un total de ${totalKilos}kg. ¡Sigue así, planeta lover! 🌍`;

  // 📥 Descargar PDF
  document.querySelector(".descargar-btn")?.addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Reporte Semanal de Reciclaje", 20, 20);

    labels.forEach((dia, i) => {
      doc.text(`${dia}: ${dataKilos[i]} kg`, 20, 30 + i * 10);
    });

    doc.text(`\nTotal Semanal: ${totalKilos} kg`, 20, 30 + labels.length * 10 + 10);
    doc.text("¡Gracias por cuidar el planeta! 🌎", 20, 30 + labels.length * 10 + 25);

    doc.save("reporte_reciclaje.pdf");
  });

  // 📅 Mostrar datos antiguos por semana seleccionada
  document.getElementById("mostrarSemana").addEventListener("click", function () {
    const semana = document.getElementById("semanaInput").value;
    const resultado = document.getElementById("resultadoSemana");

    if (!semana) {
      resultado.textContent = "Por favor, selecciona una semana.";
      return;
    }

    // Simulación de datos por semana (puedes cambiar los valores reales)
    const semanasPasadas = {
      "2025-W16": [3, 4, 2, 5, 6, 3, 9],
      "2025-W17": [4, 2, 6, 5, 4, 7, 8],
      "2025-W18": [5, 3, 5, 4, 6, 6, 7]
    };

    if (semanasPasadas[semana]) {
      const datosSemana = semanasPasadas[semana];
      miGrafico.data.datasets[0].data = datosSemana;
      const totalSemana = datosSemana.reduce((a, b) => a + b, 0);
      resumen.textContent = `🔁 En la semana ${semana}, reciclaste ${totalSemana} kg. ¡Buen trabajo reciclador! ♻️`;
      resultado.textContent = `📅 Mostrando registros de la semana ${semana}.`;
      miGrafico.update();
    } else {
      resultado.textContent = `⚠️ No hay datos disponibles para la semana ${semana}.`;
      resumen.textContent = "❌ Sin datos registrados para esta semana.";
    }
  });
});
