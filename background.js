class Layer {
  constructor(game, width, height, speedModifier, image){
      this.game = game;  
      this.width = width;
      this.height = height;
      this.speedModifier = speedModifier;
      this.image = image;
      this.x = 0;
      this.y = 0;
  }
  update(){
      // scrolls the background to the right
      if (this.x < -this.width) {
        this.x = 0
      // scrolls the background to the left - bug fixed
      } else if (this.x > this.width){
        this.x = 0
      }
      // scrolls the background with the movement of the player
      else {
        this.x -= this.game.player.velocity.x * this.speedModifier 
      }
  }
  draw(ctx){
      ctx.drawImage(this.image, this.x - this.width, this.y, this.width, this.height);  
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);

  }
}

export class Background {
  constructor(game, layer1image, layer2image, layer3image, layer4image, layer5image, layer6image, layer7image, layer8image){
      this.game = game
      this.width = 1920;
      this.height = 1080;
      this.layer1image = layer1image
      this.layer2image = layer2image
      this.layer3image = layer3image
      this.layer4image = layer4image
      this.layer5image = layer5image
      this.layer6image = layer6image
      this.layer7image = layer7image
      this.layer8image = layer8image
      this.layer1 = new Layer(this.game, this.width, this.height, 0.125, this.layer1image);
      this.layer2 = new Layer(this.game, this.width, this.height, 0.25, this.layer2image);
      this.layer3 = new Layer(this.game, this.width, this.height, 0.375, this.layer3image);
      this.layer4 = new Layer(this.game, this.width, this.height, 0.5, this.layer4image);
      this.layer5 = new Layer(this.game, this.width, this.height, 0.625, this.layer5image);
      this.layer6 = new Layer(this.game, this.width, this.height, 0.75, this.layer6image);
      this.layer7 = new Layer(this.game, this.width, this.height, 0.875, this.layer7image);
      this.layer8 = new Layer(this.game, this.width, this.height, 1, this.layer8image);
      this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5, this.layer6, this.layer7, this.layer8];
      
  }
  update(){
      this.backgroundLayers.forEach(layer => {
          layer.update();
      })
  }
  draw(ctx){
      this.backgroundLayers.forEach(layer => {
          layer.draw(ctx);
      })
  }
}


/*
class GenericObject {
    constructor({x, y, image}){
      this.position = {
        x,
        y
      }
      this.image = image
      this.width = image.width
      this.height = image.height
    }
    draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y)
    }
  }

  const genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage('./assets/layer01.png')
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage('./assets/layer02.png')
    })
  ]


  genericObjects.forEach(genericObject => {
    genericObject.draw()
  })

  genericObjects.forEach(genericObject => {
    genericObject.position.x -= 3
  })

  genericObjects.forEach(genericObject => {
    genericObject.position.x += 3
  }) 

  */