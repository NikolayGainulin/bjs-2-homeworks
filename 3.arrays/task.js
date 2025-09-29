// Задача 1: Сравнение массивов
function compareArrays(arr1, arr2) {
    // Сначала проверяем одинаковую длину массивов
    if (arr1.length !== arr2.length) {
      return false;
    }
    
    // Используем every для сравнения элементов на одинаковых позициях
    return arr1.every((element, index) => element === arr2[index]);
  }
  
  // Задача 2: Фильтрация и преобразование массива
  function getUsersNamesInAgeRange(users, gender) {
    // Проверяем пустой массив или отсутствие пользователей нужного пола
    if (!users || users.length === 0) {
      return 0;
    }
    
    // Фильтруем пользователей по полу
    const filteredUsers = users.filter(user => user.gender === gender);
    
    // Если нет пользователей нужного пола, возвращаем 0
    if (filteredUsers.length === 0) {
      return 0;
    }
    
    // Считаем средний возраст с помощью reduce
    const totalAge = filteredUsers.reduce((sum, user) => sum + user.age, 0);
    
    // Возвращаем среднее значение
    return totalAge / filteredUsers.length;
  }
  