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


export class Goblin extends Enemy {
constructor(game){
    super();
    this.game = game;
    this.cropWidth = 40;
    this.cropHeight = 40;
    this.width = 180
    this.height = 180
    this.position = {
        x: this.game.width,
        y: this.game.height - this.height - this.game.player.ground
    } 
    this.image = document.getElementById('goblin');
    this.velocity = {
        x: 3,
        y: 0
    }
    this.maxFrames = 4;
    }
    movement(){
        this.position.x -= this.velocity.x
    }
}