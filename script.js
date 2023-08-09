const screen = document.querySelector('.view');
const buttons = document.querySelectorAll('button');

let calculation = [];
let isOperator = false;

function calculate(button)
 {
  const value = button.value;

  if (value === 'c')
   {
    // Temizle düğmesine basıldığında hesaplamayı sıfırla
    calculation = [];
    screen.value = '';
    isOperator = false;
  } 
  else if (value === '=') 
  {
    // Eşittir düğmesine basıldığında hesaplamayı değerlendir ve sonucu göster
    if (calculation.length > 0)
     {
      const result = evaluateExpression(calculation.join(''));
      screen.value = result;
      calculation = [result];
      isOperator = false;
    }
  } else if (value === 'Backspace')
   {
    // Geri düğmesine basıldığında son karakteri sil
    calculation.pop();
    screen.value = calculation.join('');
    isOperator = false;
  } 
  else if (value === 'sqrt') 
  {
    // Karekök düğmesine basıldığında hesaplamaya "Math.sqrt(" ekle
    calculation.push('Math.sqrt(');
    screen.value = calculation.join('');
    isOperator = false;
  } 
  else if (['+', '-', '*', '/'].includes(value)) 
  {
    // Operatör düğmesine basıldığında hesaplamaya operatör ekle
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
   else if (value === '.') 
   {
    // Nokta düğmesine basıldığında sadece bir nokta eklemeye izin ver
    if (!calculation.includes('.')) 
    {
      calculation.push(value);
      screen.value = calculation.join('');
      isOperator = false;
    }
  }
   else 
   {
    // Diğer durumlarda hesaplamaya değeri ekle
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

// Düğmelere tıklama olay dinleyicisi ekle
buttons.forEach(button => button.addEventListener('click', () => calculate(button)));

// Klavye olay dinleyicisi ekle
document.addEventListener('keydown', event => 
{
  const key = event.key;
  const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '(', ')', '=', 'Enter', 'Backspace', '.', 'c'];

  if (validKeys.includes(key))
   {
    if (event.type === 'keydown')
     {
      event.preventDefault();
      if (key === 'Enter') 
      {
        calculate({ value: '=' });
      }
       else if (key === 'c') 
      {
        calculate({ value: 'c' });
      } 
      else 
      {
        calculate({ value: key });
      }
    }
  }
});
