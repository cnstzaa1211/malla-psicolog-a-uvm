// Datos de ramos con prerrequisitos
const ramos = [
  // semestre, código, nombre, prerrequisitos (array de códigos)
  {sem: 1, codigo: 'TIF', nombre: 'Taller Introducción a la Profesión', prerreq: []},
  {sem: 2, codigo: 'TIP', nombre: 'Taller Introducción a la Psicología', prerreq: ['TIF']},
  {sem: 2, codigo: 'PSI', nombre: 'Psicología General', prerreq: []},
  {sem: 3, codigo: 'PSF', nombre: 'Psicofisiología', prerreq: ['PSI']},
  {sem: 4, codigo: 'NEU', nombre: 'Neuropsicología', prerreq: ['PSF']},
  {sem: 5, codigo: 'PSI2', nombre: 'Psicología Social', prerreq: []},
  {sem: 7, codigo: 'PSM', nombre: 'Psicometría', prerreq: ['PSI', 'PSI2']},
  // más ramos aquí...
];

const mallaDiv = document.getElementById('malla');
const avanceDiv = document.getElementById('avance');
const alertaDiv = document.getElementById('alerta');

// Determinar semestre máximo para crear columnas
const semestres = [...new Set(ramos.map(r => r.sem))].sort((a,b)=>a-b);

// Estado ramos cursados
let cursados = new Set();

// Crear columnas semestre
semestres.forEach(sem => {
  const col = document.createElement('div');
  col.className = 'semestre';
  col.id = 'sem' + sem;

  const titulo = document.createElement('h2');
  titulo.textContent = 'Semestre ' + sem;
  col.appendChild(titulo);

  // Ramos de ese semestre
  ramos.filter(r => r.sem === sem).forEach(ramo => {
    const ramoDiv = document.createElement('div');
    ramoDiv.className = 'ramo';
    ramoDiv.id = ramo.codigo;
    ramoDiv.textContent = ramo.nombre;
    ramoDiv.title = `Código: ${ramo.codigo}\nPrerrequisitos: ${ramo.prerreq.length > 0 ? ramo.prerreq.join(', ') : 'Ninguno'}`;

    ramoDiv.onclick = () => toggleRamo(ramo.codigo);

    col.appendChild(ramoDiv);
  });

  mallaDiv.appendChild(col);
});

function toggleRamo(codigo) {
  alertaDiv.textContent = '';

  // Buscar ramo
  const ramo = ramos.find(r => r.codigo === codigo);
  if (!ramo) return;

  // Si ya cursado, desmarcar sin restricciones
  if (cursados.has(codigo)) {
    cursados.delete(codigo);
    updateUI();
    return;
  }

  // Verificar prerrequisitos
  const faltantes = ramo.prerreq.filter(pr => !cursados.has(pr));
  if (faltantes.length > 0) {
    alertaDiv.textContent = `No puedes marcar "${ramo.nombre}" porque faltan prerrequisitos: ${faltantes.join(', ')}`;
    return;
  }

  // Marcar como cursado
  cursados.add(codigo);
  updateUI();
}

function updateUI() {
  // Actualizar clases ramos
  ramos.forEach(ramo => {
    const el = document.getElementById(ramo.codigo);
    if (cursados.has(ramo.codigo)) {
      el.classList.add('cursado');
    } else {
      el.classList.remove('cursado');
    }
  });

  // Calcular porcentaje
  const porcentaje = Math.round((cursados.size / ramos.length) * 100);
  avanceDiv.textContent = `Avance: ${porcentaje}%`;
}
