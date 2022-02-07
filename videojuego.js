{
    /**
     * @author: Tomás Hidalgo
     */    
    let intentos=0;

    const init=function(){

        let bolas=document.querySelectorAll(".bolas");
        let ganar=document.getElementById("ganar");
        let reset=document.getElementById("reset");
        document.getElementById("contador").innerHTML="Intentos: "+intentos;

        MasterMind.init();

        reset.addEventListener("click",resetear);
        ganar.addEventListener("click",comprobarVictoria);
        
        bolas.forEach(elemento=>{

            //Colorear y pintar las bolas
            pintarBolas.bind(elemento)();

            elemento.addEventListener("click",actualizarLinea.bind(elemento));            
        });
        
    }
    
    const resetear=function(){
        let lineas=devolverLineas();
        intentos=0;
        document.getElementById("contador").innerHTML="Intentos: "+intentos;
        let seleccion=document.getElementById("seleccion");
        seleccion.innerHTML=`
        <div id="filas">
            <div class="bolas bola1"></div>
            <div class="bolas bola2"></div>
            <div class="bolas bola3"></div>
            <div class="bolas bola4"></div>
        </div>`;
        let pistas=document.getElementById("pistas");
        pistas.innerHTML=`
        <div id="filas">
            <div class="bolitas"></div>
            <div class="bolitas"></div>
            <div class="bolitas"></div>
            <div class="bolitas"></div>
        </div>`;
        for(linea of lineas){ 
            linea.style.backgroundColor="";
        }

    }

    const actualizarLinea=function(){
        
        if(this.classList.contains("bola1")|| this.classList.contains("bola2")|| this.classList.contains("bola3")|| this.classList.contains("bola4")){ //Reset bola al clickar
            this.style.backgroundColor="";
        }else{ //Colorear bola al clickar
            colorearTablero.bind(this)();
        }
    }

    const devolverLineas=function(){
        let bolas=document.querySelectorAll(".bolas");
        let linea=[];
        let posicion=0;
        bolas.forEach((elemento)=>{
            if(elemento.classList.contains("bola1") || elemento.classList.contains("bola2") || elemento.classList.contains("bola3")|| elemento.classList.contains("bola4")){ //Reset bola al clickar
                linea[posicion]=elemento;
                posicion++;
            }
        });
        return linea;
    }

    const addNewLine=function(){ 
        let div1=document.createElement("div");
        let div2=document.createElement("div");
        let section1=document.getElementById("seleccion");
        let section2=document.getElementById("pistas");

        let bolas=document.querySelectorAll(".bolas");
        bolas.forEach(elemento=>{
            elemento.classList.remove("bola1");
            elemento.classList.remove("bola2");
            elemento.classList.remove("bola3");
            elemento.classList.remove("bola4");
        });
        
        for(let i=1;i<5;i++){ //Bolas grandes
            let divInterfaz=document.createElement("div");
            divInterfaz.classList.add("bolas");
            divInterfaz.classList.add(`bola${i}`);
            div1.appendChild(divInterfaz);
        }
        section1.insertAdjacentHTML('afterbegin',`<div id="filas">${div1.innerHTML}</div>`);

        for(let i=0;i<4;i++){//Bolas pequeñas
            let divInterfaz=document.createElement("div");
            divInterfaz.classList.add("bolitas");
            div2.appendChild(divInterfaz);
        }
        section2.insertAdjacentHTML('afterbegin',`<div id="filas">${div2.innerHTML}</div>`);
    }

    const comprobarVictoria=function(){
        
        let lineas=devolverLineas();
        for(linea of lineas){
            if(linea.style.backgroundColor=="") return false; 
        }
        bolas=MasterMind.comprobarConcidencia(lineas);
        if(bolas.bolasNegras==4){
            alert("Has ganado");
            return true;
        }
        addNewLine();

        intentos++;
        document.getElementById("contador").innerHTML="Intentos: "+intentos;
        return false;
    }

    const colorearTablero=function(){
        let color=this.style.backgroundColor;
        
        let linea=devolverLineas();
        
        for(let i=0;i<linea.length;i++){
            if(linea[i].style.backgroundColor==""){
                linea[i].style.backgroundColor=color;
                break;
            }
        }

    }

    const pintarBolas=function(){
        this.style.backgroundColor=this.id;
    }

    
    document.addEventListener("DOMContentLoaded", init);
}
