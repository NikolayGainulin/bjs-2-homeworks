"use strict";

function solveEquation(a, b, c) {
  // Вычисляем дискриминант
  const discriminant = b ** 2 - 4 * a * c;
  
  // Если дискриминант меньше нуля - корней нет
  if (discriminant < 0) {
    return [];
  }
  
  // Если дискриминант равен нулю - один корень
  if (discriminant === 0) {
    const root = -b / (2 * a);
    return [root];
  }
  
  // Если дискриминант больше нуля - два корня
  const sqrtD = Math.sqrt(discriminant);
  const root1 = (-b + sqrtD) / (2 * a);
  const root2 = (-b - sqrtD) / (2 * a);
  
  return [root1, root2];
}

// Примеры использования:
console.log(solveEquation(1, -3, 2));  // [2, 1] - два корня
console.log(solveEquation(1, -2, 1));  // [1] - один корень
console.log(solveEquation(1, 2, 5));   // [] - нет корней
console.log(solveEquation(2, -7, 3));  // [3, 0.5] - два корня