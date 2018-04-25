function PuzzleCell(config) {
  this.letter = config.letter.toUpperCase();

  this.index = {
    x: config.x,
    y: config.y
  };

  var offset = PuzzleCell.border;
  this.x = this.index.x * PuzzleCell.size - offset * 0.5;
  this.y = this.index.y * PuzzleCell.size - offset * 0.5;

  this.clearX = this.x - PuzzleCell.border * 0.5;
  this.clearY = this.y - PuzzleCell.border * 0.5;
  this.clearSize = PuzzleCell.size + PuzzleCell.border;

  this.centerX = this.x + PuzzleCell.size / 2;
  this.centerY = this.y + PuzzleCell.size / 2;

  
  this.$ = document.createElement('div');
  this.$.style = "position: absolute; top: " + (this.clearY + config.padding) + 
                "px; left: " + (this.clearX + config.padding) +
                "px; width: " + this.clearSize +
                "px; height: " + this.clearSize + "px";
}

PuzzleCell.ctx = null;
PuzzleCell.border = 2;
PuzzleCell.size = 60;

PuzzleCell.prototype.draw = function(borderColor, textColor) {
  PuzzleCell.ctx.strokeStyle = borderColor;
  PuzzleCell.ctx.clearRect( 
    this.clearX, 
    this.clearY, 
    this.clearSize, 
    this.clearSize 
  );
  PuzzleCell.ctx.strokeRect(
    this.x, 
    this.y, 
    PuzzleCell.size,
    PuzzleCell.size
  );
  PuzzleCell.ctx.strokeStyle = textColor;
  PuzzleCell.ctx.fillText(
    this.letter, 
    this.centerX,
    this.centerY,
    PuzzleCell.size
  );
};
PuzzleCell.prototype.update = function(borderColor, textColor){
  PuzzleCell.ctx.save();
  this.draw(borderColor, textColor);
  PuzzleCell.ctx.restore();
};

export default PuzzleCell;