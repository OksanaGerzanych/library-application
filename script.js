const data = [
 {
        id: "1",
        title: `Apple. Эволюция компьютера`,
        author: `Владимир Невзоров`,
        img: `https://bukva.ua/img/products/449/449532_200.jpg`,
        plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
        и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
        персональных компьютеров в целом.
        В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
        сопровождающиеся большим количеством оригинальных студийных фотографий.
        Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
        Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
      },
      {
        id: "2",
        title: `Как объяснить ребенку информатику`,
        author: `Кэрол Вордерман`,
        img: `https://bukva.ua/img/products/480/480030_200.jpg`,
        plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
        в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
        оставаясь в безопасности. 
        Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
        от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
        обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
        объясняются наглядно с помощью иллюстраций и схем.`,
      },
      {
        id: "3",
        title: `Путь скрам-мастера. #ScrumMasterWay`,
        author: `Зузана Шохова`,
        img: `https://bukva.ua/img/products/480/480090_200.jpg`,
        plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
        Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
        знаниями будете в течение всей карьеры.
        Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
        как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
        какими инструментами ему нужно пользоваться.`,
      }

]
localStorage.setItem('books', JSON.stringify(data))

const root = document.querySelector('#root');

const leftDiv = document.createElement('div')
leftDiv.classList.add("left")

const rightDiv = document.createElement('div')
rightDiv.classList.add("right")

root.append(leftDiv, rightDiv);

const title = document.createElement("h1");
title.textContent = "LIBRARY";
title.classList.add("title");
const list = document.createElement('ul');
list.classList.add("list");
const button = document.createElement("button");
button.textContent = "ADD"
button.classList.add("button");

leftDiv.append(title, list, button);

button.addEventListener('click', addBook);

function renderBooksList() {
  const books = JSON.parse(localStorage.getItem("books"))
  const markup = books
  .map(({ id, title }) => `<li class = "item" id = "${id}"><p class = "titele-book" >${title}</p><button class = "btn-del">Del</button><button class = "btn-edit">Edit</button></li>`)
  .join('');
  list.innerHTML = ""; 
  list.insertAdjacentHTML("beforeend", markup);
  const booksTitle = document.querySelectorAll('.titele-book');
  booksTitle.forEach(title => title.addEventListener('click', renderPreview));  
  const btnDel = document.querySelectorAll('.btn-del');
  btnDel.forEach(btn => btn.addEventListener('click', deleteBook));
}
renderBooksList()



function renderPreview(event) {
  const books = JSON.parse(localStorage.getItem("books"))
  const book = books.find(({ title }) => title === event.target.textContent);
  console.log(book);
  const markup = createPreviewMarkup(book);
  rightDiv.innerHTML = " ";
  rightDiv.insertAdjacentHTML("beforeend", markup);
}

function createPreviewMarkup({id, title, author, img, plot}) {
  const markupPreview = 
  `<div class="preview-box" data-id="${id}">
  <h2 class="preview-title">${title}</h2>
  <p class="preview-author">${author}</p> 
  <img src="${img}" alt = "${title}" class="img">
  <p class="preview-text">${plot}</p>
  </div>`
  return markupPreview;
}

function deleteBook(evn) {
  const books = JSON.parse(localStorage.getItem("books"))
  const id = evn.target.parentNode.id;
  // console.log(id);
  const newBooks = books.filter(book => book.id !== id);
  console.log(newBooks);
  localStorage.setItem("books", JSON.stringify(newBooks));
  renderBooksList();
}
function addBook() {
  console.log("add")
  const newBook = {
    id: Date.now(),
    title: "",
    author: "",
    img: "",
    plot: ""
  };
  const markup = createFormMarkup()
  rightDiv.insertAdjacentHTML('beforeend', markup)
  valueForm(newBook);
  const formEl = document.querySelector('form');
  formEl.addEventListener('submit', onFormSubmit);
  
  function onFormSubmit(evt) {
    evt.preventDefault()
    console.log(newBook)
    const valuesNewBook = Object.values(newBook)
    if (valuesNewBook.some(value => value === "")) {
      alert('fill all')
      return
    }
    const books = JSON.parse(localStorage.getItem('books'));
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooksList();
    const createPreviewMarkup
  }
}

function createFormMarkup() {
  const markup = `<form >
      <label>Title
        <input type="text" name="title" />
      </label>
      <label>Author
        <input type="text" name="author" />
      </label>
      <label>Img
        <input type="text" name="img" />
      </label>
      <label>Plot
        <input type="text" name="plot" />
       </label>
        <button>Save</button>
    </form>`
  return markup;
}

function valueForm(book) {
  const refInputs = document.querySelectorAll('input');
  refInputs.forEach(input => input.addEventListener('change', onInputChange))
  function onInputChange(evt) {
   book[evt.target.name] = evt.target.value

 }
}