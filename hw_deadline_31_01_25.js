class Book {
    #title;
    #author;
    #year;
    #isIssued;
  
    constructor(title, author, year) {
      this.#title = title;
      this.#author = author;
      this.#year = year;
      this.#isIssued = false;
      
      Object.defineProperty(this, 'isIssued', {
        get: () => this.#isIssued,
        set: (value) => {
          if (typeof value === 'boolean') {
            this.#isIssued = value;
          } else {
            throw new Error('isIssued должен быть булевым');
          }
        },
        configurable: false
      });
    }
  
    get title() {
      return this.#title;
    }
  
    get author() {
      return this.#author;
    }
  
    get year() {
      return this.#year;
    }
  
    toggleIssue() {
      this.#isIssued = !this.#isIssued;
    }
  }
  
  class EBook extends Book {
    #fileSize;
    #format;
  
    constructor(title, author, year, fileSize, format) {
      super(title, author, year);
      this.#fileSize = fileSize;
      this.#format = format;
    }
  
    get fileSize() {
      return this.#fileSize;
    }
  
    get format() {
      return this.#format;
    }
  
    toggleIssue() {
      console.log("Электронные книги всегда доступны.");
    }
  }
  
  class Library {
    #books;
  
    constructor() {
      this.#books = [];
    }
  
    addBook(book) {
      try {
        if (book instanceof Book) {
          this.#books.push(book);
        } else {
          throw new Error("В библиотеку можно положить только книги.");
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  
    findBook(arg1, arg2) {
      try {
        if (arg2 === undefined) {
          const book = this.#books.find(book => book.title === arg1);
          if (!book) throw new Error("Книга не найдена.");
          return book;
        } else {
          const book = this.#books.find(book => book.author === arg1 && book.year === arg2);
          if (!book) throw new Error("Книга не найдена.");
          return book;
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  
    listAllBooks() {
      this.#books.forEach(book => {
        console.log(`${book.title} написана ${book.author}, выдана: ${book.isIssued}`);
      });
    }
  }
  
  // Чтобы показать работу с prototype :)
  EBook.prototype.getDetails = function() {
    return `${this.title} (${this.format}, ${this.fileSize}MB)`;
  };
