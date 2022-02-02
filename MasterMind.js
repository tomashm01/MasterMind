{

    let MasterMind=function(){

        const arrayColores=["red","blue","green","yellow","orange","purple","pink","black","white"];
        const NUM_COLORS=arrayColores.length;
        const NUM_COLUMNS=4;
        let linea;

        const init=function(){
            linea=[];
            generarArray();
            mostrar();
        }

        const mostrar=function(){
            console.log(linea);
        }

        const contarBlancos=function(array){
            let contador=0;
            for(let i=0;i<array.length;i++){
                if(array[i]=="white"){
                    contador++;
                }
            }
            return contador;

        }
        
        const contarNegros=function(array){
            let contador=0;
            for(let i=0;i<array.length;i++){
                if(array[i]=="black"){
                    contador++;
                }
            }
            return contador;

        } 

        const comprobarGanar=function(intento,intento2){
            let contador=0;
            for(let i=0;i<intento.length;i++){
                if(intento[i]==intento2[i]){
                    contador++;
                }
            }
            if(contador==4) return true;
            return false;
        }

        const escribirNegroBlanco=function(intento,intento2){
            let array=[];
            for(let i=0;i<intento.length;i++){
                if(intento[i]==intento2[i]){
                    array.push("black");
                }else{
                    array.push("white");
                }
            }
            return array;
        }

        const comprobarConcidencia= function(intento){
            
            let [...intento2]=intento;

            return {
                intento:escribirNegroBlanco(intento,intento2),
                numBlancos: contarBlancos(intento),
                numNegros: contarNegros(intento),
                ganado: comprobarGanar(intento,intento2)
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