// ========================================
// NUEVA MATRÍCULA PAGE RENDERER
// ========================================

const nuevaMatriculaState = {
  step: 1,
  form: {
    nombres: '', apellidos: '', dni: '', fechaNacimiento: '', genero: 'Masculino',
    direccion: '', nivel: '', grado: '', seccion: '', tipoMatricula: 'Regular',
    apoNombre: '', apoDni: '', apoTelefono: '', apoEmail: '', apoParentesco: 'Madre', apoOcupacion: '',
    observaciones: '',
  },
  saved: false,
};

function renderNuevaMatricula() {
  const s = nuevaMatriculaState;
  const container = document.getElementById('view-nueva-matricula');

  if (s.saved) {
    container.innerHTML = `
      <div class="success-state">
        <div class="success-icon">${Icons.checkCircle(36, '#059669')}</div>
        <h2>¡Matrícula Registrada!</h2>
        <p>El alumno ha sido matriculado exitosamente. Redirigiendo...</p>
      </div>`;
    setTimeout(() => {
      s.saved = false;
      s.step = 1;
      s.form = { nombres:'',apellidos:'',dni:'',fechaNacimiento:'',genero:'Masculino',direccion:'',nivel:'',grado:'',seccion:'',tipoMatricula:'Regular',apoNombre:'',apoDni:'',apoTelefono:'',apoEmail:'',apoParentesco:'Madre',apoOcupacion:'',observaciones:'' };
      Router.navigate('matriculas');
    }, 2000);
    return;
  }

  const steps = [
    { id: 1, label: 'Datos del Alumno', icon: Icons.user },
    { id: 2, label: 'Datos del Apoderado', icon: Icons.users },
    { id: 3, label: 'Nivel y Grado', icon: Icons.fileText },
    { id: 4, label: 'Confirmación', icon: Icons.checkCircle },
  ];

  const gradosDisp = s.form.nivel ? (niveles.find(n => n.nombre === s.form.nivel)?.grados || []) : [];
  const seccionesDisp = s.form.grado ? (gradosDisp.find(g => g.nombre === s.form.grado)?.secciones || []) : [];
  const tarifa = s.form.nivel ? tarifas[s.form.nivel.toLowerCase()] : null;

  function field(label, field, val, type = 'text', placeholder = '', required = true) {
    return `<div class="form-field">
      <label class="form-label">${label} ${required ? '<span class="required">*</span>' : ''}</label>
      <input class="form-input" type="${type}" data-field="${field}" value="${val || ''}" placeholder="${placeholder}" ${required ? 'required' : ''}>
    </div>`;
  }

  let stepContent = '';

  if (s.step === 1) {
    stepContent = `
      <h3>Datos del Alumno</h3>
      <p class="form-subtitle">Información personal del estudiante</p>
      <div class="form-row">
        ${field('Nombres', 'nombres', s.form.nombres, 'text', 'Ej: María Elena')}
        ${field('Apellidos', 'apellidos', s.form.apellidos, 'text', 'Ej: García Quispe')}
        ${field('DNI', 'dni', s.form.dni, 'text', 'Ej: 76543210')}
        ${field('Fecha de Nacimiento', 'fechaNacimiento', s.form.fechaNacimiento, 'date')}
        <div class="form-field">
          <label class="form-label">Género <span class="required">*</span></label>
          <select class="form-input" data-field="genero" style="cursor:pointer">
            <option ${s.form.genero === 'Masculino' ? 'selected' : ''}>Masculino</option>
            <option ${s.form.genero === 'Femenino' ? 'selected' : ''}>Femenino</option>
          </select>
        </div>
        <div class="form-field-full">
          <label class="form-label">Dirección</label>
          <input class="form-input" data-field="direccion" value="${s.form.direccion}" placeholder="Ej: Jr. Cusco 234, Cusco">
        </div>
      </div>`;
  } else if (s.step === 2) {
    stepContent = `
      <h3>Datos del Apoderado</h3>
      <p class="form-subtitle">Información del padre, madre o tutor</p>
      <div class="form-row">
        ${field('Nombre Completo', 'apoNombre', s.form.apoNombre, 'text', 'Ej: Rosa Quispe Mamani')}
        ${field('DNI', 'apoDni', s.form.apoDni, 'text', 'Ej: 40123456')}
        ${field('Teléfono', 'apoTelefono', s.form.apoTelefono, 'text', 'Ej: 984567123')}
        ${field('Email', 'apoEmail', s.form.apoEmail, 'email', 'Ej: correo@gmail.com', false)}
        <div class="form-field">
          <label class="form-label">Parentesco <span class="required">*</span></label>
          <select class="form-input" data-field="apoParentesco" style="cursor:pointer">
            ${['Madre','Padre','Tutor(a)','Abuelo(a)','Otro'].map(p => `<option ${s.form.apoParentesco === p ? 'selected' : ''}>${p}</option>`).join('')}
          </select>
        </div>
        ${field('Ocupación', 'apoOcupacion', s.form.apoOcupacion, 'text', 'Ej: Profesora', false)}
      </div>`;
  } else if (s.step === 3) {
    stepContent = `
      <h3>Nivel Educativo y Grado</h3>
      <p class="form-subtitle">Seleccione el nivel, grado y sección</p>
      <div class="form-row">
        <div class="form-field">
          <label class="form-label">Nivel <span class="required">*</span></label>
          <select class="form-input" data-field="nivel" id="nm-nivel" style="cursor:pointer">
            <option value="">Seleccione nivel</option>
            ${niveles.map(n => `<option value="${n.nombre}" ${s.form.nivel === n.nombre ? 'selected' : ''}>${n.nombre}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label class="form-label">Grado <span class="required">*</span></label>
          <select class="form-input" data-field="grado" id="nm-grado" style="cursor:pointer" ${!s.form.nivel ? 'disabled' : ''}>
            <option value="">Seleccione grado</option>
            ${gradosDisp.map(g => `<option value="${g.nombre}" ${s.form.grado === g.nombre ? 'selected' : ''}>${g.nombre}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label class="form-label">Sección <span class="required">*</span></label>
          <select class="form-input" data-field="seccion" id="nm-seccion" style="cursor:pointer" ${!s.form.grado ? 'disabled' : ''}>
            <option value="">Seleccione sección</option>
            ${seccionesDisp.map(sec => `<option value="${sec}" ${s.form.seccion === sec ? 'selected' : ''}>${sec}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label class="form-label">Tipo de Matrícula</label>
          <select class="form-input" data-field="tipoMatricula" style="cursor:pointer">
            ${['Regular','Nuevo','Traslado'].map(t => `<option ${s.form.tipoMatricula === t ? 'selected' : ''}>${t}</option>`).join('')}
          </select>
        </div>
        <div class="form-field-full">
          <label class="form-label">Observaciones</label>
          <textarea class="form-input" data-field="observaciones" rows="3" placeholder="Observaciones adicionales (opcional)" style="resize:vertical">${s.form.observaciones}</textarea>
        </div>
      </div>
      ${tarifa ? `
        <div class="tarifa-info">
          <div><p class="tarifa-item-label">Matrícula</p><p class="tarifa-item-value" style="color:#8C452B">S/. ${tarifa.matricula}</p></div>
          <div><p class="tarifa-item-label">Pensión Mensual</p><p class="tarifa-item-value" style="color:#D96236">S/. ${tarifa.pension}</p></div>
        </div>` : ''}`;
  } else if (s.step === 4) {
    const docs = s.form.nivel ? (documentosRequeridos[s.form.nivel.toLowerCase()] || []) : [];
    stepContent = `
      <h3>Confirmar Matrícula</h3>
      <p class="form-subtitle">Revise los datos antes de registrar</p>
      <div class="summary-grid">
        <div class="summary-box">
          <p class="summary-box-title">Alumno</p>
          <h4>${s.form.nombres} ${s.form.apellidos}</h4>
          <p>DNI: ${s.form.dni}</p>
          <p>Nacimiento: ${s.form.fechaNacimiento}</p>
          <p>Género: ${s.form.genero}</p>
          ${s.form.direccion ? `<p>Dir: ${s.form.direccion}</p>` : ''}
        </div>
        <div class="summary-box">
          <p class="summary-box-title">Apoderado</p>
          <h4>${s.form.apoNombre}</h4>
          <p>DNI: ${s.form.apoDni}</p>
          <p>Tel: ${s.form.apoTelefono}</p>
          <p>Parentesco: ${s.form.apoParentesco}</p>
        </div>
        <div class="summary-box">
          <p class="summary-box-title">Matrícula</p>
          <h4>${s.form.nivel} — ${s.form.grado} "${s.form.seccion}"</h4>
          <p>Tipo: ${s.form.tipoMatricula}</p>
          ${tarifa ? `<p>Monto: S/. ${tarifa.matricula}</p>` : ''}
          ${s.form.observaciones ? `<p>Obs: ${s.form.observaciones}</p>` : ''}
        </div>
      </div>
      ${docs.length ? `
        <div class="docs-required">
          <p class="docs-title">Documentos Requeridos</p>
          <div class="docs-grid">${docs.map(d => `<p class="doc-item"><span class="doc-dot"></span>${d}</p>`).join('')}</div>
        </div>` : ''}`;
  }

  container.innerHTML = `
    <div class="animate-fade-in">
      <div class="back-header">
        <button class="btn-back-icon" onclick="Router.navigate('matriculas')">${Icons.arrowLeft(18)}</button>
        <div>
          <h1 style="font-size:22px;font-weight:800;color:var(--gray-800)">Nueva Matrícula</h1>
          <p style="font-size:12px;color:var(--gray-400)">Complete los datos para registrar una nueva matrícula</p>
        </div>
      </div>

      <div class="steps-bar">
        ${steps.map(st => {
          const cls = s.step === st.id ? 'active' : s.step > st.id ? 'done' : '';
          return `<button class="step-btn ${cls}" data-step="${st.id}">${st.icon(16)} ${st.label}</button>`;
        }).join('')}
      </div>

      <div class="form-card">${stepContent}
        <div class="form-nav">
          <button class="btn-back" id="nm-prev">${Icons.arrowLeft(16)} ${s.step === 1 ? 'Cancelar' : 'Anterior'}</button>
          ${s.step < 4
            ? `<button class="btn-next" id="nm-next">Siguiente</button>`
            : `<button class="btn-save" id="nm-save">${Icons.save(16)} Registrar Matrícula</button>`
          }
        </div>
      </div>
    </div>`;

  // Bind form inputs
  container.querySelectorAll('[data-field]').forEach(el => {
    el.addEventListener('input', e => {
      s.form[e.target.dataset.field] = e.target.value;
    });
    el.addEventListener('change', e => {
      s.form[e.target.dataset.field] = e.target.value;
      if (e.target.dataset.field === 'nivel') { s.form.grado = ''; s.form.seccion = ''; renderNuevaMatricula(); }
      if (e.target.dataset.field === 'grado') { s.form.seccion = ''; renderNuevaMatricula(); }
    });
  });

  // Step buttons
  container.querySelectorAll('.step-btn').forEach(btn => {
    btn.addEventListener('click', () => { s.step = parseInt(btn.dataset.step); renderNuevaMatricula(); });
  });

  // Navigation
  document.getElementById('nm-prev')?.addEventListener('click', () => {
    if (s.step > 1) { s.step--; renderNuevaMatricula(); }
    else Router.navigate('matriculas');
  });
  document.getElementById('nm-next')?.addEventListener('click', () => {
    s.step++;
    renderNuevaMatricula();
  });
  document.getElementById('nm-save')?.addEventListener('click', () => {
    s.saved = true;
    renderNuevaMatricula();
  });
}
