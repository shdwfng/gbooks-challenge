// Renders an error message
function showError(msg) {
  const html = `<li><p class="error">${msg}</p></li>`;
  document.querySelector('#results').innerHTML = html;
}

// Searches for books and returns a promise that resolves a JSON list
function searchForBooks(term) {

  // Local variables
  const baseurl = 'https://www.googleapis.com/books/v1/volumes?q=';
  const API_KEY = 'AIzaSyDnZY4zk1OKlvTTuLMBMjpUJc-_1Eln1nQ';

  // Fetch the data
  let results = [];

  fetch(baseurl + term + '&key=' + API_KEY, 
    // Enable CORS to access images
    { 
      mode: 'cors', 
      headers: {'Access-Control-Allow-Origin': '*'} 
    })
    .then(response => response.json())
    .then(data => {
      let querydata = data;
      let items = querydata.items;

      items.forEach(book => {
        let result = { id:book.id, 
                       authors:book.volumeInfo.authors,
                       title:book.volumeInfo.title,
                       subtitle:book.volumeInfo.subtitle,
                       link:book.volumeInfo.infoLink,
                       cover:book.volumeInfo.imageLinks.thumbnail
                      };

        results.push(result);
      })

      render(results, term);
    });
}

// Generate HTML and sets #results's contents to it
function render(books, term) {
  
  let resultslist = document.getElementById('results-list');
  let resultsheader = document.createElement('h1');
  let headerarea = document.createElement('div');
  let columnsarea = document.createElement('div');

  resultsheader.setAttribute('class', 'results-header');
  resultsheader.innerHTML = 'Results for: ' + term;
  headerarea.appendChild(resultsheader);
  headerarea.setAttribute('border-top', '1px solid black');

  columnsarea.setAttribute('class', 'card-columns');
  resultslist.insertBefore(columnsarea, resultslist.childNodes[0]);
  
  books.forEach(book => {
    let resultcard = makeCard(book);

    columnsarea.appendChild(resultcard);
  });

  resultslist.insertBefore(headerarea, columnsarea);
}

function makeCard(book) {

  // Create all of the elements for the bootstrap card
  let card = document.createElement('div');
  let row = document.createElement('div');
  let cardarea = document.createElement('div');
  let cardbody = document.createElement('div');
  let img = document.createElement('img');
  let header = document.createElement('h2');
  let link = document.createElement('a');
  let text = document.createElement('p');


  // Add attributes and information to elements as necessary
  card.setAttribute('class', 'card');
  row.setAttribute('class', 'row no-gutters');
  cardbody.setAttribute('class', 'card-body');
  cardarea.setAttribute('class', 'col');

  img.setAttribute('src', book.cover);
  img.setAttribute('alt', book.title + 'cover');
  img.setAttribute('class', 'card-img');

  header.appendChild(link);
  link.setAttribute('class', 'card-title book-title');
  link.setAttribute('href', book.link);
  link.setAttribute('target', '_blank');
  link.innerHTML = book.title + ' >';

  text.setAttribute('class', 'card-text book-text');
  text.innerHTML = 'By: ' + book.authors;


  // Nest elements
  card.appendChild(row);
  row.appendChild(img);
  row.appendChild(cardarea);
  cardarea.appendChild(cardbody);
  cardbody.appendChild(header);

  if (book.subtitle != undefined) addSubtitle(cardbody, book.subtitle); // Add an area for the subtitle if there is one

  cardbody.appendChild(text);


  // Return the final card
  return card;
}

function addSubtitle(cardbody, subtitle) {

  let subpara = document.createElement('p');
  subpara.innerHTML = subtitle;

  cardbody.appendChild(subpara);
}