function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  // Функция для преобразования параметра в число
  function convertToNumber(param) {
      if (typeof param === 'string') {
          const converted = parseFloat(param);
          return isNaN(converted) ? false : converted;
      }
      if (typeof param === 'number') {
          return param;
      }
      return false;
  }
  
  // Преобразуем все параметры в числа
  const percentNum = convertToNumber(percent);
  const contributionNum = convertToNumber(contribution);
  const amountNum = convertToNumber(amount);
  const countMonthsNum = convertToNumber(countMonths);
  
  // Проверяем, что все параметры успешно преобразованы в числа
  if (percentNum === false || contributionNum === false || 
      amountNum === false || countMonthsNum === false) {
      return false;
  }
  
  // Если сумма кредита меньше или равна первоначальному взносу
  if (amountNum <= contributionNum) {
      return 0;
  }
  
  // Преобразуем годовую процентную ставку в месячную (от 0 до 1)
  const monthlyPercent = percentNum / 100 / 12;
  
  // Рассчитываем тело кредита
  const loanBody = amountNum - contributionNum;
  
  // Рассчитываем ежемесячный платёж по формуле
  const monthlyPayment = loanBody * (monthlyPercent + 
      monthlyPercent / (Math.pow(1 + monthlyPercent, countMonthsNum) - 1));
  
  // Рассчитываем общую сумму выплат
  const totalAmount = monthlyPayment * countMonthsNum + contributionNum;
  
  // Округляем до двух знаков после запятой и возвращаем как число
  return Math.round(totalAmount * 100) / 100;
}

// Проверка работы функции с примерами из задания
console.log(calculateTotalMortgage(10, 0, 50000, 12));     // 52749.53
console.log(calculateTotalMortgage(10, 1000, 50000, 12));  // 51694.54
console.log(calculateTotalMortgage(10, 0, 20000, 24));     // 22149.56
console.log(calculateTotalMortgage(10, 1000, 20000, 24));  // 21042.09
console.log(calculateTotalMortgage(10, 20000, 20000, 24)); // 0
console.log(calculateTotalMortgage(10, 0, 10000, 36));     // 11616.19
console.log(calculateTotalMortgage(15, 0, 10000, 36));     // 12479.52