{
    /**
     * @author: Tomás Hidalgo
     */    
    
    

    const init=function(){

        let bolas=document.querySelectorAll(".bolas");
        let ganar=document.getElementById("ganar");
        let reset=document.getElementById("reset");

        MasterMind.init();
        let numBolas=1;
        let linea=[];

        ganar.addEventListener("click",comprobarVictoria);
        reset.addEventListener("click",resetear);

        bolas.forEach(elemento=>{

            //Colorear y pintar las bolas
            pintarBolas.bind(elemento)();
            if(elemento.classList.contains(`bola${numBolas}`)){ //Hacer reset del color de las bolas del usuario
                elemento.addEventListener("click",function(){
                    this.style.backgroundColor="none";
                });
                numBolas++;
            }else{ //Colorear bolas del tablero 
                elemento.addEventListener("click",colorearTablero.bind(elemento));
            }
            
        });
        
    }

    const resetear=function(){

    }

    const comprobarVictoria=function(){
        
    }

    const colorearTablero=function(){
        let numBolas=1;
        

    }

    const pintarBolas=function(){
        this.style.backgroundColor=this.id;
    }

    
    document.addEventListener("DOMContentLoaded", init);
}
