document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("graficoReciclaje").getContext("2d");

  const labels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const dataKilos = [2, 3, 5, 4, 6, 7, 10]; // Datos ejemplo

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

  // 📥 Lógica para generar PDF
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
});
