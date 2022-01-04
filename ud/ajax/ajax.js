/**
 *   Ejercicios de AJAX.
 *   @author Rubén Torres <rtorresgutierrez.guadaluoe@alumnado.fundacionloyola.netm>
 *   @license GPL-3.0-or-later
 */

'use strict'

/**
Realiza una llamada asíncrona para cargar un fichero de texto.
Utiliza el método fetch y muestra el contenido del fichero en un div.
@param {String} fichero URL del fichero de texto que se cargará.
@param {String} divId Identificador del div donde se mostrará el texto.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function cargarFicheroTextoFetch(fichero, divId, callback){

    fetch(fichero)
	.then(respuesta => respuesta.text())
	.then(objeto => document.getElementById(divId).textContent = objeto)
	.then(() => {if(callback) callback()});

}

/**
Realiza una llamada asíncrona por método GET para cargar un fichero de texto.
Utiliza el objeto XMLHttpRequest y su evento onload para mostrar el contenido del fichero en un div.
@param {String} fichero URL del fichero de texto que se cargará.
@param {String} divId Identificador del div donde se mostrará el texto.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function cargarFicheroTextoXMLHttpRequest1(fichero, divId, callback){

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
	document.getElementById(divId).textContent = this.responseText;
	if(callback) callback();
    }
    xhttp.open('GET', fichero, true);
    xhttp.send();

}

/**
Realiza una llamada asíncrona por método GET para cargar un fichero de texto.
Utiliza el objeto XMLHttpRequest y su evento onreadystatechange para mostrar el contenido del fichero en un div.
La función comprueba el estado de la respuesta recibida del servidor.
@param {String} fichero URL del fichero de texto que se cargará.
@param {String} divId Identificador del div donde se mostrará el texto.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function cargarFicheroTextoXMLHttpRequest2(fichero, divId, callback){

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
	    document.getElementById(divId).textContent = this.responseText;
	    if(callback) callback();
	}
    }
    xhttp.open('GET', fichero, true);
    xhttp.send();

}

/**
Realiza una petición asíncrona por método GET y le pasa dos parámetros.
Utiliza la función fetch para realizar la llamada y muestra la respuesta en un div.
La respuesta esperada es de tipo texto.
@param {String} url URL del servidor que responderá la petición.
@param {String} nombre1 Nombre del primer parámetro.
@param {String} valor1 Valor del primer parámetro.
@param {String} nombre2 Nombre del segundo parámetro.
@param {String} valor2 Valor del segundo parámetro.
@param {String} divId Identificador del div donde se mostrará la respuesta.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function enviarParametrosGET(url, nombre1, valor1, nombre2, valor2, divId, callback){

    fetch(`${url}?${nombre1}=${valor1}&${nombre2}=${valor2}`)
	.then(respuesta => respuesta.text())
	.then(objeto => document.getElementById(divId).textContent = objeto)
	.then(() => {if(callback) callback()});

}

/**
Realiza una petición asíncrona por método POST y le pasa dos parámetros.
Utiliza la función fetch para realizar la llamada y muestra la respuesta en un div.
La respuesta esperada es de tipo texto.
@param {String} url URL del servidor que responderá la petición.
@param {String} nombre1 Nombre del primer parámetro.
@param {String} valor1 Valor del primer parámetro.
@param {String} nombre2 Nombre del segundo parámetro.
@param {String} valor2 Valor del segundo parámetro.
@param {String} divId Identificador del div donde se mostrará la respuesta.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function enviarParametrosPOST(url, nombre1, valor1, nombre2, valor2, divId, callback){

    let formData = new FormData();
    formData.append(nombre1, valor1);
    formData.append(nombre2, valor2);
    let opciones = {
        method: 'POST',
        body: formData
    };
    fetch(url, opciones)
        .then(respuesta => respuesta.text())
        .then(texto => document.getElementById(divId).textContent = texto)
	.then(() => {if(callback) callback()});

}

/**
Realiza una petición asíncrona por método POST y le pasa un parámetro.
Utiliza la función fetch para realizar la llamada y muestra la respuesta en un div.
La respuesta esperada es de tipo JSON.
@param {String} url URL del servidor que responderá la petición.
@param {String} nombreParam Nombre del primer parámetro.
@param {String} valorParam Valor del primer parámetro.
@param {String} divId Identificador del div donde se mostrará la respuesta.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function recibirJSON(url, nombreParam, valorParam, divId, callback){

    let formData = new FormData();
    formData.append(nombreParam, valorParam);
    let opciones = {
        method: 'POST',
        body: formData
    };
    fetch(url, opciones)
        .then(respuesta => respuesta.json())
        .then(objeto => document.getElementById(divId).innerHTML = objeto.atrib1)
	.then(() => {if(callback) callback()});

}

/**
Realiza una petición asíncrona por método POST y le pasa un parámetro.
Utiliza la función fetch para realizar la llamada y muestra la respuesta en un div.
La respuesta esperada es de tipo XML y se procesa con DOMParser.
@param {String} url URL del servidor que responderá la petición.
@param {String} nombreParam Nombre del primer parámetro.
@param {String} valorParam Valor del primer parámetro.
@param {String} divId Identificador del div donde se mostrará la respuesta.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function recibirXML(url, nombreParam, valorParam, divId, callback){

    let formData = new FormData();
    formData.append(nombreParam, valorParam);
    let opciones = {
        method: 'POST',
        body: formData
    };
    fetch(url, opciones)
        .then(respuesta => respuesta.text())
	.then(texto => new DOMParser().parseFromString(texto, "text/xml"))
        .then(objeto => document.getElementById(divId).textContent = objeto.documentElement.getAttribute('atrib1'))
	.then(() => {if(callback) callback()});

}

/**
Realiza una llamada asíncrona por el método GET a una URL y muestra el código del error recibido en el div indicado.
@param {String} fichero URL del fichero de texto que se cargará.
@param {String} divId Identificador del div donde se mostrará el texto.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function controlarErrores(fichero, divId, callback){

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	if(this.readyState == 4 && (this.status == 404 || this.status == 503 || this.status == 418)){
            document.getElementById(divId).innerHTML = this.status;
	    if(callback) callback();
	}
    }
    xhttp.open('GET', fichero, true);
    xhttp.send();

}

/**
Realiza una llamada asíncrona por el método GET a una URL y establece el tiempo de timeout en 5 segundos. Si transcurrido ese tiempo no se ha recibido la rrespuesta del servidor, muestra el texto "timeout" en el div indicado.
@param {String} url URL del fichero de texto que se cargará.
@param {String} divId Identificador del div donde se mostrará el texto.
@param {Function} callback Función que se llamará al terminar la carga o detectar el timeout.
**/
function controlarTimeout(url, divId, callback){

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
	    document.getElementById(divId).textContent = this.responseText;
	    if(callback) callback();
	}
    }
    xhttp.open('GET', url, true);
    xhttp.timeout = 5000;
    xhttp.ontimeout = () => {
	document.getElementById(divId).textContent = 'timeout';
	if(callback) callback();
    }
    xhttp.send();

}

/**
Realiza una llamada asíncrona para cargar un texto.
Utiliza el método fetch y muestra el texto de la respuesta en un div.
@param {String} url URL del la petición.
@param {String} divId Identificador del div donde se mostrará el texto.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function peticionCORS(url, divId, callback){

    fetch(url)
	.then(respuesta => respuesta.text())
	.then(objeto => document.getElementById(divId).textContent = objeto)
	.then(() => {if(callback) callback()});

}

/**
Realiza una petición asíncrona por método POST y le pasa como parámetro un fichero.
Utiliza la función fetch para realizar la llamada y muestra la respuesta como fuente (src) de una imagen recibida con codificación Base64.
@param {String} url URL del servidor que responderá la petición.
@param {String} nombre Nombre del parámetro.
@param {String} iFileId Identificador del input donde se cargará el fichero que se enviará al servidor.
@param {String} imgId Identificador del elemento imagen donde se mostrará la respuesta.
@param {Function} callback Función que se llamará al terminar la carga.
**/
function enviarFichero(url, nombre, iFileId, imgId, callback){

    //Formar la url de donde se encuentra el archivo para hacer la petición a esa url
    let nombreFichero = document.getElementById(iFileId).value.split('\\');
    let fichero = document.getElementById(iFileId).baseURI + nombreFichero[nombreFichero.length - 1];
    console.log(fichero)
    fetch(fichero)
	.then(respuesta => respuesta.text())
	.then(texto => {
	    let formData = new FormData();
	    formData.append(nombre, texto);
	    let opciones = {
		method: 'POST',
	        body: formData
	    };
	    fetch(url, opciones)
		.then(respuesta => respuesta.text())
		.then(imagen => document.getElementById(imgId).src = `data:image/png;base64,${imagen}`)
	        .then(() => {if(callback) callback()});
	});

    

}
