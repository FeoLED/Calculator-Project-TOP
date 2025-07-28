//some comments to keep track of things
//arithmetic functions
function add(a,b){
  return a+b;
};
function subtract(a,b){
  return a - b;
};
function multiply(a,b){
  return a*b;
};
function divide(a,b){
  if(b==0){
    return "Error: cannot divide by zero"
  }else{
    return (a/b);
  }
}
let result = 0;
//variables to use during calculations
let num1 = 0;
let operationName = "";
let num2 = 0;
let operationSymbol = "";
//spacific variable to show on display
let displayContent = "";

//function that receives numbers and operation and returns the result
function operate(num1, operation, num2){
  let result = operation(num1,num2)
  return result;
};

//reference to DOM elements
let display = document.querySelector(".display");
let buttonNumber = document.querySelectorAll(".number");
let buttonOperation = document.querySelectorAll(".operationButton");
let buttonComma = document.querySelector(".comma");
let buttonDelete = document.querySelector(".delete");
let buttonClear = document.querySelector(".clear");
let buttonEqual = document.querySelector(".equals");

//this doesn't do much, just showing the number on display
function firstElement(){
  display.textContent += this.value;
}

for(let key of buttonNumber){
  key.addEventListener("click", firstElement);
};

//So, operation() saves the first num in num1
function operation(){
  // Check if there's a decimal point at the end and remove it
  if (display.textContent.endsWith('.')) {
    display.textContent = display.textContent.slice(0, -1);
  }
  
  num1 = Number(display.textContent);
  //then saves the value of the operation button in operationName
  operationName = this.value;
  //it should change the display, showing the number and the operation
  operationSymbol = this.textContent;
  display.textContent = num1 + " " + operationSymbol;
  //I think I should stop the event for operation
  for(let key of buttonOperation){
    key.removeEventListener("click", operation);
  }
  //we also need to remove the event for firstElement and add the one for secondElement
  for(let key of buttonNumber){
    key.removeEventListener("click", firstElement);
    key.addEventListener("click", secondElement);
  };
  addCommaListener();
};

for(let key of buttonOperation){
  key.addEventListener("click", operation);
};

//So, we got num1 and operation, we still need num2
let second = "";
function secondElement(){
  second += this.value;
  display.textContent = `${num1} ${operationSymbol} ${second}`;
  num2 = Number(second);
};

//At this point we can proceed with the calculations
function calculate(){
  if (!operationName || second === "") return;
  // Check if there's a decimal point at the end and remove it
  if (display.textContent.endsWith('.')) {
    display.textContent = display.textContent.slice(0, -1);
    second = second.slice(0, -1);
  }
  
  if(operationName=="add"){
    result = operate(num1, add, num2);
  }else if(operationName=="subtract"){
    result = operate(num1, subtract, num2);
  }else if(operationName=="multiply"){
    result = operate(num1, multiply, num2);
  }else if(operationName=="divide"){
    result = operate(num1, divide, num2);
  }
  num1 = result; 
  operationName = ""; 
  display.textContent = result;
  for(let key of buttonNumber){
    key.removeEventListener("click", secondElement);
  };
  second = "";
  for(let key of buttonOperation){
    key.addEventListener("click", operation);
  };
  addCommaListener();
};

buttonEqual.addEventListener("click", calculate);

function clearAll(){
  display.textContent = "";
  operationName = "";
  operationSymbol = "";
  result = "";
  second = "";
  for(let key of buttonNumber){
    key.removeEventListener("click", secondElement);
    key.addEventListener("click", firstElement);
  };
  for(let key of buttonOperation){
    key.addEventListener("click", operation);
  };
  addCommaListener();
};
buttonClear.addEventListener("click", clearAll);

function deleteText(){
  if(display.textContent.length>0){
    // If deleting from second number, update the second variable
    if (second && display.textContent.includes(operationSymbol)) {
      second = second.slice(0, -1);
    }
    display.textContent = display.textContent.slice(0, display.textContent.length-1);
  };
};
buttonDelete.addEventListener("click", deleteText);

function addCommaListener() {
  buttonComma.removeEventListener("click", comma);
  buttonComma.addEventListener("click", comma);
}

function comma(){
  // Check if current number already has a decimal point
  const currentContent = display.textContent;
  const parts = currentContent.split(operationSymbol);
  const currentNumber = parts.length > 1 ? parts[1] : parts[0];
  
  if (!currentNumber.includes('.')) {
    display.textContent += this.value;
    if (second !== "") {
      second += this.value;
    }
  }
};
addCommaListener();