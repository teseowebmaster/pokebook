pos=-1
url="https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
window.onload=function(){
	document.getElementById("filtro").addEventListener("keyup",function(evento){ filtrar()})
	document.getElementById("ampliacion").addEventListener("click",function(evento){ ocultar()})
	window.addEventListener("scroll",function(evento){ comprobar()})
	cargar(url)
}
 
function cargar(url){
    document.getElementById("filtro").value=""
    filtrar()
    fetch(url)
	.then(resultado)
     .catch(conError)
}

function resultado(response){
    response.text().then(guardar);
}
        
function conError(error){
    document.getElementById("consolaError").innerHTML=error
}
       
function guardar(txt){
    objetoContenido=JSON.parse(txt)
    total=objetoContenido.count;
    url=objetoContenido.next
    previo=objetoContenido.previus
    for(let indice in objetoContenido.results){
        pos++
        id=pos+1
        nombre=objetoContenido.results[indice].name
        direccion=objetoContenido.results[indice].url
        pokemon=document.createElement("div")
        pokemon.className="pokeminitos"
        pokemon.id=nombre
        document.getElementById("contenedor").appendChild(pokemon)
		document.getElementById(nombre).addEventListener("click",function(evento){ mostrar(this.innerHTML)})
     	contenedorImagen=document.createElement("div")
		pokemon.appendChild(contenedorImagen)
        imagen=document.createElement("img")
        imagen.src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/"+id+".png"
		contenedorImagen.appendChild(imagen)
		contenedorTitulo=document.createElement("h1")
		pokemon.appendChild(contenedorTitulo)
		contenedorTitulo.innerHTML="<a href='#'>"+nombre+"</a>"
		identificador=document.createElement("p")
		identificador.className="identificador"
		identificador.innerHTML="ID/"+id
		pokemon.appendChild(identificador)
		leer(direccion,pos)
	}
}

function comprobar(){
	//Función para cargar más elementos al finalizar scroll
	total=window.scrollY-document.documentElement.scrollHeight
	alturaVentana=window.innerHeight
	posicion=parseInt(total+alturaVentana)
	if (posicion==-0) cargar(url)
	}

function leer(curl,pos){
	filtrar()
	fetch(curl)
    .then((response)=>response.text().then((txt)=>{
    objetoContenido[pos]=JSON.parse(txt)
    	for(let indice in objetoContenido[pos].types){
        	elnombre=objetoContenido[pos].types[indice].type.name
        	console.log(objetoContenido[pos].types[0].type.name)
        	nuevoSpan=document.createElement("span")
        	nuevoSpan.innerHTML=elnombre
			document.getElementsByClassName('pokeminitos')[pos].appendChild(nuevoSpan)
		} 
        
    })) 
    .catch(conError)
}
	
function filtrar(){
escrito=document.getElementById("filtro").value
todos=document.querySelectorAll("#contenedor>div");
	if (escrito!=""){
		visibles=document.querySelectorAll(`[id^="`+escrito.toLowerCase()+`"]`);
		//visibles=document.querySelectorAll(`[class*="`+escrito+`"]`);	
			for (x=0; x<todos.length;x++){
				todos[x].style.display="none"
			}
			for (x=0; x<visibles.length;x++){
				visibles[x].style.display="block"
			}
	}
	else{
		for (x=0; x<todos.length;x++){
				todos[x].style.display="block"
		}
	}
}
	
function mostrar(contenido){
	document.getElementById("ampliacion").innerHTML=contenido;
	document.getElementById("ampliacion").style.transformOrigin="left top"
	document.getElementById("ampliacion").style.transform=' scale(3.5,3)'
	document.getElementById("ampliacion").style.display="block"
}

function ocultar(){
	document.getElementById("ampliacion").style.display="none"
}