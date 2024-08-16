// Está é as nossa classe de controle 
// É ela que tem as regras de negócio
class CalcController {
    // constructor nome dado ao metoodo construtor   
    constructor() {
        // this é um atributo (variavel) que é usado para utilizar em varios lugares 
        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._lastOperation = '';
        this._lastNumber = '';

        this._operation = [];
        this._locale = "PT-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyBoard();

    }


    pasteFromClipbord(){

        document.addEventListener('paste', e =>{
              
       let text =  e.clipboardData.getData('Text');

       this.displayCalc = parseFloat(text)

        });
    }

    copyToClipboard(){

        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();
    }


    initialize() {
        //metodo que esta dentro do proprio objeto
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();


        }, 1000)

        this.setLastNumberToDisplay();
        this.pasteFromClipbord();

        document.querySelectorAll('.btn-ac').forEach(btn=>{
            btn.addEventListener('dblclick', e=>{
                
                this.toggleAudio();//irá controlar para saber se o audio esta ligado ou não
            })
        })

    }

    toggleAudio(){

        this._audioOnOff = !this._audioOnOff
    }

    playAudio(){

        if(this._audioOnOff){

            this._audio.currentTime = 0;
            this._audio.play();


        }
    }

    initKeyBoard(){

        document.addEventListener('keyup', e => { 

            this.playAudio();

            switch (e.key) {

                case '.':
                case ',':    
                    this.addDot()
        
                    break;
        
                case "Escape":
                    this.clearAll()
                    break;
        
                case "backspace":
                    this.clearEntry()
                    break;
        
                case "+":
                case "-":
                case "*":
                case "/":
                case "%":
                    this.addOperation(e.key)
                    break;
        
                case "enter":
                case '=':
                    this.calc();
        
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
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                    break;    
            }
        }
        );

    }

    addEventListenerAll(element, events, fn) {
        //split muda uma string para array
        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);
        })
    }

    clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();

    }

    clearEntry() {
        this._operation.pop();

        this.setLastNumberToDisplay();

    }
    getLastOperation() {
        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {
        return (["+", "-", "*", "/", "%"].indexOf(value) > -1);
        //irá buscar o valor desse elemento 

    }

    pushOperator(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc()

        }

    }
    getResult() {
        try{
        return eval(this._operation.join(""));
        }catch(e){
            setTimeout(()=>{
                this.setError();
            },1);

        }

    }
    
    calc() {
        let last = '';
    
        this._lastOperator = this.getLastIntem();
    
        if (this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }
    
        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        } else if (this._operation.length === 3) {
            this._lastNumber = this.getLastIntem(false);
        }
    
        let result = this.getResult();
    
        if (last === "%") {
            result /= 100;
            this._operation = [result];
        } else {
            this._operation = [result];
            if (last) this._operation.push(last);
        }
    
        this.setLastNumberToDisplay();
    }

    
    getLastIntem(isOperation = true) {
        let lastItem;
    
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (this.isOperator(this._operation[i]) == isOperation) {
                lastItem = this._operation[i];
                break;
            }
        }
        if (!lastItem) {
            lastItem = (isOperation) ? this._lastOperator : this._lastNumber;
        }
    
        return lastItem;
    }


    setLastNumberToDisplay() {
        let lastNumber = this.getLastIntem(false)

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;


    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value);
                //trocar de operador

            } else {

                this.pushOperator(value);
                this.setLastNumberToDisplay();
            }
        } else {
            if (this.isOperator(value)) {

                this.pushOperator(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();
            }

        }
    }
}



setError();{
    this.displayCalc = "Error";
}

addDot();{

    let lastOperation = this.getLastOperation(); 

    if(lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1)return;

    if(this.isOperator(lastOperation) || !lastOperation){
      this.pushOperation('0.')
    }else{
        this.setLastOperation(lastOperation.toString() + '.');}

        setLastNumberToDisplay();

}

execBtn(value);{
     
    this._playAudio();


    switch (value) {

        case 'ponto':
            this.addDot()

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
            this.calc();

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

initButtonsEvents();{
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

set DisplayDateTime(){
    this.displayDate = this.currentDate.toLocaleDateString(this._locale)
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
}

get displayDate(){
    return this._dateEl.innerHTML;
}
set displayDate(value) {
    this._dateEl.innerHTML = value;
}

get displayTime() {
    return this._timeEl.innerHTML;
}
set displayTime(value) {
    this._timeEl.innerHTML = value;
}

get displayCalc(){
    return this._displayCalcEl.innerHTML;
}
set displayCalc(value) {

    if(value.toString().length > 10){
        setError();
        return false
    }

    this._displayCalcEl.innerHTML = value;
}
    // aqui ele irá guardar os valores 


get currentDate(){
    return new Date()
}

//set normalme te não tem return
set currentDate(value){
    this._currentDate = value
}