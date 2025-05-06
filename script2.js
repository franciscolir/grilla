let paginaActual = 1;
let registrosPorPagina = 10;
let facturasGlobal = [];
let filtros = {};

document.getElementById("registrosPorPagina").addEventListener("change", () => {
  registrosPorPagina = parseInt(document.getElementById("registrosPorPagina").value);
  paginaActual = 1;
  renderizarTabla();
});
function obtenerDatosAPI() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
            "facturas": [
                {
                  "numeroFactura": "FAC-001",
                  "cliente": {
                    "nombre": "Juan Pérez",
                    "direccion": "Calle Falsa 123"
                  },
                  "fecha": "2025-04-01",
                  "productos": [
                    { "descripcion": "Laptop HP", "cantidad": 1, "precioUnitario": 850.00 },
                    { "descripcion": "Mouse Inalámbrico", "cantidad": 2, "precioUnitario": 25.50 }
                  ],
                  "total": 901.00
                },
                {
                  "numeroFactura": "FAC-002",
                  "cliente": {
                    "nombre": "María Gómez",
                    "direccion": "Av. Siempre Viva 742"
                  },
                  "fecha": "2025-04-02",
                  "productos": [
                    { "descripcion": "Impresora Multifuncional", "cantidad": 1, "precioUnitario": 120.00 },
                    { "descripcion": "Toner Negro", "cantidad": 1, "precioUnitario": 45.00 }
                  ],
                  "total": 165.00
                },
                {
                  "numeroFactura": "FAC-003",
                  "cliente": {
                    "nombre": "Carlos López",
                    "direccion": "Carrera 5 # 10-20"
                  },
                  "fecha": "2025-04-03",
                  "productos": [
                    { "descripcion": "Memoria USB 32GB", "cantidad": 5, "precioUnitario": 12.00 },
                    { "descripcion": "Teclado Mecánico", "cantidad": 1, "precioUnitario": 75.00 }
                  ],
                  "total": 135.00
                },
                {
                  "numeroFactura": "FAC-004",
                  "cliente": {
                    "nombre": "Ana Martínez",
                    "direccion": "Calle 10 # 45-67"
                  },
                  "fecha": "2025-04-04",
                  "productos": [
                    { "descripcion": "Monitor LED 24\"", "cantidad": 1, "precioUnitario": 200.00 },
                    { "descripcion": "Parlantes Estéreo", "cantidad": 1, "precioUnitario": 60.00 }
                  ],
                  "total": 260.00
                },
                {
                  "numeroFactura": "FAC-005",
                  "cliente": {
                    "nombre": "Pedro Sánchez",
                    "direccion": "Diagonal 20 # 12-34"
                  },
                  "fecha": "2025-04-05",
                  "productos": [
                    { "descripcion": "Silla Ergonómica", "cantidad": 1, "precioUnitario": 150.00 }
                  ],
                  "total": 150.00
                },
                {
                  "numeroFactura": "FAC-006",
                  "cliente": {
                    "nombre": "Laura Torres",
                    "direccion": "Plaza Mayor 12"
                  },
                  "fecha": "2025-04-06",
                  "productos": [
                    { "descripcion": "Mesa de Oficina", "cantidad": 1, "precioUnitario": 180.00 }
                  ],
                  "total": 180.00
                },
                {
                  "numeroFactura": "FAC-007",
                  "cliente": {
                    "nombre": "Diego Ramírez",
                    "direccion": "Calle Larga 987"
                  },
                  "fecha": "2025-04-07",
                  "productos": [
                    { "descripcion": "Monitor LED 24\"", "cantidad": 2, "precioUnitario": 200.00 }
                  ],
                  "total": 400.00
                },
                {
                  "numeroFactura": "FAC-008",
                  "cliente": {
                    "nombre": "Sofía Díaz",
                    "direccion": "Camino Real 45"
                  },
                  "fecha": "2025-04-08",
                  "productos": [
                    { "descripcion": "Teclado Mecánico", "cantidad": 2, "precioUnitario": 75.00 },
                    { "descripcion": "Mouse Inalámbrico", "cantidad": 1, "precioUnitario": 25.50 }
                  ],
                  "total": 175.50
                },
                {
                  "numeroFactura": "FAC-009",
                  "cliente": {
                    "nombre": "Javier Morales",
                    "direccion": "Boulevard Norte 32"
                  },
                  "fecha": "2025-04-09",
                  "productos": [
                    { "descripcion": "Laptop HP", "cantidad": 1, "precioUnitario": 850.00 },
                    { "descripcion": "Memoria USB 32GB", "cantidad": 3, "precioUnitario": 12.00 }
                  ],
                  "total": 886.00
                },
                {
                  "numeroFactura": "FAC-010",
                  "cliente": {
                    "nombre": "Lucía Fernández",
                    "direccion": "Avenida Central 567"
                  },
                  "fecha": "2025-04-10",
                  "productos": [
                    { "descripcion": "Impresora Multifuncional", "cantidad": 1, "precioUnitario": 120.00 },
                    { "descripcion": "Toner Negro", "cantidad": 2, "precioUnitario": 45.00 }
                  ],
                  "total": 210.00
                },
                {
                  "numeroFactura": "FAC-011",
                  "cliente": {
                    "nombre": "Juan Pérez",
                    "direccion": "Calle Falsa 123"
                  },
                  "fecha": "2025-04-11",
                  "productos": [
                    { "descripcion": "Parlantes Estéreo", "cantidad": 1, "precioUnitario": 60.00 }
                  ],
                  "total": 60.00
                },
                {
                  "numeroFactura": "FAC-012",
                  "cliente": {
                    "nombre": "María Gómez",
                    "direccion": "Av. Siempre Viva 742"
                  },
                  "fecha": "2025-04-12",
                  "productos": [
                    { "descripcion": "Silla Ergonómica", "cantidad": 2, "precioUnitario": 150.00 }
                  ],
                  "total": 300.00
                },
                {
                  "numeroFactura": "FAC-013",
                  "cliente": {
                    "nombre": "Carlos López",
                    "direccion": "Carrera 5 # 10-20"
                  },
                  "fecha": "2025-04-13",
                  "productos": [
                    { "descripcion": "Mouse Inalámbrico", "cantidad": 4, "precioUnitario": 25.50 },
                    { "descripcion": "Teclado Mecánico", "cantidad": 1, "precioUnitario": 75.00 }
                  ],
                  "total": 177.00
                },
                {
                  "numeroFactura": "FAC-014",
                  "cliente": {
                    "nombre": "Ana Martínez",
                    "direccion": "Calle 10 # 45-67"
                  },
                  "fecha": "2025-04-14",
                  "productos": [
                    { "descripcion": "Monitor LED 24\"", "cantidad": 1, "precioUnitario": 200.00 },
                    { "descripcion": "Mesa de Oficina", "cantidad": 1, "precioUnitario": 180.00 }
                  ],
                  "total": 380.00
                },
                {
                  "numeroFactura": "FAC-015",
                  "cliente": {
                    "nombre": "Pedro Sánchez",
                    "direccion": "Diagonal 20 # 12-34"
                  },
                  "fecha": "2025-04-15",
                  "productos": [
                    { "descripcion": "Memoria USB 32GB", "cantidad": 10, "precioUnitario": 12.00 }
                  ],
                  "total": 120.00
                },
                {
                  "numeroFactura": "FAC-016",
                  "cliente": {
                    "nombre": "Laura Torres",
                    "direccion": "Plaza Mayor 12"
                  },
                  "fecha": "2025-04-16",
                  "productos": [
                    { "descripcion": "Laptop HP", "cantidad": 1, "precioUnitario": 850.00 },
                    { "descripcion": "Mouse Inalámbrico", "cantidad": 1, "precioUnitario": 25.50 }
                  ],
                  "total": 875.50
                },
                {
                  "numeroFactura": "FAC-017",
                  "cliente": {
                    "nombre": "Diego Ramírez",
                    "direccion": "Calle Larga 987"
                  },
                  "fecha": "2025-04-17",
                  "productos": [
                    { "descripcion": "Impresora Multifuncional", "cantidad": 1, "precioUnitario": 120.00 },
                    { "descripcion": "Toner Negro", "cantidad": 3, "precioUnitario": 45.00 }
                  ],
                  "total": 255.00
                },
                {
                  "numeroFactura": "FAC-018",
                  "cliente": {
                    "nombre": "Sofía Díaz",
                    "direccion": "Camino Real 45"
                  },
                  "fecha": "2025-04-18",
                  "productos": [
                    { "descripcion": "Memoria USB 32GB", "cantidad": 4, "precioUnitario": 12.00 }
                  ],
                  "total": 48.00
                },
                {
                  "numeroFactura": "FAC-019",
                  "cliente": {
                    "nombre": "Javier Morales",
                    "direccion": "Boulevard Norte 32"
                  },
                  "fecha": "2025-04-19",
                  "productos": [
                    { "descripcion": "Monitor LED 24\"", "cantidad": 2, "precioUnitario": 200.00 },
                    { "descripcion": "Parlantes Estéreo", "cantidad": 1, "precioUnitario": 60.00 }
                  ],
                  "total": 460.00
                },
                {
                  "numeroFactura": "FAC-020",
                  "cliente": {
                    "nombre": "Lucía Fernández",
                    "direccion": "Avenida Central 567"
                  },
                  "fecha": "2025-04-20",
                  "productos": [
                    { "descripcion": "Teclado Mecánico", "cantidad": 3, "precioUnitario": 75.00 }
                  ],
                  "total": 225.00
                },
                {
                  "numeroFactura": "FAC-021",
                  "cliente": {
                    "nombre": "Juan Pérez",
                    "direccion": "Calle Falsa 123"
                  },
                  "fecha": "2025-04-21",
                  "productos": [
                    { "descripcion": "Silla Ergonómica", "cantidad": 1, "precioUnitario": 150.00 },
                    { "descripcion": "Mesa de Oficina", "cantidad": 1, "precioUnitario": 180.00 }
                  ],
                  "total": 330.00
                },
                {
                  "numeroFactura": "FAC-022",
                  "cliente": {
                    "nombre": "María Gómez",
                    "direccion": "Av. Siempre Viva 742"
                  },
                  "fecha": "2025-04-22",
                  "productos": [
                    { "descripcion": "Mouse Inalámbrico", "cantidad": 2, "precioUnitario": 25.50 }
                  ],
                  "total": 51.00
                },
                {
                  "numeroFactura": "FAC-023",
                  "cliente": {
                    "nombre": "Carlos López",
                    "direccion": "Carrera 5 # 10-20"
                  },
                  "fecha": "2025-04-23",
                  "productos": [
                    { "descripcion": "Laptop HP", "cantidad": 1, "precioUnitario": 850.00 },
                    { "descripcion": "Memoria USB 32GB", "cantidad": 2, "precioUnitario": 12.00 }
                  ],
                  "total": 874.00
                },
                {
                  "numeroFactura": "FAC-024",
                  "cliente": {
                    "nombre": "Ana Martínez",
                    "direccion": "Calle 10 # 45-67"
                  },
                  "fecha": "2025-04-24",
                  "productos": [
                    { "descripcion": "Impresora Multifuncional", "cantidad": 1, "precioUnitario": 120.00 },
                    { "descripcion": "Toner Negro", "cantidad": 1, "precioUnitario": 45.00 },
                    { "descripcion": "Parlantes Estéreo", "cantidad": 1, "precioUnitario": 60.00 }
                  ],
                  "total": 225.00
                },
                {
                  "numeroFactura": "FAC-025",
                  "cliente": {
                    "nombre": "Pedro Sánchez",
                    "direccion": "Diagonal 20 # 12-34"
                  },
                  "fecha": "2025-04-25",
                  "productos": [
                    { "descripcion": "Monitor LED 24\"", "cantidad": 1, "precioUnitario": 200.00 },
                    { "descripcion": "Teclado Mecánico", "cantidad": 2, "precioUnitario": 75.00 }
                  ],
                  "total": 350.00
                },
                {
                  "numeroFactura": "FAC-026",
                  "cliente": {
                    "nombre": "Laura Torres",
                    "direccion": "Plaza Mayor 12"
                  },
                  "fecha": "2025-04-26",
                  "productos": [
                    { "descripcion": "Mesa de Oficina", "cantidad": 2, "precioUnitario": 180.00 }
                  ],
                  "total": 360.00
                },
                {
                  "numeroFactura": "FAC-027",
                  "cliente": {
                    "nombre": "Diego Ramírez",
                    "direccion": "Calle Larga 987"
                  },
                  "fecha": "2025-04-27",
                  "productos": [
                    { "descripcion": "Teclado Mecánico", "cantidad": 1, "precioUnitario": 75.00 },
                    { "descripcion": "Mouse Inalámbrico", "cantidad": 3, "precioUnitario": 25.50 }
                  ],
                  "total": 151.50
                },
                {
                  "numeroFactura": "FAC-028",
                  "cliente": {
                    "nombre": "Sofía Díaz",
                    "direccion": "Camino Real 45"
                  },
                  "fecha": "2025-04-28",
                  "productos": [
                    { "descripcion": "Laptop HP", "cantidad": 1, "precioUnitario": 850.00 },
                    { "descripcion": "Memoria USB 32GB", "cantidad": 4, "precioUnitario": 12.00 }
                  ],
                  "total": 898.00
                },
                {
                  "numeroFactura": "FAC-029",
                  "cliente": {
                    "nombre": "Javier Morales",
                    "direccion": "Boulevard Norte 32"
                  },
                  "fecha": "2025-04-29",
                  "productos": [
                    { "descripcion": "Impresora Multifuncional", "cantidad": 1, "precioUnitario": 120.00 },
                    { "descripcion": "Toner Negro", "cantidad": 2, "precioUnitario": 45.00 }
                  ],
                  "total": 210.00
                },
                {
                  "numeroFactura": "FAC-030",
                  "cliente": {
                    "nombre": "Lucía Fernández",
                    "direccion": "Avenida Central 567"
                  },
                  "fecha": "2025-04-30",
                  "productos": [
                    { "descripcion": "Monitor LED 24\"", "cantidad": 3, "precioUnitario": 200.00 }
                  ],
                  "total": 600.00
                }
              ]
        });
      }, 1000); // Simular retardo de red
    });
  }


  
  document.getElementById("registrosPorPagina").addEventListener("change", () => {
    registrosPorPagina = parseInt(document.getElementById("registrosPorPagina").value);
    paginaActual = 1;
    renderizarTabla();
  });
  
  async function cargarFacturas() {
    try {
      const respuesta = await obtenerDatosAPI();
      facturasGlobal = respuesta.facturas || [];
  
      if (facturasGlobal.length === 0) {
        document.getElementById("tabla-container").innerHTML = "<p>No hay datos disponibles.</p>";
        return;
      }
  
      renderizarTabla();
    } catch (error) {
      console.error("Error al cargar las facturas:", error);
      document.getElementById("tabla-container").innerHTML = "<p>Error al cargar los datos.</p>";
    }
  }
  
  function aplicarFiltros(data) {
    return data.filter(factura => {
      return Object.entries(filtros).every(([clave, valor]) => {
        if (!valor) return true;
        const campo = factura[clave];
        const texto = typeof campo === "object"
          ? JSON.stringify(campo)
          : String(campo).toLowerCase();
  
        return texto.includes(valor.toLowerCase());
      });
    });
  }
  
  function renderizarTabla() {
    const contenedor = document.getElementById("tabla-container");
    contenedor.innerHTML = "";
  
    const tabla = document.createElement("table");
  
    const encabezados = Object.keys(facturasGlobal[0]);
  
    // Fila de filtros
    const filaFiltros = document.createElement("tr");
    const filtrosTemporales = {};
  
    encabezados.forEach(encabezado => {
      const th = document.createElement("th");
      const input = document.createElement("input");
  
      input.placeholder = `Filtrar ${encabezado}`;
      input.value = filtros[encabezado] || "";
  
      input.addEventListener("input", (e) => {
        filtrosTemporales[encabezado] = e.target.value;
  
        // Guardar foco y posición del cursor
        const posicion = e.target.selectionStart;
        const inputActivo = e.target;
  
        filtros[encabezado] = e.target.value;
        paginaActual = 1;
  
        // Esperar al siguiente ciclo de renderizado para restaurar foco
        setTimeout(() => {
          renderizarTabla();
  
          const nuevosInputs = document.querySelectorAll("tr input");
          nuevosInputs.forEach(inp => {
            if (inp.placeholder === inputActivo.placeholder) {
              inp.focus();
              inp.setSelectionRange(posicion, posicion);
            }
          });
        }, 0);
      });
  
      th.appendChild(input);
      filaFiltros.appendChild(th);
    });
  
    tabla.appendChild(filaFiltros);
  
    // Fila de encabezados
    const filaEncabezado = document.createElement("tr");
    encabezados.forEach(encabezado => {
      const th = document.createElement("th");
      th.textContent = encabezado;
      filaEncabezado.appendChild(th);
    });
    tabla.appendChild(filaEncabezado);
  
    const datosFiltrados = aplicarFiltros(facturasGlobal);
    const totalPaginas = Math.ceil(datosFiltrados.length / registrosPorPagina);
    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const facturasPagina = datosFiltrados.slice(inicio, fin);
  
    // Render filas
    facturasPagina.forEach(factura => {
      const fila = document.createElement("tr");
      Object.values(factura).forEach(valor => {
        const celda = document.createElement("td");
  
        if (Array.isArray(valor)) {
          celda.textContent = valor.map(item =>
            typeof item === "object" ? Object.values(item).join(" - ") : item
          ).join(" | ");
        } else if (typeof valor === "object" && valor !== null) {
          celda.textContent = Object.values(valor).join(", ");
        } else {
          celda.textContent = valor;
        }
  
        fila.appendChild(celda);
      });
      tabla.appendChild(fila);
    });
  
    contenedor.appendChild(tabla);
    renderizarPaginacion(totalPaginas);
  }
  
  function renderizarPaginacion(totalPaginas) {
    const paginacion = document.getElementById("paginacion");
    paginacion.innerHTML = "";
  
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";
    btnAnterior.disabled = paginaActual === 1;
    btnAnterior.onclick = () => {
      if (paginaActual > 1) {
        paginaActual--;
        renderizarTabla();
      }
    };
  
    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente";
    btnSiguiente.disabled = paginaActual === totalPaginas;
    btnSiguiente.onclick = () => {
      if (paginaActual < totalPaginas) {
        paginaActual++;
        renderizarTabla();
      }
    };
  
    const info = document.createElement("span");
    info.textContent = ` Página ${paginaActual} de ${totalPaginas} `;
  
    paginacion.appendChild(btnAnterior);
    paginacion.appendChild(info);
    paginacion.appendChild(btnSiguiente);
  }
  
