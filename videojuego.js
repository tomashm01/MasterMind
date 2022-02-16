{
    /**
     * @author: Tomás Hidalgo
     */    
    let intentos=0;
    let existeScroll=false;

    const init=function(e){

        let $bolas=$(".bolas");
        let $ganar=$("#ganar");
        let $reset=$("#reset");
        $("#contador").html="Intentos "+ intentos;
        //document.getElementById("contador").innerHTML="Intentos: "+intentos;

        MasterMind.init();

        $reset.on("click",resetear);
        $ganar.on("click",comprobarVictoria);
        
        $bolas.each(function(){

            //Colorear y pintar las bolas
            pintarBolas.bind($(this))();
            $(this).click(actualizarLinea.bind($(this)));                
        });
        
    }
    
    const resetear=function(){
        let lineas=devolverLineas();
        intentos=0;
        existeScroll=false;
        document.getElementById("interfaz").classList.remove("scroll");
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
        if($(this).hasClass("bola1") || $(this).hasClass("bola2")|| $(this).hasClass("bola3")|| $(this).hasClass("bola4")){
            $(this).css("backgroundColor","");
        }else if($(this).hasClass("bolaLateral")){
            colorearTablero.bind($(this))();
        }
    }

    const devolverLineas=function(){
        let $bolas=$(".bolas");
        let linea=[];
        let posicion=0;

        $bolas.each(function(){
            if($(this).hasClass("bola1")|| $(this).hasClass("bola2") || $(this).hasClass("bola3")|| $(this).hasClass("bola4")){ //Reset bola al clickar
                linea[posicion]=$(this);
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
        
        let $lineas=devolverLineas();
        let arrayLineas=[];
        for($linea of $lineas){
            arrayLineas.push($linea.css("background-color"));
            if($linea.css("background-color")=="rgb(255, 255, 255)") return
            //if(linea.style.backgroundColor=="") return  
        }

        let bolas=MasterMind.comprobarConcidencia(arrayLineas);
        pintarBolitas(bolas);

        if(bolas.bolasNegras==4){
            alert("Has ganado");
            resetear();
            MasterMind.init(e);
            return 
        }

        addNewLine();

        intentos++;
        $("#contador").html="Intentos: "+intentos;
    }

    const colorearTablero=function(){
        let $color=$(this).css("background-color");
        let linea=devolverLineas();
        
        for(let i=0;i<linea.length;i++){
            if(linea[i].css("background-color")=="rgb(255, 255, 255)"){
                console.log($color)
                linea[i].css("background-color",$color);
                break;
            }
        }

    }

    const pintarBolitas=function(bolas){
        let $bolitas=$(".bolitas");
        if(bolas.bolasNegras==0 && bolas.bolasBlancas==0) return 
        let bolitasActuales=[];

        for(let i=0;i<$bolitas.size();i++){
            if($bolitas[i].hasClass("actual")){
                bolitasActuales.push($bolitas[i]);
            }
        }
        let posicion=0;

        for(let i=0;i<bolas.bolasNegras;i++){
            bolitasActuales[posicion].style.backgroundColor="black";
            posicion++;
        }

        if(bolas.bolasBlancas==0) return 

        for(let i=0;i<bolas.bolasBlancas;i++){
            bolitasActuales[posicion].style.backgroundColor="white";
            posicion++;
        }

    }

    const pintarBolas=function(){
        $(this).css("background",$(this).attr("id"))
    }
    $(document).ready(init);

}
