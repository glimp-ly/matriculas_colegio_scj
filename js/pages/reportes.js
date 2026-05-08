// ========================================
// REPORTES PAGE RENDERER
// ========================================

function renderReportes() {
  const container = document.getElementById('view-reportes');
  const COLORS = ['#8C452B', '#D96236', '#F2A444', '#D96B2B', '#F29441'];

  const nivelData = [
    { name: 'Inicial', value: alumnosMatriculados.filter(a => a.nivel === 'Inicial' && a.estado === 'Matriculado').length },
    { name: 'Primaria', value: alumnosMatriculados.filter(a => a.nivel === 'Primaria' && a.estado === 'Matriculado').length },
    { name: 'Secundaria', value: alumnosMatriculados.filter(a => a.nivel === 'Secundaria' && a.estado === 'Matriculado').length },
  ];
  const generoData = [
    { name: 'Femenino', value: alumnosMatriculados.filter(a => a.genero === 'Femenino').length },
    { name: 'Masculino', value: alumnosMatriculados.filter(a => a.genero === 'Masculino').length },
  ];
  const pagoData = [
    { name: 'Pagado', value: alumnosMatriculados.filter(a => a.estadoPago === 'Pagado').length },
    { name: 'Pendiente', value: alumnosMatriculados.filter(a => a.estadoPago === 'Pendiente').length },
  ];

  const totalRecaudado = alumnosMatriculados.filter(a => a.estadoPago === 'Pagado').reduce((s, a) => s + a.montoMatricula, 0);
  const totalPendiente = alumnosMatriculados.filter(a => a.estadoPago === 'Pendiente').reduce((s, a) => s + a.montoMatricula, 0);
  const maxNivel = Math.max(...nivelData.map(d => d.value), 1);

  container.innerHTML = `
    <div class="animate-fade-in">
      <div class="page-header">
        <div>
          <h1>Reportes</h1>
          <p>Estadísticas y reportes del proceso de matrícula</p>
        </div>
        <button class="btn-outline">${Icons.download(15)} Descargar Reporte</button>
      </div>

      <!-- Summary Cards -->
      <div class="report-summary-grid">
        ${[
          { icon: Icons.users, label: 'Total Alumnos', value: alumnosMatriculados.length, color: '#8C452B' },
          { icon: Icons.trendingUp, label: 'Matriculados', value: alumnosMatriculados.filter(a => a.estado === 'Matriculado').length, color: '#059669' },
          { icon: Icons.wallet, label: 'Recaudado', value: `S/. ${totalRecaudado.toLocaleString()}`, color: '#D96236' },
          { icon: Icons.wallet, label: 'Pendiente', value: `S/. ${totalPendiente.toLocaleString()}`, color: '#d97706' },
        ].map(s => `
          <div class="report-stat-card">
            <div class="report-stat-icon" style="background:${s.color}10">${s.icon(20, s.color)}</div>
            <div>
              <p class="report-stat-label">${s.label}</p>
              <p class="report-stat-value">${s.value}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Charts -->
      <div class="charts-grid" style="margin-bottom:24px">
        <!-- Bar Chart: By Level -->
        <div class="card">
          <h3 style="font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:4px">Matrículas por Nivel</h3>
          <p style="font-size:11px;color:var(--gray-400);margin-bottom:20px">Distribución por nivel educativo</p>
          <div class="bar-chart">
            ${nivelData.map(d => `
              <div class="bar-chart-item">
                <div class="bar-chart-bar" style="height:${d.value === 0 ? 4 : (d.value / maxNivel) * 180}px">
                  <span class="bar-value">${d.value}</span>
                </div>
                <span class="bar-chart-label">${d.name}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Donut: By Gender -->
        <div class="card">
          <h3 style="font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:4px">Distribución por Género</h3>
          <p style="font-size:11px;color:var(--gray-400);margin-bottom:20px">Proporción masculino / femenino</p>
          <div class="donut-chart-wrapper">
            <div class="donut-chart">
              ${createDonutSVG(generoData, COLORS, 200)}
            </div>
            <div class="donut-legend">
              ${generoData.map((d, i) => {
                const pct = ((d.value / alumnosMatriculados.length) * 100).toFixed(0);
                return `<div class="donut-legend-item">
                  <div class="donut-legend-dot" style="background:${COLORS[i]}"></div>
                  <span class="donut-legend-label">${d.name} ${pct}%</span>
                  <span class="donut-legend-value">${d.value}</span>
                </div>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Chart -->
      <div class="card">
        <h3 style="font-size:15px;font-weight:700;color:var(--gray-800);margin-bottom:4px">Estado de Pagos</h3>
        <p style="font-size:11px;color:var(--gray-400);margin-bottom:20px">Pagos realizados vs pendientes</p>
        <div class="payment-chart-wrapper">
          <div class="donut-chart">
            ${createDonutSVG([pagoData[0], pagoData[1]], ['#059669', '#d97706'], 200)}
          </div>
          <div>
            ${pagoData.map((d, i) => `
              <div class="payment-legend-item">
                <div class="payment-legend-dot" style="background:${i === 0 ? '#059669' : '#d97706'}"></div>
                <p class="payment-legend-text">${d.name}: <strong>${d.value}</strong> alumnos</p>
              </div>
            `).join('')}
            <div class="payment-summary">
              <p>Total recaudado: <strong style="color:#059669">S/. ${totalRecaudado.toLocaleString()}</strong></p>
              <p>Total pendiente: <strong style="color:#d97706">S/. ${totalPendiente.toLocaleString()}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
