const idleImg = document.getElementById("idle");
const runRightImg = document.getElementById("run-right");
const runLeftImg = document.getElementById("run-left");
const jumpImg = document.getElementById("jump");
const hitImg = document.getElementById("hit");
const attackImg = document.getElementById('attack')

export class Player {
  constructor(game) {
    this.game = game
    this.position = {
      x: 100,
      y: 0,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.currentCropWidth = 16
    this.currentCropHeight = 16
    this.width = 100;
    this.height = 100;
    this.ground = 130;
    this.gravity = 1;
    this.bottom = this.position.y + this.height + this.ground;
    this.frames = 0;
    this.counter = 25;
    this.sprites = {
      idle: {
        image: idleImg,
      },
      run: {
        left: runLeftImg,
        right: runRightImg,
      },
      jump: {
        image: jumpImg,
      },
      hit: {
        image: hitImg,
      },
      attack: {
        image: attackImg
      }
    };
    this.currentSprite = this.sprites.idle.image;
  }
  draw(ctx) {
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    ctx.drawImage(this.currentSprite, this.currentCropWidth * this.frames, 0, this.currentCropWidth, this.currentCropHeight, this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    if (this.counter > 0) {
      this.counter -= 1;
    } else {
      if (this.frames < 3 && this.currentSprite === this.sprites.idle.image) {
        this.frames++;
      } else if (this.frames < 5 && (this.currentSprite === this.sprites.run.left || this.currentSprite === this.sprites.run.right)) {
        this.frames++;
      } else if (this.frames < 5 && this.currentSprite === this.sprites.jump.image) {
        this.frames++;
      } else if (this.frames < 1 && this.currentSprite === this.sprites.hit.image){
        this.frames++
        if (this.frames === 1 && this.velocity.x === 0) this.currentSprite = this.sprites.idle.image 
      } else if (this.frames < 2 && this.currentSprite === this.sprites.attack.image){
        this.frames++ 
      } else {
        this.frames = 0;
      }
      this.counter = 25;
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.bottom = this.position.y + this.height + this.ground;

    // Vertical boudary and jump
    if (this.bottom + this.velocity.y < this.game.height)
      this.velocity.y += this.gravity;
    else this.velocity.y = 0;

    // Horizontal boudaries
    if (this.position.x < 100) this.position.x = 100;
    if (this.position.x > this.game.width / 3 - this.width)
      this.position.x = this.game.width / 3 - this.width;
  }
  movement(keys) {
    this.velocity.x = 0;
    if (keys.right.pressed) {
      this.velocity.x += 5;
      this.game.npcs.forEach(npc => {
        npc.position.x -= 5
      })
      this.game.enemies.forEach(enemy => {
        enemy.position.x -= 5
      })
    } else if (keys.left.pressed) {
      this.velocity.x = -5;
      this.game.npcs.forEach(npc => {
        npc.position.x += 5
      })
      this.game.enemies.forEach(enemy => {
        enemy.position.x += 5
      })
    } else {
      this.velocity.x = 0;
    }
  }
}

//
