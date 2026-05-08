// ========================================
// DETALLE ALUMNO PAGE RENDERER
// ========================================

function renderDetalleAlumno(id) {
  const container = document.getElementById('view-detalle-alumno');
  const alumno = alumnosMatriculados.find(a => a.id === parseInt(id));

  if (!alumno) {
    container.innerHTML = `
      <div style="text-align:center;padding:60px">
        ${Icons.user(48, 'var(--gray-300)')}
        <h2 style="font-size:18px;font-weight:700;color:var(--gray-600);margin-top:16px">Alumno no encontrado</h2>
        <button onclick="Router.navigate('matriculas')" style="color:#D96236;font-size:13px;background:none;border:none;cursor:pointer;margin-top:8px">← Volver a la lista</button>
      </div>`;
    return;
  }

  function infoRow(iconFn, label, value) {
    return `<div class="info-row">
      ${iconFn(15, 'var(--gray-400)')}
      <div>
        <p class="info-row-label">${label}</p>
        <p class="info-row-value">${value || '—'}</p>
      </div>
    </div>`;
  }

  const estadoBg = alumno.estado === 'Matriculado' ? 'rgba(5,150,105,0.2)' : 'rgba(220,38,38,0.2)';
  const pagoBg = alumno.estadoPago === 'Pagado' ? 'rgba(5,150,105,0.2)' : 'rgba(217,119,6,0.2)';

  container.innerHTML = `
    <div class="animate-fade-in">
      <!-- Header -->
      <div class="page-header">
        <div style="display:flex;align-items:center;gap:12px">
          <button class="btn-back-icon" onclick="Router.navigate('matriculas')">${Icons.arrowLeft(18)}</button>
          <div>
            <h1>${alumno.nombres} ${alumno.apellidos}</h1>
            <p>Código: <span style="font-family:monospace;font-weight:600;color:#8C452B">${alumno.codigo}</span></p>
          </div>
        </div>
        <div class="page-header-actions">
          <button class="btn-outline">${Icons.printer(14)} Imprimir</button>
          <button class="btn-primary">${Icons.edit(14)} Editar</button>
        </div>
      </div>

      <!-- Banner -->
      <div class="detail-banner">
        <img src="public/images/school-building.jpg" alt="Colegio">
        <div class="detail-banner-overlay">
          <div class="detail-avatar">${alumno.nombres[0]}${alumno.apellidos[0]}</div>
          <div class="detail-banner-info">
            <h2>${alumno.nombres} ${alumno.apellidos}</h2>
            <p>${alumno.nivel} — ${alumno.grado} "${alumno.seccion}" | ${alumno.tipoMatricula}</p>
            <div class="detail-badges">
              <span class="detail-badge" style="background:${estadoBg}">${alumno.estado}</span>
              <span class="detail-badge" style="background:${pagoBg}">${alumno.estadoPago}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Grid -->
      <div class="detail-grid">
        <!-- Student Info -->
        <div class="card">
          <div class="section-title">${Icons.user(17, '#8C452B')}<h3>Información del Alumno</h3></div>
          ${infoRow(Icons.user, 'Nombres', `${alumno.nombres} ${alumno.apellidos}`)}
          ${infoRow(Icons.fileText, 'DNI', alumno.dni)}
          ${infoRow(Icons.calendar, 'Fecha de Nacimiento', alumno.fechaNacimiento)}
          ${infoRow(Icons.user, 'Género', alumno.genero)}
          ${infoRow(Icons.mapPin, 'Dirección', alumno.direccion)}
        </div>

        <!-- Guardian Info -->
        <div class="card">
          <div class="section-title">${Icons.users(17, '#8C452B')}<h3>Información del Apoderado</h3></div>
          ${infoRow(Icons.user, 'Nombre', alumno.apoderado.nombre)}
          ${infoRow(Icons.fileText, 'DNI', alumno.apoderado.dni)}
          ${infoRow(Icons.phone, 'Teléfono', alumno.apoderado.telefono)}
          ${infoRow(Icons.mail, 'Email', alumno.apoderado.email)}
          ${infoRow(Icons.users, 'Parentesco', alumno.apoderado.parentesco)}
          ${infoRow(Icons.graduationCap, 'Ocupación', alumno.apoderado.ocupacion)}
        </div>

        <!-- Academic & Payment -->
        <div class="card">
          <div class="section-title">${Icons.graduationCap(17, '#8C452B')}<h3>Datos Académicos y Pago</h3></div>
          ${infoRow(Icons.graduationCap, 'Nivel', alumno.nivel)}
          ${infoRow(Icons.fileText, 'Grado / Sección', `${alumno.grado} "${alumno.seccion}"`)}
          ${infoRow(Icons.calendar, 'Fecha de Matrícula', alumno.fechaMatricula)}
          ${infoRow(Icons.fileText, 'Tipo de Matrícula', alumno.tipoMatricula)}
          ${infoRow(Icons.creditCard, 'Monto Matrícula', `S/. ${alumno.montoMatricula}`)}
          ${infoRow(Icons.creditCard, 'Pensión Mensual', `S/. ${alumno.montoPension}`)}
          ${alumno.observaciones ? infoRow(Icons.fileText, 'Observaciones', alumno.observaciones) : ''}
        </div>
      </div>
    </div>`;
}
