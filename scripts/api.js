'use strict';

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/simon';

  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const updateBookmark = function(id, updateData, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback
    });
  };

  const createBookmark = function(bookmark, callback, error) {
    const newBookmark = JSON.stringify(bookmark);

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback,
      error
    });
  };

  const deleteBookmark = function(id, callback, error) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
      error
    });
  };

  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
    updateBookmark
  };

}());