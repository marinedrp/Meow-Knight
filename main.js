import { Background } from "./background.js";
import { UserInterface } from "./interface.js";
import { Player } from "./player.js";
import { Npc } from "./npc.js";
import { Goblin, FastEnemy, Particles } from './enemies.js';


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
//level3
const layer1_lvl3 = document.getElementById("layer1-lvl3");
const layer2_lvl3 = document.getElementById("layer2-lvl3");
const layer3_lvl3 = document.getElementById("layer3-lvl3");
const layer4_lvl3 = document.getElementById("layer4-lvl3");
const layer5_lvl3 = document.getElementById("layer5-lvl3");
const layer6_lvl3 = document.getElementById("layer6-lvl3");
const layer7_lvl3 = document.getElementById("layer7-lvl3");
const layer8_lvl3 = document.getElementById("layer8-lvl3");

window.addEventListener("load", function () {
  const restartButton = document.getElementById("restart-button");

  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  
  
  canvas.width = 1350;
  canvas.height = 880;
  
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.ground = 130;
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
      this.witch = document.getElementById("witch");
      this.ruby = document.getElementById("ruby");
      this.portal = document.getElementById('portal');
      this.mushroom = document.getElementById('mushroom');
      this.darkParticles = document.getElementById('dark-particles');
      this.skeleton;
      this.greenParticles;
      this.background;
      this.npcs;
      this.userInterface = new UserInterface(this);
      this.energy = 100;
      this.player = new Player(this);
      this.nextLevel = false;
      this.enemies = [];
      this.particles = [];
      this.score = 0;
      this.lives = 3;
      this.level = 1;
      this.music;
      this.sfx;
      this.gameOver = false;
      this.victory = false;
    }
    loadLevel(level){
      switch(level){
        case 1:
          this.background = new Background(this, layer1_lvl1, layer1_lvl1, layer2_lvl1, layer3_lvl1, layer4_lvl1, layer5_lvl1, layer6_lvl1, layer7_lvl1);
          this.npcs = [
          new Npc(this, 1400, 500, 64, 64, this.portal, 250, 250, 8),
          new Npc(this, 450, 500, 64, 64, this.witch, 180, 180, 11),
          new Npc(this, 900, 440, 64, 64, this.ruby, 250, 250, 8),
        ];
          break;
        case 2:
          this.background = new Background(this, layer1_lvl2, layer2_lvl2, layer3_lvl2, layer4_lvl2, layer5_lvl2, layer6_lvl2, layer7_lvl2, layer8_lvl2)
          this.npcs.splice(1, 2)
          this.player.position.x = 100
          this.npcs[0].position.x = 4000;
          break;
        case 3:
          this.background = new Background(this, layer1_lvl3, layer2_lvl3, layer3_lvl3, layer4_lvl3, layer5_lvl3, layer6_lvl3, layer7_lvl3, layer8_lvl3);
          this.player.position.x = 100
          this.enemies.splice(0, this.enemies.length)
          this.particles.splice(0, this.particles.length)
          this.npcs.splice(0, 1)
      }
    }
    startLevel(){
      if (this.nextLevel && this.player.checkPortalCollision()){
        this.level += 1
        this.loadLevel(this.level)
      } 
        
    }
    update() {
      this.background.update();
      // The NPCs are drawn before the player 
      //if (this.level === 1){
        this.npcs.forEach((npc) => {
          npc.update();
        });
      //}
      this.player.update();
      this.attachEventListeners();
      this.player.movement(this.keys);
      this.player.useEnergy()
      this.player.checkPortalCollision()
      this.player.checkWitchCollision()
      this.player.checkRubyCollision()
      this.player.checkEnemyCollision()
      this.player.checkParticleCollision()
      this.enemies = this.enemies.filter(enemy => !enemy.deletion)
      this.particles = this.particles.filter(particle => !particle.deletion)
    }
    draw(ctx) {
      this.background.draw(ctx);
      this.userInterface.draw(ctx);
      // The NPCs are drawn before the player 
      //if (this.level === 1){
        this.npcs.forEach((npc) => {
          npc.draw(ctx);
        });
        this.userInterface.drawDialogues()
      //}
      this.player.draw(ctx);
      
      
    }
    attachEventListeners() {
      // switching sprites with the movement of the player and preventing the page from moving
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
          case "ArrowDown":
            event.preventDefault();
            break;
          case "a":
            // if A is pressed and the player has energy
            if (this.energy > 0) {
              this.keys.attack.pressed = true;
              this.player.currentSprite = this.player.sprites.attack.image;
              this.player.currentCropWidth = 30;
              this.player.width = 160;
            } // if A and the left key are pressed but the player has no energy
            else if (this.keys.left.pressed) {
              this.player.currentSprite = this.player.sprites.run.left;
              this.player.currentCropWidth = 16;
              this.player.width = 100;
              // if A and the right key are pressed but the player has no energy
            } else if (this.keys.right.pressed){
              this.player.currentSprite = this.player.sprites.run.right;
              this.player.currentCropWidth = 16;
              this.player.width = 100;
              // if only A is pressed but the player has no energy
            } else {
              this.player.currentSprite = this.player.sprites.idle.image;
              this.player.currentCropWidth = 16;
              this.player.width = 100;
            }
            break;
          case " ":
            this.keys.space.pressed = true
            if (this.level >= 1 && this.player.checkPortalCollision() && !this.nextLevel){
              this.nextLevel = true
            } 
            event.preventDefault()
            break;
        }
      });
      window.addEventListener("keyup", (event) => {
        switch (event.key) {
          case "ArrowUp":
            // if the player is pressing the right or left key, then ArrowUp, then releases ArrowUp: 
            // the idle animation was displayed while the player was moving.
            // To fix this we are switching sprites if ArrowUp is released but other keys are pressed.
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
            // same with the ArrowUp key
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
            this.nextLevel = false
            break;
        }
      });
    }
    addEnemies(){
      // drawing, animating and moving the enemies
      this.enemies.forEach(enemy => {
        enemy.draw(ctx)
        enemy.update()
        enemy.movement()
      })

      // drawing, animating and moving the particles
      this.particles.forEach(particle => {
        particle.draw(ctx)
        particle.update()
        particle.movement()
      })

      //adding enemies after level 1 and pushing them into the array
      if (this.level === 2){
        if (this.player.velocity.x >= 0 && Math.random() < 0.01){
          this.enemies.push(new Goblin(this))
          this.particles.push(new Particles(this, this.darkParticles))
        } else if (this.player.velocity.x >= 0 && Math.random() < 0.002){
          this.enemies.push(new FastEnemy(this, this.mushroom))
        }
      }
    }
    checkIfGameOver(){
      if (this.lives < 0) {
        this.gameOver = true
      }
    }
  }

  const game = new Game(canvas.width, canvas.height);


  // main game loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.draw(ctx);
    game.update();
    game.startLevel()
    game.attachEventListeners();
    game.addEnemies()
    game.checkIfGameOver()

    //console.log(game.enemies)
    //console.log(game.npcs)
    console.log(game.level)
    //console.log(game.nextLevel)

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
    // resetting the parameters
    game.level = 1;
    game.lives = 3;
    game.score = 0;
    game.energy = 100;
    game.player.position.x = 100
    game.keys.space.pressed = false
    game.userInterface.counterWitch = 0
    game.userInterface.counterRuby = 0
    game.nextLevel = false
    game.enemies = []
    game.particles = []
    game.gameOver = false;
    game.victory = false;
    game.loadLevel(game.level)
    animate();
  });

  game.loadLevel(game.level)
  animate();
  
  
});
