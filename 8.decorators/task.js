//Задача № 1
function cachingDecoratorNew(func) {
    let cache = [];
  
    function wrapper(...args) {
      const hash = md5(args); // получаем хеш аргументов с помощью MD5
      let objectInCache = cache.find((item) => item.hash === hash); // ищем элемент в кеше
      
      if (objectInCache) { // если элемент найден
        console.log("Из кеша: " + objectInCache.value);
        return "Из кеша: " + objectInCache.value;
      }
  
      let result = func(...args); // в кеше результата нет — вычисляем
      cache.push({hash, value: result}); // добавляем элемент в кеш
      
      if (cache.length > 5) { 
        cache.shift(); // удаляем самый старый элемент (первый)
      }
      
      console.log("Вычисляем: " + result);
      return "Вычисляем: " + result;  
    }
    
    return wrapper;
  }

//Задача № 2
function debounceDecoratorNew(func, delay) {
    let timeoutId = null;
    let count = 0;
    let allCount = 0;
    
    function wrapper(...args) {
      allCount++; // увеличиваем счетчик всех вызовов
      
      if (timeoutId === null) {
        // Первый вызов - выполняем моментально
        func.apply(this, args);
        count++; // увеличиваем счетчик выполненных вызовов
      } else {
        // Отменяем предыдущий запланированный вызов
        clearTimeout(timeoutId);
      }
      
      // Планируем следующий вызов
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        count++; // увеличиваем счетчик выполненных вызовов
        timeoutId = null; // сбрасываем идентификатор таймера
      }, delay);
    }
    
    // Добавляем свойства для подсчета вызовов
    wrapper.count = count;
    wrapper.allCount = allCount;
    
    return wrapper;
  }