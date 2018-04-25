import Puzzle from './Puzzle.js';
import PuzzleAnalytics from './PuzzleAnalytics.js';

let PuzzleController = {
  couponBlock: null,
  coupontText: null,
  wordsField: null,
  hint: null,

  $puzzle: null,
  puzzle: Puzzle,

  analytics: PuzzleAnalytics
};
PuzzleController.init = function(config, data, controls) {
  var that = this;

  this.$puzzle = config.puzzle;
  this.$puzzle.addEventListener(Puzzle.events.guessed, function(e) {
    that.guessedHandler(e.detail);
  });
  this.$puzzle.addEventListener(Puzzle.events.success, function(e) {
    thatsuccessHandler(e.detail);
  });

  this.puzzle.init(config, data);

  this.puzzle.start();
};
PuzzleController.guessedHandler = function(data) {
  console.log('gueesed handler', data)
};
PuzzleController.successHandler = function(data) {
  
};

export default PuzzleController;