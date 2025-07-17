const malla = document.getElementById("malla");
const porcentajeSpan = document.getElementById("porcentaje");

function crearRamo(nombre, semestre, prerrequisitos = []) {
  const ramo = document.createElement("div");
  ramo.className = "ramo";
  ramo.dataset.nombre = nombre;
  ramo.dataset.semestre = semestre;
  ramo.dataset.prerrequisitos = JSON.stringify(prerrequisitos);
  ramo.textContent = nombre;

  ramo.addEventListener("click", () => {
    const requisitos = JSON.parse(ramo.dataset.prerrequisitos);
    const todosCumplidos = requisitos.every(nombreReq => {
      const ramoReq = document.querySelector(`.ramo[data-nombre="${nombreReq}"]`);
      return ramoReq && ramoReq.classList.contains("completado");
    });

    if (requisitos.length === 0 || todosCumplidos) {
      ramo.classList.toggle("completado");
      guardarEstado();
      actualizarPorcentaje();
    } else {
      alert(`No puedes marcar "${nombre}" sin completar primero:\n- ${requisitos.join("\n- ")}`);
    }
  });

  return ramo;
}

function crearSemestre(numero) {
  const columna = document.createElement("div");
  columna.className = "columna";

  const titulo = document.createElement("div");
  titulo.className = "titulo-semestre";
  titulo.textContent = `Semestre ${numero}`;
  columna.appendChild(titulo);

  return columna;
}

function guardarEstado() {
  const estado = {};
  document.querySelectorAll(".ramo").forEach(ramo => {
    estado[ramo.dataset.nombre] = ramo.classList.contains("completado");
  });
  localStorage.setItem("estadoMalla", JSON.stringify(estado));
}

function cargarEstado() {
  const estado = JSON.parse(localStorage.getItem("estadoMalla") || "{}");
  document.querySelectorAll(".ramo").forEach(ramo => {
    if (estado[ramo.dataset.nombre]) {
      ramo.classList.add("completado");
    }
  });
}

function actualizarPorcentaje() {
  const total = document.querySelectorAll(".ramo").length;
  const completados = document.querySelectorAll(".ramo.completado").length;
  const porcentaje = Math.round((completados / total) * 100);
  porcentajeSpan.textContent = porcentaje;
}

// MALLA PERSONALIZADA - tus ramos exactos
const estructura = [
  // Semestre 1
  {
    numero: 1,
    ramos: [
      "Teorías Psicológicas",
      "Psicofisiología",
      "Bases Socioantropológicas del Comportamiento",
      "Expresión Oral y Escrita",
      "Gestión Personal"
    ]
  },
  // Semestre 2
  {
    numero: 2,
    ramos: [
      { nombre: "Taller de Introducción a la Profesión", prerequisitos: [] },
      { nombre: "Neuropsicología", prerequisitos: ["Psicofisiología"] },
      "Procesos Psicológicos Básicos",
      "Herramientas y Métodos Básicos para la Ciencia",
      "Pensamiento Lógico-Matemático"
    ]
  },
  // Semestre 3
  {
    numero: 3,
    ramos: [
      { nombre: "Taller de Introducción a la Psicología", prerequisitos: ["Taller de Introducción a la Profesión"] },
      "Psicología del Desarrollo",
      "Psicología Social",
      "Formación General",
      "Inglés I"
    ]
  },
  // Semestre 4
  {
    numero: 4,
    ramos: [
      "Metodología de la Investigación",
      "Psicología del Aprendizaje",
      "Psicología de la Familia y los Grupos",
      "Formación General",
      { nombre: "Inglés II", prerequisitos: ["Inglés I"] }
    ]
  },
  // Semestre 5
  {
    numero: 5,
    ramos: [
      { nombre: "Taller de Investigación Cuantitativa", prerequisitos: ["Metodología de la Investigación"] },
      "Psicología Clínica",
      "Seminario de Educación y Psicología",
      "Formación General",
      { nombre: "Inglés III", prerequisitos: ["Inglés II"] }
    ]
  },
  // Semestre 6
  {
    numero: 6,
    ramos: [
      { nombre: "Taller de Investigación Cualitativa", prerequisitos: ["Metodología de la Investigación", "Taller de Investigación Cuantitativa"] },
      { nombre: "Psicopatología", prerequisitos: ["Psicología Clínica"] },
      "Psicología del Desarrollo Organizacional",
      "Formación General",
      { nombre: "Inglés IV", prerequisitos: ["Inglés III"] }
    ]
  },
  // Semestre 7
  {
    numero: 7,
    ramos: [
      "Taller de Bienestar Psicológico",
      { nombre: "Seminario Clínica Infantocuvenil", prerequisitos: ["Psicopatología"] },
      "Psicometría",
      "Psicología Comunitaria",
      "Políticas Públicas y Desarrollo de Capacidades"
    ]
  },
  // Semestre 8
  {
    numero: 8,
    ramos: [
      "Taller de Investigación de Intervención en Comunidades",
      "Psicología Jurídica",
      "Evaluación Psicológica",
      "Seminario Gestión de Personas",
      "Ética Profesional"
    ]
  },
  // Semestre 9
  {
    numero: 9,
    ramos: [
      { nombre: "Práctica Profesional", prerequisitos: ["Taller de Bienestar Psicológico", "Taller de Investigación de Intervención en Comunidades"] },
      { nombre: "Taller Clínico Infantocuvenil", prerequisitos: ["Psicopatología", "Seminario Clínica Infantocuvenil"] }
    ]
  },
  // Semestre 10
  {
    numero: 10,
    ramos: [
      { nombre: "Memoria", prerequisitos: ["Taller de Investigación Cuantitativa", "Taller de Investigación Cualitativa"] },
      "Taller Clínico Adulto"
    ]
  }
];

// Construir la malla
estructura.forEach(semestre => {
  const columna = crearSemestre(semestre.numero);
  semestre.ramos.forEach(ramoInfo => {
    let ramo;
    if (typeof ramoInfo === "string") {
      ramo = crearRamo(ramoInfo, semestre.numero);
    } else {
      ramo = crearRamo(ramoInfo.nombre, semestre.numero, ramoInfo.prerrequisitos);
    }
    columna.appendChild(ramo);
  });
  malla.appendChild(columna);
});

cargarEstado();
actualizarPorcentaje();
