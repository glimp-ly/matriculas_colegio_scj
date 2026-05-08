// ========================================
// MATRICULAS LIST PAGE RENDERER
// ========================================

function renderMatriculas() {
  const container = document.getElementById('view-matriculas');
  const COLORS_GRAD = [
    ['#8C452B', '#D96236'],
    ['#D96236', '#F2A444'],
    ['#F2A444', '#F29441'],
  ];

  function render(search = '', filterNivel = 'Todos', filterEstado = 'Todos', filterPago = 'Todos') {
    const filtered = alumnosMatriculados.filter(a => {
      const matchSearch = search === '' ||
        `${a.nombres} ${a.apellidos}`.toLowerCase().includes(search.toLowerCase()) ||
        a.codigo.toLowerCase().includes(search.toLowerCase()) ||
        a.dni.includes(search);
      const matchNivel = filterNivel === 'Todos' || a.nivel === filterNivel;
      const matchEstado = filterEstado === 'Todos' || a.estado === filterEstado;
      const matchPago = filterPago === 'Todos' || a.estadoPago === filterPago;
      return matchSearch && matchNivel && matchEstado && matchPago;
    });

    // Desktop table rows
    let tableRows = '';
    if (filtered.length === 0) {
      tableRows = `
        <tr><td colspan="9" class="empty-state">
          ${Icons.users(40, 'var(--gray-300)')}
          <h3>No se encontraron alumnos</h3>
          <p>Intente con otros filtros o criterios de búsqueda</p>
        </td></tr>`;
    } else {
      tableRows = filtered.map((a, i) => {
        const grad = COLORS_GRAD[i % 3];
        const guardianShort = a.apoderado.nombre.split(' ').slice(0, 2).join(' ');
        return `
          <tr onclick="Router.navigate('detalle-alumno', {id: ${a.id}})">
            <td><span class="code-badge">${a.codigo}</span></td>
            <td>
              <div class="student-cell">
                <div class="student-avatar" style="background: linear-gradient(135deg, ${grad[0]}, ${grad[1]})">${a.nombres[0]}${a.apellidos[0]}</div>
                <div>
                  <p class="student-name">${a.nombres} ${a.apellidos}</p>
                  <p class="student-guardian">${a.apoderado.parentesco}: ${guardianShort}</p>
                </div>
              </div>
            </td>
            <td class="cell-mono">${a.dni}</td>
            <td class="cell-text">${a.nivel}</td>
            <td class="cell-bold">${a.grado} ${a.seccion}</td>
            <td class="cell-text">${a.tipoMatricula}</td>
            <td>${getEstadoBadge(a.estado)}</td>
            <td>${getPagoBadge(a.estadoPago)}</td>
            <td>
              <button class="btn-view" onclick="event.stopPropagation(); Router.navigate('detalle-alumno', {id: ${a.id}})">
                ${Icons.eye(13)} Ver
              </button>
            </td>
          </tr>`;
      }).join('');
    }

    // Mobile card view
    let mobileCards = '';
    if (filtered.length === 0) {
      mobileCards = `
        <div style="padding:40px 20px; text-align:center;">
          ${Icons.users(40, 'var(--gray-300)')}
          <h3 style="font-size:14px;font-weight:600;color:var(--gray-500);margin-top:10px">No se encontraron alumnos</h3>
          <p style="font-size:12px;color:var(--gray-400)">Intente con otros filtros</p>
        </div>`;
    } else {
      mobileCards = filtered.map((a, i) => {
        const grad = COLORS_GRAD[i % 3];
        return `
          <div class="mobile-student-card" onclick="Router.navigate('detalle-alumno', {id: ${a.id}})">
            <div class="mobile-card-header">
              <div class="student-avatar" style="background: linear-gradient(135deg, ${grad[0]}, ${grad[1]})">${a.nombres[0]}${a.apellidos[0]}</div>
              <div style="min-width:0;flex:1">
                <p class="student-name">${a.nombres} ${a.apellidos}</p>
                <p class="student-guardian">${a.apoderado.parentesco}: ${a.apoderado.nombre.split(' ').slice(0, 2).join(' ')}</p>
              </div>
            </div>
            <div class="mobile-card-meta">
              <div class="mobile-card-meta-item">
                <span class="mobile-card-meta-label">Código</span>
                <span class="mobile-card-meta-value" style="font-family:monospace;color:#8C452B">${a.codigo}</span>
              </div>
              <div class="mobile-card-meta-item">
                <span class="mobile-card-meta-label">DNI</span>
                <span class="mobile-card-meta-value">${a.dni}</span>
              </div>
              <div class="mobile-card-meta-item">
                <span class="mobile-card-meta-label">Nivel/Grado</span>
                <span class="mobile-card-meta-value">${a.nivel} - ${a.grado} ${a.seccion}</span>
              </div>
              <div class="mobile-card-meta-item">
                <span class="mobile-card-meta-label">Tipo</span>
                <span class="mobile-card-meta-value">${a.tipoMatricula}</span>
              </div>
            </div>
            <div class="mobile-card-footer">
              <div class="mobile-card-badges">
                ${getEstadoBadge(a.estado)}
                ${getPagoBadge(a.estadoPago)}
              </div>
              <button class="btn-view" onclick="event.stopPropagation(); Router.navigate('detalle-alumno', {id: ${a.id}})">
                ${Icons.eye(13)} Ver
              </button>
            </div>
          </div>`;
      }).join('');
    }

    container.innerHTML = `
      <div class="animate-fade-in">
        <div class="page-header">
          <div>
            <h1>Lista de Matrículas</h1>
            <p>${filtered.length} alumno${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}</p>
          </div>
          <div class="page-header-actions">
            <button class="btn-outline">${Icons.download(15)} Exportar</button>
            <button class="btn-primary" onclick="Router.navigate('nueva-matricula')">${Icons.userPlus(15)} Nueva Matrícula</button>
          </div>
        </div>

        <div class="filters-bar">
          <div class="search-bar">
            ${Icons.search(15, 'var(--gray-400)')}
            <input type="text" id="mat-search" placeholder="Buscar por nombre, código o DNI..." value="${search}">
          </div>
          <div class="filter-icon">${Icons.filter(14, 'var(--gray-400)')}</div>
          <select class="form-select" id="mat-filter-nivel">
            <option value="Todos" ${filterNivel === 'Todos' ? 'selected' : ''}>Todos los niveles</option>
            <option value="Inicial" ${filterNivel === 'Inicial' ? 'selected' : ''}>Inicial</option>
            <option value="Primaria" ${filterNivel === 'Primaria' ? 'selected' : ''}>Primaria</option>
            <option value="Secundaria" ${filterNivel === 'Secundaria' ? 'selected' : ''}>Secundaria</option>
          </select>
          <select class="form-select" id="mat-filter-estado">
            <option value="Todos" ${filterEstado === 'Todos' ? 'selected' : ''}>Todo estado</option>
            <option value="Matriculado" ${filterEstado === 'Matriculado' ? 'selected' : ''}>Matriculado</option>
            <option value="Retirado" ${filterEstado === 'Retirado' ? 'selected' : ''}>Retirado</option>
          </select>
          <select class="form-select" id="mat-filter-pago">
            <option value="Todos" ${filterPago === 'Todos' ? 'selected' : ''}>Todo pago</option>
            <option value="Pagado" ${filterPago === 'Pagado' ? 'selected' : ''}>Pagado</option>
            <option value="Pendiente" ${filterPago === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
          </select>
        </div>

        <div class="table-wrapper">
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código</th><th>Alumno</th><th>DNI</th><th>Nivel</th><th>Grado</th><th>Tipo</th><th>Estado</th><th>Pago</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>${tableRows}</tbody>
            </table>
          </div>
          <div class="mobile-cards-list">${mobileCards}</div>
          <div class="table-footer">
            <p>Mostrando ${filtered.length} de ${alumnosMatriculados.length} registros</p>
            <button class="pagination-btn">1</button>
          </div>
        </div>
      </div>
    `;

    // Attach filter events
    const refilter = () => {
      const s = document.getElementById('mat-search').value;
      const n = document.getElementById('mat-filter-nivel').value;
      const e = document.getElementById('mat-filter-estado').value;
      const p = document.getElementById('mat-filter-pago').value;
      render(s, n, e, p);
    };

    document.getElementById('mat-search').addEventListener('input', refilter);
    document.getElementById('mat-filter-nivel').addEventListener('change', refilter);
    document.getElementById('mat-filter-estado').addEventListener('change', refilter);
    document.getElementById('mat-filter-pago').addEventListener('change', refilter);
  }

  render();
}
