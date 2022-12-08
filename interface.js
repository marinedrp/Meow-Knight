
export class UserInterface {
    constructor(game){
        this.game = game
        this.x = 0
        this.y = 0
        this.fontSize = 40;
        this.fontFamily = 'MedievalSharp'
        this.fontColor = 'black'
        this.fontWeight = 'bold '
        this.livesImage = document.getElementById('lives')
        // game over assets
        this.gameOverImage = document.getElementById("game-over")
        this.gameOverSound = document.getElementById('game-over-sound')
        // victory assets
        this.victoryImage = document.getElementById('victory')
        this.victorySound = document.getElementById('victory-sound')
        this.goodVictoryImage = document.getElementById('good-victory')
        this.goodVictorySound = document.getElementById('goodVictory-sound')
        this.evilVictoryImage = document.getElementById('evil-victory')
        this.evilVictorySound = document.getElementById('evilVictory-sound')
        // dialogues
        this.container = document.getElementById('container')
        this.dialogues = {
            witch: {
                text1: "You there, Meow-Knight. I'm relieved to see you. Master Ruby has an important mission for you. Please be quick, she is waiting for you.",
                text2: ["Now is not the time for a bath.", "Oh it's you.", "Just because I can talk doesn't mean I don't like getting scratched behind the ears.", "Enthusiasm? On a week day? My word.", "Your request is noted and ignored.", "This world is host by goblins and flying mushrooms and you're surprised by me?", "Don't touch me I'm super important.", "A waste of my talents!", "Need any help?", "I would suggest that you get moving and decide on a plan.", "Everything is in decline in this world. So is my mood.", "Have I missed it? Have I missed the battle?", "Did you talk to Master Ruby?", "What's wrong with you? You seem... Happy.", "Meow.", "Well, well, well, if it isn't my dear friend, Meow-Knight!", "You are talking again. You will stop.", "Will I just stay here and say random things all day?", "What is my purpose in this game?"]
            } ,
            ruby: {
                text1: "Please, Meow-Knight, lend me your hand. There was once a noble order of druids who lived in the nearby forest. They still live there, but they now use the magic of the Red Tower to perform their rituals. As a result, vile creatures have now crept up in our lands. I cannot join you, but I know you are fully capable to handle those fiends. Please take this portal, destroy this tower and try to take down as many of them as possible. Good luck hero.",
                text2: ["I'm happy to say I'll be able to reward you handsomely for your troubles.", "You best get going, there's no time to waste. We're counting on you.", "Please succeed Meow-Knight, we believe in you.", "I know you'll succeed, but do be careful.", "For justice and honor!", "I'm looking forward to your return, Meow-Knight. Good luck.", "Now hurry, Meow-Knight, there's no time to waste."]
            } 
        } 
        this.randomWitchText;
        this.randomRubyText;
        this.index = 0;
        this.counterWitch = 0
        this.counterRuby = 0
        // sounds, sfx and music
        this.sounds = {
            player:{
                jump: document.getElementById('jump-sound'),
                sword: document.getElementById('sword-sound'),
                hit: document.getElementById('hit-sound')
            },
            level1: {
                music: document.getElementById('music-lvl1'),
                footsteps: document.getElementById('footsteps-lvl1')
            },
            level2: {
                music: document.getElementById('music-lvl2'),
                footsteps: document.getElementById('footsteps-lvl2')
            },
            level3: {
                music: document.getElementById('music-lvl3'),
                footsteps: document.getElementById('footsteps-lvl3')
            }
        }
    }
    draw(ctx){
        ctx.save()
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 0;
        ctx.font = this.fontWeight + this.fontSize + 'px ' + this.fontFamily;
        ctx.textAlign = 'left'
        ctx.fillStyle = this.fontColor

        // score
        ctx.fillText('Score: ' + this.game.score, 30, 60)

        // lives
        for (let i = 0; i < this.game.lives; i++){
            ctx.drawImage(this.livesImage, 40 * i + 30, 80, 30, 30)
        }

        // energy bar
        let energyBarColor = ctx.createLinearGradient(0, 0, 0, 700);
        energyBarColor.addColorStop(0, "orange");
        energyBarColor.addColorStop(1, "black");
        ctx.fillStyle = energyBarColor
        ctx.fillRect(30, 130, this.game.energy, 30)
        ctx.restore()
        
    }
    drawGameOver(ctx){
        this.stopMusic()
        this.stopPlayerSounds()
        ctx.drawImage(this.gameOverImage, this.x, this.y, this.game.width, this.game.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.500)'
        ctx.fillRect(this.x, this.y, this.game.width, this.game.height)
        ctx.font = this.fontWeight + '38px ' + 'Lora';
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'
        ctx.fillText(`And then you jumped off a cliff and died?`, this.game.width/2, 350)
        ctx.fillText(`No, wait. That's not what happened.`, this.game.width/2, this.game.height/2)
        ctx.fillText(`Let me start again...`, this.game.width/2, 530)
        this.gameOverSound.volume = 0.5
        this.gameOverSound.play()
    }
    drawVictory(ctx){
        this.stopMusic()
        this.stopPlayerSounds()
        ctx.drawImage(this.victoryImage, this.x, this.y, this.game.width, this.game.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.500)'
        ctx.fillRect(this.x, this.y, this.game.width, this.game.height)
        ctx.font = this.fontWeight + this.fontSize + 'px ' + 'Lora';
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'
        ctx.fillText(`After all you have been through, you finally reached the Red Tower.`, this.game.width/2, 260)
        ctx.fillText(`You unsleash your weapon and look at the magic around you. `, this.game.width/2, 350)
        ctx.fillText(`The power is immense... It is now yours to take or to sacrifice.`, this.game.width/2, this.game.height/2)
        ctx.fillText(`What shall you do with this power?`, this.game.width/2, 530)
        this.victorySound.volume = 0.5
        this.victorySound.play()
    }
    drawEvilVictory(ctx){
        this.victorySound.pause()
        ctx.drawImage(this.evilVictoryImage, this.x, this.y, this.game.width, this.game.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.500)'
        ctx.fillRect(this.x, this.y, this.game.width, this.game.height)
        ctx.font = this.fontWeight + '38px ' + 'Lora';
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'
        ctx.fillText(`And this is how Meow-Knight the Red changed the course of history.`, this.game.width/2, 260)
        ctx.fillText(`By taking the power of the Red Tower, he became the greatest vilain`, this.game.width/2, 350)
        ctx.fillText(`the world has ever seen. Alas, harmony was not to last...`, this.game.width/2, this.game.height/2)
        ctx.fillText(`Your score is: ` + this.game.score, this.game.width/2, 530)
        this.evilVictorySound.volume = 0.5
        this.evilVictorySound.play()
    }
    drawGoodVictory(ctx){
        this.victorySound.pause()
        ctx.drawImage(this.goodVictoryImage, this.x, this.y, this.game.width, this.game.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.500)'
        ctx.fillRect(this.x, this.y, this.game.width, this.game.height)
        ctx.font = this.fontWeight + '38px ' + 'Lora';
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'
        ctx.fillText(`And this is how Meow-Knight the Brave changed the course of history.`, this.game.width/2, 260)
        ctx.fillText(`By destroying the Red Tower, he saved all cats and humans of the realm.`, this.game.width/2, 350)
        ctx.fillText(`He is now remembered as the greatest hero of our time.`, this.game.width/2, this.game.height/2)
        ctx.fillText(`Your score is: ` + this.game.score, this.game.width/2, 530)
        this.goodVictorySound.volume = 0.5
        this.goodVictorySound.play()
    }
    drawDialogues(){
        // display the first text box
        if (this.game.keys.space.pressed && (this.game.player.checkWitchCollision() || this.game.player.checkRubyCollision()) && this.game.level === 1){
            this.container.classList.add("revealed")
            this.typeText()
        // cleaning the text box after the first dialogue and resetting the parameters
        } else if ((this.counterWitch === 1 || this.counterRuby === 1) && (!this.game.player.checkWitchCollision() || !this.game.player.checkRubyCollision()) && this.game.level === 1) {
                this.index = 0;
                this.container.classList.remove("revealed")
                this.container.innerHTML = ""
                this.game.keys.space.pressed = false
                if (this.counterWitch === 1){
                    this.counterWitch++
                } else if (this.counterRuby === 1){
                    this.counterRuby++
                }
           
        // cleaning the text box after the other dialogues
         } else if ((this.counterWitch === 2 || this.counterRuby === 2) && (!this.game.player.checkWitchCollision() || !this.game.player.checkRubyCollision()) && this.game.level === 1){
            // We are omitting the first string of the array that should not be displayed after the first dialogue was opened
            this.randomWitchText = this.dialogues.witch.text2[Math.floor(Math.random() * this.dialogues.witch.text2.length)]
            this.randomRubyText = this.dialogues.ruby.text2[Math.floor(Math.random() * this.dialogues.ruby.text2.length)]
            this.index = 0;
            this.container.classList.remove("revealed")
            this.container.innerHTML = ""
            this.game.keys.space.pressed = false
          } 
    }
    typeText(){
        // dialogues with the witch
        // if the player hasn't talked to her, it will display the first string of the array (quest)
        if (this.game.player.checkWitchCollision() && this.counterWitch === 0){
            this.container.innerHTML += this.dialogues.witch.text1[this.index];
            this.index++;
            if (this.index >= this.dialogues.witch.text1.length) {
              this.container.innerHTML = this.dialogues.witch.text1;
              this.counterWitch++
            } 
        // if the player has already talked to her, it will display a random string of the array except the one at index 0 
        } else if (this.game.player.checkWitchCollision() && this.counterWitch === 2){
            this.container.innerHTML += this.randomWitchText[this.index];
            this.index++;
            if (this.index >= this.randomWitchText.length) {
              this.container.innerHTML = this.randomWitchText;
              this.index = this.randomWitchText.length
            } 
        // dialogues with Ruby
        // if the player hasn't talked to her, it will display the first string of the array (quest)
        } else if (this.game.player.checkRubyCollision() && this.counterRuby === 0){
            this.container.innerHTML += this.dialogues.ruby.text1[this.index];
            this.index++;
            if (this.index >= this.dialogues.ruby.text1.length) {
              this.container.innerHTML = this.dialogues.ruby.text1;
              this.counterRuby++
            } 
            // if the player has already talked to her, it will display a random string of the array except the one at index 0 
        } else if (this.game.player.checkRubyCollision() && this.counterRuby === 2){
                this.container.innerHTML += this.randomRubyText[this.index];
                this.index++;
                if (this.index >= this.randomRubyText.length) {
                    this.container.innerHTML = this.randomRubyText;
                    this.index = this.randomRubyText.length
                  }
        }
    }
    playMusic(){
        this.game.music.volume = 0.3
        this.game.music.play()
    }
    stopMusic(){
        this.game.music.pause()
    }
    // playFootstepSound() {
    //     this.game.footsteps.playbackRate = 1.6
    //     this.game.footsteps.volume = 0.5
    //     this.game.footsteps.play();
    // }
    playSwordSound(){
        this.sounds.player.sword.playbackRate = 1.37
        this.sounds.player.sword.play()
    }
    playJumpSound(){
        this.sounds.player.jump.playbackRate = 5
        this.sounds.player.jump.play()
    }
    playHitSound(){
        this.sounds.player.hit.play()
    }
    stopPlayerSounds(){
        this.sounds.player.sword.pause()
        this.sounds.player.jump.pause()
        this.sounds.player.hit.pause()
    }
    stopWinningMusic(){
        if (this.game.goodVictory){
            this.goodVictorySound.pause()
        } else if (this.game.evilVictory){
            this.evilVictorySound.pause()
        }
    }

}

