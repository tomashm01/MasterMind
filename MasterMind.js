
    /**
    * @author Tomas
    */
    let MasterMind=(function(){

        const arrayColores=["rgb(255, 0, 0)","rgb(0, 0, 255)","rgb(0, 128, 0)","rgb(255, 255, 0)","rgb(255, 165, 0)","rgb(128, 0, 128)","rgb(255, 192, 203)","rgb(0, 0, 0)"];
        let intentoUsuario;

        const init=function(){
            intentoUsuario=[];
            generarArray();
            mostrar();
        }

        const mostrar=function(){
            console.log(intentoUsuario);
        }

        let contarBlancos = function(combinacionUsuario, combinacionGanadora) {
            let bolasBlancas = 0;
    
            try{
                combinacionUsuario.forEach(function(elemento) {
                    if (combinacionGanadora.indexOf(elemento) != -1) bolasBlancas++;
                    let indice = combinacionGanadora.indexOf(elemento.style.backgroundColor);
                    if (indice != -1) {
                        bolasBlancas++;
                        combinacionGanadora[indice] = "";
                    }
                });
            }catch(e){
                combinacionUsuario.forEach(function(elemento) {
                    if (combinacionGanadora.indexOf(elemento) != -1) bolasBlancas++;
                    let indice = combinacionGanadora.indexOf(elemento);
                    if (indice != -1) {
                        bolasBlancas++;
                        combinacionGanadora[indice] = "";
                    }
                });
            }
    
            return bolasBlancas;
        }
        
        const contarNegros = function(combinacionUsuario, combinacionGanadora) {
            let bolasNegras = 0;
    
            try{
                combinacionUsuario.forEach(function(elemento, indice) {
                    if (elemento.style.backgroundColor== combinacionGanadora[indice]){
                        bolasNegras++;
                        combinacionGanadora[indice] = "";
                    }
                });
            }catch(e){
                combinacionUsuario.forEach(function(elemento, indice) {
                    console.log(combinacionGanadora[indice]);
                    if (elemento== combinacionGanadora[indice]){
                        bolasNegras++;
                        combinacionGanadora[indice] = "";
                    }
                });
            }
    
            return bolasNegras;
        }
    
        const comprobarConcidencia= function(intento){
            
            let copiaLinea=intentoUsuario.slice();
            let combinacionUsuario=intento.slice();

            return {
                bolasNegras: contarNegros(combinacionUsuario, copiaLinea),
                bolasBlancas: contarBlancos(combinacionUsuario, copiaLinea)
            };
            
        }

        const generarArray= function(){
            
            for(let i=0;i<4;i++){
                intentoUsuario[i]=arrayColores[Math.floor(Math.random()*arrayColores.length)];
            }
        }

        return{
            init:init,
            mostrar:mostrar,
            comprobarConcidencia:comprobarConcidencia,
            colores: arrayColores
        };

    })();
