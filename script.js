const screen = document.querySelector('.view');
const buttons = document.querySelectorAll('button');

let calculation = [];
let isOperator = false;


function calculate(button)
 {
  const value = button.value;

  if (value === 'c')
   {
    calculation = [];
    screen.value = '';
    isOperator = false;
  } 
  else if (value === '=' ) 
  {
    if (calculation.length > 0) 
    {
      const result = evaluateExpression(calculation.join(''));
      screen.value = result;
      calculation = [result];
      isOperator = false; 
    }
  } 
  else if (value === 'Backspace') 
  {
    calculation.pop();
    screen.value = calculation.join('');
    isOperator = false;
  }
   else if (value === 'sqrt')
    {
    calculation.push('Math.sqrt(');
    screen.value = calculation.join('');
    isOperator = false;
   }
    else if (['+', '-', '*', '/'].includes(value))
     {
    if (isOperator && calculation.length > 0) 
    {
      calculation.pop();
      calculation.push(value);
      screen.value = calculation.join('');
    }
     else
    {
      calculation.push(value);
      screen.value = calculation.join('');
      isOperator = true;
    }
  } 
  else
   {
    calculation.push(value);
    screen.value = calculation.join('');
    isOperator = false;
  }
}

function evaluateExpression(expression)
 {
  try 
  {
    const processedExpression = expression.replace(/x/g, '*');
    return eval(processedExpression);
  } 
  catch (error)
   {
    return 'Error';
  }
}
buttons.forEach(button =>  button.addEventListener('click', () => calculate(button)));

document.addEventListener('keydown', event => {const key = event.key;const validKeys = [   '0','1','2','3','4','5','6','7','8','9','+','-','*','/','(',')','=','Enter','Backspace',];
console.log(key);
  
  if (validKeys.includes(key)) 
  { 
    if (event.type === 'keydown' && key !== 'Enter') 
    {
      event.preventDefault();
      calculate({ value: key });
    }
  }
});
