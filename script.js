const ramos = [
  // SEMESTRE 1
  {sem: 1, codigo: 'TIF', nombre: 'Taller de Introducción a la Profesión', prerreq: []},
  {sem: 1, codigo: 'CSO', nombre: 'Construcción del Sujeto de Observación', prerreq: []},
  {sem: 1, codigo: 'COM1', nombre: 'Comunicación Oral y Escrita I', prerreq: []},
  {sem: 1, codigo: 'FILSOC', nombre: 'Filosofía y Sociedad', prerreq: []},
  
  // SEMESTRE 2
  {sem: 2, codigo: 'TIP', nombre: 'Taller de Introducción a la Psicología', prerreq: ['TIF']},
  {sem: 2, codigo: 'PSIG', nombre: 'Psicología General', prerreq: []},
  {sem: 2, codigo: 'HISTPSI', nombre: 'Historia de la Psicología', prerreq: []},
  {sem: 2, codigo: 'COM2', nombre: 'Comunicación Oral y Escrita II', prerreq: ['COM1']},

  // SEMESTRE 3
  {sem: 3, codigo: 'PSF', nombre: 'Psicofisiología', prerreq: ['PSIG']},
  {sem: 3, codigo: 'EDU', nombre: 'Psicología Educacional', prerreq: ['PSIG']},
  {sem: 3, codigo: 'DESA1', nombre: 'Psicología del Desarrollo I', prerreq: ['PSIG']},
  {sem: 3, codigo: 'ING1', nombre: 'Inglés I', prerreq: []},

  // SEMESTRE 4
  {sem: 4, codigo: 'PSCL', nombre: 'Psicología Clínica', prerreq: ['PSIG']},
  {sem: 4, codigo: 'SOC', nombre: 'Psicología Social', prerreq: ['PSIG']},
  {sem: 4, codigo: 'DESA2', nombre: 'Psicología del Desarrollo II', prerreq: ['DESA1']},
  {sem: 4, codigo: 'ING2', nombre: 'Inglés II', prerreq: ['ING1']},

  // SEMESTRE 5
  {sem: 5, codigo: 'PSORG', nombre: 'Psicología Organizacional', prerreq: ['PSIG']},
  {sem: 5, codigo: 'MET1', nombre: 'Metodología de la Investigación I', prerreq: []},
  {sem: 5, codigo: 'EVAL1', nombre: 'Evaluación Psicológica I', prerreq: ['PSCL']},
  {sem: 5, codigo: 'ING3', nombre: 'Inglés III', prerreq: ['ING2']},

  // SEMESTRE 6
  {sem: 6, codigo: 'MET2', nombre: 'Metodología de la Investigación II', prerreq: ['MET1']},
  {sem: 6, codigo: 'EVAL2', nombre: 'Evaluación Psicológica II', prerreq: ['EVAL1']},
  {sem: 6, codigo: 'NEURO', nombre: 'Neuropsicología', prerreq: ['PSF']},
  {sem: 6, codigo: 'ING4', nombre: 'Inglés IV', prerreq: ['ING3']},

  // SEMESTRE 7
  {sem: 7, codigo: 'PSICO', nombre: 'Psicometría', prerreq: ['EVAL2', 'MET2']},
  {sem: 7, codigo: 'PSCOM', nombre: 'Psicología Comunitaria', prerreq: ['SOC']},
  {sem: 7, codigo: 'PSCUL', nombre: 'Psicología Cultural', prerreq: []},
  {sem: 7, codigo: 'OPT1', nombre: 'Optativo I', prerreq: []},

  // SEMESTRE 8
  {sem: 8, codigo: 'ETICA', nombre: 'Ética Profesional', prerreq: []},
  {sem: 8, codigo: 'TRS1', nombre: 'Taller de Resolución de Situaciones I', prerreq: []},
  {sem: 8, codigo: 'EPI', nombre: 'Epistemología', prerreq: []},
  {sem: 8, codigo: 'OPT2', nombre: 'Optativo II', prerreq: []},
];

function crearMalla() {
  const mallaDiv = document.getElementById('malla');
  const avanceDiv = document.getElementById('avance');
  const alertaDiv = document.getElementById('alerta');
  const ramosCursados = new Set();

  const total = ramos.length;
  const columnas = {};

  ramos.forEach(ramo => {
    if (!columnas[ramo.sem]) {
      const col = document.createElement('div');
      col.className = 'semestre';
      col.innerHTML = `<h2>Semestre ${ramo.sem}</h2>`;
      columnas[ramo.sem] = col;
      mallaDiv.appendChild(col);
    }

    const div = document.createElement('div');
    div.className = 'ramo';
    div.textContent = ramo.nombre;
    div.dataset.codigo = ramo.codigo;

    div.onclick = () => {
      if (div.classList.contains('cursado')) {
        div.classList.remove('cursado');
        ramosCursados.delete(ramo.codigo);
      } else {
        const faltan = ramo.prerreq.filter(p => !ramosCursados.has(p));
        if (faltan.length === 0) {
          div.classList.add('cursado');
          ramosCursados.add(ramo.codigo);
        } else {
          alertaDiv.textContent = `Debes cursar antes: ${faltan.join(', ')}`;
          setTimeout(() => alertaDiv.textContent = '', 3000);
          return;
        }
      }

      const porcentaje = ((ramosCursados.size / total) * 100).toFixed(1);
      avanceDiv.textContent = `Avance: ${porcentaje}%`;
    };

    columnas[ramo.sem].appendChild(div);
  });
}

crearMalla();
