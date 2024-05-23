
const selectGenero = document.querySelector('select');
const selectFiltro = document.querySelector('#filtro');
const formulario = document.querySelector('#formulario');
const tabla = document.querySelector('table tbody');
const fragment = document.createDocumentFragment();
const fechaActual = new Date().getFullYear();
let peliculas = [];

const generos = ['Terror', 'Comedia', 'Accion', 'Romantica'];

const expreReg = {
    titulo: /^[a-zA-Z0-9\s.,':!?-]+$/,
    director:/^[a-zA-Z\s.-]+$/,
    year: /^(18[0-9]{2}|19[0-9]{2}|20[0-9]{2}|2100)$/
}

let objetosValidar = {
    titulo: false,
    director : false,
    year: false,
    genero: false
}

formulario.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    validarFormulario();
})
selectFiltro.addEventListener('change', ()=>{
    const generoSeleccionado = selectFiltro.value;
    filtrarPeliculas(generoSeleccionado);
})

const validarFormulario = ()=>{
    objetosValidar = { titulo: false, director: false, year: false, genero:false };
    const titulo = formulario.querySelector('#titulo').value;
    const director = formulario.querySelector('#director').value;
    const year = formulario.querySelector('#year').value;
    const genero = formulario.querySelector('#genero').value;

    if(titulo !== ''){
        if(expreReg.titulo.test(titulo)){
           objetosValidar.titulo = true;
        }     
    }else{
        alert('Titulo no puede estar vacio');
    }

    if(director !== ''){
        if(expreReg.director.test(director)){
            objetosValidar.director = true;
         }    
    }else{
        alert('Director no puede estar vacio');
    }

    if(year !== ''){
        if(expreReg.year.test(year) && year <= fechaActual){
            objetosValidar.year = true;
         }else{
            alert('El año es incorrecto')
         }   
    }else{
        alert('El año no puede estar vacio');
    }
    if (genero !== '' && genero !== 'Selecciona un genero') {
        objetosValidar.genero = true;
    } else {
        alert('Debe seleccionar un género');
    }

    const valoresObjValidar=Object.values(objetosValidar)
    const validado = valoresObjValidar.some((valor)=>valor === false);

    if(!validado){
        const nuevaPelicula = { titulo, director, year, genero };
        peliculas.push(nuevaPelicula);
        agregarFilaTabla(nuevaPelicula);
        formulario.reset();
    }else{
        alert('No se ha podido enviar el formulario')
    }
}
const filtrarPeliculas = (genero) => {
    tabla.innerHTML = '';
    let peliculasFiltradas;
    if(genero === 'Todos los generos'){
        peliculasFiltradas = peliculas;
    }else{
       peliculasFiltradas = peliculas.filter(pelicula => pelicula.genero === genero); 
    }

    if(peliculasFiltradas.length === 0){
        tabla.innerHTML = '<p>No hay archivos que mostrar</p>'
    }
    peliculasFiltradas.forEach(pelicula =>{
        agregarFilaTabla(pelicula)
    });
}

const agregarFilaTabla = (pelicula) => {
    const fila = document.createElement('tr');
    const casillaTitulo = document.createElement('td');
    const casillaDirector = document.createElement('td');
    const casillaYear = document.createElement('td');
    const casillaGenero = document.createElement('td');
    casillaTitulo.textContent = pelicula.titulo;
    casillaDirector.textContent = pelicula.director;
    casillaYear.textContent = pelicula.year;
    casillaGenero.textContent = pelicula.genero;
    fila.append(casillaTitulo, casillaDirector, casillaYear, casillaGenero);
    tabla.append(fila);
};


const crearOpciones = (...generos)=>{
        generos.forEach(opc => {
        const opcion = document.createElement('option');
        opcion.value = opc;
        opcion.textContent = opc;
        fragment.append(opcion)
    });
    return fragment;    
}

selectGenero.append(crearOpciones('Selecciona un genero', ...generos));
selectFiltro.append(crearOpciones('Todos los generos', ...generos));
