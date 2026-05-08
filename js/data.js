// ========================================
// DATOS DE PRUEBA — Sistema de Matrículas
// IEP Corazón de Jesús College
// ========================================

const aniosLectivos = [
  { id: 1, anio: '2026', estado: 'Activo', fechaInicio: '2026-03-03', fechaFin: '2026-12-20' },
  { id: 2, anio: '2025', estado: 'Cerrado', fechaInicio: '2025-03-03', fechaFin: '2025-12-19' },
];

const niveles = [
  {
    id: 1, nombre: 'Inicial',
    grados: [
      { id: 1, nombre: '3 años', secciones: ['A'] },
      { id: 2, nombre: '4 años', secciones: ['A', 'B'] },
      { id: 3, nombre: '5 años', secciones: ['A', 'B'] },
    ],
  },
  {
    id: 2, nombre: 'Primaria',
    grados: [
      { id: 4, nombre: '1°', secciones: ['A', 'B'] },
      { id: 5, nombre: '2°', secciones: ['A', 'B'] },
      { id: 6, nombre: '3°', secciones: ['A', 'B'] },
      { id: 7, nombre: '4°', secciones: ['A'] },
      { id: 8, nombre: '5°', secciones: ['A', 'B'] },
      { id: 9, nombre: '6°', secciones: ['A'] },
    ],
  },
  {
    id: 3, nombre: 'Secundaria',
    grados: [
      { id: 10, nombre: '1°', secciones: ['A', 'B'] },
      { id: 11, nombre: '2°', secciones: ['A', 'B'] },
      { id: 12, nombre: '3°', secciones: ['A'] },
      { id: 13, nombre: '4°', secciones: ['A'] },
      { id: 14, nombre: '5°', secciones: ['A'] },
    ],
  },
];

const tarifas = {
  inicial: { matricula: 350, pension: 450 },
  primaria: { matricula: 400, pension: 500 },
  secundaria: { matricula: 450, pension: 580 },
};

const alumnosMatriculados = [
  { id:1, codigo:'MAT-2026-0001', nombres:'María Elena', apellidos:'García Quispe', dni:'76543210', fechaNacimiento:'2015-03-12', genero:'Femenino', direccion:'Jr. Cusco 234, Cusco', nivel:'Primaria', grado:'1°', seccion:'A', anioLectivo:'2026', fechaMatricula:'2026-02-10', estado:'Matriculado', tipoMatricula:'Regular', apoderado:{ nombre:'Rosa Quispe Mamani', dni:'40123456', telefono:'984567123', email:'rosa.quispe@gmail.com', parentesco:'Madre', ocupacion:'Profesora' }, observaciones:'', montoMatricula:400, montoPension:500, estadoPago:'Pagado' },
  { id:2, codigo:'MAT-2026-0002', nombres:'Carlos Andrés', apellidos:'López Mendoza', dni:'76543211', fechaNacimiento:'2015-07-22', genero:'Masculino', direccion:'Av. Sol 567, Cusco', nivel:'Primaria', grado:'1°', seccion:'A', anioLectivo:'2026', fechaMatricula:'2026-02-11', estado:'Matriculado', tipoMatricula:'Regular', apoderado:{ nombre:'Pedro López Huanca', dni:'40234567', telefono:'975432189', email:'pedro.lopez@hotmail.com', parentesco:'Padre', ocupacion:'Ingeniero Civil' }, observaciones:'', montoMatricula:400, montoPension:500, estadoPago:'Pagado' },
  { id:3, codigo:'MAT-2026-0003', nombres:'Ana Sofía', apellidos:'Rodríguez Vargas', dni:'76543212', fechaNacimiento:'2014-11-05', genero:'Femenino', direccion:'Urb. Santa María 89, Cusco', nivel:'Primaria', grado:'2°', seccion:'A', anioLectivo:'2026', fechaMatricula:'2026-02-12', estado:'Matriculado', tipoMatricula:'Traslado', apoderado:{ nombre:'Carmen Vargas Flores', dni:'40345678', telefono:'961234567', email:'carmen.vargas@gmail.com', parentesco:'Madre', ocupacion:'Administradora' }, observaciones:'Viene trasladada del colegio San Martín de Porres', montoMatricula:400, montoPension:500, estadoPago:'Pagado' },
  { id:4, codigo:'MAT-2026-0004', nombres:'Diego Alejandro', apellidos:'Martínez Flores', dni:'76543213', fechaNacimiento:'2014-05-18', genero:'Masculino', direccion:'Calle Saphi 123, Cusco', nivel:'Primaria', grado:'2°', seccion:'B', anioLectivo:'2026', fechaMatricula:'2026-02-13', estado:'Matriculado', tipoMatricula:'Regular', apoderado:{ nombre:'María Flores Gonzales', dni:'40456789', telefono:'952345678', email:'maria.flores@outlook.com', parentesco:'Madre', ocupacion:'Comerciante' }, observaciones:'', montoMatricula:400, montoPension:500, estadoPago:'Pendiente' },
  { id:5, codigo:'MAT-2026-0005', nombres:'Lucía Valentina', apellidos:'Hernández Díaz', dni:'76543214', fechaNacimiento:'2013-09-30', genero:'Femenino', direccion:'Jr. Pumacahua 456, Cusco', nivel:'Primaria', grado:'3°', seccion:'A', anioLectivo:'2026', fechaMatricula:'2026-02-14', estado:'Matriculado', tipoMatricula:'Regular', apoderado:{ nombre:'Juan Hernández Quispe', dni:'40567890', telefono:'943456789', email:'juan.hernandez@gmail.com', parentesco:'Padre', ocupacion:'Docente universitario' }, observaciones:'', montoMatricula:400, montoPension:500, estadoPago:'Pagado' },
  { id:6, codigo:'MAT-2026-0006', nombres:'Sofía', apellidos:'Paredes Luna', dni:'87654321', fechaNacimiento:'2023-01-15', genero:'Femenino', direccion:'Av. La Cultura 789, Cusco', nivel:'Inicial', grado:'3 años', seccion:'A', anioLectivo:'2026', fechaMatricula:'2026-02-08', estado:'Matriculado', tipoMatricula:'Nuevo', apoderado:{ nombre:'Patricia Luna Condori', dni:'40678901', telefono:'934567890', email:'patricia.luna@gmail.com', parentesco:'Madre', ocupacion:'Psicóloga' }, observaciones:'Primera matrícula', montoMatricula:350, montoPension:450, estadoPago:'Pagado' },
  { id:7, codigo:'MAT-2026-0007', nombres:'Thiago', apellidos:'Quispe Rojas', dni:'87654322', fechaNacimiento:'2023-04-20', genero:'Masculino', direccion:'Urb. Los Álamos 321, Cusco', nivel:'Inicial', grado:'3 años', seccion:'A', anioLectivo:'2026', fechaMatricula:'2026-02-09', estado:'Matriculado', tipoMatricula:'Nuevo', apoderado:{ nombre:'Carlos Quispe Huamán', dni:'40789012', telefono:'925678901', email:'carlos.quispe@outlook.com', parentesco:'Padre', ocupacion:'Contador' }, observaciones:'', montoMatricula:350, montoPension:450, estadoPago:'Pagado' },
  { id:8, codigo:'MAT-2026-0008', nombres:'Miguel Ángel', apellidos:'Torres Sánchez', dni:'76543215', fechaNacimiento:'2013-02-14', genero:'Masculino', direccion:'Jr. Retiro 567, Cusco', nivel:'Primaria', grado:'3°', seccion:'B', anioLectivo:'2026', fechaMatricula:'2026-02-15', estado:'Retirado', tipoMatricula:'Regular', apoderado:{ nombre:'Estela Sánchez Puma', dni:'40890123', telefono:'916789012', email:'estela.sanchez@gmail.com', parentesco:'Madre', ocupacion:'Ama de casa' }, observaciones:'Retirado por cambio de domicilio a Lima', montoMatricula:400, montoPension:500, estadoPago:'Pagado' },
  { id:9, codigo:'MAT-2026-0009', nombres:'Valentina', apellidos:'Puma Quispe', dni:'76543216', fechaNacimiento:'2012-08-25', genero:'Femenino', direccion:'Av. Collasuyo 234, Cusco', nivel:'Primaria', grado:'4°', seccion:'A', anioLectivo:'2026', fechaMatricula:'2026-02-16', estado:'Matriculado', tipoMatricula:'Regular', apoderado:{ nombre:'Juana Quispe Mamani', dni:'40901234', telefono:'907890123', email:'juana.quispe@hotmail.com', parentesco:'Madre', ocupacion:'Enfermera' }, observaciones:'', montoMatricula:400, montoPension:500, estadoPago:'Pagado' },
  { id:10, codigo:'MAT-2026-0010', nombres:'Sebastián', apellidos:'Chávez Ramos', dni:'76543217', fechaNacimiento:'2012-12-01', genero:'Masculino', direccion:'Jr. Plateros 890, Cusco', nivel:'Primaria', grado:'4°', seccion:'A', anioLectivo:'2026', fechaMatricula:'2026-02-17', estado:'Matriculado', tipoMatricula:'Regular', apoderado:{ nombre:'Roberto Chávez Flores', dni:'41012345', telefono:'998901234', email:'roberto.chavez@gmail.com', parentesco:'Padre', ocupacion:'Abogado' }, observaciones:'Alumno con excelente rendimiento académico', montoMatricula:400, montoPension:500, estadoPago:'Pagado' },
  { id:11, codigo:'MAT-2026-0011', nombres:'Emma', apellidos:'Flores Mamani', dni:'87654323', fechaNacimiento:'2022-06-10', genero:'Femenino', direccion:'Calle Mantas 456, Cusco', nivel:'Inicial', grado:'4 años', seccion:'A', anioLectivo:'2026', fechaMatricula:'2026-02-10', estado:'Matriculado', tipoMatricula:'Regular', apoderado:{ nombre:'Luz Mamani Huanca', dni:'41123456', telefono:'989012345', email:'luz.mamani@gmail.com', parentesco:'Madre', ocupacion:'Arquitecta' }, observaciones:'', montoMatricula:350, montoPension:450, estadoPago:'Pagado' },
  { id:12, codigo:'MAT-2026-0012', nombres:'Mateo Adrián', apellidos:'Vega Condori', dni:'76543221', fechaNacimiento:'2010-04-07', genero:'Masculino', direccion:'Av. Huayruropata 123, Cusco', nivel:'Secundaria', grado:'1°', seccion:'A', anioLectivo:'2026', fechaMatricula:'2026-02-18', estado:'Matriculado', tipoMatricula:'Regular', apoderado:{ nombre:'Luis Vega Paredes', dni:'41234567', telefono:'970123456', email:'luis.vega@outlook.com', parentesco:'Padre', ocupacion:'Médico' }, observaciones:'', montoMatricula:450, montoPension:580, estadoPago:'Pagado' },
  { id:13, codigo:'MAT-2026-0013', nombres:'Camila Renata', apellidos:'Morales Huanca', dni:'76543218', fechaNacimiento:'2011-10-15', genero:'Femenino', direccion:'Jr. Belén 789, Cusco', nivel:'Secundaria', grado:'2°', seccion:'A', anioLectivo:'2026', fechaMatricula:'2026-02-19', estado:'Matriculado', tipoMatricula:'Regular', apoderado:{ nombre:'Ana Huanca Ticona', dni:'41345678', telefono:'961234567', email:'ana.huanca@gmail.com', parentesco:'Madre', ocupacion:'Profesora' }, observaciones:'Talentosa en matemáticas', montoMatricula:450, montoPension:580, estadoPago:'Pendiente' },
  { id:14, codigo:'MAT-2026-0014', nombres:'Joaquín', apellidos:'Ríos Castillo', dni:'76543219', fechaNacimiento:'2011-01-28', genero:'Masculino', direccion:'Urb. Ttío A-12, Cusco', nivel:'Secundaria', grado:'2°', seccion:'B', anioLectivo:'2026', fechaMatricula:'2026-02-20', estado:'Matriculado', tipoMatricula:'Regular', apoderado:{ nombre:'Elvira Castillo Ramos', dni:'41456789', telefono:'952345678', email:'elvira.castillo@hotmail.com', parentesco:'Madre', ocupacion:'Contadora' }, observaciones:'', montoMatricula:450, montoPension:580, estadoPago:'Pagado' },
  { id:15, codigo:'MAT-2026-0015', nombres:'Isabella', apellidos:'Cruz Mamani', dni:'76543220', fechaNacimiento:'2010-07-03', genero:'Femenino', direccion:'Av. Grau 567, Cusco', nivel:'Secundaria', grado:'3°', seccion:'A', anioLectivo:'2026', fechaMatricula:'2026-02-21', estado:'Matriculado', tipoMatricula:'Regular', apoderado:{ nombre:'Sandra Mamani Flores', dni:'41567890', telefono:'943456789', email:'sandra.mamani@gmail.com', parentesco:'Madre', ocupacion:'Periodista' }, observaciones:'', montoMatricula:450, montoPension:580, estadoPago:'Pagado' },
];

const estadisticasMatricula = {
  totalMatriculados: 14, totalRetirados: 1, totalPendientes: 2, vacantesDisponibles: 38,
  porNivel: {
    inicial: { matriculados: 3, capacidad: 8, porcentaje: 37.5 },
    primaria: { matriculados: 7, capacidad: 18, porcentaje: 38.9 },
    secundaria: { matriculados: 4, capacidad: 12, porcentaje: 33.3 },
  },
  ingresoMatricula: { total: 5750, pagado: 5350, pendiente: 850 },
  matriculasPorMes: [
    { mes: 'Ene', cantidad: 0 }, { mes: 'Feb', cantidad: 12 }, { mes: 'Mar', cantidad: 2 }, { mes: 'Abr', cantidad: 1 }, { mes: 'May', cantidad: 0 },
  ],
  matriculasPorTipo: [
    { tipo: 'Regular', cantidad: 11 }, { tipo: 'Nuevo', cantidad: 2 }, { tipo: 'Traslado', cantidad: 1 },
  ],
};

const documentosRequeridos = {
  inicial: ['DNI del alumno (copia)','DNI del apoderado (copia)','Partida de nacimiento (original)','Ficha de matrícula SIAGIE','Cartilla de vacunación','2 fotos tamaño carnet','Constancia de no adeudo (si aplica)'],
  primaria: ['DNI del alumno (copia)','DNI del apoderado (copia)','Partida de nacimiento (original)','Ficha de matrícula SIAGIE','Libreta de notas del año anterior','Constancia de no adeudo (si aplica)','2 fotos tamaño carnet','Certificado de estudios (traslado)'],
  secundaria: ['DNI del alumno (copia)','DNI del apoderado (copia)','Partida de nacimiento (original)','Ficha de matrícula SIAGIE','Libreta de notas del año anterior','Certificado de estudios (traslado)','Constancia de no adeudo (si aplica)','2 fotos tamaño carnet','Resolución de traslado (si aplica)'],
};

const actividadesRecientes = [
  { id:1, accion:'Nueva matrícula registrada', detalle:'Isabella Cruz Mamani — 3° Sec. A', fecha:'2026-02-21', hora:'10:15', usuario:'Secretaria' },
  { id:2, accion:'Pago de matrícula recibido', detalle:'Joaquín Ríos Castillo — S/. 450.00', fecha:'2026-02-20', hora:'14:30', usuario:'Secretaria' },
  { id:3, accion:'Alumno retirado', detalle:'Miguel Ángel Torres Sánchez — 3° Prim. B', fecha:'2026-02-18', hora:'09:45', usuario:'Admin' },
  { id:4, accion:'Matrícula actualizada', detalle:'Actualización datos apoderado — Sofía Paredes Luna', fecha:'2026-02-17', hora:'16:20', usuario:'Secretaria' },
  { id:5, accion:'Nueva matrícula registrada', detalle:'Sebastián Chávez Ramos — 4° Prim. A', fecha:'2026-02-17', hora:'11:00', usuario:'Admin' },
  { id:6, accion:'Documento verificado', detalle:'Partida de nacimiento — Emma Flores Mamani', fecha:'2026-02-16', hora:'08:30', usuario:'Secretaria' },
];
