'use strict';

/*global*/

const store = (function() {

  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
  };

  const addBookmark = function(item) {
    this.bookmarks.push(item);
  };

  const deleteBookmark = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  return {
    bookmarks: [],
    addButtonActivated: false,

    findById,
    addBookmark,
    deleteBookmark,
  };

}());