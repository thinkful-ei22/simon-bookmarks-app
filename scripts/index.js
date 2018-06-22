'use strict';

const generateItemElement = function(bookmark) {
  return `
    <li class="js-bookmark-element" data-item-id="${bookmark.id}">
      <span class="title-name">${bookmark.name}</span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <p>
        <span>${bookmark.url}</span>
        <button type="button" class="remove-button js-remove-button">remove</button>
        <div>
          <span>${bookmark.desc}</span>
        </div>
      </p>
    </li>
  `;
};

const generateBookmarkListString = function(bookmarkList) {
  const list = store.bookmarks.map((item) => generateItemElement(item));
  return list.join(''); 
};

const render = function() {
  let bookmarks = store.bookmarks;
  const bookmarkListString = generateBookmarkListString(bookmarks);
  $('.js-bookmark-list').html(bookmarkListString);
};

const formIsValid = function(obj) {
  let isValid = true;
  Object.keys(obj).forEach(key => {
    if (!obj[key]) {
      isValid = false;
    }
  });
  return isValid;
};

const handleNewBookmarkSubmit = function(event) {
  event.preventDefault();
  const {title, url, description, rating} = event.target.elements;
  const bookmark = {
    title: title.value,
    url: url.value,
    desc: description.value,
    rating: parseInt(rating.value)
  };
  if (formIsValid(bookmark)) {
    api.createBookmark(bookmark, function(res) {
      console.log(res);
      store.addBookmark(bookmark);
      render();
      $('#js-add-bookmark-form').trigger('reset');
    });
  } else {
    console.log('Not Valid');
  }
};

const getBookmarkIdFromElement = function(bookmark) {
  return $(bookmark).closest('.js-bookmark-element').data('item-id');
};

const handleDeleteButtonClick = function(event) {
  const bookmarkId = getBookmarkIdFromElement(event.currentTarget);
  api.deleteBookmark(bookmarkId, function(response) {
    store.deleteBookmark(bookmarkId);
    render();
  });
};

$(document).ready(function(){
  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    render();
  });
  $('#js-add-bookmark-form').on('submit', handleNewBookmarkSubmit);
  $('.js-bookmark-list').on('click', '.js-remove-button', handleDeleteButtonClick);
});
