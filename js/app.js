//SIMULADOR FILTRO DE COMPRA

//Selección HTML
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const resultados = document.querySelector('#resultado');
const selectMax = document.querySelector("#select-maximo");

//Parametros
const currentYear = new Date().getFullYear(); //La empresa no vende autos menores a 2010
const minYear = currentYear - 14;

//Objeto Campos
const datosBusqueda = {
    marca: '',
	year: '',
	precioMin: '',
	precioMax: '',
	puertas: '',
	transmision: '',
    color: ''
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); //Arreglo de la base de datos
    establecerAños();
});

//--//
cargarEventos();

function cargarEventos() {
    marca.addEventListener('change', e => { 
        //El evento 'change' se dispara en elementos <input>, <select> y <textarea> cuando este efectua un cambio. 
        const value = e.target.value; 
        //Del elemento <select> el atributo .value correponde al 'value' del <option> seleccionado
        datosBusqueda.marca = value;
    
        filtrarAuto();
    })
    
    year.addEventListener('change', e =>{ 
        const value = e.target.value;
        datosBusqueda.year = parseInt(value);
    
        filtrarAuto();
    })
    
    minimo.addEventListener('change', e =>{ 
        const value = e.target.value;
        datosBusqueda.precioMin = parseInt(value);
    
        comprobarIntervalo();
        filtrarAuto();
    })
    
    maximo.addEventListener('change', e =>{ 
        const value = e.target.value;
        datosBusqueda.precioMax = parseInt(value);
    
        comprobarIntervalo();
        filtrarAuto();
    })
    
    puertas.addEventListener('change', e =>{ 
        const value = e.target.value;
        datosBusqueda.puertas = parseInt(value);
    
        filtrarAuto();
    })
    
    transmision.addEventListener('change', e =>{ 
        const value = e.target.value;
        datosBusqueda.transmision = value;
    
        filtrarAuto();
    })
    
    color.addEventListener('change', e =>{ 
        const value = e.target.value;
        datosBusqueda.color = value;
    
        filtrarAuto();
    })
    
}

//Funciones
function mostrarAutos(arreglo) {
    limpiarHTML(resultados);

    arreglo.forEach( auto => {
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} PUERTAS - TRANSMISION: ${transmision} 
        - PRECIO: $ ${precio} - COLOR: ${color}
        `;
        resultados.appendChild(autoHTML);
    });
}

//--//
function establecerAños() {
    for(let i = currentYear; i >= minYear; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;

        year.appendChild(option);
    }
}

//--//
function filtrarAuto() {
    const resultado = autos
    .filter(auto => filtrarMarca(auto))
    .filter(auto => filtrarYear(auto))
    .filter(auto => filtrarMin(auto))
    .filter(auto => filtrarMax(auto))
    .filter(auto => filtrarPuertas(auto))
    .filter(auto => filtrarTrans(auto))
    .filter(auto => filtrarColor(auto));

    if(resultado.length) {
        mostrarAutos(resultado)
    } else {
        sinResultado();
    }
}

//<->//
function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if(marca) {
        return auto.marca === marca;
    }
    //El retorno del mismo elemento dentro de un .filter() es igual al valor de 'true'
    return auto; 
}

//<->//
function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if(year) {
        return auto.year === year;
    }
    return auto;
}

//<->//
function filtrarMin(auto) {
    const { precioMin } = datosBusqueda;
    if(precioMin) {
        return auto.precio >= precioMin;
    }
    return auto;
}

//<->//
function filtrarMax(auto) {
    const { precioMax } = datosBusqueda;
    if (precioMax) {
        return auto.precio <= precioMax;
    }
    return auto;
}

//<->//
function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if(puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

//<->//
function filtrarTrans(auto) {
    const { transmision } = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

//<->//
function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if(color) {
        return auto.color === color;
    }
    return auto;
}

//<->//
function sinResultado() {
    limpiarHTML(resultados);
    const alerta = document.createElement('div');
    alerta.classList.add('alerta', 'error');
    alerta.textContent = "No Hay Coincidencias";
    resultados.appendChild(alerta);
}

//--//
function comprobarIntervalo() {
    if(datosBusqueda.precioMax && datosBusqueda.precioMax < datosBusqueda.precioMin) {
        limpiarAlerta(selectMax);

        maximo.classList.add('error-intervalo');
        const advertencia = document.createElement('p');
        advertencia.classList.add("alerta-2");
        advertencia.textContent = "ERROR: Precio Maximo menor a Precio Minimo";
        selectMax.appendChild(advertencia);
        return;
    }
    
    maximo.classList.remove('error-intervalo');
    limpiarAlerta(selectMax);
}

//--//
function limpiarAlerta(element) {
    if(element.children[2]) {
        element.removeChild(selectMax.children[2]);
    }
}

//--//
function limpiarHTML(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}