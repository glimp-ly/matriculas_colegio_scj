// ========================================
// CONFIGURACIÓN PAGE RENDERER
// ========================================

const configState = { tab: 'general', saved: false };

function renderConfiguracion() {
  const container = document.getElementById('view-configuracion');
  const s = configState;

  const tabs = [
    { id: 'general', label: 'General', icon: Icons.school },
    { id: 'tarifas', label: 'Tarifas', icon: Icons.creditCard },
    { id: 'periodos', label: 'Períodos', icon: Icons.calendar },
    { id: 'documentos', label: 'Documentos', icon: Icons.fileText },
  ];

  let tabContent = '';

  if (s.tab === 'general') {
    const fields = [
      { label: 'Nombre', value: 'IEP Corazón de Jesús College' },
      { label: 'Código Modular', value: '0123456789' },
      { label: 'Director(a)', value: 'Martha Elena Villanueva Condori' },
      { label: 'Dirección', value: 'Av. El Sol 1234, Cusco' },
      { label: 'Teléfono', value: '(084) 234-567' },
      { label: 'Email', value: 'info@iepcorazon.edu.pe' },
    ];
    tabContent = `
      <div class="card" style="margin-bottom:20px">
        <h3 style="font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:4px">Datos de la Institución</h3>
        <p style="font-size:12px;color:var(--gray-400);margin-bottom:20px">Información general del colegio</p>
        <div class="config-field-grid">
          ${fields.map(f => `
            <div class="config-field">
              <label class="form-label">${f.label}</label>
              <input class="form-input" value="${f.value}">
            </div>
          `).join('')}
        </div>
        <div class="config-image">
          <img src="public/images/teacher.jpg" alt="Docente">
          <div class="config-image-overlay">
            <p>IEP Corazón de Jesús — Educación de calidad</p>
          </div>
        </div>
      </div>`;
  } else if (s.tab === 'tarifas') {
    tabContent = `
      <div class="card" style="margin-bottom:20px">
        <h3 style="font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:4px">Tarifas por Nivel</h3>
        <p style="font-size:12px;color:var(--gray-400);margin-bottom:20px">Costos de matrícula y pensión mensual</p>
        <div class="tarifa-card-grid">
          ${Object.entries(tarifas).map(([nivel, t]) => `
            <div class="tarifa-card">
              <h4>${nivel}</h4>
              <div class="tarifa-input-group">
                <label>Matrícula (S/.)</label>
                <input class="form-input" type="number" value="${t.matricula}">
              </div>
              <div class="tarifa-input-group">
                <label>Pensión Mensual (S/.)</label>
                <input class="form-input" type="number" value="${t.pension}">
              </div>
            </div>
          `).join('')}
        </div>
      </div>`;
  } else if (s.tab === 'periodos') {
    tabContent = `
      <div class="card" style="margin-bottom:20px">
        <h3 style="font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:4px">Años Lectivos</h3>
        <p style="font-size:12px;color:var(--gray-400);margin-bottom:20px">Gestión de períodos académicos</p>
        ${aniosLectivos.map(a => `
          <div class="periodo-item ${a.estado === 'Activo' ? 'active' : ''}">
            <div class="periodo-left">
              ${Icons.calendar(18, a.estado === 'Activo' ? '#059669' : 'var(--gray-400)')}
              <div>
                <p class="periodo-year">${a.anio}</p>
                <p class="periodo-dates">${a.fechaInicio} → ${a.fechaFin}</p>
              </div>
            </div>
            <span class="badge ${a.estado === 'Activo' ? 'badge-success' : ''}" style="${a.estado !== 'Activo' ? 'background:var(--gray-100);color:var(--gray-500)' : ''}">${a.estado}</span>
          </div>
        `).join('')}
      </div>`;
  } else if (s.tab === 'documentos') {
    tabContent = `
      <div class="card" style="margin-bottom:20px">
        <h3 style="font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:4px">Documentos Requeridos</h3>
        <p style="font-size:12px;color:var(--gray-400);margin-bottom:20px">Por nivel educativo</p>
        ${Object.entries(documentosRequeridos).map(([nivel, docs]) => `
          <div class="doc-level">
            <p class="doc-level-title">${nivel}</p>
            <div class="doc-list">
              ${docs.map(doc => `
                <div class="doc-list-item">
                  ${Icons.fileText(14, 'var(--gray-400)')}
                  <p>${doc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>`;
  }

  container.innerHTML = `
    <div class="animate-fade-in">
      <div class="page-header">
        <div>
          <h1>Configuración</h1>
          <p>Ajustes del sistema de matrículas</p>
        </div>
        <button class="btn-primary" id="config-save">${Icons.save(15)} Guardar Cambios</button>
      </div>

      ${s.saved ? `<div class="success-message">${Icons.checkCircle(18, '#059669')} Configuración guardada exitosamente</div>` : ''}

      <div class="tab-bar">
        ${tabs.map(t => `
          <button class="tab-btn ${s.tab === t.id ? 'active' : ''}" data-tab="${t.id}">
            ${t.icon(15)} ${t.label}
          </button>
        `).join('')}
      </div>

      ${tabContent}
    </div>`;

  // Bind events
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      s.tab = btn.dataset.tab;
      renderConfiguracion();
    });
  });

  document.getElementById('config-save')?.addEventListener('click', () => {
    s.saved = true;
    renderConfiguracion();
    setTimeout(() => { s.saved = false; renderConfiguracion(); }, 2500);
  });
}
