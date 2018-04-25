import PuzzleCell from './PuzzleCell.js';

let Puzzle = {
  $: null,
  canvas: null,
  ctx: null,

  mainBorderColor: '#eee',
  mainTextColor: 'black',
  selectedBorderColor: 'teal',
  selectedTextColor: 'teal',
  hintBorderColor: 'teal',
  hintTextColor: 'teal',

  canvasPadding: 30,

  getCoords: null,

  border: 2,
  size: 60,

  letters: [],
  cells: [],

  currentSelection: [],
  currentCell: null,
  prevCell: null,
  currentWord: '',
  guessedWords: [],

  $words: [],
  count: 0,

  lastWrongWord: '',
  wrongAttemptsCount: 0,
  wrongAttemptsForDisplayMessage: 3,

  lastPathErrorWord: '',
  pathErrorAttemptsCount: 0,
  pathErrorAttemptsForDisplayMessage: 3,

  hintPath: [],
  isHint: false,
  wasHinted: false,

  startMoment: null,
  lastGuessedMoment: null
};

Puzzle.events = {
  'guessed': 'puzzle.events.guessed',
  'success': 'puzzle.events.success',
  'error': 'puzzle.events.error'
};

Puzzle.statuses = {
  'waiting': 1,
  'selecting': 2,
  'selected': 3,
  'finish': 4,
  'pause': 5
};

Puzzle.init = function(config, data) {
    this.addCustomEvents();

    this.configPuzzle(config);
    this.handleData(data);
    this.createPlayground();

    this.staturs = this.statuses.pause;

    config = null;
    data = null;

    this.getCoords = this.getCanvasCoords();
    
    document.addEventListener('mouseup', () => this.mouseUpHandler());
    document.addEventListener('touchend', () => this.mouseUpHandler());
};

Puzzle.addCustomEvents = function() {
  try {
    new CustomEvent("");
  } catch (e) {
    window.CustomEvent = function(event, params) {
      var evt;
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
  
    CustomEvent.prototype = Object.create(window.Event.prototype);
  }
};
Puzzle.initEvent = function(event, data) {
  data = data || {a: 'hello'};
  var event = new CustomEvent(Puzzle.events[event], {
    detail: data
  });
  this.$.dispatchEvent(event)
};

Puzzle.getCanvasCoords = function() {
  var canvas = this.canvas;
  var coords = canvas.getBoundingClientRect();
  
  var getCoords = function() {
    coords = canvas.getBoundingClientRect();
    console.log('update coords');
  }
  document.addEventListener('scroll', getCoords);
  window.addEventListener('resize', getCoords);
  return function() {
    return coords;
  }
};

Puzzle.configPuzzle = function(config) {
  this.$ = config.puzzle;

  this.canvas = config.canvas;
  this.ctx = config.ctx;

  if (!this.ctx) throw new Error('No canva\'s context');

  this.$.style.position = 'relative';
  this.$.style.display = 'inline-block';
  this.$.style.fontSize = 0;

  if (config.borderWidth) this.border = config.borderWidth;
  if (config.cellSize) this.size = config.cellSize;

  PuzzleCell.border = this.border;
  PuzzleCell.size = this.size;

  if (config.mainBorderColor) this.mainBorderColor = config.mainBorderColor;
  if (config.mainTextColor) this.mainTextColor = config.mainTextColor;
  if (config.selectedBorderColor) this.selectedBorderColor = config.selectedBorderColor;
  if (config.selectedTextColor) this.selectedTextColor = config.selectedTextColor;
  if (config.hintBorderColor) this.hintBorderColor = config.hintBorderColor;
  if (config.hintTextColor) this.hintTextColor = config.hintTextColor;
  if (config.canvasPadding) this.canvasPadding = config.canvasPadding;

  this.ctx.font = config.fontSize || '30px Arial';

  this.ctx.lineWidth = PuzzleCell.borderWidth;
  this.ctx.strokeStyle = this.mainBorderColor;
  this.ctx.textAlign = 'center';
  this.font = config.font;

  PuzzleCell.ctx = this.ctx;
};
Puzzle.handleData = function(data) {
  this.puzzleData = data;
  this.puzzleData.realWords = this.puzzleData.words_string.split(',');
};
Puzzle.createPlayground = function() {
  var padding = this.canvasPadding;
  var cells = this.puzzleData.cells;
  var rows = cells.length;
  var cols = cells[0].length; 
  this.canvas.width = cols * this.size + padding * 2;
  this.canvas.height = rows * this.size + padding * 2;
  this.ctx.translate(padding, padding);
  for (var y = 0; y < rows; y++) {
    this.cells[y] = [];
    for (var x = 0; x < cols; x++) {
      var cell = new PuzzleCell({
        letter: cells[y][x],
        x: x,
        y: y,
        padding: this.canvasPadding
      });
      cell.draw(this.mainBorderColor, this.mainTextColor);
      this.handleCell(cell);
      this.cells[y][x] = cell;
    }
  }
  this.playgroundSize = {
    rows: rows, cols: cols
  };
};



Puzzle.handleCell = function(cell) {
  var that = this;
  this.$.appendChild(cell.$);
  cell.$.addEventListener('mousedown', function(e) {
    e.preventDefault();
    that.mouseDownHandler(cell);
  });
  cell.$.addEventListener('touchstart', function(e) {
    e.preventDefault();
    that.mouseDownHandler(cell);
  });
  cell.$.addEventListener('mouseover', function(e) {
    e.preventDefault();
    that.mouseOverHandler(cell);
  });
  cell.$.addEventListener('touchmove', function(e) {
    e.preventDefault();
    that.touchMoveHandler(cell);
  });
};
Puzzle.mouseDownHandler = function(cell) {
  
  if (this.status !== this.statuses.waiting) return;
  if (cell.prop('selected')) return;
  if (cell.prop('empty')) return;

  this.status = this.statuses.selecting;
  this.addCellToSelection(cell);
};
Puzzle.mouseOverHandler = function(cell) {
  
  if (this.status !== this.statuses.selecting) return;
  console.log('mouse over')
  var cell = $(e.currentTarget);
  
  if (cell.prop('empty')) return;
  if (!this.currentCell) return;

  var x = cell.prop('x'),
      y = cell.prop('y');

  if (cell.prop('selected')) {
    if (x === this.prevCell.x && y === this.prevCell.y) this.resetLastCell();
    return;
  };
  
  if (
      x === this.currentCell.x && 
      Math.abs(y - this.currentCell.y) === 1 ||
      y === this.currentCell.y && 
      Math.abs(x - this.currentCell.x) === 1
  ){
      this.addCellToSelection(cell);
  } 
};
Puzzle.touchMoveHandler = function(cell) {
  if (this.status !== this.statuses.selecting) return;
  
    e.preventDefault();
    e.stopPropagation();
  
  
    var touch = e.originalEvent.touches[0];
    var cell = $(document.elementFromPoint(touch.clientX, touch.clientY));
    
    if (cell.prop('empty')) return;
    if (!this.currentCell) return;
  
    var x = cell.prop('x'),
        y = cell.prop('y');
  
    if ((x !== this.currentCell.x || y !== this.currentCell.y) && cell.prop('selected')) {
      if (x === this.prevCell.x && y === this.prevCell.y) this.resetLastCell();
      return;
    };
  
    if (
        x === this.currentCell.x && 
        Math.abs(y - this.currentCell.y) === 1 ||
        y === this.currentCell.y && 
        Math.abs(x - this.currentCell.x) === 1
    ){
        this.addCellToSelection(cell);
    } 
};
Puzzle.mouseUpHandler = function(cell) {
  if (this.status === this.statuses.selecting) {
    this.status = this.statuses.selected;
    this.checkSelection();
  }
};


Puzzle.resetLastCell = function() {
  this.removeCellFromSelection(this.currentCell.$);
  this.currentCell = this.prevCell;
  this.currentWord = this.currentWord.slice(0, this.currentWord.length - 1);
  this.currentSelection.length = this.currentSelection.length - 1;


  if (this.currentSelection.length < 2) this.prevCell = null;
  else {
    var prevCoords = this.currentSelection[this.currentSelection.length - 2];
    this.prevCell = {
      x: prevCoords[0],
      y: prevCoords[1],
      $: this.cells[prevCoords[1]][prevCoords[0]]
    };
  } 
  
};


Puzzle.addCellToSelection = function(cell) {
  var x = cell.prop('x'), 
      y = cell.prop('y');
  this.currentSelection.push([x,y]);
  this.currentWord += cell.prop('letter');

  this.setBorders(this.currentCell, {x: x, y: y, $: cell}, 'data-empty');

  cell.prop('selected', true).addClass('selected');
  this.prevCell = this.currentCell;
  this.currentCell = {
      x: x,
      y: y,
      $: cell
  };
};

Puzzle.removeCellFromSelection = function(cell) {
  cell
   .prop('selected', false)
   .removeClass('selected');
 };
 
 Puzzle.emptyCell = function(cell) {
  cell
   .prop('selected', false)
   .prop('empty', true)
   .removeClass('selected')
   .text('');
 };
 
 Puzzle.checkSelection = function(cell) {
   var selection = this.currentSelection.join(';');
   var word = this.currentWord;
   var realWord = word;
 
   var wordIndex = this.words.indexOf(selection);
 
   if (wordIndex == -1) {
       selection = this.currentSelection.reverse().join(';');
       wordIndex = this.words.indexOf(selection);
       if (wordIndex > -1) word = this.currentWord.split('').reverse().join('');
   }
 
   if (wordIndex > -1) this.guessHandler(word, wordIndex);
   else {
     if (!this.isPathError(word)) {
       
       this.checkWrongWordCount(word);
     }
     this.clearSelection();
   }
 };
 
 Puzzle.isPathError = function(word) {
   var ind = this.puzzleData.realWords.indexOf(word);
 
   if (ind === -1) {
     word = word.split('').reverse().join('');
     ind = this.puzzleData.realWords.indexOf(word);
   }
 
   if (ind === -1) { 
     this.pathErrorAttemptsCount = 0;
     return false; 
   }
   this.checkPathErrorCount(word);
   return true;
 };
 
 Puzzle.checkPathErrorCount = function(word) {
   if (word !== this.lastPathErrorWord) {
     this.lastPathErrorWord = word;
     this.pathErrorAttemptsCount = 0;
   }
   this.pathErrorAttemptsCount++;
   if (this.pathErrorAttemptsCount >= this.pathErrorAttemptsForDisplayMessage) {
     this.sendEvent('error', {errorType: 'path'}); 
     this.displayPathErrorMessage(word);
   }
 }
 
 Puzzle.checkWrongWordCount = function(word) {
   if (word !== this.lastWrongWord) {
     this.lastWrongWord = word;
     this.wrongAttemptsCount = 0;
   }
   this.wrongAttemptsCount++;
   if (this.wrongAttemptsCount >= this.wrongAttemptsForDisplayMessage) {
     this.sendEvent('error', {errorType: 'word'});
     this.displayWrongMessage(word);
   }
 };
 
 Puzzle.emptySelection = function() {
   for (var i = 0, len = this.currentSelection.length; i < len; i++) {
     var coords = this.currentSelection[i];
     var cell = this.cells[coords[1]][coords[0]];
     this.emptyCell(cell);
   }
   this.currentSelection.length = 0;
   this.currentCell = null;
   this.currentWord = '';
   this.status = this.statuses.waiting;
 };
 
 Puzzle.clearSelection = function() {
   for (var i = 0, len = this.currentSelection.length; i < len; i++) {
     var coords = this.currentSelection[i];
     var cell = this.cells[coords[1]][coords[0]];
     this.removeCellFromSelection(cell);
   }
   this.currentSelection.length = 0;
   this.currentCell = null;
   this.prevCell = null;
   this.currentWord = '';
   this.status = Puzzle.statuses.waiting;
 };
 
 Puzzle.displayWrongMessage = function(word) {
   this.wrongAttemptsCount = 0;
   alert('������: ' + word);
 };
 
 Puzzle.displayPathErrorMessage = function(word) {
   this.pathErrorAttemptsCount = 0;
   alert('������ (����): ' + word);
 };
 
 Puzzle.guessHandler = function(word, wordIndex) {
   this.lastWrongWord = '';
   this.wrongAttemptsCount = 0;
   this.lastPathErrorWord = '';
   this.wrongAttemptsCount = 0;
 
   this.count++;
 
   var now = Date.now();
   var wordTime = now - this.lastGuessedMoment;
   this.lastGuessedMoment = now;
 
   this.sendEvent('guessed', {
     guessedWord: word,
     guessedCount: this.count,
     currentTime: wordTime / 1000
   });
 
   this.showWord(word);
   this.emptySelection();
   if (this.isHint && wordIndex == this.puzzleData.hint) {
       this.clearHint();
   }
   this.guessedWords[wordIndex] = true;
   if (this.guessedWords.indexOf(false) == -1) this.success();
 };
 
 Puzzle.showWord = function(word) {
   word = word.split('');
   word[0] = word[0].toUpperCase();
   word = word.join('');
   this.$words[this.count-1].text(word);
 };
 
 Puzzle.success = function() {
   this.sendEvent('success', {
     totalTime: (Date.now() - this.startMoment) / 1000
   });
   this.hintTrigger.detach();
   this.status = 0;
   this.onSuccess ? this.onSuccess() : null;
 };
 
 
 
 Puzzle.getHint = function() {
   if (this.wasHinted) return;
   if (this.status !== this.statuses.waiting) return;
   if (this.guessedWords[this.puzzleData.hint]) {
       this.puzzleData.hint = this.guessedWords.indexOf(false);
   }
   if (this.puzzleData.hint == -1) return;
   this.hintPath = this.words[this.puzzleData.hint].split(';');
   this.isHint = true;
   this.wasHinted = true;
   this.status = Puzzle.statuses.pause;
 
   var prev;
 
   for (var i = 0, len = this.hintPath.length; i < len; i++) {
       var coords = this.hintPath[i].split(',');
       var cell = this.cells[coords[1]][coords[0]];
 
       this.setBorders(prev, {x: coords[0], y: coords[1], $: cell}, 'data-hint-empty');
       cell.addClass('hinted');
 
       prev = {x: coords[0], y: coords[1], $: cell};
   }
   this.sendEvent('hint', {
     hintTime: (Date.now() - this.startMoment) / 1000
   });
   this.status = this.statuses.waiting;
   this.removeHint();
 };
 
 Puzzle.clearHint = function() {
   this.isHint = false;
 
   for (var i = 0, len = this.hintPath.length; i < len; i++) {
       var coords = this.hintPath[i].split(',');
       var cell = this.cells[coords[1]][coords[0]];
       cell.removeClass('hinted');
   }
 };
 
 Puzzle.removeHint = function() {
   this.hintTrigger.detach();
 };
 

Puzzle.start = function() {
  this.status = this.statuses.waiting;
  this.startMoment = Date.now();
  this.lastGuessedMoment = this.startMoment;
};




export default Puzzle;