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