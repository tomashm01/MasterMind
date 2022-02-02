{

    let MasterMind=function(){

        const arrayColores=["red","blue","green","yellow","orange","purple","pink","black","white"];
        let linea;

        const init=function(){
            linea=[];
            generarArray();
            mostrar();
        }

        const mostrar=function(){
            console.log(linea);
        }

        const contarBlancos = function(combinacionUsuario, combinacionGanadora) {
            let bolasBlancas = 0;
    
            combinacionUsuario.forEach(function(elemento) {
                let indice = combinacionGanadora.indexOf(elemento);
                if (indice != -1) bolasBlancas++;
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
            
            let copiaLinea=linea.slice();
            let combinacionUsuario=intento.slice();

            return {
                bolasNegras: contarNegros(combinacionUsuario,copiaLinea),
                bolasBlancas: contarBlancos(combinacionUsuario,copiaLinea)
            };
            
        }

        const generarArray= function(){
            
            for(let i=0;i<4;i++){
                linea[i]=arrayColores[Math.floor(Math.random()*arrayColores.length)];
            }
        }

        return{
            init:init,
            mostrar:mostrar,
            comprobarConcidencia:comprobarConcidencia
        };

    }();

    //Para pruebas
    document.addEventListener("DOMContentLoaded",MasterMind.init);
    window.MasterMind=MasterMind;
}