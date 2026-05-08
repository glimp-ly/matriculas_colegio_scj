// ========================================
// ROUTER — Simple SPA Hash Router
// ========================================

const Router = (() => {
  const pageTitles = {
    dashboard: 'Dashboard',
    matriculas: 'Gestión de Matrículas',
    'nueva-matricula': 'Nueva Matrícula',
    'detalle-alumno': 'Detalle del Alumno',
    reportes: 'Reportes',
    configuracion: 'Configuración',
  };

  let currentRoute = 'dashboard';
  let routeParams = {};

  function navigate(route, params = {}) {
    routeParams = params;
    currentRoute = route;
    window.location.hash = route + (params.id ? '/' + params.id : '');
    render();
  }

  function render() {
    if (!Auth.isAuthenticated) {
      document.getElementById('page-login').classList.remove('hidden');
      document.getElementById('app-layout').classList.add('hidden');
      return;
    }

    document.getElementById('page-login').classList.add('hidden');
    document.getElementById('app-layout').classList.remove('hidden');

    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));

    // Determine current view
    const viewId = 'view-' + currentRoute;
    const viewEl = document.getElementById(viewId);
    if (viewEl) {
      viewEl.classList.remove('hidden');
    }

    // Update navbar title
    const title = pageTitles[currentRoute] || 'Sistema de Matrículas';
    document.getElementById('navbar-title').textContent = title;

    // Update sidebar active state
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.route === currentRoute);
    });

    // Update user info in navbar/sidebar
    updateUserUI();

    // Render page content
    renderPage();
  }

  function renderPage() {
    switch (currentRoute) {
      case 'dashboard': renderDashboard(); break;
      case 'matriculas': renderMatriculas(); break;
      case 'nueva-matricula': renderNuevaMatricula(); break;
      case 'detalle-alumno': renderDetalleAlumno(routeParams.id); break;
      case 'reportes': renderReportes(); break;
      case 'configuracion': renderConfiguracion(); break;
    }
  }

  function updateUserUI() {
    const user = Auth.user;
    if (!user) return;
    const initial = user.nombre?.[0] || 'U';
    const shortName = user.nombre?.split(' ').slice(0, 2).join(' ') || 'Usuario';

    document.getElementById('sidebar-avatar').textContent = initial;
    document.getElementById('sidebar-user-name').textContent = shortName;
    document.getElementById('sidebar-user-role').textContent = user.cargo || user.role || 'Sin rol';
    document.getElementById('navbar-avatar').textContent = initial;
    document.getElementById('navbar-user-name').textContent = shortName;
    document.getElementById('navbar-user-role').textContent = user.cargo || 'Rol';
  }

  function parseHash() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    const parts = hash.split('/');
    const route = parts[0];
    const params = {};
    if (parts[1]) params.id = parts[1];
    return { route, params };
  }

  function init() {
    window.addEventListener('hashchange', () => {
      const { route, params } = parseHash();
      routeParams = params;
      currentRoute = route;
      render();
    });
  }

  return { navigate, render, init, parseHash, get currentRoute() { return currentRoute; }, get params() { return routeParams; } };
})();
