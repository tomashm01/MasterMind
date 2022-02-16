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
        $("#contador").text(()=>"Intentos: "+intentos);

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

        $("interfaz").removeClass("scroll");
        $("#contador").text(()=>"Intentos: "+intentos);

        let seleccion=$("#seleccion")
                        .html(`
                            <div id="filas">
                                <div class="bolas bola1"></div>
                                <div class="bolas bola2"></div>
                                <div class="bolas bola3"></div>
                                <div class="bolas bola4"></div>
                            </div>`);
        let pistas=$("#pistas")
                        .html(`
                            <div id="filas">
                                <div class="bolitas actual"></div>
                                <div class="bolitas actual"></div>
                                <div class="bolitas actual"></div>
                                <div class="bolitas actual"></div>
                            </div>`);

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
        let div1,div2=$("<div></div>");
        let section1=$("#seleccion");
        let section2=$("#pistas");
        let interfaz=$("#interfaz");

        if(interfaz.children()[1].childNodes.length>4 && !existeScroll){
            interfaz.addClass("scroll");
            existeScroll=true;
        }

        $(".bolas")
            .each(function(){
                $(this).removeClass("bola1 bola2 bola3 bola4");
            });
        $(".bolitas")
            .each(function(){
                $(this).removeClass("actual");
            });
        
        
        for(let i=1;i<5;i++){ //Bolas grandes
            $("<div></div>").addClass(`bolas bola${i}`).appendTo(div1);
            interfaz.click(function(e){
                if($(e.target).hasClass(`bola${i}`) && $(e.target).css("backgroundColor")!="rgb(255, 255, 255)"){
                    $(e.target).css("backgroundColor","rgb(255, 255, 255)");
                }
            });
        }
        div1.html(`<div id="filas">${div1.text()}</div>`).insertAfter(section1);
        //section1.insertAdjacentHTML('afterbegin',`<div id="filas">${div1.html()}</div>`);

        for(let i=0;i<4;i++){//Bolas pequeñas
            $("<div></div>").addClass(`bolitas`).appendTo(div2);
        }
        div2.html(`<div id="filas">${div2.text()}</div>`).insertAfter(section2);
        //section2.insertAdjacentHTML('afterbegin',`<div id="filas">${div2.innerHTML}</div>`);
    }

    const comprobarVictoria=function(e){
        
        let $lineas=devolverLineas();
        let arrayLineas=[];

        for($linea of $lineas){
            arrayLineas.push($linea.css("background-color"));
            if($linea.css("background-color")=="rgb(255, 255, 255)") return
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
        $("#contador").text(()=>"Intentos: "+intentos);
    }

    const colorearTablero=function(){
        let $color=$(this).css("background-color");
        let linea=devolverLineas();
        
        for(let i=0;i<linea.length;i++){
            if(linea[i].css("background-color")=="rgb(255, 255, 255)"){
                linea[i].css("background-color",$color);
                break;
            }
        }

    }

    const pintarBolitas=function(bolas){
        $bolitas=$(".bolitas");
        if(bolas.bolasNegras==0 && bolas.bolasBlancas==0) return 
        let bolitasActuales=[];

        for(let i=0;i<$bolitas.length;i++){
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
