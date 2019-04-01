// Returns a Bootstrap card for the passed in book
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

// Adds a paragraph for the subtitle to the card
function addSubtitle(cardbody, subtitle) {
  let subpara = document.createElement('p');
  subpara.innerHTML = subtitle;
  cardbody.appendChild(subpara);
}