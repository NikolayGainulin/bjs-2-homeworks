class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
      this.name = name;
      this.releaseDate = releaseDate;
      this.pagesCount = pagesCount;
      this._state = 100;
      this.type = null;
    }
  
    fix() {
      this.state = this._state * 1.5;
    }
  
    set state(newState) {
      if (newState < 0) {
        this._state = 0;
      } else if (newState > 100) {
        this._state = 100;
      } else {
        this._state = newState;
      }
    }
  
    get state() {
      return this._state;
    }
  }
  
  class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
      super(name, releaseDate, pagesCount);
      this.type = "magazine";
    }
  }
  
  class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
      super(name, releaseDate, pagesCount);
      this.author = author;
      this.type = "book";
    }
  }
  
  class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = "novel";
    }
  }
  
  class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = "fantastic";
    }
  }
  
  class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = "detective";
    }
  }

  class Library {
    constructor(name) {
      this.name = name;
      this.books = [];
    }
  
    addBook(book) {
      if (book.state > 30) {
        this.books.push(book);
      }
    }
  
    findBookBy(type, value) {
      return this.books.find(book => book[type] === value) || null;
    }
  
    giveBookByName(bookName) {
      const index = this.books.findIndex(book => book.name === bookName);
      if (index !== -1) {
        return this.books.splice(index, 1)[0];
      }
      return null;
    }
  }
  
  // Тестовый сценарий
  console.log("=== Тестовый сценарий библиотеки ===");
  
  const library = new Library("Библиотека имени Ленина");
  
  // Добавляем книги в библиотеку
  library.addBook(
    new DetectiveBook(
      "Артур Конан Дойл",
      "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
      2019,
      1008
    )
  );
  library.addBook(
    new FantasticBook(
      "Аркадий и Борис Стругацкие",
      "Пикник на обочине",
      1972,
      168
    )
  );
  library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
  library.addBook(new Magazine("Мурзилка", 1924, 60));
  
  console.log(library.findBookBy("name", "Властелин колец")); // null
  console.log(library.findBookBy("releaseDate", 1924).name); // "Мурзилка"
  
  console.log("Количество книг до выдачи: " + library.books.length); // Количество книг до выдачи: 4
  library.giveBookByName("Машина времени");
  console.log("Количество книг после выдачи: " + library.books.length); // Количество книг после выдачи: 3
  
  // Дополнительный тестовый сценарий
  console.log("\n=== Дополнительный тестовый сценарий ===");
  
  // Создаем новую библиотеку
  const testLibrary = new Library("Тестовая библиотека");
  
  // Добавляем несколько печатных изданий разных типов
  testLibrary.addBook(new NovelBook("Лев Толстой", "Война и мир", 1869, 1225));
  testLibrary.addBook(new FantasticBook("Айзек Азимов", "Основание", 1951, 255));
  testLibrary.addBook(new DetectiveBook("Агата Кристи", "Убийство в Восточном экспрессе", 1934, 256));
  testLibrary.addBook(new Magazine("Наука и жизнь", 2020, 80));
  
  // Находим книгу, изданную в 1919 году, или создаем её при необходимости
  let foundBook = testLibrary.findBookBy("releaseDate", 1919);
  if (!foundBook) {
    console.log("Книга 1919 года не найдена, создаем новую...");
    const newBook = new Book("Автор 1919", "Книга 1919 года", 1919, 200);
    testLibrary.addBook(newBook);
  }
  
  // Выдаем любую книгу
  const issuedBook = testLibrary.giveBookByName("Основание");
  console.log(`Выдана книга: "${issuedBook.name}"`);
  
  // Повреждаем выданную книгу
  issuedBook.state = 20;
  console.log(`Состояние книги после повреждения: ${issuedBook.state}`);
  
  // Восстанавливаем выданную книгу
  issuedBook.fix();
  console.log(`Состояние книги после восстановления: ${issuedBook.state}`);
  
  // Пытаемся добавить восстановленную книгу обратно в библиотеку
  console.log(`Попытка добавить книгу обратно в библиотеку...`);
  testLibrary.addBook(issuedBook);
  console.log(`Количество книг в библиотеке после попытки возврата: ${testLibrary.books.length}`);