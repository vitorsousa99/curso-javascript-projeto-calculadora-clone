// Está é as nossa classe de controle 
// É ela que tem as regras de negócio
class CalcController{
     // constructor nome dado ao metoodo construtor   
    constructor(){
        // this é um atributo (variavel) que é usado para utilizar em varios lugares 
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl =  document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.currentDate;
        this.initialize();        
    }

    initialize(){
        //metodo que esta dentro do proprio objeto
      

    }

     get displayDate(){
          return this._dateEl.innerHTML
     }
     set displayDate(value){
        return this._dateEl.innerHTML = value

     }

     get displayTime(){
        return this.timeEl.innerHTML

     }
     set displayTime(value){
        return this._timeEl.innerHTML = value  
    
    }


    get displayCalc(){
        // get irar trazer os dados que eu quero
         return this._displayCalcEl.innerHTML;
         // ira trazer o valor digitado no html para o display da calculadora 
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value
        // aqui ele irá guardar os valores 
    }  

    get currentDate(){
      return this.newDate();
    }
     
    //set normalme te não tem return
    set currentDate(valuer){
        this._currentDate = valor
    }


}