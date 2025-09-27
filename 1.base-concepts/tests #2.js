// Тесты для функции calculateTotalMortgage

function runTests() {
  console.log('=== ТЕСТИРОВАНИЕ ФУНКЦИИ calculateTotalMortgage ===\n');
  
  let passed = 0;
  let failed = 0;
  
  // Вспомогательная функция для сравнения чисел с плавающей точкой
  function areEqual(a, b, precision = 0.01) {
      return Math.abs(a - b) < precision;
  }
  
  // Функция для запуска теста
  function test(description, expected, actual) {
      if (areEqual(expected, actual)) {
          console.log(`✅ PASS: ${description}`);
          console.log(`   Ожидалось: ${expected}, Получено: ${actual}\n`);
          passed++;
      } else {
          console.log(`❌ FAIL: ${description}`);
          console.log(`   Ожидалось: ${expected}, Получено: ${actual}\n`);
          failed++;
      }
  }
  
  // Тест 1: Базовые примеры из задания
  console.log('1. Базовые примеры из задания:');
  test('10%, 0 взнос, 50000, 12 мес', 52749.53, calculateTotalMortgage(10, 0, 50000, 12));
  test('10%, 1000 взнос, 50000, 12 мес', 51694.54, calculateTotalMortgage(10, 1000, 50000, 12));
  test('10%, 0 взнос, 20000, 24 мес', 22149.56, calculateTotalMortgage(10, 0, 20000, 24));
  test('10%, 1000 взнос, 20000, 24 мес', 21042.09, calculateTotalMortgage(10, 1000, 20000, 24));
  test('10%, 20000 взнос, 20000, 24 мес', 0, calculateTotalMortgage(10, 20000, 20000, 24));
  test('10%, 0 взнос, 10000, 36 мес', 11616.19, calculateTotalMortgage(10, 0, 10000, 36));
  test('15%, 0 взнос, 10000, 36 мес', 12479.52, calculateTotalMortgage(15, 0, 10000, 36));
  
  // Тест 2: Граничные случаи
  console.log('2. Граничные случаи:');
  test('Нулевая процентная ставка', 10000, calculateTotalMortgage(0, 0, 10000, 12));
  test('Очень высокая процентная ставка', 30000, calculateTotalMortgage(300, 0, 10000, 12));
  test('Один месяц кредита', 10083.33, calculateTotalMortgage(10, 0, 10000, 1));
  test('Большой срок кредита', 18333.68, calculateTotalMortgage(10, 0, 10000, 120));
  
  // Тест 3: Особые случаи с взносами
  console.log('3. Особые случаи с взносами:');
  test('Взнос больше суммы кредита', 0, calculateTotalMortgage(10, 15000, 10000, 12));
  test('Взнос равен сумме кредита', 0, calculateTotalMortgage(10, 10000, 10000, 12));
  test('Большой взнос, маленький кредит', 5000, calculateTotalMortgage(10, 5000, 10000, 12));
  
  // Тест 4: Работа со строками
  console.log('4. Работа со строковыми параметрами:');
  test('Все параметры как строки', 52749.53, calculateTotalMortgage('10', '0', '50000', '12'));
  test('Смешанные типы параметров', 51694.54, calculateTotalMortgage(10, '1000', 50000, '12'));
  test('Десятичные числа в строках', 22149.56, calculateTotalMortgage('10.0', '0.0', '20000.0', '24'));
  
  // Тест 5: Некорректные параметры
  console.log('5. Некорректные параметры:');
  test('Нечисловая строка в percent', false, calculateTotalMortgage('abc', 0, 50000, 12));
  test('Нечисловая строка в contribution', false, calculateTotalMortgage(10, 'xyz', 50000, 12));
  test('Нечисловая строка в amount', false, calculateTotalMortgage(10, 0, 'amount', 12));
  test('Нечисловая строка в countMonths', false, calculateTotalMortgage(10, 0, 50000, 'months'));
  test('Пустая строка', false, calculateTotalMortgage('', 0, 50000, 12));
  test('Null как параметр', false, calculateTotalMortgage(null, 0, 50000, 12));
  test('Undefined как параметр', false, calculateTotalMortgage(undefined, 0, 50000, 12));
  test('Boolean как параметр', false, calculateTotalMortgage(true, 0, 50000, 12));
  
  // Тест 6: Отрицательные значения
  console.log('6. Отрицательные значения:');
  test('Отрицательная процентная ставка', 9833.33, calculateTotalMortgage(-10, 0, 10000, 12));
  test('Отрицательный взнос', 11083.33, calculateTotalMortgage(10, -1000, 10000, 12));
  test('Отрицательная сумма кредита', false, calculateTotalMortgage(10, 0, -50000, 12));
  test('Отрицательный срок', false, calculateTotalMortgage(10, 0, 50000, -12));
  
  // Тест 7: Десятичные числа
  console.log('7. Десятичные числа:');
  test('Дробная процентная ставка', 11204.92, calculateTotalMortgage(7.5, 0, 10000, 12));
  test('Дробный взнос', 10520.79, calculateTotalMortgage(10, 500.50, 10000, 12));
  test('Дробная сумма кредита', 5282.48, calculateTotalMortgage(10, 0, 5000.75, 12));
  test('Дробный срок', 5508.10, calculateTotalMortgage(10, 0, 5000, 12.5));
  
  // Тест 8: Очень большие числа
  console.log('8. Очень большие числа:');
  test('Большая сумма кредита', 1054990.60, calculateTotalMortgage(10, 0, 1000000, 12));
  test('Большой срок', 13215.06, calculateTotalMortgage(5, 0, 10000, 360));
  
  // Итоги тестирования
  console.log('=== ИТОГИ ТЕСТИРОВАНИЯ ===');
  console.log(`Пройдено тестов: ${passed}`);
  console.log(`Провалено тестов: ${failed}`);
  console.log(`Общее количество тестов: ${passed + failed}`);
  console.log(`Успешность: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  return { passed, failed, total: passed + failed };
}

// Дополнительные тесты для проверки точности округления
function testPrecision() {
  console.log('\n=== ТЕСТЫ ТОЧНОСТИ ОКРУГЛЕНИЯ ===');
  
  function testRounding(value, expected) {
      const result = calculateTotalMortgage(10, 0, value, 12);
      const rounded = Math.round(result * 100) / 100;
      console.log(`Сумма: ${value}, Результат: ${result}, Округлённый: ${rounded}`);
      console.log(`Ожидается 2 знака после запятой: ${result === rounded ? '✅' : '❌'}`);
  }
  
  testRounding(10000, 0);
  testRounding(12345.67, 0);
  testRounding(50000, 52749.53);
}

// Запуск всех тестов
runTests();
testPrecision();

// Тесты для проверки типа возвращаемого значения
console.log('\n=== ТЕСТЫ ТИПОВ ДАННЫХ ===');
console.log('Тип результата для числовых параметров:', typeof calculateTotalMortgage(10, 0, 50000, 12));
console.log('Тип результата для строковых параметров:', typeof calculateTotalMortgage('10', '0', '50000', '12'));
console.log('Тип результата для некорректных параметров:', typeof calculateTotalMortgage('abc', 0, 50000, 12));

// Дополнительная проверка формулы
console.log('\n=== ПРОВЕРКА ФОРМУЛЫ ===');
function manualCalculation(percent, contribution, amount, countMonths) {
  const monthlyPercent = percent / 100 / 12;
  const loanBody = amount - contribution;
  
  if (loanBody <= 0) return 0;
  
  const monthlyPayment = loanBody * (monthlyPercent + 
      monthlyPercent / (Math.pow(1 + monthlyPercent, countMonths) - 1));
  
  return monthlyPayment * countMonths + contribution;
}

const testCase = [10, 0, 50000, 12];
const funcResult = calculateTotalMortgage(...testCase);
const manualResult = manualCalculation(...testCase);

console.log('Результат функции:', funcResult);
console.log('Ручной расчёт:', manualResult);
console.log('Результаты совпадают:', Math.abs(funcResult - manualResult) < 0.01 ? '✅' : '❌');