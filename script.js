const malla = [
  {
    nombre: "Semestre I",
    ramos: [
      { nombre: "Fundamentos Filosóficos de la Psicología", creditos: 4 },
      { nombre: "Psicología del Desarrollo I", creditos: 4 },
      { nombre: "Bases Biológicas del Comportamiento", creditos: 4 },
      { nombre: "Habilidades de Comunicación Efectiva", creditos: 4 },
      { nombre: "Taller de Introducción a la Profesión", creditos: 4 },
    ],
  },
  {
    nombre: "Semestre II",
    ramos: [
      { nombre: "Psicología del Desarrollo II", creditos: 4 },
      { nombre: "Psicología Social", creditos: 4 },
      { nombre: "Taller de Introducción a la Psicología General", creditos: 4 },
      { nombre: "Bases Filosóficas y Epistemológicas", creditos: 4 },
      { nombre: "Contexto Histórico de la Psicología", creditos: 4 },
    ],
  },
  {
    nombre: "Semestre III",
    ramos: [
      { nombre: "Psicología de la Personalidad", creditos: 4 },
      { nombre: "Teorías y Sistemas Psicológicos", creditos: 4 },
      { nombre: "Taller de Desarrollo Personal", creditos: 4 },
      { nombre: "Inglés I", creditos: 2 },
      { nombre: "Psicofisiología", creditos: 4 },
    ],
  },
  {
    nombre: "Semestre IV",
    ramos: [
      { nombre: "Psicopatología I", creditos: 4 },
      { nombre: "Neuropsicología", creditos: 4, prerrequisito: "Psicofisiología" },
      { nombre: "Metodología de la Investigación I", creditos: 4 },
      { nombre: "Inglés II", creditos: 2 },
      { nombre: "Taller de Desarrollo Comunitario", creditos: 4 },
    ],
  },
  {
    nombre: "Semestre V",
    ramos: [
      { nombre: "Psicopatología II", creditos: 4 },
      { nombre: "Evaluación Psicológica I", creditos: 4 },
      { nombre: "Psicología Educacional", creditos: 4 },
      { nombre: "Inglés III", creditos: 2 },
      { nombre: "Metodología de la Investigación II", creditos: 4 },
    ],
  },
  {
    nombre: "Semestre VI",
    ramos: [
      { nombre: "Evaluación Psicológica II", creditos: 4 },
      { nombre: "Técnicas de Intervención Psicoterapéutica I", creditos: 4 },
      { nombre: "Psicología Organizacional", creditos: 4 },
      { nombre: "Psicología Jurídica", creditos: 4 },
      { nombre: "Inglés IV", creditos: 2 },
    ],
  },
  {
    nombre: "Semestre VII",
    ramos: [
      { nombre: "Psicometría", creditos: 4 },
      { nombre: "Técnicas de Intervención Psicoterapéutica II", creditos: 4 },
      { nombre: "Optativo Profesional I", creditos: 4 },
      { nombre: "Ética Profesional", creditos: 4 },
      { nombre: "Taller de Integración I", creditos: 4 },
    ],
  },
  {
    nombre: "Semestre VIII",
    ramos: [
      { nombre: "Intervención en Crisis", creditos: 4 },
      { nombre: "Optativo Profesional II", creditos: 4 },
      { nombre: "Evaluación de Intervenciones Psicológicas", creditos: 4 },
      { nombre: "Taller de Integración II", creditos: 4 },
      { nombre: "Práctica Profesional I", creditos: 10 },
    ],
  },
  {
    nombre: "Semestre IX",
    ramos: [
      { nombre: "Seminario de Tesis I", creditos: 4 },
      { nombre: "Supervisión de Práctica Profesional I", creditos: 6 },
      { nombre: "Práctica Profesional II", creditos: 10 },
    ],
  },
  {
    nombre: "Semestre X",
    ramos: [
      { nombre: "Seminario de Tesis II", creditos: 4 },
      { nombre: "Supervisión de Práctica Profesional II", creditos: 6 },
      { nombre: "Práctica Profesional III", creditos: 10 },
    ],
  },
];

let totalCreditos = 0;
let cursados = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  malla.forEach((semestre) => {
    const columna = document.createElement("div");
    columna.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = semestre.nombre;
    columna.appendChild(titulo);

    semestre.ramos.forEach((ramo) => {
      totalCreditos += ramo.creditos;
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = ramo.nombre;
      div.onclick = () => toggleRamo(div, ramo);
      columna.appendChild(div);
    });

    contenedor.appendChild(columna);
  });
}

function toggleRamo(elemento, ramo) {
  const alerta = document.getElementById("alerta");
  alerta.textContent = "";

  // Validar prerrequisito
  if (
    ramo.prerrequisito &&
    !cursados.has(ramo.prerrequisito)
  ) {
    alerta.textContent = `⚠️ Para marcar "${ramo.nombre}", primero debes aprobar "${ramo.prerrequisito}".`;
    return;
  }

  if (elemento.classList.contains("cursado")) {
    elemento.classList.remove("cursado");
    cursados.delete(ramo.nombre);
  } else {
    elemento.classList.add("cursado");
    cursados.add(ramo.nombre);
  }

  actualizarAvance();
}

function actualizarAvance() {
  let suma = 0;
  malla.forEach((sem) => {
    sem.ramos.forEach((r) => {
      if (cursados.has(r.nombre)) suma += r.creditos;
    });
  });

  const porcentaje = ((suma / totalCreditos) * 100).toFixed(1);
  document.getElementById("avance").textContent = `Avance: ${porcentaje}%`;
}

crearMalla();
