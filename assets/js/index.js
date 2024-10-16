'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}
//              what,  where,   action
function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}