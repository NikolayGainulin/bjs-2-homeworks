function getArrayParams(...arr) {
  if (arr.length === 0) {
    return { min: undefined, max: undefined, avg: undefined };
  }

  let min = Infinity;
  let max = -Infinity;
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
    if (arr[i] < min) {
      min = arr[i];
    }
    sum += arr[i];
  }

  const avg = Number((sum / arr.length).toFixed(2));

  return { min, max, avg };
}



// Насадка суммирования элементов
function summElementsWorker(...arr) {
  if (arr.length === 0) {
    return 0;
  }
  
  return arr.reduce((sum, current) => sum + current, 0);
}

// Насадка вычисления разницы максимального и минимального элементов
function differenceMaxMinWorker(...arr) {
  if (arr.length === 0) {
    return 0;
  }
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  
  return max - min;
}

// Насадка вычисления разницы сумм чётных и нечётных элементов
function differenceEvenOddWorker(...arr) {
  if (arr.length === 0) {
    return 0;
  }
  
  let sumEvenElement = 0;
  let sumOddElement = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      sumEvenElement += arr[i];
    } else {
      sumOddElement += arr[i];
    }
  }
  
  return sumEvenElement - sumOddElement;
}

// Насадка вычисления среднего значения чётных элементов
function averageEvenElementsWorker(...arr) {
  if (arr.length === 0) {
    return 0;
  }
  
  let sumEvenElement = 0;
  let countEvenElement = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      sumEvenElement += arr[i];
      countEvenElement++;
    }
  }
  
  if (countEvenElement === 0) {
    return 0;
  }
  
  return sumEvenElement / countEvenElement;
}


// Функции-насадки из предыдущего задания
function summElementsWorker(...arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((sum, current) => sum + current, 0);
}

function differenceMaxMinWorker(...arr) {
  if (!arr || arr.length === 0) return 0;
  return Math.max(...arr) - Math.min(...arr);
}

function differenceEvenOddWorker(...arr) {
  if (!arr || arr.length === 0) return 0;
  
  let sumEven = 0;
  let sumOdd = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      sumEven += arr[i];
    } else {
      sumOdd += arr[i];
    }
  }
  
  return sumEven - sumOdd;
}

function averageEvenElementsWorker(...arr) {
  if (!arr || arr.length === 0) return 0;
  
  let sumEven = 0;
  let countEven = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      sumEven += arr[i];
      countEven++;
    }
  }
  
  return countEven === 0 ? 0 : sumEven / countEven;
}

// Основная функция мясорубки
function makeWork(arrOfArr, func) {
  let maxWorkerResult = -Infinity;
  
  for (let i = 0; i < arrOfArr.length; i++) {
    const result = func(...arrOfArr[i]);
    
    if (result > maxWorkerResult) {
      maxWorkerResult = result;
    }
  }
  
  return maxWorkerResult;
}