// 'use strict';

// /*global store, api*/

// const generateItemElement = function(bookmark) {
//   if (bookmark.rating === 1) {
//     return `
//       <li class="js-bookmark-element" data-item-id="${bookmark.id}">
//         <span class="title-name">${bookmark.title}</span>
//         <span class="fa fa-star"></span>
//         <span class="fa fa-star"></span>
//         <span class="fa fa-star"></span>
//         <span class="fa fa-star"></span>
//         <span class="fa fa-star checked"></span>
//         <p class="click-expand"></p>
//       </li>`;
//   } else if (bookmark.rating === 2) {
//     return `
//       <li class="js-bookmark-element" data-item-id="${bookmark.id}">
//         <span class="title-name">${bookmark.title}</span>
//         <span class="fa fa-star"></span>
//         <span class="fa fa-star"></span>
//         <span class="fa fa-star"></span>
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star checked"></span>
//         <p class="click-expand"></p>
//       </li>`;
//   } else if (bookmark.rating === 3) {
//     return `
//       <li class="js-bookmark-element" data-item-id="${bookmark.id}">
//         <span class="title-name">${bookmark.title}</span>
//         <span class="fa fa-star"></span>
//         <span class="fa fa-star"></span>
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star checked"></span>
//         <p class="click-expand"></p>
//       </li>`;
//   } else if (bookmark.rating === 4) {
//     return `
//       <li class="js-bookmark-element" data-item-id="${bookmark.id}">
//         <span class="title-name">${bookmark.title}</span>
//         <span class="fa fa-star"></span>
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star checked"></span>
//         <p class="click-expand"></p>
//       </li>`;
//   } else if (bookmark.rating === 5) {
//     return `
//       <li class="js-bookmark-element" data-item-id="${bookmark.id}">
//         <span class="title-name">${bookmark.title}</span>
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star checked"></span>
//         <p class="click-expand"></p>
//       </li>`;
//   }
// };

// const generateBookmarkListString = function(input) {
//   const list = input.map((item) => generateItemElement(item));
//   return list.join(''); 
// };

// const render = function(insert) {
//   let bookmarks = insert;
//   const bookmarkListString = generateBookmarkListString(bookmarks);
//   $('.js-bookmark-list').html(bookmarkListString);
// };

// const generateClickElement = function(event) {
//   const bookmarkId = getBookmarkIdFromElement(event.currentTarget);
//   const targetBookmark = store.findBookmark(bookmarkId);
//   const varOne = targetBookmark.url;
//   const varTwo = targetBookmark.desc;
//   console.log(store.findBookmark(bookmarkId).url);
//   console.log(targetBookmark);
//   console.log(varOne);
//   console.log(varTwo);
//   $(this).find('.click-expand').html(`
//     <a href="${targetBookmark.url}" target="_blank">${targetBookmark.url}></a>
//     <button type="button" class="remove-button js-remove-button">remove</button>
//     <div>
//       <span>${targetBookmark.desc}</span>
//     </div>`).toggle();
// };

// const formIsValid = function(obj) {
//   let isValid = true;
//   if (!obj.title || !obj.url) {
//     isValid = false;
//   }
//   return isValid;
// };

// const handleNewBookmarkSubmit = function(event) {
//   event.preventDefault();
//   const {title, url, description, rating} = event.target.elements;
//   const bookmarkPush = {
//     title: title.value,
//     url: url.value,
//     desc: description.value,
//     rating: parseInt(rating.value),
//   };
//   if (formIsValid(bookmarkPush)) {
//     api.createBookmark(bookmarkPush, function(res) {
//       console.log(res);
//       store.addBookmark(bookmarkPush);
//       render(store.bookmarks);
//       $('#js-add-bookmark-form').trigger('reset');
//     });
//   } else {
//     alert('Title and URL required');
//   }
// };


// const handleFilterByStars = function() {
//   const value = parseInt($('.filter-star-button option:selected').text().split(' ').splice(0, 1).join(''));
//   let arr = [];
//   store.bookmarks.forEach(bookmark => arr.push(bookmark));
//   arr = arr.filter(item => item.rating >= value);
//   render(arr);
// };


// const getBookmarkIdFromElement = function(bookmark) {
//   return $(bookmark).closest('.js-bookmark-element').data('item-id');
// };

// const handleDeleteButtonClick = function(event) {
//   const bookmarkId = getBookmarkIdFromElement(event.currentTarget);
//   api.deleteBookmark(bookmarkId, function() {
//     store.deleteBookmark(bookmarkId);
//     render(store.bookmarks);
//   });
// };

// $(document).ready(function(){
//   api.getBookmarks((bookmarks) => {
//     bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
//     render(store.bookmarks);
//   });
//   $('.js-container').on('click', '.js-bookmark-element', generateClickElement);
//   $('#js-add-bookmark-form').on('submit', handleNewBookmarkSubmit);
//   $('.js-bookmark-list').on('click', '.js-remove-button', handleDeleteButtonClick);
//   $('.js-filter-star-button').on('change', handleFilterByStars);
// });