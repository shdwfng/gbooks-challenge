// Renders an error message
function showError(msg) {
	const html = `<li><p class="error">${msg}</p></li>`;
	document.querySelector('#results').innerHTML = html;
}

// Searches for books and returns a promise that resolves a JSON list
function searchForBooks(term) {

	// Local variables
	const baseurl = "https://www.googleapis.com/books/v1/volumes?q=";

  // Fetch the data
  let results = [];

  fetch(baseurl + term)
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
  
  let resultslist = document.getElementById('results');
  let newresultstext = document.createElement('h1');

  newresultstext.innerHTML = 'Results for: ' + term;
  resultslist.appendChild(newresultstext);

	books.forEach(book => {
  	console.log(book);
  	let listitem = document.createElement("li");

  	listitem.innerHTML = book.title + "\n" + book.subtitle + "\n" + book.authors + "\n" + book.link; 
  	resultslist.insertBefore(listitem, resultslist.childNodes[0]);
  	resultslist.insertBefore(newresultstext, resultslist.childNodes[0]);
  });
}
