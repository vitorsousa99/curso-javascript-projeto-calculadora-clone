// Está é as nossa classe de controle 
// É ela que tem as regras de negócio
class CalcController{
     // constructor nome dado ao metoodo construtor   
    constructor(){
        // this é um atributo (variavel) que é usado para utilizar em varios lugares 
        this._operation = []
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

                element.addEventListener(event, fn, false);
            })
    }

       clearAll(){
        this._operation = [];

       }

       clearEntry(){
        this._operation.pop();

       }

       isOperator(value){
        return(["+", "-", "*", "/", "%"].indexOf(value)> -1);
        //irá buscar o valor desse elemento 

       }

       getLastOperation(){
        return this._operation[this._operation.length-1];
           
       }

       setLastOperation(value){
        this.setLastOperation = value
       }

       addOperation(value){
        if(isNaN(this.getLastOperation())){
            if(this.isOperator(value)){
                this._operation[this._operation.length -1] = value;
                //trocar de operador

            }else if(isNaN(value)){
               //outra coisa 
               this.setLastOperation(value); 
                
            }else{

                console.log(value);
            }
        }else{
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));
        }
    

       }

       setError(){
        this.displayCalc = "Error";
       }

    execBtn(value){
        switch(value){
            case 'ponto':
                this.addOperation('.')

            break;

            case "ac":
             this.clearAll()   
            break;

            case "ce":
                this.clearEntry()
             break;
            
           case "soma":
            this.addOperation('+')
           break;

           case "subtracao":
            this.addOperation('-')
           break;
           
           case "multiplicacao":
            this.addOperation('*')

           break;

           case "Divisao":
            this.addOperation('/')

           break;

           case "porcento":
            this.addOperation('%')

           break;

           case "igual":

           break;

           case '0':
           case '1':
           case '2':
           case '3':
           case '4':
           case '5':
           case '6':
           case '7':
           case '8':
           case '9':
            this.addOperation(parseInt(value));
           break;

           default:
            this.setError();
            break;
        }
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => {
                
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);

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