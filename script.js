let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

    function handleSymbol(symbol){
      
        switch(symbol){
            case 'C': 
                buffer = '0';
                runningTotal = 0;
            break;
            case '=': 
               if (previousOperator === null) {
                    return 
               }
               flushOperation(parseFloat(buffer));
               previousOperator= null;  
               buffer= runningTotal;
               runningTotal= 0;
            break;
            case '←': 
               if (buffer.length===1) {
                buffer='0';
               }else{
                buffer = buffer.substring(0, buffer.length -1);
               }
            break;
            case '+': 
            case '-': 
            case '*': 
            case '/':
            case '^':  
            case '%':   
               handleMath(symbol);
            break;
            case '.':
                handleDecimal();
            break;
            case '√':
                if (buffer !== '0') {
                    buffer = Math.sqrt(parseFloat(buffer)).toString();
                    screen.innerText = buffer;
                    runningTotal=parseFloat(buffer);
                }
                break;
        }
    }
    function handleDecimal() {
        if (!buffer.includes(".")) {
            buffer += ".";
        }
    }
    

    function handleMath(symbol){
        if (buffer  === '0') {
            return;
        }

        const floatBuffer = parseFloat(buffer);

        if(runningTotal === 0){
            runningTotal = floatBuffer;
        }else{
            flushOperation(floatBuffer);
        }
        previousOperator = symbol;
        buffer= '0';
    }

function flushOperation(floatBuffer){
   
    if(previousOperator === '+'){
        runningTotal += floatBuffer;
    }else if(previousOperator === '-'){
        runningTotal -= floatBuffer;
    }else if(previousOperator === '*'){
        runningTotal *= floatBuffer;
    }else if(previousOperator === '/'){
        runningTotal /= floatBuffer;
    }else if(previousOperator === '^'){
        runningTotal **= floatBuffer;
    }else if(previousOperator === '%'){
        runningTotal %= floatBuffer;
    }

}

function handleNumber(numberString) {
    if (buffer === "0" && numberString !== ".") {
        buffer = numberString;
    } else if (numberString === "." && buffer.includes(".")) {
        return;
    } else {
        buffer += numberString;
    }
}


function init(){
    document.querySelector('.calc-buttons'
    ).addEventListener('click', function(event){
       buttonClick(event.target.innerText); 
})
}

init();

    function setup() {
}

function keyPressed() {
  if (keyCode === ENTER) {
    buttonClick('=');
  }else   if (keyCode === BACKSPACE) {
    buttonClick('←');
  }else if (key === "P" || key === "p") {
    buttonClick('^');
  }else if (key === "R" || key === "r") {
    buttonClick('%');
  }else if (key === "C" || key === "c") {
    buttonClick('√');
  }else if (key === "B" || key === "b") {
    buttonClick('C');
  }
  else if (key === '0' || key === '1' || key === '2' || key === '3' || key === '4' ||
             key === '5' || key === '6' || key === '7' || key === '8' || key === '9'||
              key === '+'|| key === '-'|| key === '*'|| key === '/') {
    buttonClick(key);
  }
}