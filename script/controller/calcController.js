// Está é as nossa classe de controle 
// É ela que tem as regras de negócio
class CalcController{
     // constructor nome dado ao metoodo construtor   
    constructor(){
        // this é um atributo (variavel) que é usado para utilizar em varios lugares 
        this._locale = "PT-BR"
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl =  document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.currentDate;
        this.initialize();
        this.initButtonsEvents();        
    }
   

    initialize(){
        //metodo que esta dentro do proprio objeto
      this.setDisplayDateTime();
        setInterval(()=>{
          this.setDisplayDateTime();


      },1000)

    }
    addEventListenerAll(element, events, fn){
            //split muda uma string para array
            events.split(' ').forEach(event => {

                element.addEventListener(event, fn, false)
            })
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => {
                
                console.log(btn.className.baseVal.replace("btn-", ""));

            });
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                  
                //evente para click e arrastar
                btn.style.cursor = "pointer";
            });
        })

    }
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale)
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
        

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
      return new Date();
    }
     
    //set normalme te não tem return
    set currentDate(value){
        this._currentDate = value
    }


}