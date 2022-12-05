import { Background } from "./background.js";
import { Player } from "./player.js";
import { Npc } from "./npc.js";
import { UserInterface } from "./interface.js";
import { Goblin } from './enemies.js';

const witch = document.getElementById("witch");
const ruby = document.getElementById("ruby");
//level1
const layer1_lvl1 = document.getElementById("layer1-lvl1");
const layer2_lvl1 = document.getElementById("layer2-lvl1");
const layer3_lvl1 = document.getElementById("layer3-lvl1");
const layer4_lvl1 = document.getElementById("layer4-lvl1");
const layer5_lvl1 = document.getElementById("layer5-lvl1");
const layer6_lvl1 = document.getElementById("layer6-lvl1");
const layer7_lvl1 = document.getElementById("layer7-lvl1");
//level2
const layer1_lvl2 = document.getElementById("layer1-lvl2");
const layer2_lvl2 = document.getElementById("layer2-lvl2");
const layer3_lvl2 = document.getElementById("layer3-lvl2");
const layer4_lvl2 = document.getElementById("layer4-lvl2");
const layer5_lvl2 = document.getElementById("layer5-lvl2");
const layer6_lvl2 = document.getElementById("layer6-lvl2");
const layer7_lvl2 = document.getElementById("layer7-lvl2");
const layer8_lvl2 = document.getElementById("layer8-lvl2");


window.addEventListener("load", function () {
  const restartButton = document.getElementById("restart-button");

  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const overlay = {
    opacity: 0,
  };
  
  canvas.width = 1350;
  canvas.height = 880;
  
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.ground = 130;
      this.level = 1;
      // this.levels =
      this.keys = {
        left: {
          pressed: false,
        },
        right: {
          pressed: false,
        },
        attack: {
          pressed: false,
        },
        space: {
          pressed: false,
        },
      };
      this.background = new Background(this, layer1_lvl1, layer1_lvl1, layer2_lvl1, layer3_lvl1, layer4_lvl1, layer5_lvl1, layer6_lvl1, layer7_lvl1);
      this.userInterface = new UserInterface(this);
      this.player = new Player(this);
      this.energy = 100;
      this.npcs = [
        new Npc(this, 400, 500, 64, 64, witch, 180, 180, 11),
        new Npc(this, 900, 440, 64, 64, ruby, 250, 250, 8),
      ];
      this.enemies = [];
      this.score = 0;
      this.lives = 3;
      this.gameOver = false;
      this.victory = false;
    }
    update() {
      this.background.update();
      this.npcs.forEach((npc) => {
        npc.update();
      });
      this.player.update();
      this.attachEventListeners();
      this.player.movement(this.keys);
      this.player.checkCollision()
      this.player.useEnergy()
      
    }
    draw(ctx) {
      this.background.draw(ctx);
      this.userInterface.draw(ctx);
      this.npcs.forEach((npc) => {
        npc.draw(ctx);
      });
      this.player.draw(ctx);
    }
    attachEventListeners() {
      window.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "ArrowUp":
            if (this.player.velocity.y === 0) this.player.velocity.y = -25;
            this.player.currentSprite = this.player.sprites.jump.image;
            this.player.currentCropWidth = 16;
            this.player.width = 100;
            event.preventDefault();
            break;
          case "ArrowLeft":
            this.keys.left.pressed = true;
            this.player.currentSprite = this.player.sprites.run.left;
            this.player.currentCropWidth = 16;
            this.player.width = 100;
            event.preventDefault();
            break;
          case "ArrowRight":
            this.keys.right.pressed = true;
            this.player.currentSprite = this.player.sprites.run.right;
            this.player.currentCropWidth = 16;
            this.player.width = 100;
            event.preventDefault();
            break;
          case "a":
            if (this.energy > 0) {
              this.keys.attack.pressed = true;
              this.player.currentSprite = this.player.sprites.attack.image;
              this.player.currentCropWidth = 30;
              this.player.width = 160;
            } else {
              this.player.currentSprite = this.player.sprites.idle.image;
              this.player.currentCropWidth = 16;
              this.player.width = 100;
            }
            break;
          case " ":
            break;
        }
      });
      window.addEventListener("keyup", (event) => {
        switch (event.key) {
          case "ArrowUp":
            if (this.keys.right.pressed)
            this.player.currentSprite = this.player.sprites.run.right;
            else if (this.keys.left.pressed)
            this.player.currentSprite = this.player.sprites.run.left;
            else this.player.currentSprite = this.player.sprites.idle.image;
            break;
          case "ArrowLeft":
            this.keys.left.pressed = false;
            this.player.currentSprite = this.player.sprites.idle.image;
            break;
          case "ArrowRight":
            this.keys.right.pressed = false;
            this.player.currentSprite = this.player.sprites.idle.image;
            break;
          case "a":
            this.keys.attack.pressed = false;
            if (this.keys.right.pressed)
            this.player.currentSprite = this.player.sprites.run.right;
            else if (this.keys.left.pressed)
            this.player.currentSprite = this.player.sprites.run.left;
            else this.player.currentSprite = this.player.sprites.idle.image;
            this.player.currentCropWidth = 16;
            this.player.width = 100;
            break;
          case " ":
            break;
        }
      });
    }
    addEnemies(){
      // creating enemies
      if (this.player.velocity.x >= 0 && Math.random() < 0.005) this.enemies.push(new Goblin(this))
      // drawing, animating and moving the enemies
      this.enemies.forEach(enemy => {
        enemy.draw(ctx)
        enemy.update()
        enemy.movement()
      // removing the enemies of the array
        if (enemy.position.x + enemy.width < -canvas.width || enemy.deletion){
          this.enemies.shift(enemy)
        }
      })
    }
  }

  const game = new Game(canvas.width, canvas.height);

  // main game loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update();
    game.draw(ctx);
    game.attachEventListeners();
    game.addEnemies()

    ctx.save();
    ctx.globalAlpha = overlay.opacity;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    if (!game.gameOver && !game.victory) {
      restartButton.hidden = true;
      requestAnimationFrame(animate);
    } else if (game.gameOver) {
      //stopMusic()
      //ctx.clearRect(0, 0, canvas.width, canvas.height)
      game.userInterface.drawGameOver(ctx);
      restartButton.hidden = false;
    } else if (game.victory) {
      //stopMusic()
      //ctx.clearRect(0, 0, canvas.width, canvas.height)
      game.userInterface.drawVictory(ctx);
      restartButton.hidden = false;
    }
  }

  restartButton.addEventListener("click", function () {
    game.level = 1;
    game.lives = 3;
    game.score = 0;
    game.energy = 100;
    game.gameOver = false;
    game.victory = false;
    animate();
  });
  animate();
  
});

/**/
