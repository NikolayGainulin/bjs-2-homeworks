describe('solveEquation', () => {
  test('должна возвращать два корня для положительного дискриминанта', () => {
    // x^2 - 3x + 2 = 0 → корни: 2 и 1
    expect(solveEquation(1, -3, 2)).toEqual([2, 1]);
    
    // 2x^2 - 7x + 3 = 0 → корни: 3 и 0.5
    expect(solveEquation(2, -7, 3)).toEqual([3, 0.5]);
    
    // x^2 - x - 6 = 0 → корни: 3 и -2
    expect(solveEquation(1, -1, -6)).toEqual([3, -2]);
  });

  test('должна возвращать один корень для нулевого дискриминанта', () => {
    // x^2 - 2x + 1 = 0 → корень: 1
    expect(solveEquation(1, -2, 1)).toEqual([1]);
    
    // 4x^2 + 4x + 1 = 0 → корень: -0.5
    expect(solveEquation(4, 4, 1)).toEqual([-0.5]);
    
    // 9x^2 + 6x + 1 = 0 → корень: -1/3
    expect(solveEquation(9, 6, 1)).toEqual([-1/3]);
  });

  test('должна возвращать пустой массив для отрицательного дискриминанта', () => {
    // x^2 + 2x + 5 = 0 → нет корней
    expect(solveEquation(1, 2, 5)).toEqual([]);
    
    // 2x^2 + 3x + 4 = 0 → нет корней
    expect(solveEquation(2, 3, 4)).toEqual([]);
    
    // x^2 + 1 = 0 → нет корней
    expect(solveEquation(1, 0, 1)).toEqual([]);
  });

  test('должна корректно обрабатывать дробные коэффициенты', () => {
    // 0.5x^2 + 1.5x + 1 = 0 → корни: -1 и -2
    expect(solveEquation(0.5, 1.5, 1)).toEqual([-1, -2]);
    
    // x^2 + 0.5x - 0.5 = 0 → корни: 0.5 и -1
    expect(solveEquation(1, 0.5, -0.5)).toEqual([0.5, -1]);
  });

  test('должна корректно обрабатывать отрицательные коэффициенты', () => {
    // -x^2 + x + 2 = 0 → корни: -1 и 2
    expect(solveEquation(-1, 1, 2)).toEqual([-1, 2]);
    
    // -2x^2 + 4x - 2 = 0 → корень: 1
    expect(solveEquation(-2, 4, -2)).toEqual([1]);
  });

  test('должна корректно обрабатывать случай когда a = 0', () => {
    // 0x^2 + 2x + 1 = 0 → линейное уравнение, корень: -0.5
    // Но в текущей реализации это вызовет деление на 0
    // Этот тест может упасть, что показывает ограничение функции
    expect(() => solveEquation(0, 2, 1)).toThrow();
  });

  test('должна возвращать корни в правильном порядке (по возрастанию)', () => {
    // Корни всегда должны возвращаться в порядке: [больший, меньший]
    expect(solveEquation(1, -5, 6)).toEqual([3, 2]); // 3 > 2
    expect(solveEquation(1, 1, -6)).toEqual([2, -3]); // 2 > -3
  });

  test('должна корректно обрабатывать граничные случаи', () => {
    // x^2 = 0 → корень: 0
    expect(solveEquation(1, 0, 0)).toEqual([0]);
    
    // x^2 - 1 = 0 → корни: 1 и -1
    expect(solveEquation(1, 0, -1)).toEqual([1, -1]);
  });
});

describe('solveEquation - точность вычислений', () => {
  test('должна корректно вычислять корни с плавающей точкой', () => {
    // Используем toBeCloseTo для сравнения чисел с плавающей точкой
    const roots = solveEquation(1, -2.5, 1.5);
    expect(roots.length).toBe(2);
    expect(roots[0]).toBeCloseTo(2, 10);
    expect(roots[1]).toBeCloseTo(0.5, 10);
  });

  test('должна возвращать точные значения для целых корней', () => {
    const roots = solveEquation(1, -5, 6);
    expect(roots).toEqual([3, 2]);
    expect(roots[0]).toBe(3);
    expect(roots[1]).toBe(2);
  });
});