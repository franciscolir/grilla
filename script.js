// main.js (o el archivo donde quieras usar los datos)

import { facturas } from './facturas-data.js';

//console.log("Facturas cargadas:", facturas);


let paginaActual = 1;
let registrosPorPagina = 10;
let facturasGlobal = [];
let filtros = {};
const URL_API = 'https://jsonplaceholder.typicode.com/comments';
document.getElementById("registrosPorPagina").addEventListener("change", () => {
  registrosPorPagina = parseInt(document.getElementById("registrosPorPagina").value);
  paginaActual = 1;
  renderizarTabla();
});

//----------------------ASYNC-AWAIT FUNCTION---------------------------//

async function obtenerDatosAPI() {
    try {
          
    // Llamada real a una API pública de ejemplo (JSONPlaceholder)
    const respuesta = await fetch(URL_API);

      if (!respuesta.ok) throw new Error("No se pudo cargar el archivo facturas.json");
  
      const datos = await respuesta.json();
      //console.log("datos ", datos)
      return datos;
    } catch (error) {
      console.error("Error al obtener datos de la API simulada:", error);
      return { usuarios: [] }; // manejar error devolviendo array vacío
    }
  }

  async function obtenerDatosJSON(usarJS = false) {
    try {
      // Simular un retraso de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      if (usarJS) {
       //Cargar datos desde facturas.json
        const respuesta = await fetch('facturas.json');
        if (!respuesta.ok) throw new Error("No se pudo cargar facturas.json");
        const datos = await respuesta.json();
        //console.log("datos desde JSON:", datos);
        return datos;
      } else {
        //Cargar datos desde facturas-data.js
        //console.log("datos desde JS:", facturas);
        return facturas.facturas; //llamar a variable importada y entrando a json
      }
  
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return { facturas: [] };
    }
  }
    
  document.getElementById("registrosPorPagina").addEventListener("change", () => {
    registrosPorPagina = parseInt(document.getElementById("registrosPorPagina").value);
    paginaActual = 1;
    renderizarTabla();
  });
  
  async function cargarDatos(boton) {
    try {
      
      if (boton==1){
        const respuesta = await obtenerDatosAPI();
        facturasGlobal = respuesta || [];

      }else if(boton==2) {
        const respuesta = await obtenerDatosJSON(true);
        facturasGlobal = respuesta.facturas || [];
        
      }else {
        const respuesta = await obtenerDatosJSON(false);
        facturasGlobal = respuesta || [];
        
      }
  
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
  
//------------------------------------------------------------//


//------------------PROMISE FUNCTION---------------------------//
function obtenerDatosAPIConPromise() {
  // Simulamos una función que devuelve una Promesa sin usar async/await
  return fetch(URL_API)
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error("No se pudo cargar usuarios");
      }
      return respuesta.json();
    })
    .then(datos => {
      //console.log("datos", datos);
      return  datos;
    })
    .catch(error => {
      console.error("Error al obtener datos de la API simulada:", error);
      return error;
    });
}

function obtenerDatosJSONConPromise(usarJSON) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (usarJSON) {
        // Cargar desde archivo JSON por fetch
        fetch('facturas.json')
          .then(respuesta => {
            if (!respuesta.ok) throw new Error("No se pudo cargar facturas.json");
            return respuesta.json();
          })
          .then(datos => resolve(datos))
          .catch(error => {
            console.error("Error al obtener datos desde JSON:", error);
            resolve({ facturas: [] });
          });
      } else {
        // Cargar directamente desde el módulo
        //console.log("Datos cargados desde módulo JS:", facturas);
        resolve(facturas.facturas); // Ya es un objeto
      }
    }, 1000);
  });
}


function cargarDatosConPromise(boton) {
  const contenedor = document.getElementById("tabla-container");
  let fuentePromise;
  let extraerFacturas;
//console.log("dentro de cargar dator promise boton: ", boton)
boton = Number(boton); // 👈 Conversión aquí
  switch (boton) {
    
    case 1:
      fuentePromise = obtenerDatosAPIConPromise();
      extraerFacturas = respuesta => respuesta || [];
      break;
    case 2:
      fuentePromise = obtenerDatosJSONConPromise(true);
      extraerFacturas = respuesta => respuesta.facturas || [];
      break;
    case 3:
      fuentePromise = obtenerDatosJSONConPromise(false);
      extraerFacturas = respuesta => respuesta || [];
      break;
    default:
      console.warn("Botón no reconocido:", boton);
      contenedor.innerHTML = "<p>Fuente de datos no válida.</p>";
      return;
  }

  fuentePromise
    .then(respuesta => {
      facturasGlobal = extraerFacturas(respuesta);

      if (!facturasGlobal.length) {
        contenedor.innerHTML = "<p>No hay datos disponibles.</p>";
        return;
      }

      renderizarTabla();
    })
    .catch(error => {
      console.error("Error al cargar las facturas:", error);
      contenedor.innerHTML = "<p>Error al cargar los datos.</p>";
    });
}

  



//------------------------------------------------------------//






//--------------------FILTROS Y RENDERIZACION DE TABLAS---------------//



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
  

  //Validación para comprobar tipo de dato

  if (!Array.isArray(facturasGlobal) || facturasGlobal.length === 0 || typeof facturasGlobal[0] !== "object") {
    contenedor.innerHTML = "<p>No hay datos disponibles para mostrar.</p>";
    return;
  }


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
  
  function activarBoton(botonPresionado) {
    const botones = document.querySelectorAll(".async-btn, .promise-btn");
    botones.forEach(btn => btn.classList.remove("boton-activo"));
    botonPresionado.classList.add("boton-activo");
  }
  

  //--------------------MEDIR LA CARGA---------------------//

  function medirCarga(callback, color) {

    const contador = document.getElementById("contador-tiempo");
let tiempoInicio = performance.now();

// Mostrar mensaje de carga y aplicar estilos dinámicos
contador.textContent = "Cargando...";
contador.style.backgroundColor = color;
contador.style.color = "#FFFFFF"; // Letras blancas


  
    // Envuelve el renderizado original para medir el tiempo real
    const originalRender = renderizarTabla;
  
    renderizarTabla = function () {
      originalRender(); // llama al original
      let tiempoFin = performance.now();
      let duracion = ((tiempoFin - tiempoInicio) / 1000).toFixed(2);
      contador.textContent = `${duracion}s`;
      renderizarTabla = originalRender; // restablece original
    };
  
    callback(); // ejecuta función que carga datos
  }

//----------------------ASIGNA FUNCIONES A BOTONES-----------------------------------


  // Asignar funciones al botón al cargar el DOM para ASYNC-AWAIT
  document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".async-btn"); // ✅ seleccionar todos los botones
  
    botones.forEach(btn => {
      btn.addEventListener("click", () => {
        const boton = btn.dataset.boton; // extraer número de "boton"
        //console.log("boton:", boton);
        activarBoton(btn);
        medirCarga(() => cargarDatos(boton), "#4CAF50");
      });
    });
  });
  
  
  // Asignar funciones al botón al cargar el DOM para PROMISE
  document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".promise-btn"); // ✅ seleccionar todos los botones
  
    botones.forEach(btn => {
      btn.addEventListener("click", () => {
        const boton = btn.dataset.boton; // extraer número de "boton"
        //console.log("boton:", boton);
        activarBoton(btn);
        medirCarga(() => cargarDatosConPromise(boton), '#2196F3');
      });
    });
  });