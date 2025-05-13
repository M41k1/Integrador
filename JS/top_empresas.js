// topEmpresas.js

document.addEventListener("DOMContentLoaded", () => {
  const empresas = [
    { nombre: "EcoVerde", reciclado: 120 },
    { nombre: "BioRecicla", reciclado: 110 },
    { nombre: "Planeta Limpio", reciclado: 95 },
    { nombre: "ReciclaPlus", reciclado: 80 },
    { nombre: "GreenTech", reciclado: 60 }
  ];

  const top3 = empresas.sort((a, b) => b.reciclado - a.reciclado).slice(0, 3);

  const contenedor = document.getElementById("topEmpresas");

  top3.forEach((empresa, index) => {
    const item = document.createElement("li");
    item.textContent = `#${index + 1} ${empresa.nombre} - ${empresa.reciclado} kg`;
    contenedor.appendChild(item);
  });
});
