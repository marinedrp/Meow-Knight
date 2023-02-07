class Layer {
  constructor(game, {width, height, speedModifier, image}){
      this.game = game;  
      this.width = width;
      this.height = height;
      this.speedModifier = speedModifier;
      this.image = image;
      this.x = 0;
      this.y = 0;
  }
  update(){
    this.x = this.x < -this.width
    ? 0
    : this.x > this.width
      ? 0
      : this.x - this.game.player.velocity.x * this.speedModifier;
  }
  draw(ctx){
      ctx.drawImage(this.image, this.x - this.width, this.y, this.width, this.height);  
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);

  }
}

export class Background {
  constructor(game, layerImages){
      this.game = game
      this.width = 1920;
      this.height = 1080;
      this.layers = layerImages.map((image, i) => new Layer(game, {
        width: this.width,
        height: this.height,
        speedModifier: (i + 1) / 8,
        image
  }));
  }
  update(){
      this.layers.forEach(layer => {
          layer.update();
      })
  }
  draw(ctx){
      this.layers.forEach(layer => {
          layer.draw(ctx);
      })
  }
}





// class Layer {
//   constructor(game, width, height, speedModifier, image){
//       this.game = game;  
//       this.width = width;
//       this.height = height;
//       this.speedModifier = speedModifier;
//       this.image = image;
//       this.x = 0;
//       this.y = 0;
//   }
//   update(){
//       // scrolls the background endlessly to the right
//       if (this.x < -this.width) {
//         this.x = 0
//       // scrolls the background endlessly to the left
//       } else if (this.x > this.width){
//         this.x = 0
//       }
//       // scrolls the layers with the movement of the player
//       else {
//         this.x -= this.game.player.velocity.x * this.speedModifier 
//       }
//   }
//   draw(ctx){
//       ctx.drawImage(this.image, this.x - this.width, this.y, this.width, this.height);  
//       ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//       ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);

//   }
// }

// export class Background {
//   constructor(game, layer1image, layer2image, layer3image, layer4image, layer5image, layer6image, layer7image, layer8image){
//       this.game = game
//       this.width = 1920;
//       this.height = 1080;
//       this.layer1image = layer1image
//       this.layer2image = layer2image
//       this.layer3image = layer3image
//       this.layer4image = layer4image
//       this.layer5image = layer5image
//       this.layer6image = layer6image
//       this.layer7image = layer7image
//       this.layer8image = layer8image
//       this.layer1 = new Layer(this.game, this.width, this.height, 0.125, this.layer1image);
//       this.layer2 = new Layer(this.game, this.width, this.height, 0.25, this.layer2image);
//       this.layer3 = new Layer(this.game, this.width, this.height, 0.375, this.layer3image);
//       this.layer4 = new Layer(this.game, this.width, this.height, 0.5, this.layer4image);
//       this.layer5 = new Layer(this.game, this.width, this.height, 0.625, this.layer5image);
//       this.layer6 = new Layer(this.game, this.width, this.height, 0.75, this.layer6image);
//       this.layer7 = new Layer(this.game, this.width, this.height, 0.875, this.layer7image);
//       this.layer8 = new Layer(this.game, this.width, this.height, 1, this.layer8image);
//       this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5, this.layer6, this.layer7, this.layer8];
      
//   }
//   update(){
//       this.backgroundLayers.forEach(layer => {
//           layer.update();
//       })
//   }
//   draw(ctx){
//       this.backgroundLayers.forEach(layer => {
//           layer.draw(ctx);
//       })
//   }
// }


