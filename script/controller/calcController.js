class CalcController {
    // Construtor da classe
    constructor() {
        // Inicializa o áudio para os cliques
        this._audio = new Audio('click.mp3');
        // Controle para ligar/desligar o áudio
        this._audioOnOff = false;
        // Armazena a última operação
        this._lastOperation = '';
        // Armazena o último número digitado
        this._lastNumber = '';
        // Array que armazena a operação atual
        this._operation = [];
        // Define o idioma padrão para formatação de data/hora
        this._locale = "PT-BR";
        // Referência ao elemento do display da calculadora
        this._displayCalcEl = document.querySelector("#display");
        // Referência ao elemento de data
        this._dateEl = document.querySelector("#data");
        // Referência ao elemento de hora
        this._timeEl = document.querySelector("#hora");
        // Inicializa a calculadora
        this.initialize();
        // Inicializa os eventos dos botões
        this.initButtonsEvents();
        // Inicializa o teclado
        this.initKeyBoard();
    }

    // Método para colar do clipboard
    pasteFromClipboard() {
        document.addEventListener('paste', e => {
            // Obtém o texto do clipboard e converte para número
            let text = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(text);
        });
    }

     // Método para copiar para o clipboard
     copyToClipboard() {
        // Cria um elemento input temporário
        let input = document.createElement('input');
        // Define o valor do input como o valor atual do display
        input.value = this.displayCalc;
        // Adiciona o input ao corpo do documento
        document.body.appendChild(input);
        // Seleciona o conteúdo do input
        input.select();
        // Executa o comando de cópia
        document.execCommand("Copy");
        // Remove o input do documento
        input.remove();
    }

    // Inicializa a calculadora
    initialize() {
        // Define a data e hora no display
        this.setDisplayDateTime();
        // Atualiza a data e hora a cada segundo
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
        // Exibe o último número digitado
        this.setLastNumberToDisplay();
        // Habilita a funcionalidade de colar do clipboard
        this.pasteFromClipboard();

        // Adiciona evento de duplo clique para ligar/desligar o som
        document.querySelectorAll('.btn-ac').forEach(btn => {
            btn.addEventListener('dblclick', e => {
                this.toggleAudio();
            });
        });
    }

    // Alterna o estado do áudio
    toggleAudio() {
        this._audioOnOff = !this._audioOnOff;
    }

    // Reproduz o áudio se estiver ligado
    playAudio() {
        if (this._audioOnOff) {
            this._audio.currentTime = 0; // Reinicia o áudio
            this._audio.play(); // Reproduz o áudio
        }
    }

     // Inicializa os eventos do teclado
     initKeyBoard() {
        document.addEventListener('keyup', e => {
            this.playAudio();
            switch (e.key) {
                case '.':
                case ',':
                    this.addDot(); // Adiciona ponto decimal
                    break;
                case "Escape":
                    this.clearAll(); // Limpa todas as operações
                    break;
                case "Backspace":
                    this.clearEntry(); // Limpa a última entrada
                    break;
                case "+":
                case "-":
                case "*":
                case "/":
                case "%":
                    this.addOperation(e.key); // Adiciona a operação
                    break;
                case "Enter":
                case '=':
                    this.calc(); // Realiza o cálculo
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
                    this.addOperation(parseInt(e.key)); // Adiciona o número
                    break;
                case 'c':
                    if (e.ctrlKey) this.copyToClipboard(); // Copia para o clipboard
                    break;
            }
        });
    }

    // Adiciona múltiplos eventos a um elemento
    addEventListenerAll(element, events, fn) {
        // Divide a string de eventos e adiciona cada um deles
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    // Limpa todas as operações
    clearAll() {
        this._operation = []; // Reseta as operações
        this._lastNumber = ''; // Reseta o último número
        this._lastOperator = ''; // Reseta o último operador
        this.setLastNumberToDisplay(); // Atualiza o display
    }

    // Limpa a última entrada
    clearEntry() {
        this._operation.pop(); // Remove o último item do array de operações
        this.setLastNumberToDisplay(); // Atualiza o display
    }

    // Obtém a última operação
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    // Define a última operação
    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    // Verifica se o valor é um operador
    isOperator(value) {
        return (["+", "-", "*", "/", "%"].indexOf(value) > -1);
    }

    // Adiciona uma operação ao array
    pushOperation(value) {
        this._operation.push(value);
        // Se mais de 3 itens, realiza o cálculo
        if (this._operation.length > 3) {
            this.calc();
        }
    }

    // Retorna o resultado do cálculo
    getResult() {
        try {
            return eval(this._operation.join("")); // Executa a operação
        } catch (e) {
            setTimeout(() => {
                this.setError(); // Define erro se a operação falhar
            }, 1);
        }
    }

    // Realiza o cálculo
    calc() {
        let last = '';

        this._lastOperator = this.getLastItem(true); // Obtém o último operador

        if (this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber]; // Reorganiza a operação
        }

        if (this._operation.length > 3) {
            last = this._operation.pop(); // Remove o último item se houver mais de 3
            this._lastNumber = this.getResult(); // Calcula o resultado
        } else if (this._operation.length === 3) {
            this._lastNumber = this.getLastItem(false); // Atualiza o último número
        }

        let result = this.getResult(); // Calcula o resultado final

        if (last === "%") {
            result /= 100; // Calcula a porcentagem
            this._operation = [result]; // Atualiza a operação
        } else {
            this._operation = [result]; // Atualiza a operação
            if (last) this._operation.push(last); // Adiciona o último item de volta
        }

        this.setLastNumberToDisplay(); // Atualiza o display
    }

    // Obtém o último item do array de operações
    getLastItem(isOperator = true) {
        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }

        if (!lastItem) {
            lastItem = isOperator ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    // Atualiza o display com o último número digitado
    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);
        if (!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;
    }

    // Adiciona uma nova operação ou atualiza a operação existente
    addOperation(value) {
        if (isNaN(this.getLastOperation())) { // Verifica se o último valor não é um número
            if (this.isOperator(value)) {
                this.setLastOperation(value); // Se for operador, substitui o último
            } else {
                this.pushOperation(value); // Se for número, adiciona à operação
                this.setLastNumberToDisplay(); // Atualiza o display
            }
        } else {
            if (this.isOperator(value)) {
                this.pushOperation(value); // Adiciona o operador
            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue); // Concatena o número
                this.setLastNumberToDisplay(); // Atualiza o display
            }
        }
    }

    // Exibe erro no display
    setError() {
        this.displayCalc = "Error";
    }

    // Adiciona um ponto decimal
    addDot() {
        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === 'string' && lastOperation.includes('.')) return;

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }

    execBtn(value) {
        this.playAudio(); // Toca o áudio ao pressionar o botão
    
        // Verifica o valor passado e executa a ação correspondente
        switch (value) {
            case 'ponto':
                this.addDot(); // Adiciona um ponto decimal
                break;
            case "ac":
                this.clearAll(); // Limpa todas as operações
                break;
            case "ce":
                this.clearEntry(); // Limpa a última entrada
                break;
            case "soma":
                this.addOperation('+'); // Adiciona a operação de soma
                break;
            case "subtracao":
                this.addOperation('-'); // Adiciona a operação de subtração
                break;
            case "multiplicacao":
                this.addOperation('*'); // Adiciona a operação de multiplicação
                break;
            case "divisao":
                this.addOperation('/'); // Adiciona a operação de divisão
                break;
            case "porcento":
                this.addOperation('%'); // Adiciona a operação de porcentagem
                break;
            case "igual":
                this.calc(); // Realiza o cálculo
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
                this.addOperation(parseInt(value)); // Adiciona o número à operação
                break;
            default:
                this.setError(); // Define o estado de erro se o valor não for reconhecido
                break;
        }
    }
    
    initButtonsEvents() {
        // Seleciona todos os botões da calculadora
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
    
        buttons.forEach((btn, index) => {
            // Adiciona eventos de clique e arrastar para cada botão
            this.addEventListenerAll(btn, 'click drag', e => {
                // Extrai o nome da classe do botão e remove o prefixo "btn-"
                let textBtn = btn.className.baseVal.replace("btn-", "");
                // Executa a ação associada ao botão
                this.execBtn(textBtn);
            });
    
            // Adiciona eventos de mouse para alterar o cursor ao passar sobre os botões
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer"; // Define o cursor como ponteiro
            });
        });
    }
    
    setDisplayDateTime() {
        // Atualiza a data e hora exibidas na calculadora
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    
    // Getters e setters para manipulação da data, hora e valor exibido no display
    get displayDate() {
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
    
    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }
    
    set displayCalc(value) {
        // Se o valor ultrapassar 10 caracteres, define o estado de erro
        if (value.toString().length > 10) {
            this.setError();
            return false;
        }
    
        this._displayCalcEl.innerHTML = value; // Atualiza o display com o valor
    }
    
    get currentDate() {
        return new Date(); // Retorna a data e hora atuais
    }
    
    set currentDate(value) {
        this._currentDate = value; // Define a data e hora atuais
    }
}