
    /**
    * @author Tomas
    */
    let MasterMind=(function(){

        const arrayColores=["red","blue","green","yellow","orange","purple","pink","black"];
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
                combinacionUsuario.forEach(function(elemento, indice) {
                    if (elemento.style.backgroundColor== combinacionGanadora[indice]){
                        bolasNegras++;
                        combinacionGanadora[indice] = "";
                    }
                });
            }catch(e){
                combinacionUsuario.forEach(function(elemento, indice) {
                    if (elemento== combinacionGanadora[indice]){
                        bolasNegras++;
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
