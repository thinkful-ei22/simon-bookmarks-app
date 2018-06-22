'use strict';

/*global api bookmarkTools store handleNewBookmarkSubmit generateClickElement handleDeleteButtonClick*/

$(document).ready(function(){
  bookmarkTools.handleFilterByStars();
  $('#js-add-bookmark-form').on('submit', handleNewBookmarkSubmit);
  $('.js-container').on('click', '.js-bookmark-element', generateClickElement);
  $('.js-bookmark-list').on('click', '.js-remove-button', handleDeleteButtonClick);

  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkTools.render(store.bookmarks);
  });
});