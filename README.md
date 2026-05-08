# Sistema de Matrículas — IEP Corazón de Jesús

Sistema de gestión de matrículas para la IEP Corazón de Jesús College.  
Construido con **HTML puro, CSS puro y JavaScript puro** — sin frameworks ni dependencias.

## Estructura del Proyecto

```
matriculas_colegio/
├── index.html              # Punto de entrada principal
├── css/
│   ├── styles.css          # Design system y estilos globales
│   ├── login.css           # Estilos de la página de login
│   ├── layout.css          # Sidebar, navbar y layout
│   ├── dashboard.css       # Dashboard con gráficos
│   ├── matriculas.css      # Lista y tabla de matrículas
│   └── pages.css           # NuevaMatrícula, Detalle, Reportes, Config
├── js/
│   ├── data.js             # Datos de prueba (mock data)
│   ├── icons.js            # Íconos SVG reutilizables
│   ├── auth.js             # Módulo de autenticación
│   ├── router.js           # Router SPA basado en hash
│   ├── components.js       # Componentes compartidos
│   ├── app.js              # Bootstrap principal
│   └── pages/
│       ├── dashboard.js    # Página Dashboard
│       ├── matriculas.js   # Lista de Matrículas
│       ├── nueva-matricula.js  # Formulario Nueva Matrícula
│       ├── detalle-alumno.js   # Detalle del Alumno
│       ├── reportes.js     # Reportes y estadísticas
│       └── configuracion.js    # Configuración del sistema
└── public/
    ├── favicon.svg
    └── images/             # Imágenes del proyecto
```

## Cómo Ejecutar

Simplemente abre `index.html` en un navegador o usa un servidor local:

```bash
# Python
python3 -m http.server 8080

# Node.js (si tienes npx)
npx serve .
```

## Credenciales de Prueba

| Usuario     | Contraseña | Rol        |
|-------------|-----------|------------|
| admin       | admin123  | Directora  |
| secretaria  | sec123    | Secretaria |

## Características

- Autenticación con roles
- Dashboard con gráficos SVG (sin librerías)
- Lista de matrículas con filtros en tiempo real
- ormulario multi-paso para nueva matrícula
- Detalle completo del alumno
- Reportes con visualizaciones
- onfiguración con tabs
- Diseño responsive con sidebar colapsable
- Animaciones y micro-interacciones
