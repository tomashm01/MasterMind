{

    MasterMind=(function(){

        const init=function(){
            let [...arrayGenerado]=this.generarArray();
            this.mostrar.bind(arrayGenerado)();
        }

        const mostrar=function(){
            console.log(this);
        }
        const comprobarConcidencia= function(intento){
            
            

            //He ganado
            return true;
            
        }
        const generarArray= function(){
            let arrayGenerado=[];
            const arrayColores=["red","blue","green","yellow","orange","purple","pink","black","white"];
            for(let i=0;i<4;i++){
                arrayGenerado[i]=arrayColores[Math.floor(Math.random()*arrayColores.length)];
            }
            return arrayGenerado;
        }


        return{
            init:init,
            mostrar:mostrar,
            comprobarConcidencia:comprobarConcidencia
        };

    })();
}