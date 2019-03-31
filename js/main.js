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

  fetch(baseurl + term + '&key=' + API_KEY, { 
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
                       link:book.volumeInfo.previewLink,
                       cover:book.volumeInfo.imageLinks.thumbnail
                      };

        results.push(result);
      })

      render(results, term);
    });
}

// Generate HTML and sets #results's contents to it
function render(books, term) {
  
  let resultslist = document.getElementById('results-area');
  let resultsheader = document.createElement('h1');

  resultsheader.innerHTML = 'Results for: ' + term;
  resultslist.appendChild(resultsheader);

  books.forEach(book => {
    console.log(book);

    // Each result gets a container area to hold the cover image and relevant information
    let resultarea = document.createElement('div');
    let resultpic = document.createElement('img');
    let resultinfo = document.createElement('p');

    // Add attributes to each element
    resultinfo.innerHTML = book.title + '\n' + book.subtitle + '\n' + book.authors

    resultpic.setAttribute('src', book.cover);

    // Append elements to the DOM
    resultarea.appendChild(resultpic);
    resultarea.appendChild(resultinfo);

    resultslist.appendChild(resultarea);
    resultslist.insertBefore(resultsheader, resultslist.childNodes[0]);
  });
}
