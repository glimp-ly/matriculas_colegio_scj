// ========================================
// DASHBOARD PAGE RENDERER
// ========================================

function renderDashboard() {
  const stats = estadisticasMatricula;
  const COLORS = ['#8C452B', '#D96236', '#F2A444'];
  const maxMes = Math.max(...stats.matriculasPorMes.map(m => m.cantidad), 1);

  const container = document.getElementById('view-dashboard');
  container.innerHTML = `
    <!-- Welcome Banner -->
    <div class="dashboard-banner animate-fade-in">
      <img src="public/images/students.jpg" alt="Estudiantes">
      <div class="dashboard-banner-overlay">
        <div>
          <p class="welcome-sub">Bienvenido al sistema</p>
          <h1>Gestión de Matrículas 2026</h1>
          <p class="welcome-desc">Administra las matrículas de la institución. Registra nuevos alumnos, controla pagos y genera reportes.</p>
          <button class="banner-cta" onclick="Router.navigate('nueva-matricula')">
            ${Icons.userPlus(16, 'white')} Nueva Matrícula ${Icons.arrowRight(14, 'white')}
          </button>
        </div>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="stats-grid">
      <div class="stat-card animate-fade-in-up delay-1">
        <div class="stat-card-icon" style="background: #8C452B12">${Icons.users(22, '#8C452B')}</div>
        <div>
          <p class="stat-card-label">Total Matriculados</p>
          <p class="stat-card-value">${stats.totalMatriculados}</p>
          <p class="stat-card-sub">Año lectivo 2026</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in-up delay-2">
        <div class="stat-card-icon" style="background: #dc262612">${Icons.userMinus(22, '#dc2626')}</div>
        <div>
          <p class="stat-card-label">Retirados</p>
          <p class="stat-card-value">${stats.totalRetirados}</p>
          <p class="stat-card-sub">Por traslado o deserción</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in-up delay-3">
        <div class="stat-card-icon" style="background: #d9770612">${Icons.clock(22, '#d97706')}</div>
        <div>
          <p class="stat-card-label">Pagos Pendientes</p>
          <p class="stat-card-value">${stats.totalPendientes}</p>
          <p class="stat-card-sub">S/. ${stats.ingresoMatricula.pendiente.toLocaleString()} pendiente</p>
        </div>
      </div>
      <div class="stat-card animate-fade-in-up delay-4">
        <div class="stat-card-icon" style="background: #05966912">${Icons.wallet(22, '#059669')}</div>
        <div>
          <p class="stat-card-label">Recaudado</p>
          <p class="stat-card-value">S/. ${stats.ingresoMatricula.pagado.toLocaleString()}</p>
          <p class="stat-card-sub">de S/. ${stats.ingresoMatricula.total.toLocaleString()} total</p>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="charts-grid">
      <!-- Bar Chart -->
      <div class="card animate-fade-in-up delay-3">
        <div class="chart-card-header">
          <div>
            <h3>Matrículas por Mes</h3>
            <p>Tendencia de inscripciones 2026</p>
          </div>
          ${Icons.trendingUp(18, 'var(--gray-400)')}
        </div>
        <div class="bar-chart">
          ${stats.matriculasPorMes.map(m => `
            <div class="bar-chart-item">
              <div class="bar-chart-bar" style="height: ${m.cantidad === 0 ? 4 : (m.cantidad / maxMes) * 170}px">
                <span class="bar-value">${m.cantidad}</span>
              </div>
              <span class="bar-chart-label">${m.mes}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Donut Chart -->
      <div class="card animate-fade-in-up delay-4">
        <div class="chart-card-header">
          <div>
            <h3>Tipo de Matrícula</h3>
            <p>Distribución por modalidad</p>
          </div>
          ${Icons.graduationCap(18, 'var(--gray-400)')}
        </div>
        <div class="donut-chart-wrapper">
          <div class="donut-chart">
            ${createDonutSVG(
              stats.matriculasPorTipo.map(t => ({ value: t.cantidad })),
              COLORS
            )}
          </div>
          <div class="donut-legend">
            ${stats.matriculasPorTipo.map((item, i) => `
              <div class="donut-legend-item">
                <div class="donut-legend-dot" style="background: ${COLORS[i]}"></div>
                <span class="donut-legend-label">${item.tipo}</span>
                <span class="donut-legend-value">${item.cantidad}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="bottom-grid">
      <!-- Progress by Level -->
      <div class="card animate-fade-in-up delay-5">
        <div class="chart-card-header">
          <div>
            <h3>Vacantes por Nivel</h3>
            <p>Capacidad vs matriculados</p>
          </div>
          ${Icons.bookOpen(18, 'var(--gray-400)')}
        </div>
        ${Object.entries(stats.porNivel).map(([nivel, data], i) => `
          <div class="progress-item">
            <div class="progress-header">
              <p class="progress-label">${nivel}</p>
              <p class="progress-value">${data.matriculados}/${data.capacidad}<span>(${data.porcentaje.toFixed(0)}%)</span></p>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${data.porcentaje}%; background: linear-gradient(90deg, ${COLORS[i]}, ${COLORS[i]}dd)"></div>
            </div>
          </div>
        `).join('')}
        <div class="vacantes-info">
          ${Icons.alertCircle(16, '#D96B2B')}
          <p><strong>${stats.vacantesDisponibles}</strong> vacantes disponibles en total</p>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card animate-fade-in-up delay-6">
        <div class="chart-card-header">
          <div>
            <h3>Actividad Reciente</h3>
            <p>Últimas acciones registradas</p>
          </div>
          ${Icons.clock(18, 'var(--gray-400)')}
        </div>
        <div>
          ${actividadesRecientes.slice(0, 5).map((act, i) => {
            let icon;
            if (act.accion.includes('Nueva')) icon = Icons.userPlus(14, COLORS[i % 3]);
            else if (act.accion.includes('Pago')) icon = Icons.wallet(14, COLORS[i % 3]);
            else if (act.accion.includes('Retirado')) icon = Icons.userMinus(14, COLORS[i % 3]);
            else icon = Icons.clock(14, COLORS[i % 3]);

            return `
              <div class="activity-item">
                <div class="activity-icon" style="background: ${COLORS[i % 3]}12">${icon}</div>
                <div class="activity-content">
                  <p class="activity-action">${act.accion}</p>
                  <p class="activity-detail">${act.detalle}</p>
                </div>
                <p class="activity-date">${act.fecha}</p>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}
