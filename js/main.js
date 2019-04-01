// Renders an error message
function showError(msg) {
  let errorp = document.createElement('p');
  let errordiv = document.getElementById('error-div');
  errorp.setAttribute('class', 'error');
  errorp.setAttribute('id', 'errormsg');
  errorp.innerHTML = msg;

  if (document.getElementById('errormsg')) errordiv.removeChild(errorp);
  errordiv.appendChild(errorp);
}

// Searches for books and returns a promise that resolves a JSON list
function searchForBooks(term) {

  // Local variables
  const baseurl = 'https://www.googleapis.com/books/v1/volumes?q=';
  const API_KEY = 'AIzaSyDnZY4zk1OKlvTTuLMBMjpUJc-_1Eln1nQ';
  const errormsg = '*There was a problem retrieving some results*';

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

      // Extract the relevant data from the retrieved items and use it to render the results
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
    })
    .catch(showError(errormsg));
}

// Generate HTML and sets #results's contents to it
function render(books, term) {
  
  // Create DOM to display the results
  let resultslist = document.getElementById('results-list');
  let resultsheader = document.createElement('h1');
  let headerarea = document.createElement('div');
  let columnsarea = document.createElement('div');

  // Set attributes
  resultsheader.setAttribute('class', 'results-header');
  resultsheader.innerHTML = 'Results for: ' + term;
  headerarea.appendChild(resultsheader);

  columnsarea.setAttribute('class', 'card-columns');

  // Append/insert elements
  resultslist.insertBefore(columnsarea, resultslist.childNodes[0]);
  
  books.forEach(book => {

    // For each book create a bootstrap card and append it to the results
    let resultcard = makeCard(book);
    columnsarea.appendChild(resultcard);
  });

  resultslist.insertBefore(headerarea, columnsarea);
}