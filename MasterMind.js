
    /**
    * @author Tomas
    */
    let MasterMind=(function(){

        const arrayColores=["red","blue","green","yellow","orange","purple","pink","black","white"];
        let intentoUsuario;

        const init=function(){
            intentoUsuario=[];
            generarArray();
            mostrar();
        }

        const mostrar=function(){
            console.log(intentoUsuario);
        }

        const contarBlancos = function(combinacionUsuario, combinacionGanadora) {
            let bolasBlancas = 0;
    
            combinacionUsuario.forEach(function(elemento) {
                if (combinacionGanadora.indexOf(elemento) != -1) bolasBlancas++;
            });
    
            return bolasBlancas;
        }
        
        const contarNegros = function(combinacionUsuario, combinacionGanadora) {
            let bolasNegras = 0;
    
            combinacionUsuario.forEach(function(elemento, indice) {
                if (elemento == combinacionGanadora[indice]){
                    bolasNegras++;
                    combinacionUsuario[indice] = null;
                }
            });
    
            return bolasNegras;
        }
    
        const comprobarConcidencia= function(intento){
            
            let copiaLinea=intentoUsuario.slice();
            let combinacionUsuario=intento.slice();

            return {
                bolasNegras: contarNegros(combinacionUsuario,copiaLinea),
                bolasBlancas: contarBlancos(combinacionUsuario,copiaLinea)
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
