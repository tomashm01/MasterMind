{

    MasterMind=(function(){

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

        const comprobarConcidencia= function(intento){
            
            let [...intento2]=intento;
            
            return {
                intento:intento2,
                numBlancos: contarBlancos(intento),
                numNegros: contarNegros(intento),
                ganado: comprobarGanar
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

    })();
}