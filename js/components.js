// ========================================
// COMPONENTS — Sidebar Navigation Builder
// ========================================

function buildSidebarNav() {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.layoutDashboard, route: 'dashboard' },
    { id: 'matriculas', label: 'Matrículas', icon: Icons.users, route: 'matriculas' },
    { id: 'nueva-matricula', label: 'Nueva Matrícula', icon: Icons.userPlus, route: 'nueva-matricula' },
    { id: 'reportes', label: 'Reportes', icon: Icons.barChart, route: 'reportes' },
    { id: 'configuracion', label: 'Configuración', icon: Icons.settings, route: 'configuracion' },
  ];

  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = menuItems.map(item =>
    `<button class="sidebar-nav-item" data-route="${item.route}" id="nav-${item.id}">
      ${item.icon(19)}
      <span>${item.label}</span>
    </button>`
  ).join('');

  // Navigation click handlers
  nav.querySelectorAll('.sidebar-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      Router.navigate(btn.dataset.route);
      closeMobileMenu();
    });
  });
}

// Helper to create SVG donut chart
function createDonutSVG(data, colors, size = 160) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 5;
  const innerR = outerR * 0.625;
  const total = data.reduce((s, d) => s + d.value, 0);

  let cumulativeAngle = -90;
  const paths = data.map((d, i) => {
    const angle = (d.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const startRad = (Math.PI / 180) * startAngle;
    const endRad = (Math.PI / 180) * endAngle;
    const largeArc = angle > 180 ? 1 : 0;

    const x1o = cx + outerR * Math.cos(startRad);
    const y1o = cy + outerR * Math.sin(startRad);
    const x2o = cx + outerR * Math.cos(endRad);
    const y2o = cy + outerR * Math.sin(endRad);
    const x1i = cx + innerR * Math.cos(endRad);
    const y1i = cy + innerR * Math.sin(endRad);
    const x2i = cx + innerR * Math.cos(startRad);
    const y2i = cy + innerR * Math.sin(startRad);

    return `<path d="M${x1o},${y1o} A${outerR},${outerR} 0 ${largeArc} 1 ${x2o},${y2o} L${x1i},${y1i} A${innerR},${innerR} 0 ${largeArc} 0 ${x2i},${y2i} Z" fill="${colors[i]}" stroke="white" stroke-width="3"/>`;
  }).join('');

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${paths}</svg>`;
}

// Helper: create a badge
function createBadge(text, type) {
  const iconMap = {
    success: Icons.checkCircle(12, '#059669'),
    danger: Icons.xCircle(12, '#dc2626'),
    warning: Icons.clock(12, '#d97706'),
  };
  return `<span class="badge badge-${type}">${iconMap[type] || ''} ${text}</span>`;
}

function getEstadoBadge(estado) {
  const map = { Matriculado: 'success', Retirado: 'danger', Pendiente: 'warning' };
  return createBadge(estado, map[estado] || 'warning');
}

function getPagoBadge(estado) {
  return createBadge(estado, estado === 'Pagado' ? 'success' : 'warning');
}
