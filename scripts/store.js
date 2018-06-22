'use strict';

/*global*/

const store = (function() {

  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
  };

  const findAndUpdate = function(id, newData) {
    const bookmark = this.bookmarks.find(function(bookmark) {
      return bookmark.id === id;
    });
    Object.assign(newData, bookmark);
  };

  const addBookmark = function(item) {
    this.bookmarks.push(item);
  };

  const deleteBookmark = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  const findBookmark = function(id) {
    const bookmark = this.bookmarks.find(function(bookmark) {
      return bookmark.id === id;
    });
    return bookmark;
  };

  return {
    bookmarks: [],
    addButtonActivated: false,

    findById,
    addBookmark,
    deleteBookmark,
    findBookmark,
    findAndUpdate
  };

}());