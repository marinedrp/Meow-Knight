export class Npc {
    constructor(game, {x, y, cropWidth, cropHeight, image, width, height, maxFrames}){
      this.game = game
      this.position = {
        x: x,
        y: y
      }
      this.cropWidth = cropWidth
      this.cropHeight = cropHeight
      this.image = image
      this.width = width
      this.height = height
      this.frames = 0
      this.counter = 25
      this.maxFrames = maxFrames
    }
    draw(ctx) {
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