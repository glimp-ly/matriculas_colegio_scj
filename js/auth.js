// ========================================
// AUTH MODULE — Authentication State
// ========================================

const Auth = (() => {
  const USERS = {
    admin: {
      username: 'admin', password: 'admin123', role: 'administrador',
      nombre: 'Martha Elena Villanueva Condori', cargo: 'Directora', avatar: null,
    },
    secretaria: {
      username: 'secretaria', password: 'sec123', role: 'secretaria',
      nombre: 'Rosa María Quispe Torres', cargo: 'Secretaria Académica', avatar: null,
    },
  };

  let currentUser = null;

  return {
    get user() { return currentUser; },
    get isAuthenticated() { return currentUser !== null; },

    login(username, password) {
      const foundUser = USERS[username];
      if (foundUser && foundUser.password === password) {
        currentUser = foundUser;
        return { success: true };
      }
      return { success: false, message: 'Credenciales incorrectas' };
    },

    logout() {
      currentUser = null;
    },
  };
})();
