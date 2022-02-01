{
    MasterMind = {
        arrayActual:[],
        arrayGenerado:[],
        arrayColores:["red","blue","green","yellow","orange","purple","pink","black","white"],
        numHuecos:4,
        victoria:false,
        init: function () {
            this.generarArray();
            this.mostrar();

        },
        mostrar: function () {
            console.log(this.arrayGenerado);
        },
        comprobarConcidencia: function(intento){
            let contador=0;

            for (let i = 0; i < intento.length; i++) {
                if(intento[i] === this.arrayGenerado[i]){
                    this.arrayActual[contador] = "black";
                    contador++;
                }
            }

            for (let i = contador; i < intento.length; i++) {
                if(this.arrayGenerado.indexOf(intento[i]) !== -1 && this.arrayGenerado.indexOf(intento[i]) !== i){
                    this.arrayActual[contador] = "white";
                    contador++;
                }
            }
            
            for (let i = contador; i < intento.length; i++) {
                this.arrayActual[contador]="";
                contador++;
            }

            for (let i = 0; i < this.arrayActual.length; i++) {
                if(this.arrayActual[i] !== "black"){
                    this.victoria = false;
                    return false;
                }
            }
            this.victoria=true;
            return true;
            
        },
        generarArray: function(){
            for(let i=0;i<this.numHuecos;i++){
                this.arrayGenerado[i]=this.arrayColores[Math.floor(Math.random()*this.arrayColores.length)];
            }
        },
    };
}