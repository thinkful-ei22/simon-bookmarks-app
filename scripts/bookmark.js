'use strict';

/*global cuid*/

const Bookmark = (function() {

  const create = function(title, url, description, stars) {
    return {
      id: cuid(),
      expand: false,
      title, url, description, stars
    };
  };

  return {
    create,
  };

}());