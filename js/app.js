// ========================================
// APP — Main Bootstrap & Event Handlers
// ========================================

(function () {
  'use strict';

  let sidebarCollapsed = false;
  let mobileMenuOpen = false;

  // --- Initialize ---
  document.addEventListener('DOMContentLoaded', () => {
    Router.init();
    buildSidebarNav();
    setupLoginForm();
    setupSidebarEvents();
    setupLayoutEvents();
    Router.render();
  });

  // --- Login Form ---
  function setupLoginForm() {
    const form = document.getElementById('login-form');
    const errorEl = document.getElementById('login-error');
    const errorMsg = document.getElementById('login-error-msg');
    const submitBtn = document.getElementById('login-submit');
    const btnText = document.getElementById('login-btn-text');
    const btnArrow = document.getElementById('login-btn-arrow');
    const spinner = document.getElementById('login-spinner');
    const togglePw = document.getElementById('toggle-password');
    const pwInput = document.getElementById('login-password');

    // Toggle password visibility
    togglePw.addEventListener('click', () => {
      const isPassword = pwInput.type === 'password';
      pwInput.type = isPassword ? 'text' : 'password';
    });

    // Credential cards
    document.querySelectorAll('.cred-card').forEach(card => {
      card.addEventListener('click', () => {
        document.getElementById('login-username').value = card.dataset.user;
        document.getElementById('login-password').value = card.dataset.pass;
        errorEl.classList.add('hidden');
      });
    });

    // Clear error on input
    document.getElementById('login-username').addEventListener('input', () => errorEl.classList.add('hidden'));
    document.getElementById('login-password').addEventListener('input', () => errorEl.classList.add('hidden'));

    // Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value;

      if (!username || !password) {
        errorMsg.textContent = 'Por favor complete todos los campos.';
        errorEl.classList.remove('hidden');
        return;
      }

      // Show loading
      submitBtn.disabled = true;
      btnText.textContent = 'Ingresando...';
      btnArrow.classList.add('hidden');
      spinner.classList.remove('hidden');

      setTimeout(() => {
        const result = Auth.login(username, password);
        if (result.success) {
          Router.navigate('dashboard');
        } else {
          errorMsg.textContent = result.message;
          errorEl.classList.remove('hidden');
        }
        submitBtn.disabled = false;
        btnText.textContent = 'Ingresar al Sistema';
        btnArrow.classList.remove('hidden');
        spinner.classList.add('hidden');
      }, 800);
    });
  }

  // --- Sidebar Events ---
  function setupSidebarEvents() {
    document.getElementById('logout-btn').addEventListener('click', () => {
      Auth.logout();
      Router.render();
      // Reset form
      document.getElementById('login-username').value = '';
      document.getElementById('login-password').value = '';
      document.getElementById('login-error').classList.add('hidden');
    });
  }

  // --- Layout Events ---
  function setupLayoutEvents() {
    const sidebar = document.getElementById('sidebar');
    const mainArea = document.getElementById('main-area');
    const overlay = document.getElementById('mobile-overlay');

    // Toggle sidebar
    function toggleSidebar() {
      if (window.innerWidth < 768) {
        mobileMenuOpen = !mobileMenuOpen;
        sidebar.classList.toggle('mobile-open', mobileMenuOpen);
        overlay.classList.toggle('hidden', !mobileMenuOpen);
      } else {
        sidebarCollapsed = !sidebarCollapsed;
        sidebar.classList.toggle('collapsed', sidebarCollapsed);
        mainArea.classList.toggle('sidebar-collapsed', sidebarCollapsed);

        // Toggle logo visibility
        document.getElementById('sidebar-logo-full').classList.toggle('hidden', sidebarCollapsed);
        document.getElementById('sidebar-logo-collapsed').classList.toggle('hidden', !sidebarCollapsed);

        // Chevron direction
        const chevron = document.getElementById('sidebar-chevron');
        chevron.innerHTML = sidebarCollapsed
          ? '<path d="m9 18 6-6-6-6"/>'
          : '<path d="m15 18-6-6 6-6"/>';
      }
    }

    window.closeMobileMenu = function () {
      mobileMenuOpen = false;
      sidebar.classList.remove('mobile-open');
      overlay.classList.add('hidden');
    };

    document.getElementById('navbar-menu-btn').addEventListener('click', toggleSidebar);
    document.getElementById('sidebar-toggle-desktop').addEventListener('click', toggleSidebar);
    document.getElementById('sidebar-close-mobile').addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    // Handle responsive on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        closeMobileMenu();
      }
    });
  }
})();
