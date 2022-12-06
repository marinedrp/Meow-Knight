
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
        this.gameOverImage = document.getElementById("game-over")
        this.gameOverSound = document.getElementById('game-over-sound')
        this.victoryImage = document.getElementById('victory')
        this.victorySound = document.getElementById('victory-sound')
        this.container = document.getElementById('container')
        this.text = {
            witch: ["You there, champion. I'm relieved to see you. Master Ruby has an important mission for you.", "Now is not the time for a bath.", "Oh it's you.", "Just because I can talk doesn't mean I don't like getting scratched behind the ears.", "Enthusiasm? On a week day? My word.", "Your request is noted and ignored.", "This world is host by goblins and flying mushrooms and you're surprised by me?", "Don't touch me I'm super important.", "A waste of my talents!", "Need any help?", "I would suggest that you get moving and decide on a plan.", "Everything is in decline in this world. So is my mood.", "Have I missed it? Have I missed the battle?", "Did you talk to Master Ruby?", "What's wrong with you? You seem... Happy."],
            ruby: ["Hello.", "This is a test.", "This is the third string.", "Adding more strings.", "To see if it works.", "Hello should not be displayed."]
        } 
        this.randomWitchText = this.text.witch[Math.floor(Math.random() * this.text.witch.length) + 1]
        this.randomRubyText = this.text.ruby[Math.floor(Math.random() * this.text.ruby.length) + 1]
        this.i = 0;
        this.counterWitch = 0
        this.counterRuby = 0
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
        ctx.drawImage(this.gameOverImage, this.x, this.y, this.game.width, this.game.height);
        ctx.font = '50px ' + 'Calligraffitti';
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'
        ctx.fillText(`And then you jumped off a cliff and died?`, this.game.width/2, 350)
        ctx.fillText(`No, wait. That's not what happened.`, this.game.width/2, this.game.height/2)
        ctx.fillText(`Let me start again...`, this.game.width/2, 530)
        this.gameOverSound.volume = 0.5
        this.gameOverSound.play()
    }
    drawVictory(ctx){
        ctx.drawImage(this.victoryImage, this.x, this.y, this.game.width, this.game.height);
        ctx.font = this.fontWeight + this.fontSize + 'px ' + 'Calligraffitti';
        ctx.textAlign = 'center'
        ctx.fillStyle = this.fontColor
        ctx.fillText(`And this is how Meow-Knight the Brave changed the course of history.`, this.game.width/2, 350)
        ctx.fillText(`All across the realm he was worshiped and adored.`, this.game.width/2, this.game.height/2)
        ctx.fillText(`Let me start again...`, this.game.width/2, 530)
        this.victorySound.volume = 0.5
        this.victorySound.play()
    }
    drawDialogues(){
        console.log(this.i)
        //console.log(this.counterWitch)
        // display the first text box
        if (this.game.keys.space.pressed && (this.game.player.checkWitchCollision() || this.game.player.checkRubyCollision())){
            this.container.classList.add("revealed")
            this.typeText()
        // cleaning the text box after the first dialogue and resetting the parameters
        } else if ((this.counterWitch === 1 || this.counterRuby === 1) && (!this.game.player.checkWitchCollision() || !this.game.player.checkRubyCollision())) {
            this.container.classList.remove("revealed")
            this.container.innerHTML = ""
            this.i = 0;
            // Omitting the first string of the array
            this.randomWitchText = this.text.witch[Math.floor(Math.random() * this.text.witch.length) + 1]
            this.randomRubyText = this.text.ruby[Math.floor(Math.random() * this.text.ruby.length) + 1]
            this.game.keys.space.pressed = false
            if (this.counterWitch === 1){
                this.counterWitch++
            } else if (this.counterRuby === 1){
                this.counterRuby++
            }
        // cleaning the text box after the other dialogues
         } else if ((this.counterWitch === 2 || this.counterRuby === 2) && (!this.game.player.checkWitchCollision() || !this.game.player.checkRubyCollision())){
            this.container.classList.remove("revealed")
            this.container.innerHTML = ""
            this.i = 0;
            this.randomWitchText = this.text.witch[Math.floor(Math.random() * this.text.witch.length) + 1]
            this.randomRubyText = this.text.ruby[Math.floor(Math.random() * this.text.ruby.length) + 1]
            this.game.keys.space.pressed = false
          }
    }
    typeText(){
        // dialogues with the witch
        // if the player hasn't talked to her, it will display the first string of the array (quest)
        if (this.game.player.checkWitchCollision() && this.counterWitch === 0){
            this.container.innerHTML += this.text.witch[0][this.i];
            this.i++;
            if (this.i >= this.text.witch[0].length) {
              this.container.innerHTML = this.text.witch[0];
              this.counterWitch++
            } 
        // if the player has already talked to her, it will display a random string of the array except the one at index 0 
        } else if (this.game.player.checkWitchCollision() && this.counterWitch === 2){
            this.container.innerHTML += this.randomWitchText[this.i];
            this.i++;
            if (this.i >= this.randomWitchText.length) {
              this.container.innerHTML = this.randomWitchText;
            } 
        // dialogues with Ruby
        // if the player hasn't talked to her, it will display the first string of the array (quest)
        } else if (this.game.player.checkRubyCollision() && this.counterRuby === 0){
            this.container.innerHTML += this.text.ruby[0][this.i];
            this.i++;
            if (this.i >= this.text.ruby[0].length) {
              this.container.innerHTML = this.text.ruby[0];
              this.counterRuby++
            } 
            // if the player has already talked to her, it will display a random string of the array except the one at index 0 
        } else if (this.game.player.checkRubyCollision() && this.counterRuby === 2){
            this.container.innerHTML += this.randomRubyText[this.i];
            this.i++;
            if (this.i >= this.randomRubyText.length) {
              this.container.innerHTML = this.randomRubyText;
            } 
        }
        
        
    }
}

