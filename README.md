# ElementHandler
light library for creating HTML Nodes - generating new html nodes dynamically


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Download the file EventHandler.js and link them in your project like:
```html
<script src="ElementHandler.js"></script>
```
or without downloading files like
```html
<script src="https://rawgit.com/SebCon/ElementHandler/master/ElementHandler.js"></script>
```

## some Examples
For the following examples, you need this wrapper div element:
```html
<div id="wrapper"></div>
```

### generate default element (with text)
Generating a default (div) element:
```javascript
var elem = document.getElementById('wrapper');

var newElem = ElementHandler.createElement({ text : 'moin' });
elem.appendChild(newElem);
```

### generate several elements
Generating several elements dynamically:
```javascript
var elem = document.getElementById('wrapper');

for (var i = 0; i < 10; i++) {
  ElementHandler.addToWrapper(ElementHandler.createElement({ value : 'value ' + i, attrs : { keyboard : 'numeric', mouse : 'nada'}, type : 'input', classes : ['box', 'box2'], styles : { backgroundColor : '#000', marginBottom : '20px'}}));
}

ElementHandler.addChildsToWrapperElement(elem);
```

### generate list element with entries
```javascript
var elem = document.getElementById('wrapper');
var list = ElementHandler.createList();
list.addEntry({ text : 'hallo' });
ElementHandler.addChildsToWrapperElement(elem, list.getElement());
```

### generate table element with rows and cells
```javascript
var elem = document.getElementById('wrapper');
var table = ElementHandler.createTable();
table.addRow();
table.addCell({ text : 'row 1' });
table.addCell({ text : 'row 1' });
   
table.addRow();
table.addCell({ text : 'row 2' });
table.addCell({ text : 'row 2' });
ElementHandler.addChildsToWrapperElement(elem, table.getElement());
```
      

## Authors

* **Sebastian Conrad** - [sebcon](http://www.sebcon.de)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

