/*
Задание 1: ""Управление библиотекой книг""

Реализуйте класс Book, представляющий книгу, со следующими свойствами и методами:

Свойство title (название) - строка, название книги.
Свойство author (автор) - строка, имя автора книги.
Свойство pages (количество страниц) - число, количество страниц в книге.
Метод displayInfo() - выводит информацию о книге (название, автор и количество страниц).
*/

class Book {
    #title;
    #author;
    #pages;
    constructor(title, author, pages) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
    }

    displayInfo() {
        console.log(`This book is ${this.#title} written by ${this.#author} with ${this.#pages} pages.`)
    }
}

const firstBook = new Book('Tales', 'Andersen', 123);
firstBook.displayInfo();

/*

Задание 2: ""Управление списком студентов""
Реализуйте класс Student, представляющий студента, со следующими свойствами и методами:

Свойство name (имя) - строка, имя студента.
Свойство age (возраст) - число, возраст студента.
Свойство grade (класс) - строка, класс, в котором учится студент.
Метод displayInfo() - выводит информацию о студенте (имя, возраст и класс).
javascript

// Пример использования класса
const student1 = new Student(""John Smith"", 16, ""10th grade"");
student1.displayInfo();
// Вывод:
// Name: John Smith
// Age: 16
// Grade: 10th grade

const student2 = new Student(""Jane Doe"", 17, ""11th grade"");
student2.displayInfo();
// Вывод:
// Name: Jane Doe
// Age: 17
// Grade: 11th grade"

*/

class Student {
    #name;
    #age;
    #grade;
    constructor(name, age, grade) {
        this.#name = name;
        this.#age = age;
        this.#grade = grade;
    }

    displayInfo() {
        console.log(`Name: ${this.#name}\nAge: ${this.#age}\nGrade: ${this.#grade}`)
    }
}

const student1 = new Student("John Smith", 16, "10th grade");
student1.displayInfo();
const student2 = new Student("Jane Doe", 17, "11th grade");
student2.displayInfo();

/*

****** Задача необязательная для выполнения:

Это расширенная версия задачи с банком, которую мы решлали на семинаре:

Создайте класс "Банк", который будет иметь следующие свойства: название банка, список клиентов и список счетов.
Класс должен иметь методы для добавления нового клиента, открытия нового счета для клиента, пополнения счета, снятия денег со счета и проверки баланса.

Пример работы:

const bank = new Bank("Мой Банк");

const client1 = new Client("Иван", 25);
const client2 = new Client("Мария", 30);

bank.addClient(client1);
bank.addClient(client2);

bank.openAccount(client1, 1000);
bank.openAccount(client2, 500);

bank.deposit(123456789, 200);
bank.withdraw(987654321, 100);
bank.checkBalance(123456789);
bank.checkBalance(987654321);
 */

class Bank {
    name;
    clients = []; //???
    accounts = [];

    constructor(name) {
        this.name = name;
    }

    addClient(client) {
        this.clients.push(client);
    }

    openAccount(client, sum) {
        const number = this.accounts.length > 0 ? this.accounts[this.accounts.length - 1].number + 1 : 1;
        const account = new Account(number, client, this.name, sum);

        if (this.clients.find((item) => (item.name === client.name))) {
            client.accounts.push(account);
            this.accounts.push(account);
            console.log(`Успешно открыт новый счет №${account.number} для клиента ${client.name}. Остаток ${account.sum} у.е.`);
        } else {
            client.accounts.push(account);
            this.accounts.push(account);
            this.clients.push(client);
            console.log(`Успешно открыт новый счет №${account.number} для клиента ${client.name}. Остаток ${account.sum} у.е.`);
        }
    }

    deposit(account, sum) {
        const curAccount = this.accounts.find((item) => (item.number === account));
        curAccount.sum += sum;
        console.log(`Счет ${account} успешно пополнен на сумму ${sum}. Остаток ${curAccount.sum} у.е.`);
    }

    withdraw(account, sum) {
        const curAccount = this.accounts.find((item) => (item.number === account));

        if (curAccount.sum > sum) {
            curAccount.sum -= sum;
            console.log(`Списание со счета ${account} суммы ${sum}. Остаток ${curAccount.sum} у.е.`);
        } else {
            console.log(`На счете ${account} недостаточно средств. Остаток ${curAccount.sum} у.е.`)
        }
    }

    checkBalance(account) {
        console.log(`Остаток на счете №${account} ${this.accounts.find((item) => (item.number === account)).sum} у.е.`)
    }
}

class Client {
    name;
    age;
    accounts = [];

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    addAccount(account) {
        this.accounts.push(account);
    }
}

class Account {
    number;
    client;
    bank;
    sum;

    constructor(number, client, bank, sum) {
        this.number = number;
        this.client = client;
        this.bank = bank;
        this.sum = sum;
    }
}

const bank = new Bank("Мой Банк");

const client1 = new Client("Иван", 25);
const client2 = new Client("Мария", 30);

bank.addClient(client1);
bank.openAccount(client2, 100);
bank.openAccount(client1, 1000);

bank.checkBalance(1);
bank.checkBalance(2);

bank.deposit(1, 1200);
bank.withdraw(1, 1500);
bank.withdraw(2, 50);
bank.withdraw(2, 1000);
