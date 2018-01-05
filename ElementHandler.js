'use strict';


/**
*		@namespace ElementHandler
*/

/**
 *    @copyright 2017
 *    @author Sebastian Conrad <http://www.sebcon.de/>
 *    @version 1.0 - 04. jan 2018
 *    @see http://www.github.com/sebcon
 *    @license Available under MIT license <https://mths.be/mit>
 *    @fileoverview light library for creating HTML Nodes
 */


/**
*		@class ElementHandler
*
*		@constructor
*		@param {document}	document document object
*		@param {window} window window object
**/

var ElementHandler = (function(document, window) {

  var wrapper = document.createDocumentFragment();


  /** creates random id via user/standard config
  *
  *   @generator
  *		@function createRandomId
  *		@param {Object} config config object
  *   @param {number} [config.len = 5] length of random id
  *   @param {string} [config.chars = aA#] random id mask
  *
  *   @return {string} random id as string
  **/
  var createRandomId = function(config) {
    var result = '';

    if (config) {
      var length = config.len || 5;
      var chars = config.chars || 'aA#';
      var mask = '';

      if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
      if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (chars.indexOf('#') > -1) mask += '0123456789';
      if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
      for (var i = length; i > 0; --i) {
        result += mask[Math.floor(Math.random() * mask.length)];
      }
    }

    return result;
  };


  var addConfigToElement = function(element, config) {
    if (!config) {
      config = {};
    }

    if (element && typeof(element) === 'object' && config && typeof(config) === 'object') {
      element.id = config.id || createRandomId({ len : 6, chars : 'Aa#' });

      if (config.value) {
        if (element.value !== undefined) {
          element.value = config.value;
        } else if (element.innerHTML !== undefined) {
          element.innerHTML = config.value.replace(/\s/g, "&nbsp;");
        } else {
          console.log('cannot add value to element');
        }
      }

      if (config.placeholder) {
        element.placeholder = config.placeholder;
      }

      if (config.attrs) {
        for (var key in config.attrs) {
          element.setAttribute(key, config.attrs[key]);
        }
      }

      if (config.styles) {
        for (var key in config.styles) {
          if (element.style && element.style[key] !== undefined) {
            element.style[key] = config.styles[key];
          }
        }
      }

      if (config.classes) {
        if (Array.isArray(config.classes)) {
          if (element.classList) {
            for (var i = 0; i < config.classes.length; i++) {
                element.classList.add(config.classes[i]);
            }
          }
        } else {
          element.className = config.classes;
        }
      }

      if (config.disabled !== undefined && typeof(config.disabled) === 'boolean') {
        element.disabled = config.disabled;
      }

      if (config.text) {
        var btext = document.createTextNode(config.text);
        element.appendChild(btext);
      }

    }
  };


  /** Type definition for config object
  *
  * @typedef {Object} config
  * @property {string} [config.id = 'Aa#'] id of element, default is random string of lower/upper/special characters
  * @property {string} [config.type = 'div'] element type
  * @property {string} [config.value] displayed value for element
  * @property {string} [config.placeholder] placeholder of element
  * @property {Object} [config.attrs] attributes of element
  * @property {Object} [config.styles] styles of element
  * @property {string[]} [config.classes] css classes of element
  * @property {boolean} [config.disabled] is element disabled
  * @property {string} [config.text] displayed value for element
  **/


  /** creates node element, default is div element
  *
  *		@function createElement
  *		@param {config} config config object
  *
  *   @return {HTMLElement} created element
  **/
  var createElement = function(config) {
    if (!config) {
      config = {};
    }

    var type = config.type || 'div';
    var element = document.createElement(type);
    addConfigToElement(element, config);

    return element;
  };


  /** Type definition for createList Object
  *
  * @typedef {Object} createListObject
  * @property {Object} addEntry
  * @property {Object} getElement
  **/

  /** creates unsorted list and provides some list functions
  *
  *		@function createList
  *		@param {config} config config object
  *
  *   @return {createListObject} list
  **/
  var createList = function(config) {
    if (!config) {
      config = {};
    }
    config.type = 'ul';

    var element = createElement(config);

    /**
    * @function addEntry
    * @param config
    **/
    var addEntry = function(config) {
      var entry = document.createElement('li');
      addConfigToElement(entry, config);
      element.appendChild(entry);
    };

    var getElement = function() {
      return element;
    };

    return {
      addEntry : addEntry,
      getElement : getElement
    };
  };


  /** Type definition for createTable Object
  *
  * @typedef {Object} createTableObject
  * @property {Object} addRow
  * @property {Object} addCell
  * @property {Object} addCellElement
  * @property {Object} getElement
  **/

  /** creates unsorted list and provides some list functions
  *
  *		@function createTable
  *		@param {config} config config object
  *
  *   @return {createTableObject} list
  **/
  var createTable = function(config) {
    if (!config) {
      config = {};
    }

    config.type = 'table';
    var elem = createElement(config);
    var td, tr;
    var rowCount = 0;
    var cellCount = 0;

    var addRow = function(config) {
      if (elem) {
        cellCount = 0;
        tr = elem.insertRow(rowCount++);
        addConfigToElement(tr, config);
      } else {
        console.warn('cannot add row!');
      }
    };

    var addCell = function(config) {
      if (tr) {
        td = tr.insertCell(cellCount++);
        addConfigToElement(td, config);
      } else {
        console.warn('cannot add cell!');
      }
    };

    var addCellElement = function(element) {
      if (element) {
        td.appendChild(element);
      }
    };

    var getElement = function() {
      return elem;
    };

    return {
      addRow : addRow,
      addCell : addCell,
      addCellData : addCellData,
      addCellElement : addCellElement,
      getElement : getElement
    };
  };


  /** adds node element to an internal wrapper fragment
  *
  *		@function addToWrapper
  *		@param {HTMLElement} node node element
  **/
  var addToWrapper = function(node) {
    if (wrapper !== undefined && node instanceof HTMLElement) {
      wrapper.appendChild(node);
    }
  };


  /** clears internal wrapper fragment
  *
  *		@function clearWrapper
  **/
  var clearWrapper = function() {
    wrapper = null;
    wrapper = document.createDocumentFragment();
  };


  /** gets childs of internal wrapper fragment
  *
  *		@function getWrapperChilds
  *		@return {HTMLElement} node fragment
  **/
  var getWrapperChilds = function() {
    return wrapper;
  };


  /** adds internal wrapper fragment to wrapper element via requestAnimationFrame
  *
  *		@function addChildsToWrapperElement
  *		@param {HTMLElement} element wrapper element
  *		@param {HTMLElement} [child = internal fragment] child element
  **/
  var addChildsToWrapperElement = function(element, child) {
    if (element) {
      window.requestAnimationFrame(function() {
        if (!child) {
          element.appendChild(wrapper);
        } else {
          element.appendChild(child);
        }
      });
    }
  };


  return {
    createElement : createElement,
    createTable : createTable,
    createList : createList,
    addToWrapper : addToWrapper,
    clearWrapper : clearWrapper,
    getWrapperChilds : getWrapperChilds,
    addChildsToWrapperElement : addChildsToWrapperElement
  };

})(document, window);
