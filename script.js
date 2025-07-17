const malla = [
  {
    semestre: 1,
    ramos: [
      { nombre: "Teorías Psicológicas", prerreq: [] },
      { nombre: "Psicofisiología", prerreq: [] },
      { nombre: "Bases Socioantropológicas del Comportamiento", prerreq: [] },
      { nombre: "Expresión Oral y Escrita", prerreq: [] },
      { nombre: "Gestión Personal", prerreq: [] },
    ],
  },
  {
    semestre: 2,
    ramos: [
      { nombre: "Taller de Introducción a la Profesión", prerreq: [] },
      { nombre: "Neuropsicología", prerreq: ["Psicofisiología"] },
      { nombre: "Procesos Psicológicos Básicos", prerreq: [] },
      { nombre: "Herramientas y Métodos Básicos para la Ciencia", prerreq: [] },
      { nombre: "Pensamiento Lógico-Matemático", prerreq: [] },
    ],
  },
  {
    semestre: 3,
    ramos: [
      { nombre: "Taller de Introducción a la Psicología", prerreq: ["Taller de Introducción a la Profesión"] },
      { nombre: "Psicología del Desarrollo", prerreq: [] },
      { nombre: "Psicología Social", prerreq: [] },
      { nombre: "Formación General", prerreq: [] },
      { nombre: "Inglés I", prerreq: [] },
    ],
  },
  {
    semestre: 4,
    ramos: [
      { nombre: "Metodología de la Investigación", prerreq: [] },
      { nombre: "Psicología del Aprendizaje", prerreq: [] },
      { nombre: "Psicología de la Familia y los Grupos", prerreq: [] },
      { nombre: "Formación General", prerreq: [] },
      { nombre: "Inglés II", prerreq: ["Inglés I"] },
    ],
  },
  {
    semestre: 5,
    ramos: [
      { nombre: "Taller de Investigación Cuantitativa", prerreq: ["Metodología de la Investigación"] },
      { nombre: "Psicología Clínica", prerreq: [] },
      { nombre: "Seminario de Educación y Psicología", prerreq: [] },
      { nombre: "Formación General", prerreq: [] },
      { nombre: "Inglés III", prerreq: ["Inglés II"] },
    ],
  },
  {
    semestre: 6,
    ramos: [
      {
        nombre: "Taller de Investigación Cualitativa",
        prerreq: ["Taller de Investigación Cuantitativa", "Metodología de la Investigación"],
      },
      { nombre: "Psicopatología", prerreq: ["Psicología Clínica"] },
      { nombre: "Psicología del Desarrollo Organizacional", prerreq: [] },
      { nombre: "Formación General", prerreq: [] },
      { nombre: "Inglés IV", prerreq: ["Inglés III"] },
    ],
  },
  {
    semestre: 7,
    ramos: [
      { nombre: "Taller de Bienestar Psicológico", prerreq: [] },
      { nombre: "Seminario Clínica Infantojuvenil", prerreq: ["Psicopatología"] },
      { nombre: "Psicometría", prerreq: [] },
      { nombre: "Psicología Comunitaria", prerreq: [] },
      { nombre: "Políticas Públicas y Desarrollo de Capacidades", prerreq: [] },
    ],
  },
  {
    semestre: 8,
    ramos: [
      { nombre: "Taller de Investigación de Intervención en Comunidades", prerreq: [] },
      { nombre: "Psicología Jurídica", prerreq: [] },
      { nombre: "Evaluación Psicológica", prerreq: [] },
      { nombre: "Seminario Gestión de Personas", prerreq: [] },
      { nombre: "Ética Profesional", prerreq: [] },
    ],
  },
  {
    semestre: 9,
    ramos: [
      {
        nombre: "Práctica Profesional",
        prerreq: ["Taller de Bienestar Psicológico", "Taller de Investigación de Intervención en Comunidades"],
      },
      {
        nombre: "Taller Clínico Infantojuvenil",
        prerreq: ["Psicopatología", "Seminario Clínica Infantojuvenil"],
      },
    ],
  },
  {
    semestre: 10,
    ramos: [
      {
        nombre: "Memoria",
        prerreq: ["Taller de Investigación Cuantitativa", "Taller de Investigación Cualitativa"],
      },
      { nombre: "Taller Clínico Adulto", prerreq: [] },
    ],
  },
];

// Estado para saber qué ramos se han marcado como cursados
const cursados = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  const alerta = document.getElementById("alerta");
  const avance = document.getElementById("avance");

  contenedor.innerHTML = ""; // limpiar contenedor

  let totalRamos = 0;

  malla.forEach(({ semestre, ramos }) => {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${semestre}`;
    divSemestre.appendChild(titulo);

    ramos.forEach(({ nombre, prerreq }) => {
      totalRamos++;

      const divRamo = document.createElement("div");
      divRamo.className = "ramo";
      divRamo.textContent = nombre;

      if (cursados.has(nombre)) {
        divRamo.classList.add("cursado");
      }

      divRamo.onclick = () => {
        // Validar prerrequisitos
        const faltan = prerreq.filter((pr) => !cursados.has(pr));
        if (faltan.length > 0) {
          alerta.textContent = `Debes cursar primero: ${faltan.join(", ")}`;
          setTimeout(() => (alerta.textContent = ""), 3000);
          return;
        }

        if (cursados.has(nombre)) {
          cursados.delete(nombre);
          divRamo.classList.remove("cursado");
        } else {
          cursados.add(nombre);
          divRamo.classList.add("cursado");
        }

        actualizarAvance();
      };

      divSemestre.appendChild(divRamo);
    });

    contenedor.appendChild(divSemestre);
  });

  // Actualizar avance inicial
  actualizarAvance();

  function actualizarAvance() {
    const porcentaje = ((cursados.size / totalRamos) * 100).toFixed(1);
    avance.textContent = `Avance: ${porcentaje}%`;
  }
}

document.addEventListener("DOMContentLoaded", crearMalla);
