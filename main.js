import { Background } from "./background.js";
import { UserInterface } from "./interface.js";
import { Player } from "./player.js";
import { Npc } from "./npc.js";
import { RunningEnemy, Particles } from './enemies.js';


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

const startButton = document.getElementById("start-game")
const restartButton = document.getElementById("restart-button");
const goodVictoryButton = document.getElementById('goodVictory-button');
const evilVictoryButton = document.getElementById('evilVictory-button');
restartButton.hidden = true;
goodVictoryButton.hidden = true;
evilVictoryButton.hidden = true;


startButton.addEventListener("click", function () {
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
      this.witch = {
        x: 800,
        y: 500,
        image: document.getElementById("witch"),
        cropWidth: 64,
        cropHeight: 64,
        width: 180,
        height: 180,
        maxFrames: 11
      } 
      this.ruby = {
        x: 5500,
        y: 440,
        image: document.getElementById("ruby"),
        cropWidth: 64,
        cropHeight: 64,
        width: 250,
        height: 250,
        maxFrames: 8
      } 
      this.portal = {
        x: 6000,
        y: 500,
        image: document.getElementById('portal'),
        cropWidth: 64,
        cropHeight: 64,
        width: 250,
        height: 250,
        maxFrames: 8
      } 
      this.goblin = {
        image: document.getElementById('goblin'),
        cropWidth: 40,
        cropHeight: 40,
        width: 180,
        height: 180,
        positionY: 880 - 180 - 130,
        speedX: Math.floor(Math.random() * 3) + 2,
        maxFrames: 7,
        scoreBonus: 1
      }
      this.mushroom = {
        image: document.getElementById('mushroom'),
        cropWidth: 25,
        cropHeight: 38,
        width: 125,
        height: 190,
        positionY: 880 - 180 - 130,
        speedX: Math.floor(Math.random() * 4) + 2,
        maxFrames: 5,
        scoreBonus: 2
      }
      this.darkParticles = {
        image: document.getElementById('dark-particles'),
        speedY: 2
      }
      this.skeleton = {
        image: document.getElementById('skeleton'),
        cropWidth: 45,
        cropHeight: 51,
        width: 180,
        height: 204,
        positionY: 880 - 180 - 130,
        speedX: Math.floor(Math.random() * 4) + 2,
        maxFrames: 3,
        scoreBonus: 3
      }
      this.greenParticles = {
        image: document.getElementById('green-particles'),
        speedY: 2
      }
      this.bat = {
        image: document.getElementById('bat'),
        cropWidth: 42,
        cropHeight: 32,
        width: 168,
        height: 128,
        positionY: 500,
        speedX: Math.floor(Math.random() * 4) + 2,
        maxFrames: 7,
        scoreBonus: 4
      };
      this.tower = {
        x: 6000,
        y: 400,
        image: document.getElementById("tower"),
        cropWidth: 100,
        cropHeight: 100,
        width: 400,
        height: 400,
        maxFrames: 10
      }
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
      this.footsteps;
      this.music;
      this.gameOver = false;
      this.victory = false;
      this.goodVictory = false;
      this.evilVictory = false;
    }
    loadLevel(level){
      switch(level){
        case 1:
          this.background = new Background(this, layer1_lvl1, layer1_lvl1, layer2_lvl1, layer3_lvl1, layer4_lvl1, layer5_lvl1, layer6_lvl1, layer7_lvl1);
          this.npcs = [
          new Npc(this, this.portal),
          new Npc(this, this.witch),
          new Npc(this, this.ruby),
        ];
        this.footsteps = this.userInterface.sounds.level1.footsteps
        this.music = this.userInterface.sounds.level1.music;
          break;
        case 2:
          this.background = new Background(this, layer1_lvl2, layer2_lvl2, layer3_lvl2, layer4_lvl2, layer5_lvl2, layer6_lvl2, layer7_lvl2, layer8_lvl2)
          this.npcs.splice(1, 2)
          this.player.position.x = 100
          this.npcs[0].position.x = 6000;
          this.footsteps = this.userInterface.sounds.level2.footsteps;
          this.music = this.userInterface.sounds.level2.music;
          break;
        case 3:
          this.background = new Background(this, layer1_lvl3, layer2_lvl3, layer3_lvl3, layer4_lvl3, layer5_lvl3, layer6_lvl3, layer7_lvl3, layer8_lvl3);
          this.player.position.x = 100
          this.enemies.splice(0, this.enemies.length)
          this.particles.splice(0, this.particles.length)
          this.npcs.splice(0, 1)
          this.npcs = [new Npc(this, this.tower)]
          this.footsteps = this.userInterface.sounds.level3.footsteps;
          this.music = this.userInterface.sounds.level3.music;
      }
    }
    startLevel(){
      if (this.nextLevel && this.player.checkPortalCollision()){
        this.userInterface.stopMusic()
        this.level += 1
        this.loadLevel(this.level)
      }
    }
    update() {
      this.background.update();
      // The NPCs are drawn before the player 
      this.npcs.forEach((npc) => {
        npc.update();
      });
      this.player.update();
      this.attachEventListeners();
      this.player.movement(this.keys);
      this.player.useEnergy()
      this.player.checkPortalCollision()
      this.player.checkWitchCollision()
      this.player.checkRubyCollision()
      this.player.checkEnemyCollision()
      this.player.checkParticleCollision()
      this.player.checkPortalCollision()
      this.enemies = this.enemies.filter(enemy => !enemy.deletion)
      this.particles = this.particles.filter(particle => !particle.deletion)
    }
    draw(ctx) {
      this.background.draw(ctx);
      this.userInterface.draw(ctx);
      this.userInterface.playMusic()
      // The NPCs are drawn before the player 
      this.npcs.forEach((npc) => {
          npc.draw(ctx);
        });
      this.userInterface.drawDialogues()
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
            this.userInterface.playJumpSound()
            event.preventDefault();
            break;
          case "ArrowLeft":
            this.keys.left.pressed = true;
            this.player.currentSprite = this.player.sprites.run.left;
            this.player.currentCropWidth = 16;
            this.player.width = 100;
            this.userInterface.playFootstepSound()
            event.preventDefault();
            break;
          case "ArrowRight":
            this.keys.right.pressed = true;
            this.player.currentSprite = this.player.sprites.run.right;
            this.player.currentCropWidth = 16;
            this.player.width = 100;
            this.userInterface.playFootstepSound()
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
              this.userInterface.playSwordSound()
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
            if (this.level === 3 && this.player.checkTowerCollision()){
              this.victory = true 
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
            if (this.keys.right.pressed){
              this.player.currentSprite = this.player.sprites.run.right;
              this.player.currentCropWidth = 16;
              this.player.width = 100;
              this.userInterface.playFootstepSound()
            }
            else if (this.keys.left.pressed){
              this.player.currentSprite = this.player.sprites.run.left;
              this.player.currentCropWidth = 16;
              this.player.width = 100;
              this.userInterface.playFootstepSound()
            }
            else {
              this.player.currentSprite = this.player.sprites.idle.image;
              this.player.currentCropWidth = 16;
              this.player.width = 100;
            }
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
      //adding enemies after level 1 and pushing them into the array
      if (this.level === 2){
        if (this.player.velocity.x >= 0 && Math.random() < 0.008){
          this.enemies.push(new RunningEnemy(this, this.goblin))
          this.particles.push(new Particles(this, this.darkParticles))
        } else if (this.player.velocity.x >= 0 && Math.random() < 0.005){
          this.enemies.push(new RunningEnemy(this, this.mushroom))
        }
      }
      if (this.level === 3){
        if (this.player.velocity.x >= 0 && Math.random() < 0.02){
          this.particles.push(new Particles(this, this.greenParticles))
        } 
        else if (this.player.velocity.x >= 0 && Math.random() < 0.01){
          this.enemies.push(new RunningEnemy(this, this.skeleton))
        } else if (this.player.velocity.x >= 0 && Math.random() < 0.004){
          this.enemies.push(new RunningEnemy(this, this.bat))
        }
      }

      if (this.level > 1){
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

    if (!game.gameOver && !game.victory) {
      restartButton.hidden = true;
      goodVictoryButton.hidden = true;
      evilVictoryButton.hidden = true;
      requestAnimationFrame(animate);
    }
    else if (game.gameOver) {
      game.userInterface.drawGameOver(ctx);
      restartButton.hidden = false;
    } 
    else if (game.victory) {
      game.userInterface.drawVictory(ctx);
      restartButton.hidden = true;
      goodVictoryButton.hidden = false;
      evilVictoryButton.hidden = false;
    } 
  }



  restartButton.addEventListener("click", function () {
    // resetting the parameters
    game.userInterface.gameOverSound.pause()
    game.userInterface.stopWinningMusic()
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
    game.goodVictory = false;
    game.evilVictory = false;
    game.loadLevel(game.level)
    animate();
  });

  goodVictoryButton.addEventListener("click", function(){
    game.goodVictory = true
    game.userInterface.drawGoodVictory(ctx)
    restartButton.hidden = false;
    goodVictoryButton.hidden = true;
    evilVictoryButton.hidden = true;
  })

  evilVictoryButton.addEventListener("click", function(){
    game.evilVictory = true
    game.userInterface.drawEvilVictory(ctx)
    restartButton.hidden = false;
    goodVictoryButton.hidden = true;
    evilVictoryButton.hidden = true;
  })

    game.loadLevel(game.level)
    animate();
   
});
