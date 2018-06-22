'use strict';

/*global store, api*/

// eslint-disable-next-line no-unused-vars
const bookmarkTools = (function() {
  const generateItemElement = function(bookmark) {
    if (bookmark.rating === 1) {
      return `
        <li class="js-bookmark-element" data-item-id="${bookmark.id}">
          <span class="title-name">${bookmark.title}</span>
          <span class="fa fa-star" style="color:gainsboro;"></span>
          <span class="fa fa-star" style="color:gainsboro;"></span>
          <span class="fa fa-star" style="color:gainsboro;"></span>
          <span class="fa fa-star" style="color:gainsboro;"></span>
          <span class="fa fa-star checked"></span>
          <p class="click-expand"></p>
        </li>`;
    } else if (bookmark.rating === 2) {
      return `
        <li class="js-bookmark-element" data-item-id="${bookmark.id}">
          <span class="title-name">${bookmark.title}</span>
          <span class="fa fa-star" style="color:gainsboro;"></span>
          <span class="fa fa-star" style="color:gainsboro;"></span>
          <span class="fa fa-star" style="color:gainsboro;"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <p class="click-expand"></p>
        </li>`;
    } else if (bookmark.rating === 3) {
      return `
        <li class="js-bookmark-element" data-item-id="${bookmark.id}">
          <span class="title-name">${bookmark.title}</span>
          <span class="fa fa-star" style="color:gainsboro;"></span>
          <span class="fa fa-star" style="color:gainsboro;"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <p class="click-expand"></p>
        </li>`;
    } else if (bookmark.rating === 4) {
      return `
        <li class="js-bookmark-element" data-item-id="${bookmark.id}">
          <span class="title-name">${bookmark.title}</span>
          <span class="fa fa-star" style="color:gainsboro;"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <p class="click-expand"></p>
        </li>`;
    } else if (bookmark.rating === 5) {
      return `
        <li class="js-bookmark-element" data-item-id="${bookmark.id}">
          <span class="title-name">${bookmark.title}</span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <p class="click-expand"></p>
        </li>`;
    }
  };

  const generateBookmarkListString = function(input) {
    const list = input.map((item) => generateItemElement(item));
    return list.join(''); 
  };

  const render = function(insert) {
    let bookmarks = insert;
    const bookmarkListString = generateBookmarkListString(bookmarks);
    $('.js-bookmark-list').html(bookmarkListString);
  };

  // const generateClickElement = function(event) {
  //   $('.js-container').on('click', '.js-bookmark-element', () => {
  //     const bookmarkId = getBookmarkIdFromElement(event.currentTarget);
  //     const targetBookmark = store.findBookmark(bookmarkId);
  //     $(this).find('.click-expand').html(`
  //       <a href="${targetBookmark.url}" target="_blank">${targetBookmark.url}></a>
  //       <button type="button" class="remove-button js-remove-button">remove</button>
  //       <div>
  //         <span>${targetBookmark.desc}</span>
  //       </div>`).toggle();
  //   });
  // };

  const formIsValid = function(obj) {
    let isValid = true;
    if (!obj.title || !obj.url) {
      isValid = false;
    }
    return isValid;
  };

  // const handleNewBookmarkSubmit = function(event) {
  //   $('#js-add-bookmark-form').on('submit', () => {
  //     event.preventDefault();
  //     const {title, url, description, rating} = event.target.elements;
  //     const bookmarkPush = {
  //       title: title.value,
  //       url: url.value,
  //       desc: description.value,
  //       rating: parseInt(rating.value),
  //     };
  //     if (formIsValid(bookmarkPush)) {
  //       api.createBookmark(bookmarkPush, function(res) {
  //         store.addBookmark(res);
  //         render(store.bookmarks);
  //         $('#js-add-bookmark-form').trigger('reset');
  //       });
  //     } else {
  //       alert('Title and URL required');
  //     }
  //   });
  // };


  const handleFilterByStars = function() {
    $('.js-filter-star-button').on('change', () => {
      const value = parseInt($('.filter-star-button option:selected').text().split(' ').splice(0, 1).join(''));
      let arr = [];
      store.bookmarks.forEach(bookmark => arr.push(bookmark));
      arr = arr.filter(item => item.rating >= value);
      render(arr);
    });
  };


  const getBookmarkIdFromElement = function(bookmark) {
    return $(bookmark).closest('.js-bookmark-element').data('item-id');
  };

  // const handleDeleteButtonClick = function(event) {
  //   $('.js-bookmark-list').on('click,', 'js-remove-button', () => {
  //     const bookmarkId = bookmarkTools.getBookmarkIdFromElement(event.currentTarget);
  //     api.deleteBookmark(bookmarkId, function() {
  //       store.deleteBookmark(bookmarkId);
  //       bookmarkTools.render(store.bookmarks);
  //     });
  //   });
  // };

  return {
    render,
    formIsValid,
    getBookmarkIdFromElement,
    handleFilterByStars
  };
  
}());

const handleNewBookmarkSubmit = function(event) {
  event.preventDefault();
  const {title, url, description, rating} = event.target.elements;
  const bookmarkPush = {
    title: title.value,
    url: url.value,
    desc: description.value,
    rating: parseInt(rating.value),
  };
  if (bookmarkTools.formIsValid(bookmarkPush)) {
    api.createBookmark(bookmarkPush, function(res) {
      store.addBookmark(res);
      bookmarkTools.render(store.bookmarks);
      $('#js-add-bookmark-form').trigger('reset');
    });
  } else {
    alert('Title and URL required');
  }
};

const generateClickElement = function(event) {
  const bookmarkId = bookmarkTools.getBookmarkIdFromElement(event.currentTarget);
  const targetBookmark = store.findBookmark(bookmarkId);
  $(this).find('.click-expand').html(`
    <a href="${targetBookmark.url}" target="_blank">${targetBookmark.url}></a>
    <button type="button" class="remove-button js-remove-button">remove</button>
    <div>
      <span>${targetBookmark.desc}</span>
    </div>`).toggle();
};

const handleDeleteButtonClick = function(event) {
  const bookmarkId = bookmarkTools.getBookmarkIdFromElement(event.currentTarget);
  api.deleteBookmark(bookmarkId, function() {
    store.deleteBookmark(bookmarkId);
    bookmarkTools.render(store.bookmarks);
  });
};

