class Enemy {
    constructor(){
      this.frames = 0
      this.counter = 25
      this.deletion = false
    }
    draw(ctx) {
      ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)
      ctx.drawImage(this.image, this.cropWidth * this.frames, 0, this.cropWidth, this.cropHeight, this.position.x, this.position.y, this.width, this.height)
    }
    update(){
      if (this.counter > 0){
        this.counter -= 1
      } else {
        if (this.frames < this.maxFrames) {
          this.frames++
        } else {
          this.frames = 0
        }
        this.counter = 25
      }
    }
  }


export class RunningEnemy extends Enemy {
constructor(game, {image, cropWidth, cropHeight, width, height, speedX, maxFrames, scoreBonus}){
    super();
    this.game = game;
    this.cropWidth = cropWidth;
    this.cropHeight = cropHeight;
    this.width = width
    this.height = height
    this.position = {
        x: this.game.width,
        y: this.game.height - this.height - this.game.player.ground
    } 
    this.image = image
    this.velocity = {
        x: speedX,
        y: 0
    }
    this.maxFrames = maxFrames;
    this.scoreBonus = scoreBonus
    }
    movement(){
        this.position.x -= this.velocity.x
        if (this.x + this.width < -this.game.width) this.deletion = true;
    }
}

export class Particles extends Enemy {
  constructor(game, {image, speedY}){
    super();
    this.game = game;
    this.cropWidth = 16;
    this.cropHeight = 16;
    this.width = 80;
    this.height = 80;
    this.position = {
        x: Math.floor(Math.random() * this.game.width),
        y: 0
    } 
    this.image = image
    this.velocity = {
        x: 0,
        y: speedY
    }
    this.maxFrames = 5;
    }
    movement(){
      this.position.y += this.velocity.y
      if (this.position.y === this.game.height - this.game.ground - this.height){
        this.deletion = true
      }
    }
      
}