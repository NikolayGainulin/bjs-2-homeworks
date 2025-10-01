// Функция-конструктор Student
function Student(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.marks = [];
  }
  
  // Метод для установки предмета
  Student.prototype.setSubject = function (subjectName) {
    this.subject = subjectName;
  };
  
  // Метод для добавления оценок
  Student.prototype.addMarks = function (...marksToAdd) {
    if (!this.marks) {
      console.log("Студент отчислен, нельзя добавить оценки");
      return;
    }
    this.marks.push(...marksToAdd);
  };
  
  // Метод для вычисления среднего балла
  Student.prototype.getAverage = function () {
    if (!this.marks || this.marks.length === 0) {
      return 0;
    }
    const sum = this.marks.reduce((total, mark) => total + mark, 0);
    return sum / this.marks.length;
  };
  
  // Метод для отчисления студента
  Student.prototype.exclude = function (reason) {
    delete this.subject;
    delete this.marks;
    this.excluded = reason;
  };