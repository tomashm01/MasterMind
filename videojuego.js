{
    /**
     * @author: Tomás Hidalgo
     */    
    let intentos=0;
    let existeScroll=false;

    const init=function(e){

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
            <div class="bolitas actual"></div>
            <div class="bolitas actual"></div>
            <div class="bolitas actual"></div>
            <div class="bolitas actual"></div>
        </div>`;

        for(linea of lineas){ 
            linea.style.backgroundColor="";
        }

    }

    const actualizarLinea=function(){
        
        if(this.classList.contains("bola1")|| this.classList.contains("bola2")|| this.classList.contains("bola3")|| this.classList.contains("bola4")){ //Reset bola al clickar
            this.style.backgroundColor="";
        }else if(this.classList.contains("bolaLateral")){ //Colorear bola al clickar
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
        let interfaz=document.getElementById("interfaz");

        if(interfaz.childNodes[1].childNodes.length>4 && !existeScroll){
            interfaz.classList.add("scroll");
            existeScroll=true;
        }

        let bolas=document.querySelectorAll(".bolas");
        bolas.forEach(elemento=>{
            elemento.classList.remove("bola1");
            elemento.classList.remove("bola2");
            elemento.classList.remove("bola3");
            elemento.classList.remove("bola4");
        });
        
        let bolitas=document.querySelectorAll(".bolitas");
        bolitas.forEach(elemento=>{
            elemento.classList.remove("actual");
        });
        
        for(let i=1;i<5;i++){ //Bolas grandes
            let divInterfaz=document.createElement("div");
            divInterfaz.classList.add("bolas");
            divInterfaz.classList.add(`bola${i}`);            
            div1.appendChild(divInterfaz);
            interfaz.addEventListener("click",function(e){
                if(e.target.classList.contains(`bola${i}`) && e.target.style.backgroundColor!=""){
                    e.target.style.backgroundColor="";
                }
            });
        }
        
        section1.insertAdjacentHTML('afterbegin',`<div id="filas">${div1.innerHTML}</div>`);

        for(let i=0;i<4;i++){//Bolas pequeñas
            let divInterfaz=document.createElement("div");
            divInterfaz.classList.add("bolitas");
            divInterfaz.classList.add("actual");
            div2.appendChild(divInterfaz);
        }
        section2.insertAdjacentHTML('afterbegin',`<div id="filas">${div2.innerHTML}</div>`);
    }

    const comprobarVictoria=function(e){
        
        let lineas=devolverLineas();
        for(linea of lineas){
            if(linea.style.backgroundColor=="") return false; 
        }
        let bolas=MasterMind.comprobarConcidencia(lineas);
        if(bolas.bolasNegras==4){
            alert("Has ganado");
            resetear();
            MasterMind.init(e);
            return true;
        }
        pintarBolitas(bolas);
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

    const pintarBolitas=function(bolas){
        let bolitas=document.querySelectorAll(".bolitas");
        if(bolas.bolasNegras==0 && bolas.bolasBlancas==0) return false;
        let bolitasActuales=[];

        for(let i=0;i<bolitas.length;i++){
            if(bolitas[i].classList.contains("actual")){
                bolitasActuales.push(bolitas[i]);
            }
        }
        let posicion=0;

        for(let i=0;i<bolas.bolasNegras;i++){
            bolitasActuales[posicion].style.backgroundColor="black";
            posicion++;
        }

        if(bolas.bolasBlancas==0) return false;

        for(let i=0;i<bolas.bolasBlancas;i++){
            bolitasActuales[posicion].style.backgroundColor="white";
            posicion++;
        }

        return true;
    }

    const pintarBolas=function(){
        this.style.backgroundColor=this.id;
    }
    
    document.addEventListener("DOMContentLoaded", init);
}
