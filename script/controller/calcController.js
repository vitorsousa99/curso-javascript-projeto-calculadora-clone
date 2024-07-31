// Está é as nossa classe de controle 
// É ela que tem as regras de negócio
class CalcController{
     // constructor nome dado ao metoodo construtor   
    constructor(){
        // this é um atributo (variavel) que é usado para utilizar em varios lugares 
        this._displayCalc = "0"
        this.currentDate;
        this.initialize();        
    }

    initialize(){
        //metodo que esta dentro do proprio objeto
      let displayCalcEl = document.querySelector("#display");
      let dateEl =  document.querySelector("#data");
       let timeEl = document.querySelector("#hora");
       displayCalcEl.innerHTML = `4567`
       dateEl.innerHTML = `31/07/24`
       timeEl.innerHTML = `14:03`

    }

    get displayCalc(){
        // get irar trazer os dados que eu quero
         return this._displayCalc;
    }

    set displayCalc(valor){
        this._displayCalc = valor
        // aqui ele irá guardar os valores 
    }  

    get dataAtual(){
      return this.currentDate;
    }
     
    //set normalme te não tem return
    set dataAtual(valor){
        this._currentDate = valor
    }


}