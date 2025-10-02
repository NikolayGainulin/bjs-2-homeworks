describe('Домашнее задание к лекции 5 «Классы»', () => {

  describe('Задача №1', () => {
    let printItem;

    beforeEach(function(){
      printItem = new PrintEditionItem('Типовой школьный журнал', 2019, 102);
    });

    it('создание печатного издания', () => {
      expect(printItem).toBeDefined();
      expect(printItem.name).toEqual('Типовой школьный журнал');
      expect(printItem.releaseDate).toEqual(2019);
      expect(printItem.pagesCount).toEqual(102);
      expect(printItem.state).toEqual(100);
      expect(printItem.type).toEqual(null);
    });

    it('починка почти целого печатного издания (ограничение сеттером state)', () => {
      printItem.state = 90;
      printItem.fix();
      expect(printItem.state).toEqual(100);
    });

    it('починка печатного издания', () => {
      printItem.state = 50;
      printItem.fix();
      expect(printItem.state).toEqual(75);
    });

    it('геттер для свойства state', () => {
      printItem.state = 10;
      const spy = spyOnProperty(printItem, 'state', 'get').and.returnValue(10);
      expect(printItem.state).toBe(10);
      expect(spy).toHaveBeenCalled();
    });
    
    it('сеттер для свойства state', () => {
      const spy = spyOnProperty(printItem, 'state', 'set');
      printItem.state = 10;
      expect(spy).toHaveBeenCalled();
    });

    it('создание объекта Magazine', () => {
      printItem = new Magazine('Forbes', 2020, 180);
      expect(printItem.type).toEqual("magazine");
    });
    
    it('создание объекта Book', () => {
      printItem = new Book('А. Сапковский', 'Меч Предназначения', 1992, 384);
      expect(printItem.author).toEqual('А. Сапковский');
      expect(printItem.name).toEqual('Меч Предназначения');
      expect(printItem.releaseDate).toEqual(1992);
      expect(printItem.pagesCount).toEqual(384);
      expect(printItem.type).toEqual('book');
    });

    it('создание объекта NovelBook', () => {
      printItem = new NovelBook('А. Сапковский', 'Меч Предназначения', 1992, 384);
      expect(printItem.author).toEqual('А. Сапковский');
      expect(printItem.type).toEqual('novel');
    });
    
    it('создание объекта FantasticBook', () => {
      printItem = new FantasticBook('Джон Толкин', 'Властелин колец', 1954, 2093);
      expect(printItem.author).toEqual('Джон Толкин');
      expect(printItem.type).toEqual('fantastic');
    });
    
    it('создание объекта DetectiveBook', () => {
      printItem = new DetectiveBook('Агата Кристи', 'Десять негритят', 2019, 256);
      expect(printItem.author).toEqual('Агата Кристи');
      expect(printItem.type).toEqual('detective');
    });
  });
});


describe('Задача №2', () => {
  let library, printItem;

  beforeEach(function(){
    library = new Library('Библиотека имени Ленина');
    printItem = new PrintEditionItem('Типовой школьный журнал', 2019, 102);
  });

  it('создание библиотеки', () => {
    expect(library).toBeDefined();
    expect(library.name).toEqual('Библиотека имени Ленина');
    expect(library.books).toEqual(jasmine.any(Array));
  });
  
  it('добавление книги', () => {
    library.addBook(printItem);
    expect(library.books[0].name).toEqual('Типовой школьный журнал');
    expect(library.books.length).toEqual(1);
  });
  
  it('поиск книги', () => {
    const printItemAdditional = new PrintEditionItem('Блокнот для заметок', 2021, 100);
    library.addBook(printItemAdditional);
    library.addBook(printItem);
    const firstBook = library.findBookBy("releaseDate", 2019);
    expect(firstBook.name).toEqual('Типовой школьный журнал');
    const secondBook = library.findBookBy("releaseDate", 2154);
    expect(secondBook).toEqual(null);
  });
  
  it('выдача книги', () => {
    library.addBook(printItem);
    const firstBook = library.giveBookByName('Типовой школьный журнал');
    expect(firstBook.name).toEqual('Типовой школьный журнал');
    expect(library.books.length).toEqual(0);
    const secondBook = library.giveBookByName('Судовой журнал');
    expect(secondBook).toEqual(null);
  });
});

// Дополнительные тесты для Library
describe('Дополнительные тесты для Library', () => {
  let library;

  beforeEach(() => {
    library = new Library('Тестовая библиотека');
  });

  it('не добавляет книгу с state <= 30', () => {
    const damagedBook = new PrintEditionItem('Поврежденная книга', 2020, 100);
    damagedBook.state = 30;
    library.addBook(damagedBook);
    expect(library.books.length).toBe(0);

    damagedBook.state = 29;
    library.addBook(damagedBook);
    expect(library.books.length).toBe(0);
  });

  it('добавляет книгу с state > 30', () => {
    const goodBook = new PrintEditionItem('Хорошая книга', 2020, 100);
    goodBook.state = 31;
    library.addBook(goodBook);
    expect(library.books.length).toBe(1);
  });

  it('поиск по разным полям', () => {
    const book1 = new Book('Автор 1', 'Книга 1', 2000, 100);
    const book2 = new Book('Автор 2', 'Книга 2', 2001, 200);
    
    library.addBook(book1);
    library.addBook(book2);

    expect(library.findBookBy('name', 'Книга 1')).toBe(book1);
    expect(library.findBookBy('author', 'Автор 2')).toBe(book2);
    expect(library.findBookBy('pagesCount', 200)).toBe(book2);
    expect(library.findBookBy('type', 'book')).toBe(book1); // Найдет первую книгу
  });

  it('выдача книги удаляет её из библиотеки', () => {
    const book1 = new Book('Автор 1', 'Книга 1', 2000, 100);
    const book2 = new Book('Автор 2', 'Книга 2', 2001, 200);
    
    library.addBook(book1);
    library.addBook(book2);

    const issuedBook = library.giveBookByName('Книга 1');
    expect(issuedBook).toBe(book1);
    expect(library.books.length).toBe(1);
    expect(library.books[0]).toBe(book2);
  });

  it('выдача несуществующей книги возвращает null', () => {
    const book = new Book('Автор', 'Книга', 2000, 100);
    library.addBook(book);

    const result = library.giveBookByName('Несуществующая книга');
    expect(result).toBeNull();
    expect(library.books.length).toBe(1);
  });
});