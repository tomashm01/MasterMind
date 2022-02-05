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
